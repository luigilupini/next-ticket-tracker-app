'use client';

import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return windowSize;
};

// ! Not using Custom Hooks 🪝
const ExampleComponent1 = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return <div>Component1 {JSON.stringify(windowSize)} ❌</div>;
};

const ExampleComponent2 = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return <div>Component2 {JSON.stringify(windowSize)} ❌</div>;
};

// Using Custom Hooks 🪝
const ExampleComponent3 = () => {
  const windowSize = useWindowSize();
  return <div>Component3 {JSON.stringify(windowSize)} ✔️</div>;
};

export default function Question4() {
  return (
    <div className='card w-96 bg-base-100 shadow-xl card-compact'>
      <div className='card-body'>
        <h2 className='card-title'>Hooks 🪝</h2>
        <ExampleComponent1 />
        <ExampleComponent2 />
        <ExampleComponent3 />
      </div>
    </div>
  );
}
