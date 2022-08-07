import componentMenu from "../../../../store/slices/componentMenu";
import { componentMap } from "../../../../utils/componentMap";
import { ComponentMenuState, WorkbanchListState, CompItem_Menu,CompItem_Workbanch } from '../../../../utils/interface'
import { useSelector, useDispatch } from 'react-redux';
import ComponentEdit from "../Editor";
import Workbanch from "../Workbanch";
import { useMemo, useRef } from "react";
import { useCallbackRef } from "../../../../components/hook/useCallbackRef";
import { addElement,setFocusItem,setPlaceItem } from "../../../../store/slices/workbanchList";
export const HomeBody = () => {  

  const dispatch = useDispatch()
  const menuContainer = useRef<HTMLDivElement | null>(null)
  const componentMenu: any = useSelector<ComponentMenuState>(state => state.componentMenu.data);
  
  //- redux中，工作区需要渲染的组件列表
  const workbanchList: any = useSelector<WorkbanchListState>(state => state.workbanchList.data);
  
  /*  选择的一些方法 */
  const methods = {
    // 更新
    updateBlocks: (block: CompItem_Workbanch,focus:boolean) => {
      dispatch(setFocusItem({id:block.id,focus:focus}));
    },
    // 所有工作区的组件都失去焦点
    clearBlocks: () => {
      workbanchList.forEach( (block: CompItem_Workbanch) => {
        dispatch(setFocusItem({id:block.id,focus:false}));      
      });
    }
  }

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
        const item = dragData.current.dragComponent;
        if(item) {
          const addItem = {
            type: item.type,
            args: {
              value: item.args.value,
              adjustPosition: true,
              focus: false,
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
        // console.log(workbanchList);
        
      }),
    }
    return {block}
  })();

  // 选中数据列表
  const focusData = useMemo(() => {
    const focus: CompItem_Workbanch[] = [];
    const unfocus: CompItem_Workbanch[] = [];

    workbanchList.forEach( (block: CompItem_Workbanch) => {(block.args.focus? focus: unfocus).push(block)});
    return {
      focus,
      unfocus
    }
  },[workbanchList])

  // 工作区的选中
  /* 处理容器中 选中事件 */
  const focusHandler = (() => {
    // 点击元素 | 点击空白处
    const block = (e:React.MouseEvent<HTMLDivElement>,block:CompItem_Workbanch) => {
      if(e.shiftKey) {
        // 如果摁住了shift键,如果此时没有选择block，就选择该block
        // 保证至少有一个是选择的
        // 当 length == 1 的时候，永远是选择的
        if(focusData.focus.length <= 1) {
          // block.args.focus = true;
          methods.updateBlocks(block,true)
        }else {
          // 如果已经被选择了，就取反
          // block.args.focus = !block.args.focus;
          methods.updateBlocks(block,!block.args.focus)
        }
        // methods.updateBlocks(props.value.blocks)
      }else {
        // 没有摁住shift键
        // 如果点击的block没有被选择，
        // 清除出这个元素以外的所有元素的选择
        if(!block.args.focus) {
          /**
           * block.args.focus = true;
           * 不能直接修改redux里的属性值，只能通过dispatch方法
           */
          // console.log(block);
          methods.clearBlocks();
          methods.updateBlocks(block,true);
        }
      }
      setTimeout(() => {blockDraggier.mousedown(e);})
    }
    
    const container = (e:React.MouseEvent<HTMLDivElement>) => {
      if(e.target !== e.currentTarget) {
        return ;
      }
      if(!e.shiftKey) {
      }
      // console.log('点击 container');
      // console.log(workbanchList);
      methods.clearBlocks();
      // console.log(workbanchList);
    }
    return {
      block,
      container
    }
  })();

    // block的拖拽
    const blockDraggier = (() => {
      const dragData = useRef({
        startX: 0,                // 拖拽开始时,鼠标的left
        startY: 0,                // 拖拽开始时，鼠标的top值
        startPosArray:[] as {     // 所有选择的block元素的值
          top: number,
          left: number
        }[],
  
      })
      
      const mousedown = useCallbackRef((e:React.MouseEvent<HTMLDivElement>) => {
        document.addEventListener('mousemove',mousemove);
        document.addEventListener('mouseup',mouseup);
        dragData.current = {
          startX: e.clientX,
          startY: e.clientY,
          startPosArray: focusData.focus.map((item) => ({top:item.args.style.top,left:item.args.style.left}))
        }
        // console.log(dragData.current.startPosArray);
      })
      const mousemove = useCallbackRef((e:MouseEvent) => {
        const {startX,startY,startPosArray} = dragData.current;
        const {clientX:movex,clientY:movey} = e;
        const durX = movex - startX;
        const durY = movey - startY;
      
        focusData.focus.forEach((block,index) => {
          const {left,top} = startPosArray[index];
          dispatch(setPlaceItem({id:block.id,left: (left + durX),top:(top + durY)}));
        })
        
        // methods.updateBlocks(props.value.blocks);
      })
      const mouseup = useCallbackRef((e:MouseEvent) => {
        document.removeEventListener('mousemove',mousemove);
        document.removeEventListener('mouseup',mouseup);
      })
  
      return {mousedown};
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
      <Workbanch ref={containerRef}
                 focusHandler={focusHandler}
      />

      {/* 编辑区 */}
      <ComponentEdit />
    </div>
  )

}