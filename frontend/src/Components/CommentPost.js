import React, { useEffect, useState } from "react";
import Loader from "../Shared/Loader";
import TopBar from "../Shared/TopBar";

const CommentPost = () => {
  //loading implement
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });
  return (
    <div>
      {loading ? <Loader /> : <TopBar name={"Post Comments"} child={"Add"} />}
    </div>
  );
};

export default CommentPost;
