'use client';

import { useEffect, useState } from 'react';

export default function Question6() {
  // ! Initializing state with an object
  // const [post, setPost] = useState(); // ! undefined (❌ Will error and not re-render)
  const [post, setPost] = useState<any>(null); // * null (✔️ Does re-render as expected)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response.json())
      .then((json) => setPost(json));
  }, []);

  return (
    <div className='card w-96 bg-base-100 shadow-xl card-compact'>
      <div className='card-body'>
        <h2 className='card-title'>Post Card</h2>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    </div>
  );
}
