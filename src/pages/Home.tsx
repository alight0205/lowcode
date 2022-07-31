import React, { useRef, useState } from 'react'

const Home = () => {
    const [pos, setPos] = useState({
        top: 0,
        left: 0,
    })
    const moveDrag = (() => {
        const dragInfo = useRef({
            startLeft: 0,    //- 拖拽开始，组件的left
            startTop: 0,    //- 拖拽开始，组件的top
            startX: 0,      //- 拖拽开始，鼠标的left
            startY: 0       //- 拖拽开始，鼠标的top
        })
        const mousedown = (e: React.MouseEvent<HTMLDivElement>) => {
            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup)
            //- 当鼠标按下时，记录当前的各项数据
            dragInfo.current = {
                startTop: pos.top,
                startLeft: pos.left,
                startX: e.clientX,
                startY: e.clientY
            }
        }
        const mousemove = (e: MouseEvent) => {
            //- 获取鼠标按下时的各项数据
            const { startTop, startLeft, startX, startY } = dragInfo.current;
            //- 组件移动的位置 = 鼠标当前的位置 - 鼠标按下时的位置
            const disX = e.clientX - startX;
            const disY = e.clientY - startY;
            //- 移动后位置 = 鼠标按下的组件位置 + 移动的位置
            setPos({
                left: startLeft + disX,
                top: startTop + disY
            })
            console.log(pos)
        }
        const mouseup = (e: MouseEvent) => {
            document.removeEventListener('mousemove', mousemove)
            document.removeEventListener('mouseup', mouseup)
        }
        return {
            mousedown
        }
    })()
    return (
        <div>
            <div
                style={{
                    height: "100px",
                    width: '60px',
                    border: '1px solid',
                    position: 'relative',
                    top: `${pos.top}px`,
                    left: `${pos.left}px`,
                    display: 'inline-block'
                }}
                onMouseDown={moveDrag.mousedown}
            >文本</div>
            <button onClick={() => {
                setPos({
                    top: 200,
                    left: 200
                })
            }}>改变</button>
        </div>
    )
}

export default Home