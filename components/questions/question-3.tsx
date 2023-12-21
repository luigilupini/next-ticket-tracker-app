// ! Client vs Server Components
// If you need client side API's, you need to use a client component.
// Either use the 'use client' directive or import this component into a
// already declared client component so its bundled as a client. Another
// client component acts as a client boundary in your React tree.

export default function Question3() {
  // useState(); // Hooks and it is not allowed in RSC components
  // window.alert('Hello'); // DOM API is not allowed in RSC components
  // localStorage.getItem('name'); // Browser API is not allowed in RSC components
  return (
    <div className='card w-96 bg-base-100 shadow-xl card-compact'>
      <div className='card-body'>
        <h2 className='card-title'>Server Component</h2>
      </div>
    </div>
  );
}
