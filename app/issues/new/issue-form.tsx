"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {};

export default function IssueForm({}: Props) {
  return (
    <form className="max-w-xl space-y-3">
      <Input placeholder="Title" />
      <Textarea placeholder="Description" />
      <Button>Submit Issue</Button>
    </form>
  );
}
