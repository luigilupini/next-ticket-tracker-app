'use client';

import { useRive } from '@rive-app/react-canvas';
import { useState } from 'react';

export default function Simple() {
  const [toggle, setToggle] = useState(false);
  const { rive, RiveComponent } = useRive({
    src: 'switch.riv',
    stateMachines: ['switch_day', 'switch_night'],
  });

  const handleClick = () => {
    setToggle(!toggle);
    if (toggle) {
      rive && rive.play('switch_night');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      rive && rive.play('switch_day');
      document.documentElement.setAttribute('data-theme', 'winter');
    }
  };

  return (
    <RiveComponent
      className='absolute w-40 h-32 bottom-2 right-4 cursor-pointer drop-shadow-lg'
      onClick={handleClick}
    />
  );
}
