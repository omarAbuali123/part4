"use client";
import Link from 'next/link';

const Nav = () => (
  <nav>
    <Link href="/">Home</Link>
    <Link href="/signup">Sign Up</Link>
    <Link href="/login">Log In</Link>
    <Link href="/profile">Profile</Link>
  </nav>
);

export default Nav;
