import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Shared/Loader";
import TopBar from "../Shared/TopBar";

const UserComments = () => {
  //loading implement
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <TopBar name={"Post Comments"} />
          <Link to={"user-comments-post-add"}>
            <button>
              <p className="border border-dark/10 mt-5 w-[26px] rounded bg-dark text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6h-2Z"
                  />
                </svg>
              </p>
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default UserComments;
