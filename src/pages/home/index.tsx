import React, { useRef } from "react";
import ComponentEdit from "./component/Editor";
import ComponentMenu from "./component/Menu";
import Workbench from "./component/Workbench";
import Utils from './component/Utils'
import "./index.less";
const Home = () => {
    return (
        <div className="home-container">
            <ComponentMenu />
            <div className="center-container">
                {/* 工具栏 */}
                <Utils />
                <Workbench />
            </div>
            <ComponentEdit />
        </div>
    );
};

export default Home;
