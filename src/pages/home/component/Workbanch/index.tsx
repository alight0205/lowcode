import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { CompItem_Workbanch, WorkbanchListState } from '../../../../utils/interface'
import { setElement, setActiveItem, delElement, delElements, setAllElement } from '../../../../store/slices/workbanchList'
import { componentMap } from '../../../../utils/componentMap'
import { Button, Modal } from 'antd';

const Workbanch = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 是否查看json数据
  const [showJSONStatus, setShowJSONStatus] = useState(false)

  // 工作区DOM容器
  const workbanchContainer = useRef<HTMLDivElement | null>(null)

  //- redux中，工作区需要渲染的组件列表
  const workbanchList: any = useSelector<WorkbanchListState>(state => state.workbanchList.data)
  const activeItem: any = useSelector<WorkbanchListState>(state => state.workbanchList.activeItem)

  //- 组件点击事件
  const onclick = (item: CompItem_Workbanch) => {
    dispatch(setActiveItem(item))
  }

  //- 记录鼠标按下后的位置信息
  const dragInfo = useRef({
    mouseX: 0,      //- 拖拽开始，鼠标的left
    mouseY: 0       //- 拖拽开始，鼠标的top
  })


  //- 组件鼠标按下
  const mousedown = (e: React.MouseEvent<HTMLDivElement>, item: CompItem_Workbanch) => {
    document.onmousemove = (e) => mousemove(e, item)
    document.onmouseup = (e) => mouseup(e, item)

    //- 当鼠标按下时，记录当前的各项数据
    dragInfo.current = {
      mouseX: e.clientX,
      mouseY: e.clientY
    }
  }
  //- 组件鼠标按下后移动
  const mousemove = (e: MouseEvent, item: CompItem_Workbanch) => {
    const { mouseX, mouseY } = dragInfo.current;
    const disX = e.clientX - mouseX;
    const disY = e.clientY - mouseY;
    if (parseInt(item.args.style.left) + disX < 0) return;
    dispatch(
      setElement(
        {
          id: item.id,
          element: {
            type: item.type,
            args:
            {
              value: item.args.value,
              style:
              {
                ...item.args.style,
                left: parseInt(item.args.style.left) + disX + 'px',
                top: parseInt(item.args.style.top) + disY + 'px'
              }
            }
          }
        }))
  }
  //- 组件鼠标松开
  const mouseup = (e: MouseEvent, item: CompItem_Workbanch) => {
    document.onmousemove = null;
    document.onmouseup = null;
  }
  // 删除组件
  const delEle = () => {
    if (activeItem) {
      dispatch(delElement({ id: activeItem.id }))
      dispatch(setActiveItem(null))
    }
  }
  const delEles = () => {
    dispatch(delElements([{ id: 0 }, { id: 1 }]))
  }
  // 导出exportJSON
  const exportJSON = (data: any = {}, filename = 'dataJSON.json') => {
    if (typeof data === 'object') {
      data = JSON.stringify(data, null, 4);
    }
    // 导出数据
    const blob = new Blob([data], { type: 'text/json' }),
      e = new MouseEvent('click'),
      a = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    a.dispatchEvent(e);
  }
  // 导入JSON数据
  const importJSON = () => {
    const importFile: any = document.getElementById('file');
    const fileList = importFile.files;
    if (!fileList.length) {
      return;
    }
    const reader = new FileReader();
    reader.readAsText(fileList[0], "UTF-8");
    reader.onload = function (event: any) {
      const importData = JSON.parse(event.target.result);
      dispatch(setAllElement(importData))
    }
  }
  // 查看JSON数据
  const showJSON = () => {
    setShowJSONStatus(true)
  }
  // 关闭JSON数据显示
  const closeJSON = () => {
    setShowJSONStatus(false)
  }

  return (
    <div className='workbanch-container' ref={workbanchContainer}>

      {/* 工具栏 */}
      <div className="workbanch-utils-container">
        <button onClick={delEle}>删除</button>
        <button onClick={delEles}>批量删除</button>
        <button onClick={() => {
          exportJSON(workbanchList)
        }}>导出</button>
        <input type="file" accept=".json" id="file" />
        <button onClick={importJSON}>导入</button>
        <button onClick={() => {
          navigate('/preview')
        }}>预览</button>
        <button onClick={showJSON}>查看json数据</button>
        <button onClick={() => {
          dispatch(setAllElement([]))
          dispatch(setActiveItem(null))
        }}>清空页面</button>
      </div>

      {/* json Modal */}
      <Modal title="查看json数据" visible={showJSONStatus} onCancel={closeJSON}
        destroyOnClose={true}
        centered={true}
        footer={null}>
        {JSON.stringify(workbanchList)}
      </Modal>

      {/* 渲染工作台 */}
      {workbanchList.map((item: CompItem_Workbanch) => (
        componentMap[item.type]({
          ...item.args,
          key: item.id,
          onmousedown: (e: any) => mousedown(e, item),
          onclick: () => onclick(item)
        })
      ))}
    </div >
  )
}

export default Workbanch
