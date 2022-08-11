
import { DragEvent, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addElement, setActiveItem, setDropStatus } from '../../../../store/slices/workbanchList'
import { ComponentMenuState, WorkbanchListState, CompItem_Menu } from '../../../../utils/interface'
import { componentMap } from '../../../../utils/componentMap'
import { message } from 'antd'

const Menu = () => {
  const dispatch = useDispatch()
  const menuContainer = useRef<HTMLDivElement | null>(null)
  // 获取元素列表
  const componentMenu: any = useSelector<ComponentMenuState>(state => state.componentMenu.data)
  // 获取是否可放置元素
  const dropStatus: any = useSelector<WorkbanchListState>(state => state.workbanchList.dropStatus)
  //- 记录放置组件的位置信息
  const activeCompInfo = useRef({
    left: 0,
    top: 0
  })
  //- 拖拽移动
  const dragMove = (e: any, item: CompItem_Menu) => {
    // menu容器宽度
    const menuContainerWidth = menuContainer.current?.clientWidth ? menuContainer.current?.clientWidth : 0;
    // 设置放置元素位置
    activeCompInfo.current = {
      left: e.clientX - menuContainerWidth,
      top: e.clientY - 20
    }
  }
  //- 拖拽结束
  const dragEnd = (e: any, item: CompItem_Menu) => {
    console.log(e)
    if (!dropStatus) {
      message.error('放置失败：不在工作区')
      return;
    }
    // 往工作区添加组件
    let addItem = {
      type: item.type,
      focus: false,
      args: {
        value: item.args.value,
        style: {

          ...item.args.style,
          position: 'absolute',
          left: activeCompInfo.current.left + 'px',
          top: activeCompInfo.current.top + 'px'
        }
      }
    }
    dispatch(addElement(addItem))
    dispatch(setDropStatus(false))
    message.success('放置成功')
  }

  return (
    <div ref={menuContainer} className="component-list-container"
    >
      {
        componentMenu.map((item: CompItem_Menu, index: number) => (
          <div
            key={index}
            className='component-list-item'
            onDrag={e => dragMove(e, item)}
            onDragEnd={e => dragEnd(e, item)}
            draggable
          >
            <div className="name">{item.name}</div>
            <div className="preview">{componentMap[item.type](item.args)}</div>
          </div>
        ))
      }
    </div >
  );
};

export default Menu;
