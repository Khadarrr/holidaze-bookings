import Link from 'next/link';
import Image from 'next/image';
import Logo from "../../public/Logo-holidaze.jpg"

export default function SideNav() {
  return (
    <div className="flex glass flex-col h-full px-3 py-4 md:px-2">
      <Image src={Logo} alt="logo" />
      <Link href="/"> </Link>    
      <div className="flex-grow flex flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Link href="/">
          <div className="flex h-12 items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:p-2 md:px-3">
            Home
          </div>
        </Link>

        <Link href="/venues">
          <div className="flex h-12 items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:p-2 md:px-3">
            Venues
          </div>
        </Link>

        <Link href="/profile">
          <div className="flex h-12 items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:p-2 md:px-3">
            Profile
          </div>
        </Link>

        <Link href="/community">
          <div className="flex h-12 items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-600 md:p-2 md:px-3">
            Community
          </div>
        </Link>

        <div className="flex h-12 items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:p-2 md:px-3">
        <Link href="loggin">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
