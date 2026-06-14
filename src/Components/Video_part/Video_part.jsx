import React from "react";
import gif from "../Assets/real_2.jpeg";

export default function Video_part() {
  return (
    <div className="main_video_part py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <img className="w-100 rounded" src={gif} alt="Global Real Estate Marketplace preview" />
          </div>
        </div>
      </div>
    </div>
  );
}
