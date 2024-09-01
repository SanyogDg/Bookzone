import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Define the base links
  let links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" }
  ];

  // Add Profile or Admin Profile links based on login state and role
  if (isLoggedIn) {
    links.push({ title: "Profile", link: "/profile" });
    if (role === 'admin') {
      links.push({ title: "Admin Profile", link: "/profile/all-orders" });
    }
  } else {
    // Add login and signup links for non-logged-in users
    links = [
      ...links,
      { title: "Log In", link: "/login" },
      { title: "Sign Up", link: "/signup" }
    ];
  }

  return (
    <>
      <nav className='bg-zinc-800 px-4 z-50 text-white py-1 flex items-center justify-between w-full fixed top-0 left-0'>
        <Link to="/" className='flex items-center justify-between gap-1 mx-2'>
          <img src='/logo.png' alt='logo' className='h-[50px] w-[50px] rounded-sm' />
          <div className='text-2xl font-semibold'>BookZone</div>
        </Link>
        <div className='block md:flex items-center gap-6'>
          <div className='hidden md:flex gap-6'>
            {links.map((item, i) => (
              <Link key={i} to={item.link} className='hover:text-blue-500 hover:uppercase transition-all duration-300 cursor-pointer'>
                {item.title}
              </Link>
            ))}
          </div>
          <button className='text-white text-3xl block md:hidden' onClick={() => setMobileNav(!mobileNav)}>
            <GiHamburgerMenu />
          </button>
        </div>
      </nav>

      <div className={`bg-black h-[100vh] w-full top-0 left-0 flex flex-col z-40 justify-center items-center lg:hidden md:hidden transition-transform duration-300 ${mobileNav ? 'translate-x-0' : '-translate-x-full'}`}>
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
      </div>
    </>
  );
};

export default Navbar;
