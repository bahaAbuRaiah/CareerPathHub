import React from "react";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // استيراد Link من react-router-dom

const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    path: "/", // مسار الصفحة الرئيسية
  },
  {
    id: 2,
    title: "Services",
    path: "/services", // مسار صفحة الخدمات
  },
  {
    id: 3,
    title: "About Us",
    path: "/about-us", // مسار صفحة "من نحن"
  },
  {
    id: 5,
    title: "Contact Us",
    path: "/contact-us", // مسار صفحة الاتصال
  },
];

const Navbar = () => {
  return (
    <nav className="relative z-20 py-4 bg-blue-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto flex items-center justify-between px-4"
      >
        {/* Logo section */}
        <div>
          <h1 className="text-2xl font-bold">The Coding Journey</h1>
        </div>

        {/* Menu section */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.path} // استخدام Link بدلاً من href
                  className="hover:text-secondary group relative inline-block px-3 py-2 transition-colors"
                >
                  <div className="bg-secondary absolute bottom-0 left-1/2 top-1/2 mt-4 hidden h-2 w-2 -translate-x-1/2 rounded-full group-hover:block"></div>
                  {menu.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/sign-in" // إضافة رابط لتسجيل الدخول
                className="primary-btn px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Hamburger menu section */}
        <div className="lg:hidden">
          <IoMdMenu className="text-4xl" />
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
