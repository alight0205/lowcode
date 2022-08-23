import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { ComponentMenuState, CompItem_Menu } from '../../../../utils/interface'
import NativeList from './nativeList'

const Menu =React.forwardRef((props:any,ref?:React.Ref<HTMLDivElement>) => {
  // 获取元素列表
  const componentMenu: any = useSelector<ComponentMenuState>(state => state.componentMenu.data);
  const AntMenu:any = useSelector<ComponentMenuState>(state => state.componentMenu.AntMap);

  return (
    <div className="component-list-container">
      <NativeList menuDraggier={props.menuDraggier} 
                  componentMenu={componentMenu}
                  name={'原生组件'}/>
      <NativeList menuDraggier={props.menuDraggier} 
                  componentMenu={AntMenu}
                  name={'复合组件'}/>

    </div >
  );
}
);

export default Menu;
