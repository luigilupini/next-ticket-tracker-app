'use client';

import { useState } from 'react';

const PRICE_PER_ITEM = 5;

export default function Question7() {
  // ! Primitive Types (❌ Does not re-render)
  // Because this is the same value as the previous state,
  // React will not re-render the component. This is because
  // we working with the actual value of the state.
  const [price, setPrice] = useState(0);
  const [test, setTest] = useState('test');
  const [isOn, setIsOn] = useState(false);

  const handlePrimitive = () => {
    setPrice(0);
    setTest('test');
    setIsOn(false);
  };

  // * With non-primitive types (React re-renders the component)
  // This is because React does a shallow comparison of the previous state
  // and new state. If the state is a primitive type, it compares by values.
  // If state is a non-primitive type, it compares by references. And since
  // no two objects are the same, React will re-render the component.
  // Example: {hello: 'ciao'} === {hello: 'ciao'} // false
  const [state, setState] = useState({ price: 0, test: 'test', isOn: false });

  const handleNonPrimitive = () => {
    setState({ price: 0, test: 'test', isOn: false });
  };

  console.log(`Component Render Counter... `);

  return (
    <div className='card w-96 bg-base-100 shadow-xl card-compact'>
      <div className='card-body'>
        <h2 className='card-title'>Price Card</h2>
        <p className='text-sm badge badge-warning'> price is: {price}</p>
        <p className='text-sm badge badge-warning'> test is: {test}</p>
        <p className='text-sm badge badge-warning'> isOn is: {isOn}</p>
        <p className='text-sm badge badge-success'>
          state is: {JSON.stringify(state)}
        </p>
        <div className='card-actions justify-end'>
          <button onClick={handlePrimitive} className='btn btn-warning'>
            Primitive
          </button>
          <button onClick={handleNonPrimitive} className='btn btn-success'>
            Non-Primitive
          </button>
        </div>
      </div>
    </div>
  );
}
