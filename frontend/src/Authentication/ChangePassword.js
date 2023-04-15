import React, { useEffect, useState } from "react";
import Loader from "../Shared/Loader";
import { ServerAPI } from "../API/ServerAPI";
import AuthUser from "../Hooks/AuthUser";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const { userInfo } = AuthUser()
  //loading implement
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  const handleChangePassword = (e) => {
    e.preventDefault()
    const currentPassword = e?.target?.currentPassword?.value
    const newPassword = e?.target?.newPassword?.value
    const confirmPassword = e?.target?.confirmPassword?.value
    const data = { currentPassword, newPassword, confirmPassword }
    if (newPassword === confirmPassword) {
      // Post identity Data in database
      fetch(`${ServerAPI}/user/change-password/${userInfo?._id}`, {
        method: "PATCH",
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('access')}`
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          if (res?.status === "success") {
            Swal.fire({
              title: `${res?.status}`,
              text: `${res?.message}`,
              icon: "success",
              confirmButtonText: "Thank you!",
              confirmButtonColor: "#374151",
              background: "#1f2937",
              color: "#fff",
            });
          } else {
            Swal.fire({
              title: `${res?.status}`,
              text: `${res?.message}`,
              icon: "error",
              confirmButtonText: "Try again!",
              confirmButtonColor: "#374151",
              background: "#1f2937",
              color: "#fff",
            });
          }
        })
    } else {
      Swal.fire({
        title: `Error!`,
        text: `Your new password and confirm password doe's not matched!`,
        icon: "error",
        confirmButtonText: "Try again!",
        confirmButtonColor: "#374151",
        background: "#1f2937",
        color: "#fff",
      });
    }
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>Change Password</h1>
          <form action="" onSubmit={handleChangePassword}>
            <div className="flex flex-col gap-2 border border-dark/50 rounded-md md:w-1/2 mt-20 p-5">
              <p className="text-2xl text-center py-3">Change Password</p>
              <input
                type="password"
                name="currentPassword"
                id="password"
                className="border border-dark/50 rounded-md p-1 outline-none"
                placeholder="type your current password"
              />
              <input
                type="password"
                name="newPassword"
                id="password"
                className="border border-dark/50 rounded-md p-1 outline-none"
                placeholder="type your new password"
              />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="border border-dark/50 rounded-md p-1 outline-none"
                placeholder="type your Confirm password"
              />
              <input
                type="submit"
                value="Confirm"
                className="bg-info py-2 text-white rounded-md cursor-pointer"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
