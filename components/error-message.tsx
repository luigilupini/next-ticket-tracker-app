import { Badge } from "@/components/ui/badge";
import { PropsWithChildren } from 'react';

export default function ErrorMessage({children}: PropsWithChildren) {
  return  <Badge variant='destructive' className="absolute top-1 -right-4">{children}</Badge>
}
