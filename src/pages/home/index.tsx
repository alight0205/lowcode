import React from "react";
import { HomeBody } from "./component/Body";
import "./index.less";
const Home = () => {


	return (
		<div className="home-container">
				{/* 首部 */}
				<div className="home-head">
					路过的导航栏
				</div>
				{/* body */}
				<HomeBody />
				{/* footer */}
				<div className="home-footer">

				</div>
		</div>
	);
};

export default Home;
