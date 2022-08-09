import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { CompItem_Workbanch, } from '../../../../utils/interface'
import { SettingOutlined } from '@ant-design/icons';
import { Button, InputNumber, Space } from 'antd';
import { changeElement } from '../../../../store/slices/workbanchList'
import './index.less'
type State = {
  workbanchList: {
    data: CompItem_Workbanch[],
    activeItem: CompItem_Workbanch
  },
}
const ComponentEdit: React.FC = () => {
  const dispatch = useDispatch()
  const EditInfo: any = useSelector<State>(state => state.workbanchList.activeItem);
  const changValue = (e:any) => {
    console.log(e.target.value)
    setWidth(e.target.value)
    console.log(width)
    e.target.value=''
  }
  const onSubmit = () => {
    console.log(width)
    // setId(componentId)
    // console.log(id)
    dispatch( changeElement(
      {
        id:EditInfo.id,
        element: {
          type: EditInfo.type,
          args:
          {
            value: EditInfo.args.value,
            style:
            {
              ...EditInfo.args.style,
               width:width+'px'
              
            }
          }
        }
      }))
  }
  const [width, setWidth] = useState(0)
  // const [id, setId] = useState(0)
  if (EditInfo) {
    console.log(EditInfo.args.style.width)
    var aaa: any = parseFloat(EditInfo.args.style.width)
    console.log(EditInfo.id)
    // var componentId=EditInfo.id
  }
  else {
    console.log(EditInfo)
  }
  return <div className="component-edit-container">
    {/* {JSON.stringify(EditInfo)} */}
    <h2>自定义样式</h2>
    <div className="style">
   
     
      <Space direction="vertical">
      <span>width:  <InputNumber addonAfter={<SettingOutlined />} placeholder={EditInfo ? aaa.toString() : undefined} onBlur={(e) => changValue(e)} />px
        <Button onClick={() => onSubmit()}>提交</Button>
        </span>  
        <span>width:  <InputNumber addonAfter={<SettingOutlined />} placeholder={EditInfo ? aaa.toString() : undefined} onBlur={(e) => changValue(e)} />px
        <Button onClick={() => onSubmit()}>提交</Button>
        </span>  
        <span>width:  <InputNumber addonAfter={<SettingOutlined />} placeholder={EditInfo ? aaa.toString() : undefined} onBlur={(e) => changValue(e)} />px
        <Button onClick={() => onSubmit()}>提交</Button>
        </span> 
        <span>width:  <InputNumber addonAfter={<SettingOutlined />} placeholder={EditInfo ? aaa.toString() : undefined} onBlur={(e) => changValue(e)} />px
        <Button onClick={() => onSubmit()}>提交</Button>
        </span>
        <span>width:  <InputNumber addonAfter={<SettingOutlined />} placeholder={EditInfo ? aaa.toString() : undefined} onBlur={(e) => changValue(e)} />px
        <Button onClick={() => onSubmit()}>提交</Button>
      </span>  
    </Space>
      
  </div>
    
  </div>;
};
export default ComponentEdit;
