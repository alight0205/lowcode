import { createSlice } from "@reduxjs/toolkit";
import { CompItem_Menu } from "../../utils/interface";

export const componentMenuSlice = createSlice({
  name: "componentMenu",
  initialState: {
    data: [
      {
        type: 'button',
        name: '按钮',
        args: {
          value: '按钮',
          style: {}
        }
      },
      {
        type: 'text',
        name: '文本',
        args: {
          value: '文本',
          style: {}
        }
      },
      {
        type: 'input',
        name: '输入框',
        args: {
          value: '输入框',
          style: {
            width: '200px'
          }
        }
      },
      {
        type: 'divWrap',
        name: 'div容器',
        args: {
          value: '容器',
          style: {
            width: '200px',
            height: '100px',
          }
        }
      }
    ],
    activeItem: null
  },
  reducers: {
    setActiveItem: (state: any, { payload }: any) => {
      state.activeItem = payload
    },
  },
});

export const { setActiveItem, } = componentMenuSlice.actions;
export default componentMenuSlice.reducer;
