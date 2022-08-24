import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompItem_Workbench, WorkbenchListState } from '../../utils/interface'
import { componentMap } from '../../utils/componentMap'
import { useNavigate } from 'react-router'

const Preview = () => {
    const navigate = useNavigate()
    //- redux中，工作区需要渲染的组件列表
    const workbenchList: any = useSelector<WorkbenchListState>(state => state.workbenchList.data)
    return (
        <div>
            <button style={{ position: 'fixed' }} onClick={() => {
                navigate('/home')
            }}>返回工作台</button>
            {workbenchList.map((item: CompItem_Workbench) => {
                console.log(item);
                
                return (
                    componentMap[item.type]({
                        ...item.args,
                        key: item.id
                    })
                )
            }
            )}</div>
    )
}

export default Preview