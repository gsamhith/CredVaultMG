import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);
  const showPassword = () => {
    passRef.current.type = "text";
    if (ref.current.src.includes("eyeclose.png")) {
      ref.current.src = "icons/eyeopen.png";
      passRef.current.type = "password";
    } else {
      passRef.current.type = "text";
      ref.current.src = "icons/eyeclose.png";
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const savePassword = () => {
    // console.log(form);
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      // console.log([...passwordArray, { ...form, id: uuidv4() }]);
      setForm({ site: "", username: "", password: "" });
      toast.success("Password Saved!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Please fill all the fields!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const deletePassword = (id) => {
    // console.log(form);
    let c = window.confirm("Are you sure you want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast.warning("Password Deleted!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const editPassword = (id) => {
    // console.log(form);
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const copyText = (text) => {
    toast.info("Copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        // transition="Bounce"
      />
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-sky-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-2 pt-2 md:mycontainer min-h-[84.8vh]">
        <h1 className="text-4xl text-bold text-center text-sky-400">
          {/* <span>&lt;</span>
          <span className="text-sky-400">CredVault</span>
          <span className="text-slate-400">MG</span>
          <span>/&gt;</span> */}
          Password Manager
        </h1>
        <p className="text-sky-700 text-xl text-center">
          Manage your credentials with ease
        </p>
        <div className="flex flex-col items-center text-black p-4 gap-8">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter the website URL"
            className="rounded-full border-2 border-sky-400 w-full p-4 py-2 outline-none"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full md:gap-20 gap-8 justify-between">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter the username"
              className="rounded-full border-2 border-sky-400 md:w-1/2 w-full p-4 py-2 outline-none"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative md:w-1/2 w-full">
              <input
                ref={passRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter the password"
                className="rounded-full border-2 border-sky-400 w-full p-4 py-2 outline-none"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[20px] top-0 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="py-3"
                  width={20}
                  src="icons/eyeopen.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex border-2 border-sky-700 justify-center items-center bg-sky-400 rounded-full px-6 py-2 w-fit hover:bg-sky-600 hover:text-slate-100 gap-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-lg">
              <thead className="bg-sky-600 text-white">
                <tr>
                  <th className="py-2">Site URL</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-sky-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-sky-50 text-center w-24">
                        <div className="flex items-center justify-center">
                          <a
                            className="hover:cursor-pointer"
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.site}
                          </a>
                          <img
                            onClick={() => copyText(item.site)}
                            className="w-5 cursor-pointer"
                            src="icons/copy.png"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-sky-50 text-center w-24">
                        <div className="flex items-center justify-center">
                          {item.username}
                          <img
                            onClick={() => copyText(item.username)}
                            className="w-5 cursor-pointer"
                            src="icons/copy.png"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-sky-50 text-center w-24">
                        <div className="flex items-center justify-center">
                          {item.password}
                          <img
                            onClick={() => copyText(item.password)}
                            className="w-5 cursor-pointer"
                            src="icons/copy.png"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-sky-50 text-center w-24">
                        <div className="flex items-center justify-center gap-5">
                          <img
                            onClick={() => editPassword(item.id)}
                            className="w-5 cursor-pointer"
                            src="icons/edit.png"
                            alt="edit"
                          />
                          <img
                            onClick={() => deletePassword(item.id)}
                            className="w-5 cursor-pointer"
                            src="icons/delete.png"
                            alt="delete"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
