import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white sticky top-0">
      <div className="mycontainer flex items-center justify-between px-10 py-5 h-14">
        <div className="logo font-bold text-2xl">
          <span>&lt;</span>
          <span className="text-sky-400">CredVault</span>
          <span className="text-slate-400">MG</span>
          <span>/&gt;</span>
        </div>
        {/* <ul>
            <li className='flex gap-3'>
                <a className='hover:font-bold' href='#'>Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
            </li>
        </ul> */}
        <button className="text-white bg-sky-800 rounded-full px-1 w-30 flex items-center justify-between">
          <img className="invert" src="icons/github.svg" alt="github logo" />
          <span className="font-bold px-2">GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
