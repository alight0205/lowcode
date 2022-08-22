import React, { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from 'uuid';

import "./index.less";
import { CompItem_Menu, CompItem_Workbench, WorkbenchListState } from "../../utils/interface";
import { useCallbackRef } from "../../compontents/hook/useCallbackRef";
import { addElement, addSelectItem, delAllSelect, removeSelectItem, setActiveItem, setElementPos } from "../../store/slices/workbenchList";

import Utils from './component/Utils'
import ComponentEdit from "./component/Editor";
import ComponentMenu from "./component/Menu";
import Workbench from "./component/Workbench";
import sliceNotNumber from "../../utils/sliceNotNumber";
const Home = () => {
    /* 一些hook、redux的定义 */
    const dispatch = useDispatch();
    // 工作区需要渲染的组件列表
    const workbanchList: any = useSelector<WorkbenchListState>(state => state.workbenchList.data);
    
    /* 变量定义 */
    //  容器的Ref
    let containerRef = useRef( null as null | {} as HTMLDivElement);

    /* 选择工作区组件的方法 */
    const methods = {
        // 所有工作区的组件都失去焦点
        clearBlocks: () => { dispatch(delAllSelect())},
        // 选中组件
        chooseBlock:(block:CompItem_Workbench) => { dispatch(addSelectItem(block))},
        // 移除组件
        removeBlock:(block:CompItem_Workbench) => { dispatch(removeSelectItem(block))},
        // 取消右侧展示, 选中多个组件时候
        cancelActive: () => { dispatch(setActiveItem(null))},
        // 选中右侧展示
        chooseActive: (block:CompItem_Workbench) => { dispatch(setActiveItem(block))},
    }

    /* 选择工作区组件的选中数据列表 */
    const focusData = useMemo(() => {
        // 选中列表
        const focus: CompItem_Workbench[] = [];
        // 未选择列表
        const unfocus: CompItem_Workbench[] = [];

        workbanchList.forEach( (block: CompItem_Workbench) => {(block.focus? focus: unfocus).push(block)});
        return {
            focus,
            unfocus
        }
    },[workbanchList])

    /* 业务逻辑 */
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
                    id: uuid(),
                    focus: false,
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
            // console.log(workbanchList);
            
        }),
        }
        return {block}
    })();

    /* 处理容器中 选中事件 */
  const focusHandler = (() => {
    // 点击元素 | 点击空白处
    const block = (e:React.MouseEvent<HTMLDivElement>,block:CompItem_Workbench) => {
        methods.cancelActive();
        if(e.shiftKey) {
            // 如果摁住了shift键,如果此时没有选择block，就选择该block
            // 保证至少有一个是选择的
            // 当 length == 1 的时候，永远是选择的
            if(focusData.focus.length == 0) {
                methods.chooseBlock(block);
                methods.chooseActive(block);
            }else if(focusData.focus.length == 1) {
            // block.args.focus = true;
                methods.chooseBlock(block);
            }else {
            // 选中 -> 未选中,未选中 -> 选中
                block.focus ? methods.removeBlock(block) : methods.chooseBlock(block);
            }
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
                methods.chooseBlock(block);   // 选中block
                methods.chooseActive(block);  // 展示编辑block
            }
        }
        setTimeout(() => {blockDraggier.mousedown(e);})
    }
    
    // 点击容器
    const container = (e:React.MouseEvent<HTMLDivElement>) => {
        // 阻止冒泡
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
            console.log(233);
            
            document.addEventListener('mousemove',mousemove);
            document.addEventListener('mouseup',mouseup);
            dragData.current = {
                startX: e.clientX,
                startY: e.clientY,
                startPosArray: focusData.focus.map((item) => ({top:parseInt(item.args.style.top),left:parseInt(item.args.style.left)}))
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
                console.log(sliceNotNumber(block.args.style.left));
                
                
                dispatch(setElementPos({id:block.id,left: (left + durX),top:(top + durY)}));
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
        <div className="home-container">
            <ComponentMenu menuDraggier={menuDraggier}/>
            <div className="center-container">
                {/* 工具栏 */}
                <Utils />
                <Workbench ref={containerRef} focusHandler={focusHandler}/>
            </div>
            <ComponentEdit />
        </div>
    );
};

export default Home;
