'use client';

import { useState } from 'react';

export default function Question12() {
  const [count, setCount] = useState(0);

  // ! State update aren't synchronous (immediate)
  // This is a trick question. The answer is 0. This is because the state
  // updates are batched. They are scheduled to be updated, but not updated
  // immediately. When the state updates are scheduled, the count is 0.
  const handleClick = () => {
    setCount(count + 1); // 0 + 1 = 1
    setCount(count + 1); // 0 + 1 = 1
    setCount(count + 1); // 0 + 1 = 1

    // A solution would be to use the callback updater version of useState!
    // The callback provides the previous, being the current state value.
    // setCount((prev) => prev + 1); // 0 + 1 = 1
    // setCount((prev) => prev + 1); // 1 + 1 = 2
    // setCount((prev) => prev + 1); // 2 + 1 = 3
    // etc ...
  };

  return (
    <div className='card w-96 bg-base-100 shadow-xl card-compact'>
      <div className='card-body'>
        <h2 className='card-title'>Counter Card</h2>
        <p className='text-sm badge badge-primary'> Count is: {count}</p>
        <div className='card-actions justify-end'>
          <button onClick={handleClick} className='btn btn-primary'>
            Click Me!
          </button>
        </div>
      </div>
    </div>
  );
}
