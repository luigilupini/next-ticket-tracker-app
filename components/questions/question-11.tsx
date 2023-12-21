'use client';

export default function Question11({ id = 11 }: { id?: number }) {
  // ! Conditional Rendering Before Hooks :(
  if (!id) {
    console.log('ID is: ', id);
    return 'No product ID';
  }

  // ! Rules of Hooks (eslint react-hooks/rules-of-hooks)
  // React Hook "useState" is called conditionally. React Hooks must be called
  // in the exact same order in every component render. Did you accidentally
  // call a React Hook after an early return.
  // const [count, setCount] = useState(0); // uncomment to see the error!

  return (
    <div className='card w-96 bg-base-100 shadow-xl card-compact'>
      <div className='card-body'>
        <h2 className='card-title'>Product ID</h2>
        <p className='text-sm badge badge-primary'> Product is: {id} </p>
        <div className='card-actions justify-end' />
      </div>
    </div>
  );
}
