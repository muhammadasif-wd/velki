import React from "react";
import { NavLink } from "react-router-dom";
const AdminSidebar = () => {
  return (
    <div className="py-5 mt-20 backdrop-blur-xl z-index-plus">
      <ul className="flex gap-2 flex-wrap font-bold text-start">
        <NavLink
          to={`user-identity`}
          className={({ isActive }) =>
            isActive
              ? "bg-primary/50 rounded-md drop-shadow-xl text-white font-normal text-black py-3 hover:text-white px-3 hover:bg-primary/30 w-[90%] mx-auto"
              : "font-normal py-3 hover:text-white px-3 hover:bg-primary/30 w-[90%] rounded-md mx-auto"
          }
        >
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="2" fill="currentColor" opacity=".3" />
              <path
                fill="currentColor"
                d="M12 15c-2.7 0-5.8 1.29-6 2.01V18h12v-1c-.2-.71-3.3-2-6-2z"
                opacity=".3"
              />
              <path
                fill="currentColor"
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H6v-.99c.2-.72 3.3-2.01 6-2.01s5.8 1.29 6 2v1z"
              />
            </svg>
            <p className="drop-shadow-2xl w-40 text-start">User Identity</p>
          </div>
        </NavLink>

        <NavLink
          to={`user-id`}
          className={({ isActive }) =>
            isActive
              ? "bg-primary/50 rounded-md drop-shadow-xl text-white font-normal text-black py-3 hover:text-white px-3 hover:bg-primary/30 w-[90%] mx-auto"
              : "font-normal py-3 hover:text-white px-3 hover:bg-primary/30 w-[90%] rounded-md mx-auto"
          }
        >
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M22 3H2c-1.09.04-1.96.91-2 2v14c.04 1.09.91 1.96 2 2h20c1.09-.04 1.96-.91 2-2V5a2.074 2.074 0 0 0-2-2m0 16H2V5h20v14m-8-2v-1.25c0-1.66-3.34-2.5-5-2.5c-1.66 0-5 .84-5 2.5V17h10M9 7a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 9 12a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 9 7m5 0v1h6V7h-6m0 2v1h6V9h-6m0 2v1h4v-1h-4"
              />
            </svg>
            <p className="drop-shadow-2xl w-40 text-start">User ID </p>
          </div>
        </NavLink>
        <NavLink
          to={`user-comments`}
          className={({ isActive }) =>
            isActive
              ? "bg-primary/50 rounded-md drop-shadow-xl text-white font-normal text-black py-3 hover:text-white px-3 hover:bg-primary/30 w-[90%] mx-auto"
              : "font-normal text-white py-3 hover:text-white px-3 hover:bg-primary/30 w-[90%] mx-auto"
          }
        >
          <div className="flex gap-2">
            <svg
              className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7 13.5q.625 0 1.063-.438T8.5 12q0-.625-.438-1.063T7 10.5q-.625 0-1.063.438T5.5 12q0 .625.438 1.063T7 13.5Zm5 0q.625 0 1.063-.438T13.5 12q0-.625-.438-1.063T12 10.5q-.625 0-1.063.438T10.5 12q0 .625.438 1.063T12 13.5Zm5 0q.625 0 1.063-.438T18.5 12q0-.625-.438-1.063T17 10.5q-.625 0-1.063.438T15.5 12q0 .625.438 1.063T17 13.5ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
              />
            </svg>
            <p className="drop-shadow-2xl w-40 text-start">Post Comments </p>
          </div>
        </NavLink>
        <NavLink
          to={`user-result`}
          className={({ isActive }) =>
            isActive
              ? "bg-primary/50 rounded-md drop-shadow-xl text-white font-normal text-black py-3 hover:text-white px-3 hover:bg-primary/30 w-[90%] mx-auto"
              : "font-normal text-white py-3 hover:text-white px-3 hover:bg-primary/30 w-[90%] mx-auto"
          }
        >
          <div className="flex gap-2">
            <svg
              className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 10V4h2v2.35q1.275-1.6 3.113-2.475T12 3q3.75 0 6.375 2.625T21 12h-2q0-2.925-2.038-4.963T12 5q-1.725 0-3.225.8T6.25 8H9v2H3Zm.05 3H5.1q.3 2.325 1.913 3.938t3.862 1.962l1.2 2.1q-3.45 0-6.05-2.287T3.05 13Zm10.3 1.75L11 12.4V7h2v4.6l1.4 1.4l-1.05 1.75ZM17.975 24l-.3-1.5q-.3-.125-.563-.263t-.537-.337l-1.45.45l-1-1.7l1.15-1q-.05-.325-.05-.65t.05-.65l-1.15-1l1-1.7l1.45.45q.275-.2.537-.337t.563-.263l.3-1.5h2l.3 1.5q.3.125.575.288t.525.362l1.45-.5l1 1.75l-1.15 1q.05.325.05.625t-.05.625l1.15 1l-1 1.7l-1.45-.45q-.275.2-.537.338t-.563.262l-.3 1.5h-2Zm1-3q.825 0 1.413-.588T20.975 19q0-.825-.588-1.413T18.976 17q-.825 0-1.413.588T16.976 19q0 .825.588 1.413t1.412.587Z"
              />
            </svg>
            <p className="drop-shadow-2xl w-40 text-start">Lottery Result</p>
          </div>
        </NavLink>
      </ul>
    </div>
  );
};

export default AdminSidebar;
