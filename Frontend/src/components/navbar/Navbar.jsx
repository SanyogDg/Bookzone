import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" }
  ];

  const [mobileNav, setMobileNav] = useState(false);

  return (
    <>
      <nav className='bg-zinc-800 px-4 z-50 text-white py-1 flex items-center justify-between w-full fixed top-0 left-0 '>
        <Link to="/" className='flex items-center justify-between gap-1 mx-2'>
          <img src='/logo.png' alt='logo' className='h-[50px] w-[50px] rounded-sm' />
          <div className='text-2xl font-semibold'>BookZone</div>
        </Link>
        <div className='block md:flex items-center gap-6'>
          <div className='hidden md:flex gap-6 '>
            {links.map((item, i) => (
              <Link key={i} to={item.link} className='hover:text-blue-500 hover:uppercase transition-all duration-300 cursor-pointer'>
                {item.title}
              </Link>
            ))}
          </div>
          <div className='hidden md:flex gap-6'>
            <Link className='px-2 py-1 rounded border border-blue-300 hover:text-black hover:uppercase hover:bg-white transition-all duration-300' to="/login">Log In</Link>
            <Link className='px-2 py-1 bg-blue-600 rounded border border-blue-300 hover:text-black hover:uppercase hover:bg-white transition-all duration-300' to="/signup">Sign Up</Link>
          </div>
          <button className='text-white text-3xl block md:hidden' onClick={() => setMobileNav(!mobileNav)}>
            <GiHamburgerMenu />
          </button>
        </div>
      </nav>

      <div className={`bg-black h-screen w-full top-0 left-0 flex flex-col z-40 justify-center items-center lg:hidden md:hidden transition-transform duration-300 ${mobileNav ? 'translate-x-0' : '-translate-x-full'}`}>
        {links.map((item, i) => (
          <Link
            key={i}
            to={item.link}
            className='font-semibold hover:text-blue-500 text-white hover:uppercase transition-all duration-300 cursor-pointer text-xl mt-8'
            onClick={() => setMobileNav(false)}
          >
            {item.title}
          </Link>
        ))}
        <div className='flex flex-col text-white text-2xl px-3'>
          <Link
            className='px-2 text-xl font-semibold rounded border border-blue-300 hover:text-black hover:uppercase hover:bg-white transition-all duration-300 mt-8 text-center py-2'
            to='/login'
            onClick={() => setMobileNav(false)}
          >
            Log In
          </Link>
          <Link
            className='px-2 text-xl font-semibold bg-blue-600 rounded border border-blue-300 hover:text-black hover:uppercase hover:bg-white transition-all duration-300 mt-8 text-center py-2'
            to='/signup'
            onClick={() => setMobileNav(false)}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
