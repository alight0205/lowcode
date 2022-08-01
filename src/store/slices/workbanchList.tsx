import { createSlice } from "@reduxjs/toolkit";

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
    },
    reducers: {
        addElement: (state: any, { payload: { type, args, style } }: any) => {
            state.data.push({
                type,
                args,
                style
            });
        },
        setElement: (state: any, { payload: { index, element: { type, args, style } } }: any) => {
            state.data.splice(index, 1, {
                type,
                args,
                style
            })
        },
        setActiveItem: (state: any, { payload }: any) => {
            state.activeItem = payload
        }
    },
});

export const { addElement, setElement, setActiveItem } = workbanchListSlice.actions;
export default workbanchListSlice.reducer;
