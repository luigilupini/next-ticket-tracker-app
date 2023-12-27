"use client";

import { addTodo } from "@/lib/action/todos";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Button from "./button";
import Input from "./input";

export function ClientCreateForm() {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        // CLIENT VALIDATION
        // Run browser/client validation here if required before any server validation
        try {
          const response: any = await addTodo(formData);
          alert(response);
        } catch (error) {
          alert(error);
        }
      }}
      className="flex flex-col w-full my-2 gap-1 border rounded-md border-base-200 p-8 bg-base-content/5"
    >
      <h2 className="mb-2 font-bold text-right rounded-full w-fit bg-primary text-primary-content px-2 ml-auto absolute top-4 -right-4 shadow">
        SERVER ACTION WITH CLIENT VALIDATION
      </h2>
      <Input type="text" name="title" placeholder="Please provide a title" />
      <Input type="text" name="content" placeholder="Enter your content here" />

      <div className="card-actions justify-end mt-2 -mb-4">
        <Button />
      </div>
    </form>
  );
}

export function ServerCreateForm() {
  return (
    <form
      action={addTodo}
      className="flex flex-col w-full my-2 gap-1 border rounded-md border-base-200 p-8 bg-base-content/5"
    >
      <h2 className="mb-2 font-bold text-right rounded-full w-fit bg-primary text-primary-content px-2 ml-auto absolute top-4 -right-4 shadow">
        NEWER SERVER ACTION APPROACH ONLY
      </h2>
      <Input type="text" name="title" placeholder="Please provide a title" />
      <Input type="text" name="content" placeholder="Enter your content here" />
      <div className="card-actions justify-end mt-2 -mb-4">
        <Button />
      </div>
    </form>
  );
}

export default function OlderCreateForm() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title: inputTitle, content: inputContent }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setInputTitle("");
      setInputContent("");
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full my-2 gap-1 border rounded-md border-base-200 p-8 bg-base-content/5"
    >
      <h2 className="mb-2 font-bold text-right rounded-full w-fit bg-primary text-primary-content px-2 ml-auto absolute top-4 -right-4 shadow">
        OLDER CLIENT ONLY FORM APPROACH
      </h2>
      <input
        type="text"
        name="title"
        placeholder="Please provide a title"
        className="input input-ghost input-xs p-3 input-bordered text-xs"
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
      />

      <input
        type="text"
        name="content"
        placeholder="Please provide some content"
        className="input input-ghost input-xs p-3 input-bordered text-xs"
        value={inputContent}
        onChange={(e) => setInputContent(e.target.value)}
      />

      <div className="card-actions justify-end mt-2 -mb-4">
        <button type="submit" className="btn btn-sm justify-center bg- w-20">
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

export function OptimisticCreateForm({
  addOptimistic,
}: {
  addOptimistic: (action: any) => void;
}) {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        addOptimistic({
          // Here we are adding the Optimistic version of our todo!
          // We are assuming that the server request will be successful
          // Example this fake id will be replaced by the server :)
          id: Math.random() * 1000, // Well be replaced!
          title: formData.get("title") as string,
          content: formData.get("content") as string,
          completed: false, // Well be replaced!
          createdAt: new Date(), // Well be replaced!
          updatedAt: new Date(), // Well be replaced!
        });
        // CLIENT VALIDATION
        // Run browser/client validation here if required before any server validation
        try {
          const response: any = await addTodo(formData);
          alert(response);
        } catch (error) {
          alert(error);
        }
      }}
      className="flex flex-col w-full my-2 gap-1 border rounded-md border-base-200 p-8 bg-base-content/5"
    >
      <h2 className="mb-2 font-bold text-right rounded-full w-fit bg-primary text-primary-content px-2 ml-auto absolute top-4 -right-4 shadow">
        OPTIMISTIC UPDATE WITH SERVER ACTION
      </h2>
      <Input type="text" name="title" placeholder="Please provide a title" />
      <Input type="text" name="content" placeholder="Enter your content here" />

      <div className="card-actions justify-end mt-2 -mb-4">
        <Button />
      </div>
    </form>
  );
}
