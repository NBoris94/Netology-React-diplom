import React from 'react';
import bannerImgSrc from "../../assets/img/banner.jpg";

function Banner() {
  return (
    <div className="banner">
      <img src={bannerImgSrc} className="img-fluid" alt="К весне готовы!" />
      <h2 className="banner-header">К весне готовы!</h2>
    </div>
  );
}

export default Banner;