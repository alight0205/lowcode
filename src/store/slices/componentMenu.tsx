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
      },
      {
        type: 'img',
        name: '图片',
        args: {
          value: '图片',
          imgurl: 'https://img0.baidu.com/it/u=3654026550,3264153565&fm=253&fmt=auto&app=138&f=JPEG?w=560&h=310',
          style: {
            width: '200px',
            height: '100px',
          }
        }
      }
    ],
    AntMap: [
      {
        type: 'carousel',
        name: '轮播图',
        args: {
          value: ['img1','img2'],
          style: {
            width: '200px',
            height: '100px',
          }
        }
      },
    ],
    editorMenu: {
      button:{
        type: 'button',
        slect: [{style: 'left',option:['px'],},{style: 'top',option:['px'],},{style: 'width',option:['px'],},{style: 'height',option:['px'],},{style: 'backgroundColor',option:[''],},{style: 'color',option:[''],},{style: 'border',option:[''],},],
      }
    },
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
