import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { setElement, setActiveItem, delElement, delElements, setAllElement, delAllSelect } from '../../../../store/slices/workbenchList'
import { CompItem_Workbench, WorkbenchListState } from '../../../../utils/interface'
import { Button, Modal } from 'antd';
import {
    DeleteOutlined,
    CloudUploadOutlined,
    CloudDownloadOutlined,
    EyeOutlined,
    FileSearchOutlined,
    FormatPainterOutlined
} from '@ant-design/icons';
import { uploadPage } from '../../../../service/api/page'

const Utils = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //- redux中，工作区需要渲染的组件列表
    const workbenchList: any = useSelector<WorkbenchListState>(state => state.workbenchList.data)
    // 是否查看json数据
    const [showJSONStatus, setShowJSONStatus] = useState(false)
    // 导入JSON数据Modal
    const [importJSONStatus, setImportJSONStatus] = useState(false)

    // 生成页面连接地址
    const [showUploadJSON, setShowUploadJSON] = useState(false)
    const [uploadJSONId, setUploadJSONId] = useState('')

    // 删除组件
    const delEles = () => {
        dispatch(delElements())
        dispatch(setActiveItem(null))
        dispatch(delAllSelect())
    }
    // 导出exportJSON
    const exportJSON = () => {
        const filename = 'dataJSON.json'
        // 导出数据
        const blob = new Blob([workbenchList], { type: 'text/json' }),
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
    // 生成页面链接地址
    const uploadJSON = async () => {
        const data = await uploadPage(JSON.stringify(workbenchList))
        setUploadJSONId(data.data.data._id)
        setShowUploadJSON(true)
    }
    return (
        <>
            {/* json Modal */}
            <Modal title="查看json数据" visible={showJSONStatus} onCancel={() => setShowJSONStatus(false)}
                destroyOnClose={true}
                centered={true}
                footer={null}>
                {JSON.stringify(workbenchList)}
            </Modal>
            <Modal title="页面链接地址" visible={showUploadJSON} onCancel={() => setShowUploadJSON(false)}
                destroyOnClose={true}
                centered={true}
                footer={null}>
                {'http://127.0.0.1:5173/private/' + uploadJSONId}
            </Modal>
            <Modal
                title="导入JSON数据"
                visible={importJSONStatus}
                onCancel={() => setImportJSONStatus(false)}
                okText="导入"
                cancelText="取消"
                onOk={() => {
                    importJSON()
                    setImportJSONStatus(false)
                }}
                destroyOnClose={true}
                centered={true}>
                <input type="file" accept=".json" id="file" />
            </Modal>
            <div className="utils-container">
                <div>

                    <Button
                        className='utils-item'
                        type="primary"
                        onClick={delEles}
                        title="删除当前组件">
                        <DeleteOutlined />
                    </Button>
                    {/* <button onClick={delEles}>批量删除</button> */}
                    <Button
                        className='utils-item'
                        type="primary"
                        onClick={() => {
                            setImportJSONStatus(true)
                        }}
                        title="导入页面">
                        <CloudUploadOutlined />
                    </Button>
                    <Button
                        className='utils-item'
                        type="primary"
                        onClick={exportJSON}
                        title="导出页面">
                        <CloudDownloadOutlined />
                    </Button>
                    <Button
                        title="预览页面"
                        className='utils-item'
                        type='primary'
                        onClick={() => {
                            navigate('/preview')
                        }}>
                        <EyeOutlined />
                    </Button>
                    <Button
                        title="查看JSON数据"
                        className='utils-item'
                        type='primary'
                        onClick={() => {
                            setShowJSONStatus(true)
                        }}>
                        <FileSearchOutlined />
                    </Button>

                    <Button
                        title="清空页面"
                        className='utils-item'
                        type='primary'
                        onClick={() => {
                            dispatch(setAllElement([]))
                            dispatch(setActiveItem(null))
                        }}>
                        <FormatPainterOutlined />
                    </Button>
                </div>
                <div>
                    {/* <Button
                        title="新页面"
                        className='utils-item'
                        type='primary'>
                        新页面
                    </Button> */}

                    <Button
                        title="生成链接地址"
                        className='utils-item'
                        type='primary'
                        onClick={uploadJSON}
                    >
                        生成链接地址
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Utils