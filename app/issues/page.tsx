import { readIssues } from "@/libs/actions/issues";

type Props = {};

export default async function IssuesPage({}: Props) {
  const issues = await readIssues();
  console.log(issues);
  return (
    <main>
      <p>Issues Page</p>
    </main>
  );
}
