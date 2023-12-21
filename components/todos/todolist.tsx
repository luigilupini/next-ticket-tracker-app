'use client';

import { type Todos } from '@prisma/client';
import { useOptimistic } from 'react';
import { OptimisticCreateForm } from './form';

export default function TodoList({ initialTodos }: { initialTodos: Todos[] }) {
  // ...
  const [optimistic, addOptimistic] = useOptimistic(
    initialTodos,
    (prev, action: Todos) => {
      // This does use a reducer function pattern!
      // Here we spread the previous prev and add the new action!
      return [...prev, action];
    }
  );

  return (
    <main className='flex flex-col items-center w-full min-w-[660px] p-24'>
      <article className='card w-full bg-base-100 shadow-xl card-compact'>
        <div className='card-body'>
          <h2 className='card-title text-2xl font-bold'>Todos List</h2>
          {/* THESE ARE OLDER APPROACHES IN SUBMITTING FORMS */}
          {/* <OlderCreateForm />  */}
          {/* <ClientCreateForm /> */}
          {/* THESE ARE THE NEW APPROACHES IN SUBMITTING FORMS */}
          {/* <ServerCreateForm /> */}
          <OptimisticCreateForm addOptimistic={addOptimistic} />
          {/* NOTE: USING OPTIMISTIC UPDATE NEEDS PASSED OPTIMISTIC STATE */}
          <AllTodos todos={optimistic} />
        </div>
      </article>
    </main>
  );
}

const AllTodos = ({ todos }: any) => {
  return (
    <ul className='list-disc flex flex-col gap-1'>
      {todos.map((todo: any) => (
        <li
          key={todo.id}
          className='relative list-none rounded-md p-3 bg-primary/10 shadow text-xs'
        >
          <span className='absolute top-2 -right-1 text-sm badge badge-primary badge-sm shadow font-bold'>
            {todo.id}
          </span>
          <strong className='mr-1'>{todo.title}</strong>
          <span className='font-light truncate'>{todo.content}</span>
        </li>
      ))}
    </ul>
  );
};
