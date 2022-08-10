
import React,{ useImperativeHandle, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addElement, setActiveItem } from '../../../../store/slices/workbanchList'
import { ComponentMenuState, WorkbanchListState, CompItem_Menu } from '../../../../utils/interface'
import { componentMap } from '../../../../utils/componentMap'

const Menu = React.forwardRef((props:any,ref?:React.Ref<HTMLDivElement>) => {
  const componentMenu: any = useSelector<ComponentMenuState>(state => state.componentMenu.data)

  return (
    <div className="component-list-container">
    {
      componentMenu.map((item: CompItem_Menu, index: number) => (
        <div key={index}
              className='component-list-item'  
              draggable
              onDragStart={e=>props.menuDraggier.block.dragstart(e,item)}
              onDragEnd={props.menuDraggier.block.dragend}
        >
          <div className="name">{item.name}</div>
          <div className="preview">{componentMap[item.type](item.args)}</div>
        </div>
      ))
    }
    </div >
  );
}
);

export default Menu;
