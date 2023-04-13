import React, { useEffect, useState } from "react";
import Loader from "../Shared/Loader";
import TopBar from "../Shared/TopBar";

const SingleResult = () => {
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
          <TopBar name={"Lottery Result"} child={"View"} />
          <h1>view</h1>

          <div className="bg-secondary/50 p-5 rounded-md mt-10">
            <p className="bg-secondary p-2 border border-dark rounded-md mt-3">
              ID: 343
            </p>
            <p className="bg-secondary p-2 border border-dark rounded-md mt-3">
              Lottery Name: ভেল্কি লটারী নাম্বার ১ - ড্র ফেব্রুয়ারী ২৮
            </p>
            <p className="bg-secondary p-2 border border-dark rounded-md mt-3">
              Prize Type: 4th Prize{" "}
            </p>
            <p className="bg-secondary p-2 border border-dark rounded-md mt-3">
              Winner: 4490
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleResult;
