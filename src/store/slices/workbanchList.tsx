import { createSlice } from "@reduxjs/toolkit";
import { CompItem_Workbanch } from "../../utils/interface";

export const workbanchListSlice = createSlice({
    name: "workbanchList",
    initialState: {
        data: [
            // {
            //     id: 0,
            //     type: 'button',
            //     focus: false,
            //     args: {
            //         value: '按钮',
            //         style: {
            //             left: '100px',
            //             top: '100px'
            //         }
            //     },
            // }
        ],
        activeItem: null,
        // {
        //     id: 0,
        //     type: 'button',
        //     focus: false,
        //     args: {
        //         style: {
        //             left: '100px',
        //             top: '100px'
        //         }
        //     }
        // }
        length: 0,
        dropStatus: false,//可放置状态
        selectList: [
            // {
            //     id: 0,
            // }
        ]

    },
    reducers: {
        setDropStatus: (state: any, { payload }: { payload: boolean }) => {
            state.dropStatus = payload
        },
        setAllElement: (state: any, { payload }: { payload: CompItem_Workbanch[] }) => {
            state.data = payload
        },
        addElement: (state: any, { payload: { type, focus, args } }: { payload: { type: string, focus: boolean, args: object } }) => {
            state.data.push({
                id: state.length,
                type,
                focus,
                args
            });
            state.length += 1;
        },
        delElement: (state: any, { payload: { id } }: { payload: { id: number } }) => {
            const elementIndex = state.data.findIndex((item: CompItem_Workbanch) => item.id === id)
            if (elementIndex == -1) return;
            state.data.splice(elementIndex, 1)
        },
        delElements: (state: any) => {
            state.selectList.forEach((delItem: CompItem_Workbanch) => {
                const elementIndex = state.data.findIndex((item: CompItem_Workbanch) => item.id === delItem.id)
                if (elementIndex == -1) return;
                state.data.splice(elementIndex, 1)
            });
        },
        setElement: (state: any, { payload }: { payload: CompItem_Workbanch }) => {
            const elementIndex = state.data.findIndex((item: CompItem_Workbanch) => item.id === payload.id)
            if (elementIndex == -1) return;
            state.data[elementIndex] = payload;
            if (state.activeItem?.id === payload.id) return;
            state.activeItem = payload;
        },
        setElementPos: (state: any, { payload: { id, left, top } }: any) => {
            const elementIndex = state.data.findIndex((item: any) => item.id === id)
            state.data[elementIndex].args.style.left = left;
            state.data[elementIndex].args.style.top = top;
        },
        setActiveItem: (state: any, { payload }: { payload: { id: number } | null }) => {
            if (!payload) {
                state.activeItem = null
            } else {
                const elementIndex = state.data.findIndex((item: CompItem_Workbanch) => item.id === payload.id)
                state.activeItem = state.data[elementIndex]
            }
        },
        setFocusItem: (state: any, { payload: { id, focus } }: any) => {
            const elementIndex = state.data.findIndex((item: CompItem_Workbanch) => item.id === id)
            state.data[elementIndex].focus = focus;
        },
        addSelectItem: (state: any, { payload }: { payload: CompItem_Workbanch }) => {
            const elementIndex = state.data.findIndex((item: CompItem_Workbanch) => item.id === payload.id)
            state.data[elementIndex].focus = true;
            state.selectList.push(payload)
        },
        updateSelectItem: (state: any) => {
            state.selectList.forEach((selecctItem: CompItem_Workbanch) => {
                const elementIndex = state.data.findIndex((item: CompItem_Workbanch) => item.id === selecctItem.id)
                selecctItem.args.style = state.data[elementIndex].args.style
            })
        },
        removeSelectItem: (state: any, { payload }: { payload: { id: number } }) => {
            const elementIndex = state.data.findIndex((item: CompItem_Workbanch) => item.id === payload.id)
            state.data[elementIndex].focus = false;
            const selectIndex = state.selectList.findIndex((item: CompItem_Workbanch) => item.id === payload.id)
            state.selectList.splice(selectIndex, 1)
        },
        closeAllFocus: (state: any) => {
            state.selectList.forEach((delItem: CompItem_Workbanch) => {
                const elementIndex = state.data.findIndex((item: CompItem_Workbanch) => item.id === delItem.id)
                if (elementIndex == -1) return;
                state.data[elementIndex].focus = false;
            });
            state.selectList = []
        },

    },
});

export const {
    addElement,
    delElement,
    setElement,
    setElementPos,
    setActiveItem,
    setAllElement,
    delElements,
    setDropStatus,
    setFocusItem,
    addSelectItem,
    removeSelectItem,
    updateSelectItem,
    closeAllFocus, } = workbanchListSlice.actions;
export default workbanchListSlice.reducer;
