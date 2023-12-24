"use client";

import { ReadTodos, createTodo } from "@/lib/actions/todos";
import { useFormStatus } from "react-dom";

// * SCHEMA VALIDATION FOR FORM SUBMISSION
// Here we are using Zod to validate the form submission. We also infer
// the type of the incoming data from prisma, and we using Zod to validate
// the form when submitted to the server action.

export default function Example2({ todos }: { todos: ReadTodos[] }) {
  return (
    <main className="flex flex-col items-center w-full min-w-[660px] p-24">
      <article className="card w-full bg-base-100 shadow-xl card-compact">
        <div className="card-body">
          <form
            action={createTodo}
            className="flex flex-col w-full my-2 gap-1 border rounded-md border-base-200 p-8 bg-base-content/5"
          >
            <h2 className="mb-2 font-bold text-right rounded-full w-fit bg-primary text-primary-content px-2 ml-auto absolute top-4 -right-4 shadow">
              Form and Server Action Validation
            </h2>
            <Input
              type="text"
              name="title"
              placeholder="Please provide a title"
            />
            <Input
              type="text"
              name="content"
              placeholder="Enter your content here"
            />
            <div className="card-actions justify-end mt-2 -mb-4">
              <Submit />
            </div>
          </form>

          <ul className="list-disc flex flex-col gap-1">
            {todos.map((todo: any) => (
              <li
                key={todo.id}
                className="relative list-none rounded-md p-3 bg-primary/10 shadow text-xs"
              >
                <span className="absolute top-2 -right-1 text-sm badge badge-primary badge-sm shadow font-bold">
                  {todo.id}
                </span>
                <strong className="mr-1">{todo.title}</strong>
                <span className="font-light truncate">{todo.content}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </main>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-sm justify-center bg-base-content/5 w-20"
      disabled={pending}
    >
      {pending ? (
        <span className="loading loading-spinner text-primary"></span>
      ) : (
        "Submit"
      )}
    </button>
  );
}

function Input({
  type,
  name,
  placeholder,
}: {
  type: "text" | "password" | "email";
  name: string;
  placeholder: string;
}) {
  return (
    <input
      type={type}
      name={name}
      className="input input-primary input-xs p-3 input-bordered text-xs mb-1"
      placeholder={placeholder}
      required
    />
  );
}
