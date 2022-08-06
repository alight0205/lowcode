import componentMenu from "../../../../store/slices/componentMenu";
import { componentMap } from "../../../../utils/componentMap";
import { ComponentMenuState, WorkbanchListState, CompItem_Menu } from '../../../../utils/interface'
import { useSelector, useDispatch } from 'react-redux';
import ComponentEdit from "../Editor";
import Workbanch from "../Workbanch";
import { useRef } from "react";
import { useCallbackRef } from "../../../../components/hook/useCallbackRef";
import { addElement } from "../../../../store/slices/workbanchList";
export const HomeBody = () => {  

  const dispatch = useDispatch()
  const menuContainer = useRef<HTMLDivElement | null>(null)
  const componentMenu: any = useSelector<ComponentMenuState>(state => state.componentMenu.data);

  /*  容器的Ref */
  let containerRef = useRef( null as null | {} as HTMLDivElement);
  // 组件拖拽逻辑，处理组件从左侧拖到右侧
  const menuDraggier = (() => {
    // 拖动组件的ref
    const dragData = useRef({
      dragComponent: null as null | CompItem_Menu
    })

    // ref
    // 拖动元素
    const block = {
      // 开始拖动
      dragstart: useCallbackRef((e:React.DragEvent<HTMLDivElement>, dragComponent:CompItem_Menu) => {
        containerRef.current.addEventListener('dragenter',container.dragenter);
        containerRef.current.addEventListener('dragover',container.dragover);
        containerRef.current.addEventListener('dragleave',container.dragleave);
        containerRef.current.addEventListener('drop',container.drop);
        dragData.current.dragComponent = dragComponent;
        // console.log(dragData.current.dragComponent);
        
      }),
      // 拖动结束
      dragend: useCallbackRef((e:React.DragEvent<HTMLDivElement>) => {
        containerRef.current.removeEventListener('dragenter',container.dragenter);
        containerRef.current.removeEventListener('dragover',container.dragover);
        containerRef.current.removeEventListener('dragleave',container.dragleave);
        containerRef.current.removeEventListener('drop',container.drop);
      })
    }
    // 容器
    const container = {
      dragenter: useCallbackRef((e:DragEvent) => {e.dataTransfer!.dropEffect = 'move'}),
      dragover: useCallbackRef((e:DragEvent) => {e.preventDefault()}),
      dragleave: useCallbackRef((e:DragEvent) => {e.dataTransfer!.dropEffect = 'none'}),
      drop: useCallbackRef((e:DragEvent) => {    
        console.log(dragData.current.dragComponent!);
        const item = dragData.current.dragComponent;

        if(item) {
          const addItem = {
            type: item.type,
            args: {
              value: item.args.value,
              adjustPosition: true,
              style: {
                ...item.args.style,
                position: 'absolute',
                left: e.offsetX,
                top: e.offsetY,
              }
            },
          }
          dispatch(addElement(addItem))
        }
        // console.log(e.offsetX,e.offsetY);
        
      }),
    }

    return {block}
  })();

  return (
    <div className="home-body">
      {/* 组件列表 */}
      <div ref={menuContainer} className="component-list-container">
      {
        componentMenu.map((item: CompItem_Menu, index: number) => (
          <div key={index}
               className='component-list-item'  
               draggable
               onDragStart={e=>menuDraggier.block.dragstart(e,item)}
               onDragEnd={menuDraggier.block.dragend}
          >
            <div className="name">{item.name}</div>
            <div className="preview">{componentMap[item.type](item.args)}</div>
          </div>
        ))
      }
    </div >

      {/* 画布 */}
      <Workbanch ref={containerRef}/>

      {/* 编辑区 */}
      <ComponentEdit />
    </div>
  )

}