import { useFormStatus } from 'react-dom';

// Because we are Optimistic, we don't need to apply any loading logic here!

export default function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      className='btn btn-sm justify-center bg-base-content/5 w-20'
      disabled={pending}
    >
      {pending ? (
        <span className='loading loading-spinner text-primary'></span>
      ) : (
        'Submit'
      )}
    </button>
  );
}
