
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addElement, setActiveItem } from '../../../../store/slices/workbanchList'
import { ComponentMenuState, WorkbanchListState, CompItem_Menu } from '../../../../utils/interface'
import { componentMap } from '../../../../utils/componentMap'

const Menu = () => {
  const dispatch = useDispatch()
  const menuContainer = useRef<HTMLDivElement | null>(null)
  const componentMenu: any = useSelector<ComponentMenuState>(state => state.componentMenu.data)
  const workbanchCompLength: any = useSelector<WorkbanchListState>(state => state.workbanchList.data.length)
  //- 记录鼠标按下后的位置信息
  const dragInfo = useRef({
    compLeft: 0,    //- 拖拽开始，组件的left
    compTop: 0,    //- 拖拽开始，组件的top
    mouseX: 0,      //- 拖拽开始，鼠标的left
    mouseY: 0       //- 拖拽开始，鼠标的top
  })

  //- 记录放置组件的位置信息
  const activeCompInfo = useRef({
    left: 0,
    top: 0
  })

  //- 用来充当移动的item元素
  let moveDom: any;

  const mousedown = (e: React.MouseEvent<HTMLDivElement>, item: CompItem_Menu) => {
    console.log('mousedown', item)

    //- 创建一个dom元素模拟拖拽效果
    moveDom = (e.target as HTMLElement).cloneNode(true);
    moveDom.classList.add('moveDom')
    moveDom.style.position = 'absolute';
    moveDom.style.top = e.currentTarget.offsetTop - 10 + 'px'
    moveDom.style.left = e.currentTarget.offsetLeft + 'px'
    menuContainer.current?.appendChild(moveDom)

    //- 给document添加鼠标移动事件
    document.onmousemove = (e) => mousemove(e, item)
    document.onmouseup = (e) => mouseup(e, item)

    //- 当鼠标按下时，记录当前的位置数据
    dragInfo.current = {
      compTop: e.currentTarget.getBoundingClientRect().top,
      compLeft: e.currentTarget.offsetLeft,
      mouseX: e.clientX,
      mouseY: e.clientY
    }
  }
  const mousemove = (e: MouseEvent, item: CompItem_Menu) => {
    console.log(menuContainer.current?.clientWidth)
    //- 获取鼠标按下时的位置信息
    const { compLeft, compTop, mouseX, mouseY } = dragInfo.current;
    //- 得到鼠标位置的偏移值
    const disX = e.clientX - mouseX;
    const disY = e.clientY - mouseY;

    moveDom.style.left = compLeft + disX + 'px';
    moveDom.style.top = compTop + disY + 'px';

    activeCompInfo.current = {
      left: compLeft + disX - (menuContainer.current?.clientWidth ? menuContainer.current?.clientWidth : 0),
      top: compTop + disY
    }
  }
  const mouseup = (e: MouseEvent, item: CompItem_Menu) => {
    menuContainer.current?.removeChild(moveDom)
    document.onmousemove = null;
    document.onmouseup = null;
    const containerWidth = menuContainer.current?.getClientRects()[0].width ? menuContainer.current?.getClientRects()[0].width : 300
    if (activeCompInfo.current.left < 0 || e.clientX < containerWidth) return
    let addItem = {
      type: item.type,
      args: {
        value: item.args.value,
        style: {
          ...item.args.style,
          position: 'absolute',
          left: activeCompInfo.current.left + 'px',
          top: activeCompInfo.current.top + 10 + 'px'
        }
      }
    }
    dispatch(addElement(addItem))
    dispatch(setActiveItem({ index: workbanchCompLength, element: addItem }))
  }

  return (
    <div ref={menuContainer} className="component-list-container">
      {
        componentMenu.map((item: CompItem_Menu, index: number) => (
          <div className='component-list-item' key={index} onMouseDown={(e) => mousedown(e, item)}>
            <div className="name">{item.name}</div>
            <div className="preview">{componentMap[item.type](item.args)}</div>
          </div>
        ))
      }
    </div >
  );
};

export default Menu;
