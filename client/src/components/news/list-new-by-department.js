
import "date-fns";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import RenderReport from "./renderReportByDepartment";

export default function ListNewsAuthor() {

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