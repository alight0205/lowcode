import React from "react";
import ComponentEdit from "./component/Editor";
import ComponentList from "./component/Menu";
import Workbanch from "./component/Workbanch";
import "./index.less";
const Home = () => {
    return (
        <div className="home-container">
            <ComponentList />
            <Workbanch />
            <ComponentEdit />
        </div>
    );
};

export default Home;
