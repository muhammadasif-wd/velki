import React, { useEffect, useState } from "react";
import Loader from "../Shared/Loader";
import TopBar from "../Shared/TopBar";
import { ServerAPI } from "../API/ServerAPI";
import AuthUser from "../Hooks/AuthUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CommentPost = () => {
  const { userInfo } = AuthUser()
  const navigate = useNavigate()
  const [userID, setUserID] = useState([])
  const [postComment, setPostComment] = useState([])
  //loading implement
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

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
  // Fetch lottery information
  useEffect(() => {
    fetch(`${ServerAPI}/post-comment`, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setPostComment(data?.data)
      })
  }, [userInfo])

  const handleCommentPost = async (e) => {
    e.preventDefault()
    const id = e?.target?.id?.value
    const name = e?.target?.name?.value
    const username = userInfo?.username
    const role = userInfo?.role

    const commentData = postComment?.filter((d) => d?.name === name)
    const data = { id, name, username, role, commentData }
    // Post identity Data in database
    await fetch(`${ServerAPI}/add-comment`, {
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
          navigate("/user-comments")
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
  }
  return (
    <div>
      {loading ? <Loader /> :
        <div>
          <TopBar name={"Post Comments"} child={"Add"} />
          <form action="" className="flex flex-col gap-3 my-10" onSubmit={handleCommentPost}>
            <select required className="w-full p-2 rounded" name="id" id="">
              <option value="">Select ID</option>
              {userID?.map((d, index) => <option key={index} value={d?.id}>{d?.id}</option>)}
            </select>
            <select required className="w-full p-2 rounded" name="name" id="">
              <option value="">Select Lottery Name</option>
              {postComment?.map((d, index) => <option key={index} value={d?.name}>{d?.name}</option>)}
            </select>
            <input type="submit" value="Submit" className="drop-shadow-xl text-white p-2 rounded cursor-pointer bg-info" />
          </form>
        </div>
      }
    </div>
  );
};

export default CommentPost;
