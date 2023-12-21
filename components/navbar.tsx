import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='navbar navbar-center py-1 rounded-lg shadow bg-base-100'>
      <div className='flex-1'>
        <Link href='/' className='btn btn-ghost text-xl'>
          Sandbox
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1 gap-2'>
          <li>
            <Link href='/questions' className='link link-hover'>
              Questions
            </Link>
          </li>
          <li>
            <Link href='/todos' className='link link-hover'>
              Sever Actions
            </Link>
          </li>
          <li>
            <Link href='/schema' className='link link-hover'>
              Zod Schema
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
