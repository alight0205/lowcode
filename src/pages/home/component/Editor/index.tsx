import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { CompItem_Workbanch } from '../../../../utils/interface'

type State = {
  workbanchList: {
    data: CompItem_Workbanch[],
    activeItem: CompItem_Workbanch
  }
}
const ComponentEdit = () => {
  const EditInfo = useSelector<State>(state => state.workbanchList.activeItem);
  console.log(EditInfo)
  return <div className="component-edit-container">
    {JSON.stringify(EditInfo)}
  </div>;
};

export default ComponentEdit;
