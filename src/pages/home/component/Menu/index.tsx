
import { DragEvent, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveItem } from '../../../../store/slices/componentMenu'
import { setDropStatus } from '../../../../store/slices/workbenchList'
import { ComponentMenuState, WorkbenchListState, CompItem_Menu } from '../../../../utils/interface'
import { componentMap } from '../../../../utils/componentMap'
import { message } from 'antd'

const Menu = () => {
  const dispatch = useDispatch()
  // 获取元素列表
  const componentMenu: any = useSelector<ComponentMenuState>(state => state.componentMenu.data)
  // 获取是否可放置元素
  const dropStatus: any = useSelector<WorkbenchListState>(state => state.workbenchList.dropStatus)

  //- 拖拽组件
  const dragStart = (item: CompItem_Menu) => {
    dispatch(setActiveItem(item))
  }
  const dragEnd = () => {
    if (dropStatus) {
      message.success('放置成功')
      dispatch(setDropStatus(false))
    } else {
      message.error('放置失败：不在工作区')
    }
    dispatch(setActiveItem(null))
  }
  return (
    <div className="component-list-container">
      {componentMenu.map((item: CompItem_Menu, index: number) => (
        <div
          key={index}
          className='component-list-item'
          onDragStart={() => dragStart(item)}
          onDragEnd={dragEnd}
          draggable
        >
          <div className="name">{item.name}</div>
          <div className="preview">{componentMap[item.type](item.args)}</div>
        </div>
      ))}
    </div >
  );
};

export default Menu;
