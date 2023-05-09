import React, { useState, useEffect, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import UserContext from "@/context/userContext";

export default function Home() {
  // const { token } = useContext(UserContext);
  const [data, setData] = useState([]);
  const { fetchData, data: fullData, error, loading } = useFetch({
    url: "/user/freelancer/all",
    method: "GET",
    body: null,
    token: null,
  });


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(fullData);
    if (fullData !== undefined && fullData !== null && fullData.length > 0) {
      setData(fullData)
    }
  }, [fullData]);

  console.log(data);




  // useEffect(() => {
  //   console.log(data);
  //   if (data && data.success) {
  //     setDataFull(data.data);
  //   }
  // }, [data]);

  // console.log(data);

  return (
    <>
      <h1>Freelancers</h1>
      {fullData && fullData.success && fullData.data && fullData.data.map((freelancer) => (
        <div key={freelancer._id}>
          <h2>{freelancer.firstName}</h2>
          <p>{freelancer.lastName}</p>
          <p>{freelancer.email}</p>
        </div>
      ))}
      {!loading && (!fullData || fullData.length === 0) && <p>No freelances found</p>}
      {loading && <p>Loading...</p>}
    </>
  );
}
