import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="sticky bottom-0 z-10 m-auto">
      <footer className="bg-slate-900 text-white text-center items-center p-4">
        <p>
          &copy;{currentYear} <span>&lt;</span>
          <span className="text-sky-400">CredVault</span>
          <span className="text-slate-400">MG</span>
          <span>/&gt;</span>. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
