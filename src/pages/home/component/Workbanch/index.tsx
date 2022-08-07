import React, { Ref, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompItem_Workbanch, WorkbanchListState } from '../../../../utils/interface'
import { setElement, setActiveItem, delElement } from '../../../../store/slices/workbanchList'
import { componentMap } from '../../../../utils/componentMap'
import { WorkbanchItem } from './WorkbanchItem'

const Workbanch = React.forwardRef((props?:any,ref?:React.Ref<HTMLDivElement>) => {
  const dispatch = useDispatch()

  const workbanchContainer = useRef<HTMLDivElement | null>(null)

  //- redux中，工作区需要渲染的组件列表
  const workbanchList: any = useSelector<WorkbanchListState>(state => state.workbanchList.data)

  //- 记录鼠标按下后的位置信息
  const dragInfo = useRef({
    mouseX: 0,      //- 拖拽开始，鼠标的left
    mouseY: 0       //- 拖拽开始，鼠标的top
  })

  //- 组件点击事件
  const onclick = (item: CompItem_Workbanch) => {
    dispatch(setActiveItem(item))
  }

  //- 组件鼠标按下
  const mousedown = (e: React.MouseEvent<HTMLDivElement>, item: CompItem_Workbanch) => {
    document.onmousemove = (e) => mousemove(e, item)
    document.onmouseup = (e) => mouseup(e, item)

    //- 当鼠标按下时，记录当前的各项数据
    dragInfo.current = {
      mouseX: e.clientX,
      mouseY: e.clientY
    }
  }
  //- 组件鼠标按下后移动
  const mousemove = (e: MouseEvent, item: CompItem_Workbanch) => {
    const { mouseX, mouseY } = dragInfo.current;
    const disX = e.clientX - mouseX;
    const disY = e.clientY - mouseY;
    if (parseInt(item.args.style.left) + disX < 0) return;
    dispatch(
      setElement(
        {
          id: item.id,
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
  const mouseup = (e: MouseEvent, item: CompItem_Workbanch) => {
    document.onmousemove = null;
    document.onmouseup = null;

  }
  const delBtn = () => {
    dispatch(delElement({ id: 0 }))
  }
  /******************************************* */
  /*  new code */
  const elRef = useRef({} as HTMLDivElement);

  /*  code end*/
  return (
    <div className='workbanch-container' ref = {ref}>
      {/* <button onClick={delBtn}>测试删除</button> */}
      <div>{JSON.stringify(workbanchList)}</div>
      {
        workbanchList.map((item: CompItem_Workbanch) => {
          // console.log(item);
          
          return (
            <WorkbanchItem key={item.id}
                           item={item}
            />
          )
        })
      }
    </div >
  )
}
)

export default Workbanch
