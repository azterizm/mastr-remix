import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <Link to='/' className="flex items-center gap-4 mb-4 justify-center">
      <img src="/horizontal_icon.png" alt="mastr" className="w-48" />
    </Link>
  )
}
