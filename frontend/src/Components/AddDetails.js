import React, { useEffect, useState } from "react";
import Loader from "../Shared/Loader";
import TopBar from "../Shared/TopBar";
import { ServerAPI } from "../API/ServerAPI";
import Swal from "sweetalert2";
import AuthUser from "../Hooks/AuthUser";
import { fileUpload } from "../Hooks/fileUpload";

const AddDetails = () => {
  // get user info
  const { userInfo } = AuthUser()
  const [uploadFile, setUploadFile] = useState([]);
  const [identityData, setIdentityData] = useState([])


  // Check user identity
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
        setIdentityData(data?.data)
      })
  }, [userInfo])

  const handleChangeUpload = async (event) => {
    const img = event.target.files[0];
    const formData = new FormData();
    formData.append("img", img);
    fileUpload(formData, setUploadFile);
  };
  //loading implement
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  // Function
  const handleAddUserDetails = (e) => {
    e.preventDefault();
    const name = e?.target?.name?.value;
    const date = e?.target?.date?.value;
    const address = e?.target?.address?.value;
    const number = e?.target?.number?.value;
    const whatsapp = e?.target?.whatsapp?.value;
    const userRole = userInfo?.role
    const username = userInfo?.username
    const img = uploadFile;
    const data = { name, date, address, number, whatsapp, userRole, username, img };
    console.log(data);

    if (img?.length > 0) {
      // Post identity Data in database
      fetch(`${ServerAPI}/identity`, {
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
        title: `Sorry! 😥`,
        text: `A png|jpg|jpeg|pdf|webp file must be selected || Image size must be less than 2mb.`,
        icon: "error",
        confirmButtonText: "Try again!",
        confirmButtonColor: "#374151",
        background: "#1f2937",
        color: "#fff",
      });
    }
  };

  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <TopBar
            name={"User Identity"}
            child={"Add"}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10 20H6q-.425 0-.713-.288T5 19v-7H3.3q-.35 0-.475-.325t.15-.55l8.35-7.525q.275-.275.675-.275t.675.275L16 6.6V5q0-.425.288-.713T17 4h1q.425 0 .713.288T19 5v4.3l2.025 1.825q.275.225.15.55T20.7 12H19v7q0 .425-.288.713T18 20h-4v-5q0-.425-.288-.713T13 14h-2q-.425 0-.713.288T10 15v5Zm0-9.975h4q0-.8-.6-1.313T12 8.2q-.8 0-1.4.513t-.6 1.312Z"
                />
              </svg>
            }
          />
          Add Details
          <div className="mt-5">
            <form
              action=""
              onSubmit={handleAddUserDetails}
              className="md:w-5/6 flex flex-col md:gap-3 gap-5 text-dark"
            >
              <div className="lg:flex justify-between w-full">
                <p className="w-80">
                  Name <span className="text-primary">*</span>
                </p>
                <div className="flex flex-col w-full">
                  <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="outline-none border border-dark/30 p-1 rounded-md"
                  />
                  <small>
                    (পুরো নাম ইংরেজী তে - ভোটার আইডি কার্ড এর সাথে মিল থাকতে
                    হবে)
                  </small>
                </div>
              </div>
              <div className="lg:flex justify-between w-full">
                <p className="w-80">
                  Date of birth <span className="text-primary">*</span>
                </p>
                <div className="flex flex-col w-full">
                  <input
                    required
                    type="date"
                    name="date"
                    id="date"
                    placeholder="Date of birth"
                    className="outline-none border border-dark/30 p-1 rounded-md"
                  />
                  <small>
                    (জন্ম তারিখ - ভোটার আইডি কার্ড এর সাথে মিল থাকতে হবে)
                  </small>
                </div>
              </div>
              <div className="lg:flex justify-between w-full">
                <p className="w-80">Address</p>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address"
                    className="outline-none border border-dark/30 p-1 rounded-md"
                  />
                  <small>
                    (আপনার বর্তমান ঠিকানা - ভোটার আইডি কার্ড এর সাথে মিল না
                    থাকলেও চলবে)
                  </small>
                </div>
              </div>
              <div className="lg:flex justify-between w-full">
                <p className="w-80">
                  Phone <span className="text-primary">*</span>
                </p>
                <div className="flex flex-col w-full">
                  <input
                    required
                    type="number"
                    name="number"
                    id="number"
                    placeholder="Phone number"
                    className="outline-none border border-dark/30 p-1 rounded-md"
                  />
                  <small>(আপনার মোবাইল নাম্বার - কান্ট্রীকোড সহ লিখবেন)</small>
                </div>
              </div>
              <div className="lg:flex justify-between w-full">
                <p className="w-80">
                  Whatsapp <span className="text-primary">*</span>
                </p>
                <div className="flex flex-col w-full">
                  <input
                    required
                    type="number"
                    name="whatsapp"
                    id="whatsapp"
                    placeholder="Whatsapp number"
                    className="outline-none border border-dark/30 p-1 rounded-md"
                  />
                  <small>
                    (আপনার হোয়াটসাপ নাম্বার - কান্ট্রীকোড সহ লিখবেন)
                  </small>
                </div>
              </div>
              <div className="lg:flex justify-between w-full">
                <p className="w-80">
                  Voter ID Card <span className="text-primary">*</span>
                </p>
                <div className="flex flex-col w-full">
                  <input
                    required
                    placeholder="Upload image"
                    className="outline-none border border-dark/30 p-1 rounded-md"
                    accept="image/png,image/jpg,image/jpeg,image/pdf,image/webp"
                    type="file"
                    name="img"
                    id="img"
                    onChange={handleChangeUpload}
                  />
                  <small>
                    (আপনাকে আপনার ভোটার =আইডি কার্ড / জন্মনিবন্ধ / পাসপোর্ট= এর
                    ছবি তুলে এই খানে আপলোড করতে হবে) আপনি এড করার আগে সব তথ্য
                    ভাল মতো দেখে নিন। আপনি আর এডিট বা ডিলিট করতে পারবেন না।
                  </small>
                </div>
              </div>
              {identityData?.length <= 0 ? <input
                type="submit"
                value="Submit"
                className="border border-dark/20 drop-shadow-xl cursor-pointer bg-dark/5 rounded-md py-2"
              /> : <p className="text-primary text-md">আপনি ইতি মধ্যেই আপনার তথ্য দিয়েছেন। অনুগ্রহ করে আপনি আপনার আগের তথ্য মুছে ফেলে আবার চেষ্টা করতে পারেন</p>}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AddDetails;
