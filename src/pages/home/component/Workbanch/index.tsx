import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { CompItem_Workbanch, WorkbanchListState } from '../../../../utils/interface'
import {
  setActiveItem,
  setDropStatus,
  closeAllFocus,
  addSelectItem,
  setElementPos,
  updateSelectItem,
  removeSelectItem,
} from '../../../../store/slices/workbanchList'
import { componentMap } from '../../../../utils/componentMap'
import Utils from '../Utils'
import classnames from 'classnames'

const Workbanch = () => {
  const dispatch = useDispatch()
  // 工作区DOM容器
  const workbanchContainer = useRef<HTMLDivElement | null>(null)
  //- redux中，工作区需要渲染的组件列表
  const workbanchList: any = useSelector<WorkbanchListState>(state => state.workbanchList.data)
  const selectList: any = useSelector<WorkbanchListState>(state => state.workbanchList.selectList)

  //- 记录鼠标按下后的位置信息
  const dragInfo = useRef({
    mouseX: 0,      //- 拖拽开始，鼠标的left
    mouseY: 0       //- 拖拽开始，鼠标的top
  })
  //- 组件鼠标按下
  const mousedown = (e: React.MouseEvent<HTMLDivElement>, item: CompItem_Workbanch) => {
    //- 当鼠标按下时，记录当前的鼠标位置
    dragInfo.current = {
      mouseX: e.clientX,
      mouseY: e.clientY
    }
    /**
     * 处理按住shift等情况
     */
    if (e.shiftKey) {
      if (item.focus) {
        dispatch(removeSelectItem(item))
      } else {
        dispatch(addSelectItem(item))
      }
    } else {
      if (selectList.length <= 1) {
        dispatch(closeAllFocus())
        dispatch(addSelectItem(item))
      }
    }

    document.onmousemove = (e) => mousemove(e, item)
    document.onmouseup = (e) => mouseup(e, item)
  }
  //- 单个组件鼠标按下后移动
  const mousemove = (e: MouseEvent, item: CompItem_Workbanch) => {
    const { mouseX, mouseY } = dragInfo.current;
    const disX = e.clientX - mouseX;
    const disY = e.clientY - mouseY;
    if (selectList.length > 1) {
      selectList.forEach((selectItem: CompItem_Workbanch) => {
        dispatch(setElementPos({
          id: selectItem.id,
          left: parseFloat(selectItem.args.style.left) + disX + 'px',
          top: parseFloat(selectItem.args.style.top) + disY + 'px'
        }))
      })
    } else {
      dispatch(setElementPos({
        id: item.id,
        left: parseFloat(item.args.style.left) + disX + 'px',
        top: parseFloat(item.args.style.top) + disY + 'px'
      }))
    }
  }
  //- 组件鼠标松开
  const mouseup = (e: MouseEvent, item: CompItem_Workbanch) => {
    // 更新activeItem 和 selectList的值
    dispatch(updateSelectItem())
    dispatch(setActiveItem(item))
    console.log(selectList.length)
    // menu容器宽度
    document.onmousemove = null;
    document.onmouseup = null;
  }

  // 容器点击事件
  const containerMouseDown = (e: any) => {
    if (e.target.className === 'workbanch-container') {
      dispatch(closeAllFocus())
      dispatch(setActiveItem(null))
    }
  }

  // 进入工作区
  const wrapDragEnter = () => {
    dispatch(setDropStatus(true))
  }
  // 离开工作区
  const wrapDragLeave = () => {
    dispatch(setDropStatus(false))
  }
  const wrapDragOver = (e: any) => {
    e.preventDefault()
  }
  return (
    <div className='workbanch-container'
      ref={workbanchContainer}
      onDragEnter={wrapDragEnter}
      onDragLeave={wrapDragLeave}
      onDragOver={wrapDragOver}
      onMouseDown={containerMouseDown}
    >
      {/* 工具栏 */}
      <Utils />
      {/* 渲染工作台 */}
      {workbanchList.map((item: CompItem_Workbanch) => (
        <div className={classnames('component-item', { focus: item.focus })}
          style={{
            position: item.args.style.position,
            left: item.args.style.left,
            top: item.args.style.top,
          }}
          key={item.id}
          onMouseDown={(e: any) => mousedown(e, item)}
        >{
            componentMap[item.type]({
              ...item.args,
              style: {
                ...item.args.style,
                position: 'relative',
                left: 0,
                top: 0
              },
            })
          }</div>
      ))}
    </div >
  )
}

export default Workbanch
