'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';

// * LOCAL STORAGE VALIDATION
// Here we use Zod to validate data stored in localStorage.
// This ensures that the data is always up to date and valid.
// Toggle above comments to see errors and different results.

const cartSchema = z.array(
  z.object({
    // id: z.number(),
    id: z.string(), // 👈🏻 toggle between to see the error
    quantity: z.number().int().positive(),
    // type: z.enum(['water', 'tea', 'coffee']), // 👈🏻 toggle to remove item form cart
  })
);
type Cart = z.infer<typeof cartSchema>;

export default function Example3() {
  const router = useRouter();
  const cart: unknown | Cart = JSON.parse(localStorage.getItem('cart') || '[]');

  // Validate the cart data:
  const validate = cartSchema.safeParse(cart);
  console.log(validate);
  // First success object is available until conditionally met!
  // If the shape of the cart is outdated, remove it from localStorage:
  if (!validate.success) {
    localStorage.removeItem('cart');
    alert('Cart data is outdated. Please try again.');
    return;
  }
  // After success `data` is returned as a property of the validate object:
  console.log(validate.data);

  return (
    <div className='card w-96 bg-base-100 shadow-xl card-compact'>
      <div className='card-body'>
        <h2 className='card-title'>LocalStorage Validation</h2>
        <p className='text-sm'>
          This example demonstrates how to validate data stored in localStorage.
        </p>
        <span className='text-accent font-mono text-[11px] w-full my-2'>
          <strong>Cart:</strong> {JSON.stringify(validate.data)}
        </span>
        <button
          className='btn btn-sm btn-outline mt-2'
          onClick={() => {
            localStorage.setItem(
              'cart',
              JSON.stringify([
                { id: 1, quantity: 1, type: 'water' },
                { id: 2, quantity: 2, type: 'tea' },
                { id: 3, quantity: 3, type: 'coffee' },
              ])
            );
            router.refresh();
          }}
        >
          Add to Cart
        </button>
        <button
          className='btn btn-sm btn-outline mt-1'
          onClick={() => {
            localStorage.removeItem('cart');
            router.refresh();
          }}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
