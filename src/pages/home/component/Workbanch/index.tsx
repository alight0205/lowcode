import React, { Ref, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompItem_Workbanch, WorkbanchListState } from '../../../../utils/interface'
import { setElement, setActiveItem, delElement } from '../../../../store/slices/workbanchList'
import { componentMap } from '../../../../utils/componentMap'
import { WorkbanchItem } from './WorkbanchItem'

const Workbanch = React.forwardRef((props:any,ref?:React.Ref<HTMLDivElement>) => {
  const dispatch = useDispatch()

  //- redux中，工作区需要渲染的组件列表
  const workbanchList: any = useSelector<WorkbanchListState>(state => state.workbanchList.data)

  const delBtn = () => {
    dispatch(delElement({ id: 0 }))
  }
  /******************************************* */
  /*  new code */
  

  /*  code end*/
  return (
    <div className='workbanch-container' 
         ref = {ref}
         onMouseDown = {props.focusHandler.container}
    >
      {/* <button onClick={delBtn}>测试删除</button> */}
      <div>{JSON.stringify(workbanchList)}</div>
      {
        workbanchList.map((item: CompItem_Workbanch) => {
          // console.log(item);
          
          return (
            <WorkbanchItem key={item.id}
                           item={item}
                           onMousedown = { e => {props.focusHandler.block(e,item)}}
            />
          )
        })
      }
    </div >
  )
}
)

export default Workbanch
