import Image from "next/image"
import logo from "../../public/Logo-holidaze.jpg"
import Link from "next/link"

export default function Header() {
    return (
        <>
        <div className="navbar bg-base-100">
        <Link href="/" className="flex-1">
    <Image src={logo} height={50} alt="logo holidaize"></Image>
    <p className="btn btn-ghost text-black text-xl">Holidaze</p>
  </Link>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Bokings</a></li>
        <li><Link href="loggin">Logout</Link></li>
      </ul>
    </div>
  </div>
</div>
        </>
    )
}