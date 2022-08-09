import React from "react";
import { Link, Outlet } from "react-router-dom";
import './BaseLayout.less'
const BaseLayout = () => {
  return (
    <div>
      {/* <main>
        <Link to="/">首页</Link>
      </main> */}
      <div className="home-head">
        路过的导航栏
      </div>
    </div>
  );
};

export default BaseLayout;
