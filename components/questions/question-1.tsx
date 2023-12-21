'use client';

import { useEffect, useState } from 'react';

function Post() {
  const [id, setId] = useState(1);
  return (
    <article>
      <button className='btn mb-2' onClick={() => setId((id) => id + 1)}>
        Show me a different post
      </button>
      <PostBody id={id} />
    </article>
  );
}

type Post = {
  id: number;
  title: string;
  body: string;
};

function PostBody({ id }: { id: number }) {
  const [text, setText] = useState<Post | null>(null);

  // ! Fetching in useEffect (Prevent Race Conditions)
  // We need to handle the number of requests we are making to the API.
  // If the use clicks the button 10 times that is 10 rapid requests to the API.
  // You can control this by using a debounce function.
  // useEffect(() => {
  //   fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => setText(data));
  // }, [id]);

  // * Debounce effect within useEffect (Stop Race Conditions)
  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((data) => setText(data));
    // Cleanup the fetch request from the previous fetch call!
    return () => controller.abort();
  }, [id]);

  console.log(text);

  return (
    <div className='card w-96 bg-base-100 shadow-xl card-compact'>
      <div className='card-body'>
        <h2 className='card-title'>Post Card</h2>
        <span className='badge badge-primary absolute top-2 -right-2 shadow font-bold'>
          {text?.id}
        </span>
        <span>
          <strong className='bg-yellow-500 rounded text-black mr-2 px-1 py-[2px]'>
            Title
          </strong>
          {text?.title}
        </span>
        <span>
          <strong className='bg-yellow-500 rounded text-black mr-2 px-1 py-[2px]'>
            Body
          </strong>
          {text?.body}
        </span>
      </div>
    </div>
  );
}

export default function Question1() {
  return <Post />;
}
