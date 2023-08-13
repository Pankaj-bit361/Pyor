"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Graph from "@/components/Graph";
import { RxCross2 } from "react-icons/rx";

import Swal from "sweetalert2";

const Page = () => {
  const [state, setstate] = useState([]);
  const [coin, setcoin] = useState("bitcoin");
  const [data, setdata] = useState([]);
  const [search, setSearch] = useState([]);
  const [isSearchHovered, setIsSearchHovered] = useState(false);

  useEffect(() => {
    let newdata = state.filter((item) => item.name === coin);

    if (newdata.length === 0) {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=365&interval=daily`
        )
        .then((res) => {
          let sum = [];
          let count = 0;
          let val = 0;
          for (let i = 0; i < res.data.market_caps.length; i++) {
            val += res.data.market_caps[i][1];
            count++;
            if (count === 30) {
              count = 0;
              sum.push(val / 30);
              val = 0;
            }
          }
          setstate([...state, { coin: sum, name: coin }]);
          setSearch([...search, coin]);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Graph Added SuccessFully",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Graph alredy Present!",
      });
    }
  }, [coin]);

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/").then((res) => {
      setdata(res.data);
    });
  }, []);

  const handleremove = (val) => {
    let newdata = state.filter((item) => item.name != val);
    setstate(newdata);

    let newsearch = search.filter((item) => item != val);
    setSearch(newsearch);
    setIsSearchHovered(false);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Graph Removed SuccessFully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="text-red-500 font-bold bg-black pt-5">
      <div className="flex justify-center ">
        <div
          className="flex gap-1 border-solid border-2 border-indigo-600 rounded h-10 w-11/12 bg-black md "
          placeholder="search"
          onMouseEnter={() => setIsSearchHovered(true)}
          onMouseLeave={() => setIsSearchHovered(false)}
        >
          {search &&
            search.map((item) => (
              <div
                key={item}
                className="flex text-white border-solid border-2 rounded-md h-8 mt-1 "
              >
                <h1
                  className={`text-white font-xs sm:text-base align-middle p-1 uppercase sm:text-{10px} `}
                >
                  {item}
                </h1>
                <div onClick={() => handleremove(item)}>
                  <RxCross2 />
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        className={`bg-white w-11/12 m-auto rounded overflow-x-auto h-80 border-solid border-2 border-indigo-600 ${
          isSearchHovered ? "" : "hidden"
        }`}
        onMouseEnter={() => setIsSearchHovered(true)}
        onMouseLeave={() => setIsSearchHovered(false)}
      >
        {data &&
          data.map((item) => (
            <div key={item.id} onClick={(e) => setcoin(item.id)}>
              <h1 className="text-blue-500 font-bold uppercase p-5">
                {item.id}
              </h1>
              <hr />
            </div>
          ))}
      </div>

      {state &&
        state.map((item) => (
          <div key={item + Math.random() * 100000}>
            <Graph data={item} />
          </div>
        ))}
    </div>
  );
};

export default Page;
