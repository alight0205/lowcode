import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { CompItem_Workbench } from '../../../../utils/interface'
import { componentMap } from '../../../../utils/componentMap'
import { useUpdate } from '../../../../compontents/hook/useUpdate'
import { setElement } from '../../../../store/slices/workbenchList'

interface IProps {
    compInfo: CompItem_Workbench,
    onMousedown?: (e:React.MouseEvent<HTMLDivElement>) => void
}

const WorkbenchItem: React.FC<IProps> = ({ compInfo,onMousedown }) => {
    /* hook定义 */
    const dispatch = useDispatch();

    /* ref定义 */
    const elRef = useRef({} as HTMLDivElement);

    /* 自定义函数 */
    const {forceUpdate} = useUpdate();

    /* 组件样式 */
    // 组件包裹样式
    const styles = useMemo(() => {
        return {
            top: `${compInfo.args.style.top}px`,
            left: `${compInfo.args.style.left}px`,
            opacity: compInfo.args.adjustPosition? '0': '',
        }
    },[compInfo.args.style])

    // 组件元素样式
    const blockStyles = useMemo(() => {
        return {
            ...compInfo.args.style,
        }
    },[compInfo.args.style])

    // 放置时调整
    useEffect(() => {
        if(compInfo.args.adjustPosition) {            
            const {top,left} = compInfo.args.style;
            const {height, width} = elRef.current.getBoundingClientRect();
            // props.item.adjustPosition = false;
            const y = Math.round(top-height/2);
            const x = Math.round(left-width/2) ;
            console.log(x,y);
            
            // 更新redux里的数值
            const addItem:CompItem_Workbench = {
                id: compInfo.id,
                type: compInfo.type,
                focus: compInfo.focus,
                args: {
                    value: compInfo.args.value,
                    adjustPosition: false,
                    focus: compInfo.args.focus,
                    style: {
                    ...compInfo.args.style,
                    position: 'absolute',
                    left: x,
                    top: y,
                    }
                },
            }
            dispatch(setElement(addItem));
            forceUpdate();
        }
    },[])


    // 'component-item' 设置样式
    const classes = useMemo(() => {
        let str = 'component-item';
        if(compInfo.focus) {
        str = `${str} focus`;
        }else {
        str = 'component-item';
        }
        return str;
    },[compInfo.focus])

    return (
        <>
            <div className= {classes}
                 style={styles}
                 ref={elRef}
                 onMouseDown={onMousedown}
            >
            {   componentMap[compInfo.type]({
                    value: compInfo.args.value,
                    imgurl: compInfo.args.imgurl,
                    key: compInfo.id,
                    style: {
                        ...blockStyles,
                        position: 'relative',
                        left: 0,
                        top: 0
                    },
                })
            }
            </div>
        </>
    )
}

export default WorkbenchItem