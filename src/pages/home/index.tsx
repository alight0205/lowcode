import React, { useRef } from "react";
import ComponentEdit from "./component/Editor";
import ComponentList from "./component/Menu";
import Workbanch from "./component/Workbanch";
import "./index.less";
const Home = () => {

	const workbanchContainer = useRef( null as null | {} as HTMLDivElement);
	

	return (
		<div className="home-container">
				{/* 首部 */}
				<div className="home-head">
					路过的导航栏
				</div>
				{/* body */}
				<div className="home-body">
					<ComponentList ref={workbanchContainer}/>
					<Workbanch ref={workbanchContainer}/>
					<ComponentEdit />
				</div>
				{/* footer */}
				<div className="home-footer">

				</div>
		</div>
	);
};

export default Home;
