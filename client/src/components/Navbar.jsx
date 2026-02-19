import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X, Search, TicketPlus } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {


  const [isOpen, setIsOpen] = useState(false);
  const {user} = useUser()
  const {openSignIn} = useClerk()
  const navigate = useNavigate()
  const handleNavClick = () => {
  setIsOpen(false);
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-black text-white">
      
      {/* Logo */}
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="Logo" className="w-36 h-auto" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 px-8 py-3 
bg-gray-800/70 backdrop-blur-md rounded-full 
border border-gray-4 00/30">

        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/">Theaters</Link>
        <Link to="/">Releases</Link>
        <Link to="/favorite">Favorites</Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <Search className="hidden md:block w-6 h-6 cursor-pointer" />
        {
          !user ? (<button onClick={openSignIn} className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
          Login
        </button>) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={15}/>} onClick={()=> navigate('/my-bookings')}/>
            </UserButton.MenuItems>
          </UserButton>
        )
        }
        

        {/* Mobile Menu Button */}
        <Menu
          onClick={() => setIsOpen(true)}
          className="md:hidden w-8 h-8 cursor-pointer"
        />
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center gap-8 text-lg font-medium md:hidden">
          <X
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 w-6 h-6 cursor-pointer"
          />

          <Link to="/" onClick={handleNavClick}>Home</Link>
          <Link to="/movies" onClick={handleNavClick}>Movies</Link>
          <Link to="/" onClick={handleNavClick}>Theaters</Link>
          <Link to="/" onClick={handleNavClick}>Releases</Link>
          <Link to="/favorite" onClick={handleNavClick}>Favorites</Link>

        </div>
      )}
    </div>
  );
};

export default Navbar;
