'use client';

import { useEffect, useState } from 'react';

type Post = {
  title: string;
  body: string;
};

export default function Question5() {
  // ! TypeScript Mistakes
  // Here we define the type of the state as Post | null so that initially
  // the state is null. However, we are not handling the null case in the
  // JSX. This will cause a TypeScript error. To fix this, we can use the
  // optional chaining operator (?.) to access the properties of the object
  // only if the object exists. This will prevent the error.
  const [post, setPost] = useState<Post | null>(null); // * null (✔️ Does re-render as expected)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response.json())
      .then((json) => setPost(json));
  }, []);

  return (
    <div className='card w-96 bg-base-100 shadow-xl card-compact'>
      <div className='card-body'>
        <h2 className='card-title'>Post Card</h2>
        <h3>{post?.title}</h3>
        <p>{post?.body}</p>
      </div>
    </div>
  );
}
