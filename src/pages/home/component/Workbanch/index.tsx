import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompItem_Workbanch } from '../../../../utils/interface'
import { setElement, setActiveItem } from '../../../../store/slices/workbanchList'
import { componentMap } from '../../../../utils/componentMap'

type State = {
  workbanchList: {
    data: CompItem_Workbanch[],
    activeItem: CompItem_Workbanch
  }
}
const Workbanch = () => {
  const dispatch = useDispatch()

  const workbanchContainer = useRef<HTMLDivElement | null>(null)

  //- redux中，工作区需要渲染的组件列表
  const workbanchList: any = useSelector<State>(state => state.workbanchList.data)

  //- 记录鼠标按下后的位置信息
  const dragInfo = useRef({
    // compLeft: 0,    //- 拖拽开始，组件的left
    // compTop: 0,    //- 拖拽开始，组件的top
    mouseX: 0,      //- 拖拽开始，鼠标的left
    mouseY: 0       //- 拖拽开始，鼠标的top
  })

  //- 组件点击事件
  const onclick = (item: CompItem_Workbanch, index: number) => {
    console.log('click', item)
    dispatch(setActiveItem(item))
  }

  //- 组件鼠标按下
  const mousedown = (e: React.MouseEvent<HTMLDivElement>, item: CompItem_Workbanch, index: number) => {
    document.onmousemove = (e) => mousemove(e, item, index)
    document.onmouseup = (e) => mouseup(e, item, index)

    //- 当鼠标按下时，记录当前的各项数据
    dragInfo.current = {
      mouseX: e.clientX,
      mouseY: e.clientY
    }
  }
  //- 组件鼠标按下后移动
  const mousemove = (e: MouseEvent, item: CompItem_Workbanch, index: number) => {
    const { mouseX, mouseY } = dragInfo.current;
    const disX = e.clientX - mouseX;
    const disY = e.clientY - mouseY;
    if (parseInt(item.args.style.left) + disX < 0) return;
    dispatch(
      setElement(
        {
          index: index,
          element: {
            type: item.type,
            args:
            {
              value: item.args.value,
              style:
              {
                ...item.args.style,
                left: parseInt(item.args.style.left) + disX + 'px',
                top: parseInt(item.args.style.top) + disY + 'px'
              }
            }
          }
        }))
  }
  //- 组件鼠标松开
  const mouseup = (e: MouseEvent, item: CompItem_Workbanch, index: number) => {
    document.onmousemove = null;
    document.onmouseup = null;

  }
  // const addBtn = () => {
  // dispatch(addElement({
  //   type: 'text', args: {
  //     value: '文本',
  //     style: {
  //       left: '50px',
  //       top: '50px'
  //     }
  //   }
  // }))
  // dispatch(setElement({ index: 0, element: { type: 'button', args: { value: '按钮2', style: { left: '120px', top: '120px' } } } }))
  // }
  return (
    <div className='workbanch-container' ref={workbanchContainer}>
      <div>{JSON.stringify(workbanchList)}</div>
      {workbanchList.map((item: CompItem_Workbanch, index: number) => (
        componentMap[item.type]({ ...item.args, key: index, onmousedown: (e: any) => mousedown(e, item, index), onclick: () => onclick(item, index) })
      ))}
    </div >
  )
}

export default Workbanch