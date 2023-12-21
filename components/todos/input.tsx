export default function Input({
  type,
  name,
  placeholder,
}: {
  type: 'text' | 'password' | 'email';
  name: string;
  placeholder: string;
}) {
  return (
    <input
      type={type}
      name={name}
      className='input input-primary input-xs p-3 input-bordered text-xs mb-1'
      placeholder={placeholder}
      required
    />
  );
}
