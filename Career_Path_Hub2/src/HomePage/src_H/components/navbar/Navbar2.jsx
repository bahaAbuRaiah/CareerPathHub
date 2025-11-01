import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "Services",
    subMenu: [
      {
        id: 21,
        title: "High School Student",
        subMenu: [
          {
            id: 211,
            title: "Start the Questionnaire",
            link: "/src/Exam_file/index.html",
          },
        ],
      },
      {
        id: 22,
        title: "Graduate Student",
        subMenu: [
          {
            id: 221,
            title: "Find a Job",
            link: "JobBoard",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Feedback",
    path: "feedback",
  },
  {
    id: 5,
    title: "Contact Us",
    path: "#",
  },
];

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (menuId) => {
    setActiveMenu((prev) => (prev === menuId ? null : menuId));
    setActiveSubMenu(null);
  };

  const toggleSubMenu = (subMenuId) => {
    setActiveSubMenu((prev) => (prev === subMenuId ? null : subMenuId));
  };

  const logout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="relative z-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-full items-center justify-between bg-gradient-to-r from-blue-800 to-indigo-900 py-5 px-8 text-white shadow-lg"
      >
        {/* Logo Section */}
        <div>
          <h1 className="text-2xl font-bold">Career Path Hub</h1>
        </div>

        {/* Menu Section */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NavbarMenu.map((menu) => (
              <li key={menu.id} className="relative">
                {menu.subMenu ? (
                  <>
                    <button
                      onClick={() => toggleMenu(menu.id)}
                      className="rounded-md bg-teal-600 py-2 px-4 border border-transparent text-center text-sm text-white shadow-md hover:shadow-lg focus:bg-sky-600 focus:shadow-none active:bg-slate-700 hover:bg-sky-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 transform transition duration-300 ease-in-out hover:scale-105"
                    >
                      {menu.title}
                    </button>

                    {/* Dropdown Menu */}
                    {activeMenu === menu.id && (
                      <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-0 top-full mt-2 min-w-[180px] rounded-lg border border-slate-200 bg-white p-1.5"
                      >
                        {menu.subMenu.map((subItem) => (
                          <li key={subItem.id} className="relative">
                            <button
                              onClick={() => toggleSubMenu(subItem.id)}
                              className="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                            >
                              {subItem.title}
                            </button>

                            {/* Sub-Submenu */}
                            {activeSubMenu === subItem.id && subItem.subMenu && (
                              <motion.ul
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.3 }}
                                className="absolute left-full top-0 min-w-[180px] rounded-lg border border-slate-200 bg-white p-1.5 ml-2"
                              >
                                {subItem.subMenu.map((nestedItem) => (
                                  <li key={nestedItem.id}>
                                    <a
                                      href={nestedItem.link}
                                      className="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                                    >
                                      {nestedItem.title}
                                    </a>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </>
                ) : (
                  <a
                    href={menu.path}
                    className="relative text-sm font-medium text-white transition hover:text-blue-300 cursor-pointer"
                  >
                    {menu.title}
                  </a>
                )}
              </li>
            ))}
            <li>
              <button
                className="rounded bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-transform duration-300 hover:bg-blue-700 hover:scale-105"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
