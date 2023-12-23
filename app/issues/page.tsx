import { readIssues } from "@/libs/actions/issues";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default async function IssuesPage() {
  const issues = await readIssues();
  console.log(issues);
  return (
    <main>
      <p>Issues Page</p>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </main>
  );
}
