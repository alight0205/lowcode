import React from "react";
import { Link, Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div>
      <main>
        <Link to="/">首页</Link>
      </main>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
