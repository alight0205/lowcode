import { createSlice } from "@reduxjs/toolkit";
import { WorkbanchListState } from "../../utils/interface";

export const workbanchListSlice = createSlice({
    name: "workbanchList",
    initialState: {
        data: [
            // {
            //     type: 'button',
            //     args: {
            //         value: '按钮',
            //         style: {
            //             left: '100px',
            //             top: '100px'
            //         }
            //     },
            // }
        ],
        activeItem: null
        // {
        //     index:0,
        //     element:{
        //         type: 'button',
        //         args: {
        //             left:'100px',
        //             top:'100px'
        //         }
        //     }
        // }
    },
    reducers: {
        addElement: (state: any, { payload: { type, args, style } }: any) => {
            state.data.push({
                type,
                args,
                style
            });
        },
        delElement: (state: any, { payload: { index } }: any) => {
            state.data.splice(index, 1)
        },
        setElement: (state: any, { payload: { index, element: { type, args, style } } }: any) => {
            state.data.splice(index, 1, {
                type,
                args,
                style
            })
        },
        setActiveItem: (state: any, { payload: { index, element: { type, args, style } } }: any) => {
            state.activeItem = {
                index,
                element: {
                    type,
                    args,
                    style
                }
            }
        }
    },
});

export const { addElement, delElement, setElement, setActiveItem } = workbanchListSlice.actions;
export default workbanchListSlice.reducer;
