=======
# 需求
- 详见飞书文档

# BUG&问题
- <del>Q1. 拖动组件的时候，右侧栏会频繁闪烁 </del>
- <del>Q2. 拖动组件的时候，组件本身可以被点击 </de>  
- <del>Q3. 拖动效果不是很好 </del>
- Q4.左侧组件没有滚动条
- div容器如何处理，将button等组件如何放入div容器中

 ## Q1: 如何实现左边展示样式和工作样式 区别开来?
  - A: 在 `componentMenuSlice` data中添加 **preview** 属性，用来区别 预览样式与工作区样式

# daily log
- 实现了左侧组件栏拖动到右侧，draggable拖拽实现
- 实现了工作区移动，选中组件可以在右侧显示
- 优化了拖动效果
- 修改了路由布局&将less常量统一放入到common文件夹里管理

# record
### 添加 CompItem_Workbanch 属性
- 1.在args里添加，放置时添加 --> 放下后在添加到列表里 添加组件
- 2.CompItem_Workbanch接口里添加，并修改redux方法