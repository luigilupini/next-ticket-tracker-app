import TodoList from '@/components/todos/todolist';
import prisma from '@/prisma/client';

export default async function TodoPage() {
  const todos = await prisma.todos.findMany();
  return (
    <main>
      <TodoList initialTodos={todos} />
    </main>
  );
}
