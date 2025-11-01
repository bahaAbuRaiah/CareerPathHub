import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-900 text-white p-4 text-center">
        <h1>Career Path Hub</h1>
      </header>
      <main className="flex-1 p-6">{children}</main>
      <footer className="bg-blue-900 text-white p-4 text-center">
        &copy; 2024 Career Path Hub
      </footer>
    </div>
  );
};

export default Layout;
