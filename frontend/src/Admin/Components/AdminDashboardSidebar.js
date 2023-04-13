import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AuthUser from "../../Hooks/AuthUser";
const AdminDashboardSidebar = () => {
    // menubar state manage
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
    const { logout } = AuthUser()

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
                    <AdminSidebar />
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
                    <div className="flex justify-end">
                        <button onClick={logout} className="bg-primary/70 text-white px-4 py-2 rounded-md">
                            Logout
                        </button>
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

export default AdminDashboardSidebar;
