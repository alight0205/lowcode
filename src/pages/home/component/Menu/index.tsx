
import React,{ DragEvent, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveItem } from '../../../../store/slices/componentMenu'
import { setDropStatus } from '../../../../store/slices/workbenchList'
import { ComponentMenuState, WorkbenchListState, CompItem_Menu } from '../../../../utils/interface'
import { componentMap } from '../../../../utils/componentMap'
import { message } from 'antd'

const Menu =React.forwardRef((props:any,ref?:React.Ref<HTMLDivElement>) => {
  // 获取元素列表
  const componentMenu: any = useSelector<ComponentMenuState>(state => state.componentMenu.data)
  return (
    <div className="component-list-container">
      {componentMenu.map((item: CompItem_Menu, index: number) => (
        <div
          key={index}
          className='component-list-item'
          onDragStart={e=>props.menuDraggier.block.dragstart(e,item)}
          onDragEnd={props.menuDraggier.block.dragend}
          draggable
        >
          <div className="name">{item.name}</div>
          <div className="preview">{componentMap[item.type](item.args)}</div>
        </div>
      ))}
    </div >
  );
}
);

export default Menu;
