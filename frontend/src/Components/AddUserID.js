import React, { useEffect, useState } from "react";
import Loader from "../Shared/Loader";
import TopBar from "../Shared/TopBar";
import { ServerAPI } from "../API/ServerAPI";
import AuthUser from "../Hooks/AuthUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddUserID = () => {
  const navigate = useNavigate()
  //loading implement
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  const [userIdentity, setUserIdentity] = useState()
  const [userID, setUserID] = useState()
  // get user information
  const { userInfo } = AuthUser()

  // Fetch user identity information
  useEffect(() => {
    fetch(`${ServerAPI}/identity?username=${userInfo?.username}`, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUserIdentity(data?.data)
      })
  }, [userInfo])
  // Fetch user identity information
  useEffect(() => {
    fetch(`${ServerAPI}/user-id?username=${userInfo?.username}`, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUserID(data?.data)
      })
  }, [userInfo])



  // function
  const handleAddUserID = (e) => {
    e.preventDefault();
    const identity = e?.target?.identity?.value;
    const id = e?.target?.id?.value;
    const username = userInfo?.username
    const role = userInfo?.role
    const data = { identity, id, username, role };


    if (!identity) {
      Swal.fire({
        title: `Sorry!`,
        text: `First you create a identity!`,
        icon: "error",
        confirmButtonText: "Try again!",
        confirmButtonColor: "#374151",
        background: "#1f2937",
        color: "#fff",
      })
    }

    // Post identity Data in database
    fetch(`${ServerAPI}/user-id`, {
      method: "POST",
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
          navigate("/user-id")
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
  };

  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <TopBar name={"User ID"} child={"Add"} />
          <div className="mt-10">
            <form
              action=""
              onSubmit={handleAddUserID}
              className="md:w-5/6 flex flex-col md:gap-3 gap-5 text-dark"
            >
              <div className="lg:flex justify-between w-full">
                <p className="w-80">
                  User Identity <span className="text-primary">*</span>
                </p>
                {userIdentity?.length > 0 ? <div className="flex flex-col w-full">
                  {userIdentity?.map((d) => {
                    const { name, date, number, whatsapp } = d
                    return (
                      <div key={d?._id}>
                        <input
                          required
                          readOnly
                          type="text"
                          name="identity"
                          id="identity"
                          value={`${name}, ${date}, ${number}, ${whatsapp}`}
                          className="outline-none border border-dark/30 p-1 rounded-md w-full"
                        />
                      </div>
                    )
                  })
                  }
                </div> : <p className="border text-info border-dark/30 p-2 rounded w-full">আগে আপনাকে আপনার ডিটেইলস দিতে হবে। পরে আপনি আপনার আইডিটি এখানে যুক্ত করতে পারবেন।</p>}
              </div>
              <div className="lg:flex justify-between w-full">
                <p className="w-80">
                  BetSet User ID <span className="text-primary">*</span>
                </p>
                <div className="flex flex-col w-full">
                  <input
                    required
                    type="text"
                    name="id"
                    id="id"
                    placeholder="Bet set user id"
                    className="outline-none border border-dark/30 p-1 rounded-md mb-4"
                  />
                  <small>
                    <a
                      href="https://allagent.info/"
                      target={"_blank"}
                      rel="noreferrer"
                      className="text-info hover:underline"
                    >
                      (ভেল্কি র ইউজার আইডি না করা থাকলে - কিভাবে করতে হবে তা এই
                      লিঙ্ক এ ক্লিক করে জেনে নিন। )
                    </a>
                  </small>
                  <small>
                    (মনে রাখবেন, মাষ্টার এজেন্ট থেকে আইডি খোলার সময় আপনার দেয়া
                    ফোন নাম্বার এবং নাম এর যাতে মিল থাকে এবং লেনদেন এর হিস্টোরী
                    থাকে )
                  </small>
                </div>
              </div>

              {userID?.length >= 2 ? <p className="text-primary text-md">আপনি ইতি মধ্যেই আপনার তথ্য ২ বার দিয়েছেন। ২ টির বেশি এড করা যাবে না।</p> : <input
                type="submit"
                value="Submit"
                className="border border-dark/20 drop-shadow-xl cursor-pointer bg-dark/5 rounded-md py-2"
              />}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AddUserID;
