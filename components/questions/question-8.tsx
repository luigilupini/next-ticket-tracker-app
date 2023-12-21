'use client';

import { useEffect, useState } from 'react';

const PRICE_PER_ITEM = 5;

export default function Question8() {
  // ✅ Good Practice Allows check if you can derive from state/props instead of
  // producing state or side effects.
  const [quantity, setQuantity] = useState(1);
  const derive = quantity * PRICE_PER_ITEM;

  // ! Information can be derived from state/props
  // ❌ Bad Practice (Instead derive from state or props!)
  const [totalPrice, setTotalPrice] = useState(0); // ❌ Bad Practice
  useEffect(() => {
    setTimeout(() => {
      console.log(`❌ Even if you move this out the timeout,
      it is still bad practice! And still starts at 0!`);
      setTotalPrice(quantity * PRICE_PER_ITEM); // ❌ Bad Practice
    }, 2000);
  }, [quantity]); // ❌ Bad Practice

  return (
    <div className='card w-96 bg-base-100 shadow-xl card-compact'>
      <div className='card-body'>
        <h2 className='card-title'>Cart Card</h2>
        <p className='text-sm badge badge-primary'> quantity is: {quantity}</p>
        <p className='flex justify-between'>
          Bad Practice:
          <span className='text-sm badge badge-warning'>
            Separate and effect state: ${totalPrice}{' '}
          </span>
        </p>

        <p className='flex justify-between'>
          Good Practice:
          <span className='text-sm badge badge-success'>
            Derive from current state: ${derive}
          </span>
        </p>

        <div className='card-actions justify-end'>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className='btn btn-primary'
          >
            Click Me!
          </button>
        </div>
      </div>
    </div>
  );
}
