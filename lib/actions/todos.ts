"use server";

import prisma from "@/prisma/client";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { delay } from "../../libs/utils";

// SERVER VALIDATION
// Once client validation is complete, perform server validation here!
export const addTodo = async (formData: FormData) => {
  // To test error handling update this line to formData.get('contentError')
  const content = formData.get("content");
  // const content = formData.get('contentError');
  const title = formData.get("title");

  await delay(1000);

  try {
    await prisma.todos.create({
      data: {
        title: title as string,
        content: content as string,
      },
    });
  } catch (err) {
    return {
      error: err,
      message: err,
    };
  }

  revalidatePath("/todos"); // We revalidate the cache for this page
};

const todoSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type Todo = z.infer<typeof todoSchema>;

// SERVER VALIDATION WITH ZOD
export const createTodo = async (formData: FormData) => {
  const validate = todoSchema.safeParse({
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  });

  await delay(1000);

  console.log(validate);

  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Resource.",
    };
  }

  const { title, content } = validate.data;

  try {
    await prisma.todos.create({
      data: {
        title: title as string,
        content: content as string,
      },
    });
  } catch (err) {
    return {
      error: err,
      message: err,
    };
  }
  revalidatePath("/schema"); // We revalidate the cache for this page
};

const readTodosSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  completed: z.boolean(),
});

export type ReadTodos = z.infer<typeof readTodosSchema>;

// SERVER VALIDATION WITH ZOD
export const readTodos = async () => {
  const response = await prisma.todos.findMany();
  // Here we validate a section of the incoming data
  const validate = readTodosSchema.safeParse(response[0]);
  if (!validate.success) {
    const { message } = validate.error;
    console.error(message);
    return {
      error: message,
      message: message,
    };
  } else {
    return response;
  }
};
