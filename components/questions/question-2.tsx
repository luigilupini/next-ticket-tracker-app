'use client';

import { useEffect, useState } from 'react';

export default function Question2() {
  const [countStale, setCountStale] = useState(0);
  const [countClean, setCountClean] = useState(0);

  // ! Stale Closures in React components The setInterval function is a closure.
  // It captures the value of count at the time of its creation. When the count
  // state variable is updated, the setInterval function still has a reference
  // to the old count value. This is a stale closure. It is a common mistake in
  // React components. JavaScript is not recreating the setInterval function.
  useEffect(() => {
    setInterval(() => {
      console.log('Interval function running for (countStale)...');
      setCountStale(countStale + 1);
    }, 1000);
    // 🚨 Do not add count as a dependency as it will cause an infinite loop!
    // 🚨 This will keep appending an interval function to the stack.
  }, []); // 🚨 [countStale] will cause an infinite loop!

  // * Solution we need to ensure the function is destroyed and recreated again.
  // So that in the new creation of the function it get get the new state value.
  // You need to handle the cleanup of the interval before creating a new one.
  // This is done by returning a function from the useEffect hook. This function
  // is called when the component is destroyed.
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Interval function running for (countClean)...');
      setCountClean(countClean + 1);
      // * This is a better way and does not require the dependency array or clean up.
      // setCountClean((prevCount) => prevCount + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countClean]);

  return (
    <div className='card w-96 bg-base-100 shadow-xl card-compact'>
      <div className='card-body'>
        <h2 className='card-title'>Counter Card</h2>
        <p className='badge badge-warning'>Count stale: {countStale}</p>
        <p className='badge badge-success'>Count clean: {countClean}</p>
      </div>
    </div>
  );
}
