import React from "react";
import { Link, Outlet } from "react-router-dom";
import './BaseLayout.less'
const BaseLayout = () => {
  return (
    <div className="baselayout-container">
      <header>
        这里是导航栏
        <Link to="/">首页</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;
