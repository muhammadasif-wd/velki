import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthUser from "../Hooks/AuthUser";
import { useEffect, useState } from "react";
import Loader from "../Shared/Loader";

const Login = () => {
  //loading implement
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const { http, setToken, getToken } = AuthUser();
  const navigate = useNavigate();

  if (getToken()) {
    // setRole(userInfo.role);
    return navigate("/");
  }

  //   handle login from for user
  const handleLoginForm = async (e) => {
    e.preventDefault();
    const username = e?.target?.username?.value;
    const password = e?.target?.password?.value;

    await http
      .post("/login", { username: username, password: password })
      .then((res) => {
        if (res?.data?.status === "success") {
          Swal.fire({
            title: "Success!",
            text: "Welcome to genzam bank!",
            icon: "success",
            confirmButtonText: "Thank you!",
            confirmButtonColor: "#374151",
            background: "#1f2937",
            color: "#fff",
          });

          setToken(
            res.data.data.token,
            res.data.data.user
          );
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err.message) {
          Swal.fire({
            title: "Error!",
            text: "Your email and password doe's not match!",
            icon: "error",
            confirmButtonText: "Try again",
            confirmButtonColor: "#374151",
            background: "#1f2937",
            color: "#fff",
          });
        }
      });
  };

  return (
    <div className="w-11/12 mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="md:text-xl font-semibold text-info">Login</h1>
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
          / <p className="text-primary font-semibold">Login</p>
        </div>
      </div>


      {loading ? (
        <Loader />
      ) : <form
        onSubmit={handleLoginForm}
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
            id="username"
            className="bg-secondary/50 placeholder-dark p-2 w-full rounded outline-none"
            placeholder="username"
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
            id="password"
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
          <p>Not a member? <Link className="text-info" to={"/signup"}>Signup</Link></p>
        </div>
      </form>}

    </div>
  );
};

export default Login;
