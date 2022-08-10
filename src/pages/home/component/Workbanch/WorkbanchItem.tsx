import React, { useEffect, useMemo, useRef } from "react"
import { CompItem_Workbanch, WorkbanchListState } from '../../../../utils/interface'
import { componentMap } from '../../../../utils/componentMap'
import { useUpdate } from "../../../../components/hook/useUpdate"
import { useSelector, useDispatch } from 'react-redux';
import { setElement } from "../../../../store/slices/workbanchList";

export const WorkbanchItem: React.FC<{
  item: CompItem_Workbanch,
  onMousedown?: (e:React.MouseEvent<HTMLDivElement>) => void
}> = (props) => {
  // console.log(props.item.args.adjustPosition);
  const dispatch = useDispatch();
  const elRef = useRef({} as HTMLDivElement);
  const {forceUpdate} = useUpdate();

  const styles = useMemo(() => {
    // console.log(props.item.args.style);
    
    return {
      ...props.item.args.style,
      top: `${props.item.args.style.top}px`,
      left: `${props.item.args.style.left}px`,
      opacity: props.item.args.adjustPosition? '0': '',
      // height: props.item.args.style.height,
      // width: props.item.args.style.width,
      // backgroundColor: props.item.args.style.backgroundColor,
      // border: props.item.args.style.border,
    }
  },[props.item.args.style,
    // props.item.args.style.top,props.item.args.style.left,props.item.args.adjustPosition,
    // props.item.args.style.height,props.item.args.style.width,props.item.args.style.backgroundColor,
    // props.item.args.style.border,
    ])
  
  useEffect(() => {
    if(props.item.args.adjustPosition) {
      const {top,left} = props.item.args.style;
      const {height, width} = elRef.current.getBoundingClientRect();
      // props.item.adjustPosition = false;
      const y = top - height / 2;
      const x = left - width / 2;
      // console.log(x,y);
      
      // 更新redux里的数值
      const addItem = {
        id: props.item.id,
        element: {
          type: props.item.type,
          args: {
            value: props.item.args.value,
            adjustPosition: false,
            focus: props.item.args.focus,
            style: {
              ...props.item.args.style,
              position: 'absolute',
              left: x,
              top: y,
            }
          },
        }
        
      }
      dispatch(setElement(addItem));
      forceUpdate();
    }
  },[])

  // 'workbanch-container-item'
  const classes = useMemo(() => {
    let str = 'workbanch-container-item';
    if(props.item.args.focus) {
      str = `${str} workbanch-container-item-focus`;
    }else {
      str = 'workbanch-container-item';
    }
    return str;
  },[props.item.args.focus])

  return (
    <>
      <div className= {classes}
         style={styles}
         ref={elRef}
         onMouseDown={props.onMousedown}
      >
      {

        componentMap[props.item.type]({
          value: props.item.args.value,
          key: props.item.id,
        })
      }
      </div>
    </>
    
  )
}