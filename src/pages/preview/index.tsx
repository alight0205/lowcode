import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CompItem_Workbanch, WorkbanchListState } from '../../utils/interface'
import { componentMap } from '../../utils/componentMap'
import { useNavigate } from 'react-router'

const Preview = () => {
    const navigate = useNavigate()
    //- redux中，工作区需要渲染的组件列表
    const workbanchList: any = useSelector<WorkbanchListState>(state => state.workbanchList.data)
    return (
        <div>
            <button style={{ position: 'fixed' }} onClick={() => {
                navigate('/home')
            }}>返回工作台</button>
            {workbanchList.map((item: CompItem_Workbanch) => (
                componentMap[item.type]({
                    ...item.args,
                    key: item.id
                })
            ))}</div>
    )
}

export default Preview