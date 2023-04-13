import React, { useEffect, useState } from "react";
import Loader from "../Shared/Loader";
import TopBar from "../Shared/TopBar";

const AddUserID = () => {
  //loading implement
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  // function
  const handleAddUserID = (e) => {
    e.preventDefault();
    const identity = e.target.identity.value;
    const id = e.target.id.value;
    const data = { identity, id };
    console.log(data);
  };
  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <TopBar name={"User ID"} child={"Add"} />
          <h1>Add User ID</h1>

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
                <div className="flex flex-col w-full">
                  <input
                    required
                    type="text"
                    name="identity"
                    id="identity"
                    placeholder="User Identity"
                    className="outline-none border border-dark/30 p-1 rounded-md"
                  />
                </div>
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
                      className="text-info"
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
              <input
                type="submit"
                value="Submit"
                className="border border-dark/20 drop-shadow-xl cursor-pointer bg-dark/5 rounded-md py-2 mt-5"
              />
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AddUserID;
