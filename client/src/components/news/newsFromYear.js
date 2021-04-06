import "date-fns";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import RenderReportByDepartment from "../news/renderReportByDepartment";

export default function ListNewsFromDepartment() {

  const componentRef = useRef();

  return (
    <div>
      <RenderReportByDepartment ref={componentRef} />
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
