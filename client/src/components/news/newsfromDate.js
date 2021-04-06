import axios from "axios";
import "date-fns";
import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import RenderReport from "../news/renderReport";

export default function ListNewsFromDate() {
  const [news, setNews] = useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [selectedtoDate, setSelectedtoDate] = React.useState(new Date());
  const [selectedFromDate, setSelectedFromDate] = React.useState(new Date());

  useEffect(async (props) => {
    const res = await axios.post("/api-news/statisticalFromDate", {
      date: selectedDate,
    });
    console.log(res.data.newsFromDate);
    if (res.data.newsFromDate) {
      console.log("sjdjfsk");
      let arr = res.data.newsFromDate.filter((item) => {
        return item.status == "3";
      });
      console.log(arr);
      setNews(arr);
    }
  }, []);

  const onSubmitDate = async (props) => {
    const res = await axios.post("/api-news/statisticalFromDate", {
      date: selectedDate,
    });
    console.log(res.data.newsFromDate);

    if (res.data.newsFromDate) {
      console.log("sjdjfsk");
      let arr = res.data.newsFromDate.filter((item) => {
        return item.status == "3";
      });
      console.log(arr);
      setNews(arr);
    }
  };

  const componentRef = useRef();

  return (
    <div>
      <RenderReport ref={componentRef} />
      <div
        style={{
          textAlign: "center",
          paddingBottom: "8px",
        }}
      >
        <ReactToPrint
          trigger={() => <button className="btn solid">Xuất báo cáo</button>}
          content={() => componentRef.current}
        />
      </div>
    </div>
  );
}
