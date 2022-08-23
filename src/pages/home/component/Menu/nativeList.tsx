import React, { useEffect, useMemo, useState } from 'react'
import { CompItem_Menu } from '../../../../utils/interface'
import { componentMap } from '../../../../utils/componentMap'
const NativeList:React.FC<{
  menuDraggier: any,
  componentMenu: any,
  name: string,
}> = (props:any) => {
  /* hook、redux */
  // useState
  const [show,setShow] = useState(false);
  const [nativeDisplay,setNativeDisplay] = useState('block');

  // 原生组件 动画样式
  const nativeStyles = useMemo(() => {
    return {
      transform: show?`rotate(90deg)`:''
    }
  },[show])

  const nativeItemStyles = useMemo(() => {
    return {
      display: nativeDisplay,
      transform: show?``:`translateY(-800px)`,
    }
  },[show,nativeDisplay])

  useEffect(() => {
    if(!show) {
      setTimeout(() => {
        nativeItemStyles.transform ? setNativeDisplay('none') : setNativeDisplay('block');
      },100)
    }else {
      nativeItemStyles.transform ? setNativeDisplay('none') : setNativeDisplay('block');
    }
    
  },[show])
  return (
    <div className="component-list-tag">
        <div className="tag-name" onClick={() => setShow(!show)}>
          <span className='name'>{props.name}</span>
          <span className="btn" style={nativeStyles}>{'▷'}</span>
        </div>
        <div className='list-1' style={nativeItemStyles}>
          {
            props.componentMenu.map((item: CompItem_Menu, index: number) => (
              <div
                key={index}
                className='component-list-item'
                onDragStart={e=>props.menuDraggier.block.dragstart(e,item)}
                onDragEnd={props.menuDraggier.block.dragend}
                draggable
              >
                <div className="name">{item.name}</div>
                <div className="preview">{componentMap[item.type](item.args,true)}</div>
              </div>
            ))
          }
        </div>
      </div>
  )
}

export default NativeList;