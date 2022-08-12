import React, { useRef } from "react";
import ComponentEdit from "./component/Editor";
import ComponentMenu from "./component/Menu";
import Workbench from "./component/Workbench";
import "./index.less";
const Home = () => {
    return (
        <div className="home-container">
            <ComponentMenu />
            <Workbench />
            <ComponentEdit />
        </div>
    );
};

export default Home;
