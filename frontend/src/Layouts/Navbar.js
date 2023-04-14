import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Divider from "../Shared/Divider";
import Sidebar from "./Sidebar";
import AuthUser from "../Hooks/AuthUser";
const Navbar = () => {
  const { userInfo, logout } = AuthUser()
  // menubar state manage
  const [menu, setMenu] = useState(false);
  const windowWidth = useRef(window.innerWidth);
  const [isOpen, setIsOpen] = useState();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (windowWidth.current && windowWidth.current > 667) {
      setIsOpen(true);
    }
  }, [windowWidth]);


  return (
    <div
      className={`fixed inset-0 overflow-auto ${isOpen ? "z-index-plus" : "z-index-minus"
        }`}
    >
      {/* Off-canvas menu */}
      <div
        className={`${isOpen
          ? "translate-x-0 z-index-plus"
          : "-translate-x-full z-index-plus"
          } transform absolute top-0 left-0 w-80 h-full bg-dark transition ease-in-out duration-500`}
      >
        <div className="text-white">
          <Sidebar />
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed transition-opacity"
          aria-hidden="true"
          onClick={toggleMenu}
        >
          <div className="absolute  bg-primary text-white opacity-75"></div>
        </div>
      )}

      {/* Menu button */}
      <section className="bg-info sticky top-0 backdrop-blur-2xl py-3 z-index-plus">
        <div className="flex items-center justify-between w-[95%] mx-auto md:py-0 py-2">
          <button
            className="z-50 px-4 py-2 mt-1 text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isOpen ? "M4 6h16M4 12h16M4 18h16" : "M4 6h16M4 12h16M4 18h16"
                }
              // "M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="relative">
            <button onClick={() => setMenu(!menu)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-white rounded-full p-1 border-2 border-white"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M14 19.5c0-2 1.1-3.8 2.7-4.7c-1.3-.5-2.9-.8-4.7-.8c-4.4 0-8 1.8-8 4v2h10v-.5m5.5-3.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5s3.5-1.6 3.5-3.5s-1.6-3.5-3.5-3.5M16 8c0 2.2-1.8 4-4 4s-4-1.8-4-4s1.8-4 4-4s4 1.8 4 4Z"
                />
              </svg>
            </button>
            {menu && (
              <div className="absolute -right-6 mt-4 z-50 w-80 bg-info/30 backdrop-blur-xl p-4 rounded-md">
                <p className="font-bold uppercase">{userInfo?.username}</p>
                <Divider />
                <div className="flex gap-3 mt-3">
                  <Link to={"change-password"}>
                    <button className="bg-info/40 p-1 rounded">
                      Change password
                    </button>
                  </Link>
                  <div className="flex justify-end">
                    <button onClick={logout} className="bg-primary/70 px-4 py-1 rounded-md">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section
        className={
          isOpen
            ? "md:ml-[320px] opacity-100 duration-500 ease-out"
            : "md:ml-[0px] opacity-100  duration-500 ease-out"
        }
      >
        <div className="w-[95%] mx-auto mt-5 z-index-minus">
          <Outlet></Outlet>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
