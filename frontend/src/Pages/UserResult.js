import React, { useEffect, useState } from "react";
import Loader from "../Shared/Loader";
import TopBar from "../Shared/TopBar";
import AuthUser from "../Hooks/AuthUser";
import { ServerAPI } from "../API/ServerAPI";
import { useNavigate } from "react-router-dom";

const UserResult = () => {
  const [resultData, setResultData] = useState([])
  const [searchData, setSearchData] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate()
  // get user information
  const { userInfo } = AuthUser()

  // Fetch user identity information
  useEffect(() => {
    fetch(`${ServerAPI}/lottery`, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const match = data?.data?.filter(
          (d) =>
            d?.name.includes(searchData?.lotteryName?.length > 0 ? searchData?.lotteryName : console.log("Type lottery name"))
            ||
            d?.prize.includes(searchData?.lotteryPrize?.length > 0 ? searchData?.lotteryPrize : console.log("Type lottery Prize"))
            ||
            d?.winner.includes(searchData?.winner?.length > 0 ? searchData?.winner : console.log("Type lottery Winner id"))
        );

        setSearchResult(match);
        setResultData(data?.data)
      })
  }, [userInfo, searchData])

  //loading implement
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  const navigateLotteryByID = (id) => {
    navigate(id)
  }
  // function
  const handleResultSearch = (e) => {
    e.preventDefault();
    const lotteryName = e.target.lotteryName.value;
    const lotteryPrize = e.target.lotteryPrize.value;
    const winner = e.target.winner.value;
    const data = { lotteryName, lotteryPrize, winner };
    console.log(data);
    setSearchData(data);
  };
  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <TopBar name={"Lottery Result"} />
          <form action="" className="md:w-1/2" onSubmit={handleResultSearch}>
            <div className="flex gap-5 mt-5 items-center">
              <p className="w-40">Lottery Name</p>
              <select
                name="lotteryName"
                className="outline-none border border-dark/50 rounded-md p-1 w-full"
                id="lotteryName"
              >
                <option value="">Select</option>
                {resultData?.map((d, index) => {
                  return <option key={index + 343} value={d?.name}>{d?.name}</option>
                })}
              </select>
            </div>
            <div className="flex gap-5 items-center mt-5">
              <p className="w-40">Prize Type</p>
              <select
                name="lotteryPrize"
                className="outline-none border border-dark/50 rounded-md p-1 w-full"
                id="lotteryPrize"
              >
                <option value="">Select</option>
                {resultData?.map((d, index) => {
                  return <option key={index + 343} value={d?.prize}>{d?.prize}</option>
                })}
              </select>
            </div>
            <div className="flex items-center gap-5 mt-5">
              <p className="w-40">Winner</p>
              <input
                type="search"
                name="winner"
                id="winner"
                className="outline-none border border-dark/50 rounded-md p-1 w-full"
                placeholder="Lottery winner"
              />
            </div>
            <input
              type="submit"
              value="Search"
              className="outline-none border border-dark/50 rounded-md p-1 w-full cursor-pointer mt-5"
            />
          </form>
          <div>
            <table className="table-auto w-full mt-10">
              <thead>
                <tr className="bg-primary/90 border border-primary p-1 rounded-md text-white">
                  <th className="text-start">ID</th>
                  <th className="text-start">Lottery Name</th>
                  <th className="text-start">Prize Type</th>
                  <th className="text-start">Winner</th>
                  <th className="text-start">Search</th>
                </tr>
              </thead>
              {searchResult.length > 0 ? searchResult?.map((d, index) => {
                return <tbody key={index + 342}>
                  <tr>
                    <td className="text-start border border-primary p-1">{index + 1}</td>
                    <td className="text-start border border-primary p-1">
                      {d?.name}
                    </td>
                    <td className="text-start border border-primary p-1">
                      {d?.prize}
                    </td>
                    <td className="text-start border border-primary p-1">{d?.winner}</td>
                    <td className="text-start border border-primary p-1">
                      <button onClick={() => navigateLotteryByID(d._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              }) : resultData?.map((d, index) => {
                return <tbody key={index + 342}>
                  <tr>
                    <td className="text-start border border-primary p-1">{index + 1}</td>
                    <td className="text-start border border-primary p-1">
                      {d?.name}
                    </td>
                    <td className="text-start border border-primary p-1">
                      {d?.prize}
                    </td>
                    <td className="text-start border border-primary p-1">{d?.winner}</td>
                    <td className="text-start border border-primary p-1">
                      <button onClick={() => navigateLotteryByID(d._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              })}
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserResult;
