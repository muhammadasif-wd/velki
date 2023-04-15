import React, { useEffect, useState } from "react";
import Loader from "../Shared/Loader";
import TopBar from "../Shared/TopBar";
import { useParams } from "react-router-dom";
import AuthUser from "../Hooks/AuthUser";
import { ServerAPI } from "../API/ServerAPI";

const SingleResult = () => {
  const { userInfo } = AuthUser()
  const { id } = useParams()
  //loading implement
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  const [lotterySingleData, setLotterySingleData] = useState([])


  // Fetch user identity information
  useEffect(() => {
    fetch(`${ServerAPI}/lottery/${id}`, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setLotterySingleData(data?.data);
      })
  }, [userInfo, id])

  console.log(lotterySingleData);
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
              Lottery Name: {lotterySingleData?.name}
            </p>
            <p className="bg-secondary p-2 border border-dark rounded-md mt-3">
              Prize Type: {lotterySingleData?.prize}
            </p>
            <p className="bg-secondary p-2 border border-dark rounded-md mt-3">
              Winner: {lotterySingleData?.winner}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleResult;
