import { createSlice } from "@reduxjs/toolkit";
import { CompItem_Workbanch } from "../../utils/interface";

export const workbanchListSlice = createSlice({
    name: "workbanchList",
    initialState: {
        data: [
            // {
            //     id: 0,
            //     type: 'button',
            //     args: {
            //         value: '按钮',
            //         style: {
            //             left: 100,
            //             top: 100
            //         }
            //     },
            // }
        ],
        activeItem: null,
        // {
        //     id:0,
        //     element:{
        //         type: 'button',
        //         args: {
        //             left:100,
        //             top:100
        //         }
        //     }
        // }
        length: 0
    },
    reducers: {
        addElement: (state: any, { payload: { type, args, style } }: any) => {
            state.data.push({
                id: state.length,
                type,
                args,
                style
            });
            state.length += 1;
        },
        delElement: (state: any, { payload: { id } }: any) => {
            const elementIndex = state.data.findIndex((item: any) => item.id === id)
            if (elementIndex == -1) return;
            state.data.splice(elementIndex, 1)
        },
        setElement: (state: any, { payload: { id, element: { type, args, style } } }: any) => {
            const elementIndex = state.data.findIndex((item: any) => item.id === id)
            if (elementIndex == -1) return;
            state.data.splice(elementIndex, 1, {
                id,
                type,
                args,
                style
            })
        },
        setActiveItem: (state: any, { payload: { id, type, args, style } }: any) => {
            state.activeItem = {
                id,
                type,
                args,
                style
            }
        },
        // 组件是否被选中
        setFocusItem:(state:any,{ payload: {id,focus}}:any) => {
            const elementIndex = state.data.findIndex((item: any) => item.id === id)
            if (elementIndex == -1) return;
            state.data[elementIndex].args.focus = focus;
            // console.log(state.data[elementIndex].args.focus,focus);
            // console.log(state.data);
            
        },
        // 修改被选中组件的位置
        setPlaceItem:(state:any,{ payload: {id,left,top}}:any) => {
            const elementIndex = state.data.findIndex((item: any) => item.id === id)
            if (elementIndex == -1) return;
            [state.data[elementIndex].args.style.left,state.data[elementIndex].args.style.top] = [left,top]
        }
    },
});

export const { addElement, delElement, setElement, 
               setActiveItem,setFocusItem, setPlaceItem} = workbanchListSlice.actions;
export default workbanchListSlice.reducer;
