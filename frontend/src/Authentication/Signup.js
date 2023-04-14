import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthUser from "../Hooks/AuthUser";
import { useEffect, useState } from "react";
import Loader from "../Shared/Loader";
import { ServerAPI } from "../API/ServerAPI";

const Signup = () => {
  //loading implement
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  const navigate = useNavigate();
  // if have account redirect to my-account
  const { getToken } = AuthUser();
  if (getToken()) {
    return navigate("/");
  }

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const username = e?.target?.username?.value
    const code = e?.target?.code?.value
    const password = e?.target?.password?.value
    const confirmPassword = e?.target?.confirmPassword?.value
    // Get all user data for registration

    if (code.length < 5) {
      const data = {
        username,
        password,
        confirmPassword,
        code
      }
      console.log(data);
      // call api for post database user data
      fetch(`${ServerAPI}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            Swal.fire({
              title: "Success!",
              text: "Welcome to Genzam bank!",
              icon: "success",
              confirmButtonText: "Thank you!",
              confirmButtonColor: "#374151",
              background: "#1f2937",
              color: "#fff",
            });
            navigate("/login");
          } else {
            if (data.error.includes("duplicate key error")) {
              return Swal.fire({
                title: "Error!",
                text: "You have already create an account!",
                icon: "error",
                confirmButtonText: "Try again",
                confirmButtonColor: "#374151",
                background: "#1f2937",
                color: "#fff",
              });
            }
            Swal.fire({
              title: "Error!",
              text: `${data?.error?.split(":")?.slice(2)?.join(":")}`,
              icon: "error",
              confirmButtonText: "Try again",
              confirmButtonColor: "#374151",
              background: "#1f2937",
              color: "#fff",
            });
          }
        })
        .catch((err) => {
          if (err.message) {
            Swal.fire({
              title: "Info!",
              text: `${data.error.split(":").slice(2).join(":")}`,
              icon: "info",
              confirmButtonText: "Try again",
              confirmButtonColor: "#374151",
              background: "#1f2937",
              color: "#fff",
            });
          }
        })
    } else {
      Swal.fire({
        title: "Error!",
        text: `only 4 digit code excepted!`,
        icon: "error",
        confirmButtonText: "Try again",
        confirmButtonColor: "#374151",
        background: "#1f2937",
        color: "#fff",
      });
    }
    // document.getElementById("resetFormData").reset();
  };

  return (
    <div className="w-11/12 mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="md:text-xl font-semibold text-info">Signup</h1>
          <p className="bg-info h-1 md:w-16 w-12"></p>
        </div>
        <div className="flex gap-1 text-dark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 9.3V5c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v1.6l-3.33-3c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L19 9.3zm-9 .7c0-1.1.9-2 2-2s2 .9 2 2h-4z"
            />
          </svg>
          / <p className="text-primary font-semibold">Signup</p>
        </div>
      </div>


      {loading ? (
        <Loader />
      ) : <form
        onSubmit={handleCreateAccount}
        className="md:w-1/2 shadow-xl text-md rounded mt-[20vh] mx-auto my-auto border-secondary border-2 p-5"
      >
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-md font-medium text-dark"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            className="bg-secondary/50 placeholder-dark p-2 w-full rounded outline-none"
            placeholder="username"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="code"
            className="block mb-2 text-md font-medium text-dark"
          >
            Code
          </label>
          <input
            type="text"
            name="code"
            className="bg-secondary/50 placeholder-dark p-2 w-full rounded outline-none"
            placeholder="code"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-md font-medium text-dark"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="bg-secondary/50 placeholder-dark p-2 w-full rounded outline-none"
            placeholder="•••••••••"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-md font-medium text-dark"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="bg-secondary/50 placeholder-dark p-2 w-full rounded outline-none"
            placeholder="•••••••••"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="text-dark bg-secondary/50 px-5 py-2 rounded"
          >
            Submit
          </button>
          <p>You have already an account? <Link className="text-info" to={"/Login"}>Login</Link></p>
        </div>
      </form>}

    </div>
  );
};

export default Signup;
