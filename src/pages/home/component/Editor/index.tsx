import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { CompItem_Workbanch, } from '../../../../utils/interface'
import { SettingOutlined } from '@ant-design/icons';
import {
  Button, InputNumber, Space,} from 'antd';
import { changeElement } from '../../../../store/slices/workbanchList'
import { CompactPicker } from 'react-color';
import './index.less'
type State = {
  workbanchList: {
    data: CompItem_Workbanch[],
    activeItem: CompItem_Workbanch
  },
}
const ComponentEdit: React.FC = () => {
  const [width, setWidth] = useState(0)
  const [color, setColor] = useState('black')
  const [backgroundcolor, setbackgroundColor] = useState('#fff')
  const [flag,setFlag]=useState(true)
  const dispatch = useDispatch()
  const EditInfo: any = useSelector<State>(state => state.workbanchList.activeItem);
  const changValue = (e:any) => {
    setWidth(e.target.value)
    e.target.value=''
  }
  const onSubmit = () => {
    console.log(width)
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
              width: width + 'px',
              backgroundColor: backgroundcolor,
              color:color,
              
            }
          }
        }
      }))
    setbackgroundColor('#fff')
    setColor('black')
  }
  const onChangeColor = (colorObj:any) => {
    setColor(colorObj.hex)
  }
  // 控制颜色选择器的显示和隐藏
  const controlColor = () => {
   setFlag(!flag)
  }
  
  const onChangeCompeleteColor= (colorObj: any) => {
   
    console.log(colorObj)
  }
  const onChangebackgroundColor: any = (colorObj: any) => {
    setbackgroundColor(colorObj.hex)
  }
  const onChangeCompeletebackgroundColor: any = (colorObj: any)=>{
    console.log(colorObj)
  }
 
  if (EditInfo) {
    console.log(EditInfo.args.style.width)
    var aaa: any = parseFloat(EditInfo.args.style.width)
    var defaultColor:any=EditInfo.args.style.color
    console.log(EditInfo.args.style)
    console.log(defaultColor)
  }
  else {
    console.log(EditInfo)
  }
  return <div className="component-edit-container">
    <h2>自定义样式</h2>
    <div className="style">
      <Space direction="vertical"> 
        <span>width:  <InputNumber addonAfter={<SettingOutlined />} placeholder={EditInfo ? aaa.toString() : undefined} onBlur={(e) => changValue(e)} />px
        </span>   
      </Space>
      <span>
        backgroundcolor: 
        <div className="bgc" style={{ backgroundColor: backgroundcolor }} onClick={() => controlColor}>修改背景颜色</div>
        <div className="colorControl" >   <CompactPicker color={backgroundcolor} onChange={onChangebackgroundColor} onChangeComplete={onChangeCompeletebackgroundColor} /> </div>
      </span>
      <span>
        color: 
        <div className="c" style={{
          color:color
        }} onClick={() => controlColor}>修改字体颜色</div>
        <div className="colorControl" >   <CompactPicker color={color} onChange={onChangeColor} onChangeComplete={onChangeCompeleteColor} /> </div>
       </span>
       <Button onClick={() => onSubmit()}>提交</Button>
  </div>
    
  </div>;
};
export default ComponentEdit;
