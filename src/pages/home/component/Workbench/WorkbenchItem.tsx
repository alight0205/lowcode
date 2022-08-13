import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompItem_Workbench, WorkbenchListState } from '../../../../utils/interface'
import { componentMap } from '../../../../utils/componentMap'
import classnames from 'classnames'
import {
    delAllSelect,
    addSelectItem,
    setElementPos,
    removeSelectItem,
    setActiveItem,
    updateAllSelect,
    setDropStatus
} from '../../../../store/slices/workbenchList'

interface IProps {
    compInfo: CompItem_Workbench
}

const WorkbenchItem: React.FC<IProps> = ({ compInfo }) => {
    const dispatch = useDispatch()
    //- 选中列表
    const selectList: any = useSelector<WorkbenchListState>(state => state.workbenchList.selectList)
    const dropStatus: any = useSelector<WorkbenchListState>(state => state.workbenchList.dropStatus)
    //- 记录鼠标按下后的位置信息
    const dragInfo = useRef({
        mouseX: 0,      //- 拖拽开始，鼠标的left
        mouseY: 0       //- 拖拽开始，鼠标的top
    })

    const down = (e: any) => {
        dragInfo.current = {
            mouseX: e.clientX,
            mouseY: e.clientY
        }
        //- 如果当前元素已选中，且按了shift，则取消选中
        if (compInfo.focus) {
            if (e.shiftKey) {
                dispatch(removeSelectItem(compInfo));
            }
        } else {
            //- 如果当前元素未选中，且已选中为0：只选中该项
            //- 如果当前元素未选中，且没按shift键：只选中该项
            //- 如果当前元素未选中，且不存在以上情况，则添加选中
            if (selectList.length === 0 || !e.shiftKey) {
                dispatch(delAllSelect());
                dispatch(addSelectItem(compInfo));
                dispatch(setActiveItem(compInfo))
            } else {
                dispatch(addSelectItem(compInfo))
                dispatch(setActiveItem(null))
            }
        }
    }
    const dragstart = () => {
        dispatch(setDropStatus(true))
    }
    const drag = (e: any) => {
        if (!dropStatus) return;
        const { mouseX, mouseY } = dragInfo.current;
        const disX = e.clientX - mouseX;
        const disY = e.clientY - mouseY;
        // console.log(disX)
        selectList.forEach((selectItem: CompItem_Workbench) => {
            dispatch(setElementPos({
                id: selectItem.id,
                left: parseFloat(selectItem.args.style.left) + disX + 'px',
                top: parseFloat(selectItem.args.style.top) + disY + 'px'
            }))
        })
    }

    const dragend = () => {
        dispatch(updateAllSelect()); //更新select列表的位置信息
        if (selectList.length === 1) {
            dispatch(setActiveItem({ id: selectList[0].id }))
        } else {
            dispatch(setActiveItem(null))
        }
        dispatch(setDropStatus(false))
    }
    return (
        <div
            className={classnames('component-item', { focus: compInfo.focus })}
            style={{
                position: compInfo.args.style.position,
                left: compInfo.args.style.left,
                top: compInfo.args.style.top,
            }}
            onMouseDown={down}
            onDragStart={dragstart}
            onDrag={drag}
            onDragEnd={dragend}
            onMouseUp={dragend}
            draggable
        >
            {
                componentMap[compInfo.type]({
                    ...compInfo.args,
                    style: {
                        ...compInfo.args.style,
                        position: 'relative',
                        left: 0,
                        top: 0
                    },
                })
            }</div>
    )
}

export default WorkbenchItem