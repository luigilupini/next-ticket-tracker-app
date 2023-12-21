import Link from 'next/link';
import { CheckCircle } from 'react-feather';
import { z } from 'zod';

// * QUERY STRING PARAM VALIDATION FOR SERVER COMPONENT
// Validating data in the URL has many benefits. It can be used to
// read data saved in query string params and validate this `state`
// for this route when a user makes use of the page. You want to be
// able to validate the data and not use use what ever is passed in.
// Remember when reading from the URL we need to coerce data types.
// Example: domain.com?id=5 will be id: string

const searchParamsSchema = z.object({
  id: z.coerce.number().min(1).max(5),
  // id: z.number(), // 👈🏻 toggle to see error as we need to coerce the value!
  color: z.enum(['red', 'green', 'blue']), // 👈🏻 only allowed colors
});

type URL = z.infer<typeof searchParamsSchema>;

export default async function SchemaPage({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) {
  console.log(searchParams);
  // Validate the search params data:
  const validate = searchParamsSchema.safeParse(searchParams);
  console.log(validate);
  // First success object is available until conditionally met!
  // If the shape of the URL is incorrect, produce an error or redirect:
  if (!validate.success) {
    const message = JSON.stringify(validate.error.flatten().fieldErrors);
    return (
      <main className='max-w-xl'>
        <h2 className='card-title mb-2'>Server Query String Validation</h2>
        <ErrorMessage message={message} />
        <Controls />
      </main>
    );
  }
  // After success `data` is returned as a property of the validate object:
  const urlData = JSON.stringify(validate.data);

  return (
    <main>
      <div className='card w-fit bg-base-100 shadow-xl card-compact'>
        <div className='card-body'>
          <CheckCircle className='absolute top-3 right-3 h-5 text-primary' />
          <h2 className='card-title'>Server Query String Validation</h2>
          <p className='text-sm'>
            Demonstrate how to validate data stored in params.
          </p>
          <span className='text-accent font-mono text-[11px] w-full my-2'>
            <strong>Query Params:</strong> {urlData}
          </span>
        </div>
      </div>
      <Controls />
    </main>
  );
}

const Controls = () => (
  <div className='flex gap-2 items-center justify-end mt-6'>
    <Link
      href='/schema/server?id=1&color=blue'
      className='btn btn-xs btn-primary ease-in-out'
    >
      required params!
    </Link>
    <Link href='/schema?id=6&color=purple' className='btn btn-xs btn-outline'>
      prohibited params
    </Link>
    <Link href='/schema' className='btn btn-xs btn-outline'>
      clear your url
    </Link>
    <Link
      href='https://app.eraser.io/workspace/QlYqJmWmgXOuBUjPi0ro'
      className='btn btn-xs btn-outline absolute mt-40'
    >
      zod diagram
    </Link>
    <Link href='/schema' className='btn btn-xs btn-outline absolute mt-20'>
      client component example
    </Link>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div role='alert' className='alert alert-error p-2 my-0 text-xs shadow flex'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='stroke-current shrink-0 h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
    <strong>ERROR</strong>
    <span>{message}</span>
  </div>
);
