import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { CompItem_Workbench, WorkbenchListState, ComponentMenuState } from '../../../../utils/interface'
import {
  setActiveItem,
  setDropStatus,
  delAllSelect,
  addElement,
  updateAllSelect,
} from '../../../../store/slices/workbenchList'
import WorkbenchItem from './WorkbenchItem'
import { v4 as uuid } from 'uuid';
import { componentMap } from '../../../../utils/componentMap'

const Workbench = React.forwardRef((props:any,ref?:React.Ref<HTMLDivElement>) => {
  const dispatch = useDispatch()
  //- redux中，工作区需要渲染的组件列表
  const workbenchList: any = useSelector<WorkbenchListState>(state => state.workbenchList.data)
  
  return (
    <div
      className='workbench-container'
      ref = {ref}
      onMouseDown={props.focusHandler.container}
    >
      {/* 渲染工作台 */}
      {workbenchList.map((item: CompItem_Workbench) => {
        if (item.args.style.position === 'static') {
          return componentMap[item.type]({
            ...item.args,
            style: {
              ...item.args.style,
              position: 'relative',
              left: 0,
              top: 0
            },
          })
        } else {
          return <WorkbenchItem key={item.id} 
                                compInfo={item} 
                                onMousedown = { e => {props.focusHandler.block(e,item)}}
                 />
        }
      })}
    </div >
  )
}
)

export default Workbench
