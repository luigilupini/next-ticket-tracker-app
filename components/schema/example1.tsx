'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { z } from 'zod';

// * SCHEMA VALIDATION FOR THIRD PARTY API OR ROUTE HANDLER
// We are expecting the following response from the server. Now because we not
// going to know at runtime what is the shape of the data, we need to create a
// schema for it so that we can validate the data we are getting from the server.
// This is a good practice to ensure we get the data we expecting. Example below,
// we think we getting an array with an object that has a title string. This is
// not solved by TypeScript, we need to validate incoming data.

/*
{
  "status": 200,
  "success": true,
  "body": [
    {
      "id": 1,
      "title": "cooking",
      "content": "pizza tonight with family",
      "completed": false,
      // etc ...
    },
    ...
  ]
}
*/

// With Zod with define a schema that is the expectation of the data we are getting.
// Now we can run the data through the schema and Zod will inform us if the shape is
// what we expect. If not, we can handle the error accordingly.

// Additionally we use unknown as the returning data type from the fetch request. We
// now don't need to define a TypeScript type/interface for our state or data because
// we are using Zod to validate the data as its unknown from the 3rd party API.

const todoSchema = z.object({
  id: z.number(),
  // id: z.string(), // 👈🏻 change this to z.string to see the error
  title: z.string(),
  content: z.string(),
  completed: z.boolean(),
});

type Todo = z.infer<typeof todoSchema>;

export default function Example1() {
  const [data, setData] = useState<Todo[] | unknown>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data: unknown) => {
        // Use Zod to validate a section of the incoming data
        const { body } = data as { body: unknown[] };
        const validate = todoSchema.safeParse(body[0]);
        // Use the validated data
        if (!validate.success) {
          const { message } = validate.error;
          console.error(error);
          setError(message);
          setLoading(false);
          return;
        } else {
          setData(body[0]);
          setLoading(false);
        }
      });
  }, [error]);

  return (
    <div className='card w-1/2 bg-base-100 shadow-xl card-compact mx-auto min-w-56'>
      <div className='card-body'>
        <h2 className='card-title text-sm'>Third Party API Validation</h2>
        {loading ? (
          <span className='loading loading-spinner loading-lg'></span>
        ) : (
          <p className='flex items-center gap-4 text-[10px]'>
            <span
              className={clsx(
                'badge  badge-xs badge-success font-bold p-2',
                error && 'badge-error'
              )}
            >
              {error ? 'error' : 'data'}
            </span>
            <span
              className={clsx('font-mono text-accent', error && 'text-error')}
            >
              {error ? error : JSON.stringify(data, null, 2)}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
