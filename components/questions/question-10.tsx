'use client';

import { ChangeEvent, useState } from 'react';

export default function Question10() {
  // ! Incorrectly Updating Object State
  const [user, setUser] = useState({ name: '', city: '', age: 0 });

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    // setUser((user.name = e.target.value)); // ❌
    setUser((prev) => ({ ...prev, name: e.target.value })); // ✔️
  };

  const handleCity = (e: ChangeEvent<HTMLInputElement>) => {
    // setUser((user.city = e.target.value)); // ❌
    setUser((prev) => ({ ...prev, city: e.target.value })); // ✔️
  };

  const handleAge = (e: ChangeEvent<HTMLInputElement>) => {
    // setUser((user.age = Number(e.target.value))); // ❌
    setUser((prev) => ({ ...prev, age: Number(e.target.value) })); // ✔️
  };

  return (
    <form>
      <div className='card w-96 bg-base-100 shadow-xl card-compact'>
        <div className='card-body'>
          <h2 className='card-title'>User Details</h2>
          <p className='text-sm badge badge-primary'>{JSON.stringify(user)}</p>
          <div className='form-control'>
            <label htmlFor='name' className='label label-text'>
              <span className='label-text'>Name</span>
            </label>
            <input
              id='name'
              type='text'
              placeholder='Name'
              className='input input-bordered input-sm'
              onChange={handleName}
            />

            <label htmlFor='city' className='label label-text'>
              <span className='label-text'>City</span>
            </label>
            <input
              id='city'
              type='text'
              placeholder='City'
              className='input input-bordered input-sm'
              onChange={handleCity}
            />

            <label htmlFor='age' className='label label-text'>
              <span className='label-text'>Age</span>
            </label>
            <input
              id='age'
              type='number'
              placeholder='Age'
              className='input input-bordered input-sm'
              onChange={handleAge}
            />
          </div>
          <div className='card-actions justify-end mt-4'>
            <button className='btn btn-primary'>Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
}
