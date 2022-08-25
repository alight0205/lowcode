import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CompItem_Workbench } from '../../utils/interface'
import { componentMap } from '../../utils/componentMap'
import { getPageValue } from '../../service/api/page'

const Prevate = ({ }) => {
    const params = useParams()
    const [data, setData] = useState([])
    useEffect(() => {
        getPageValue(params.id!).then(res => {
            setData(JSON.parse(res.data.data[0].pageValue))
        })
    }, [])
    return (
        <div>
            {data.map((item: CompItem_Workbench) => (
                componentMap[item.type]({
                    ...item.args,
                    key: item.id
                })
            ))}</div>
    )
}

export default Prevate