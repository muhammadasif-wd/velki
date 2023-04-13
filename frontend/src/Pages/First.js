import React from "react";
import { Link } from "react-router-dom";

const First = () => {
  return (
    <section className="background_image">
      <div className="bg-primary/50 backdrop-blur-sm py-10 shadow text-white">
        <Link
          className="text-2xl font-bold text-white text-center flex justify-center drop-shadow-2xl"
          to={"/login"}
        >
          ভেল্কি ক্লাবে যোগ দিতে ক্লিক করুন
        </Link>
        <a
          className="text-white text-center mt-5 flex justify-center drop-shadow-2xl"
          href={
            "https://www.youtube.com/watch?v=2yjOp9ULgLY&ab_channel=SamZone"
          }
        >
          ভিডিও দেখতে এই লিঙ্ক এ ক্লিক করুন
        </a>
      </div>
    </section>
  );
};

export default First;
