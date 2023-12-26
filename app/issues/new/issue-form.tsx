"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createIssue } from "@/lib/actions/issues";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
// ...
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import "easymde/dist/easymde.min.css";
import { AlertCircle } from "lucide-react";
import SimpleMDE from "react-simplemde-editor";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Hey the title is too short" })
    .max(100, { message: "Hey the title is too long" }),
  description: z
    .string()
    .min(5, { message: "Hey the description is too short" })
    .max(100, { message: "Hey the description is too long" })
    .trim(),
});

type IssueForm = z.infer<typeof formSchema>;

export default function IssueForm() {
  const [error, setError] = useState<string | null>(null);
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <div className="flex gap-4 flex-col max-w-xl">
      {error && (
        <Alert className="bg-red-600">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-bold text-sm">Oops!</AlertTitle>
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await createIssue(data);
          } catch (err) {
            console.log(err);
            setError("An expected error occurred. Please try again.");
          }
        })}
        className="space-y-3"
      >
        <Input placeholder="Title" {...register("title")} />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit Issue</Button>
      </form>
    </div>
  );
}

/* REACT HOOK FORM EXAMPLE
- We use register function to "register" our inputs with the useForm 🪝 so
- that we can keep track of input values and errors within our form. The
- function holds a input's `name`, `onChange`, `onBlur`, `ref` etc... We
- spread these props onto our Input component {...register('title')}. If we
- can't spread props into a component, use the <Controller /> component from
- react-hook-form instead. This <Controller /> will take care of the input
- registration for you when a component doesn't accept a forms props. Field
- is a render prop that has all the same properties returned from register.

const { register, control, handleSubmit } = useForm<IssueForm>();

return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          await createIssue(data);
        } catch (err) {
          console.log(err);
          setError("An expected error occurred. Please try again.");
        }
      })}
      className="max-w-xl space-y-3"
    >
      <Input placeholder="Title" {...register("title")} />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      // PROBLEM EXAMPLE
      <SimpleMDE
        {...register('description')} // Types of property 'onChange' are incompatible.
      />
      <Tiptap
        {...register('description')} // Types of property 'onChange' are incompatible.
      />
      <Button>Submit Issue</Button>
    </form>
  );
}
*/
