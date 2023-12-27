import Example4 from "@/components/schema/example4";
import { ReadTodos, readTodos } from "@/lib/action/todos";

export default async function SchemaPage() {
  // prettier-ignore
  const todos= await readTodos() as ReadTodos[]; // For example2 file only!
  return (
    <main>
      <Example4 />
    </main>
  );
}
