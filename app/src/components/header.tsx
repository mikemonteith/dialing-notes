import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import clsx from "clsx";

type NavItemProps = {
  children: React.ReactNode
  pathname: string
  href: string
}

const NavItem: React.FC<NavItemProps> = ({ pathname, href, children }) => {
  const isActive = (pathname === href)
  return (
    <li className="nav-item">
      <Link className={clsx("nav-link", isActive && "active")} aria-current={isActive ? "page" : undefined} href={href}>{children}</Link>
    </li>
  )
}

export type HeaderProps = {
}

const Header: React.FC<HeaderProps> = (props) => {
  const router = useRouter()
  return (
    <header>
      <nav className="navbar navbar-expand navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">Dialing Notes</Link>
          <ul className="navbar-nav">
            <NavItem href="/" pathname={router.pathname}>Home</NavItem>
            <NavItem href="/bags" pathname={router.pathname}>Bags</NavItem>
          </ul>
        </div>
      </nav>
    </header>
  )
}


export default Header
