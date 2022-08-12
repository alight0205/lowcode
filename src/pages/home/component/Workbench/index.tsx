import { useSelector, useDispatch } from 'react-redux'
import { CompItem_Workbench, WorkbenchListState, ComponentMenuState } from '../../../../utils/interface'
import {
  setActiveItem,
  setDropStatus,
  delAllSelect,
  addElement,
  updateAllSelect,
} from '../../../../store/slices/workbenchList'
import Utils from './Utils'
import WorkbenchItem from './WorkbenchItem'
import { v4 as uuid } from 'uuid';

const Workbench = () => {
  const dispatch = useDispatch()
  //- redux中，工作区需要渲染的组件列表
  const workbenchList: any = useSelector<WorkbenchListState>(state => state.workbenchList.data)
  const menuActiveItem: any = useSelector<ComponentMenuState>(state => state.componentMenu.activeItem)
  const dropStatus: any = useSelector<WorkbenchListState>(state => state.workbenchList.dropStatus)
  //- 选中列表
  const selectList: any = useSelector<WorkbenchListState>(state => state.workbenchList.selectList)

  // 容器点击事件
  const containerMouseDown = (e: any) => {
    if (e.target.className === 'workbench-container') {
      dispatch(delAllSelect())
      dispatch(setActiveItem(null))
    }
  }
  // 放置元素
  const drop = (e: any) => {
    // 放置的元素时menuItem
    if (menuActiveItem) {
      // 得到元素的位置
      const [left, top] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
      // 往工作区添加组件
      let addItem = {
        id: uuid(),
        type: menuActiveItem.type,
        focus: false,
        args: {
          value: menuActiveItem.args.value,
          style: {
            ...menuActiveItem.args.style,
            position: 'absolute',
            left: left + 'px',
            top: top + 'px'
          }
        }
      }
      dispatch(addElement(addItem))
    } else {
      // 放置的元素是WorkbenchItem
      dispatch(updateAllSelect()); //更新select列表的位置信息
      if (selectList.length === 1) {
        dispatch(setActiveItem({ id: selectList[0].id }))
      } else {
        dispatch(setActiveItem(null))
      }
    }
  }
  return (
    <div
      className='workbench-container'
      onDragEnter={() => { dispatch(setDropStatus(true)); console.log(dropStatus) }}
      onDragLeave={() => { dispatch(setDropStatus(false)); console.log(dropStatus) }}
      onDragOver={(e) => { e.preventDefault(); }}
      onDrop={drop}
      onMouseDown={containerMouseDown}
    >
      {/* 工具栏 */}
      <Utils />
      {/* 渲染工作台 */}
      {workbenchList.map((item: CompItem_Workbench) => (
        <WorkbenchItem key={item.id} compInfo={item} />
      ))}
    </div >
  )
}

export default Workbench
