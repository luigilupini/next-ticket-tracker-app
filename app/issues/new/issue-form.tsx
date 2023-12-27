"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { CreateIssueSchema } from "@/lib/schema/issues";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { AlertCircle } from "lucide-react";

import ErrorMessage from "@/components/error-message";
import { createIssue } from "@/lib/action/issues";
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type IssueFormType = z.infer<typeof CreateIssueSchema>;

export default function IssueForm() {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormType>({
    resolver: zodResolver(CreateIssueSchema),
  });

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
            setError("An expected error occurred in creating your issue!");
          }
        })}
        className="space-y-3"
      >
       <section className="relative">
          <Input placeholder="Title" autoFocus={false} {...register("title")} />
          {errors.title && (
             <ErrorMessage>{errors.title.message}</ErrorMessage>
          )}
       </section>

        <section className="relative">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" className="text-sm" {...field} />
            )}
          />
          {errors.description && (
           <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </section>
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
