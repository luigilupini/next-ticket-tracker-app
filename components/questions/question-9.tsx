'use client';

import { ChangeEvent, useState } from 'react';

export default function Question9() {
  // ! Single Object State (Bad Practice)
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [age, setAge] = useState(0);
  // const [city, setCity] = useState('');
  // const [country, setCountry] = useState('');
  // const [zipCode, setZipCode] = useState(0);
  // const [email, setEmail] = useState('');

  // * Object State (Good Practice)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    city: '',
    country: '',
    zipCode: 0,
    email: '',
  });

  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <div className='card w-96 bg-base-100 shadow-xl card-compact'>
        <div className='card-body'>
          <h2 className='card-title'>Form Details</h2>
          <p className='text-sm badge badge-primary'>{JSON.stringify(form)}</p>
          <div className='form-control'>
            <FormInput name='firstName' type='text' onChange={handleForm} />
            <FormInput name='lastName' type='text' onChange={handleForm} />
            <FormInput name='age' type='number' onChange={handleForm} />
            <FormInput name='city' type='text' onChange={handleForm} />
            <FormInput name='country' type='text' onChange={handleForm} />
            <FormInput name='zipCode' type='number' onChange={handleForm} />
            <FormInput name='email' type='email' onChange={handleForm} />
          </div>
          <div className='card-actions justify-end mt-4'>
            <button className='btn btn-primary'>Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
}

const FormInput = ({
  name,
  type,
  onChange,
}: {
  name: string;
  type: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <>
      <label htmlFor={name} className='label label-text'>
        <span className='label-text'>{name}</span>
      </label>
      <input
        // Remember to add the name attribute to all inputs in your form.
        // This ensures they correspond to keys in your form state object.
        name={name}
        id={name}
        type={type}
        className='input input-bordered input-sm'
        onChange={onChange}
      />
    </>
  );
};
