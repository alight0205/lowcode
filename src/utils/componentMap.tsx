import { Button, Input,Carousel  } from "antd";
import React from 'react';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export const componentMap: any = {
  button: (props: any,preview:boolean=false) =>
    <Button
      className={props.className}
      style={props.style}
      onMouseDown={props.onmousedown}
      onClick={props.onclick}
      key={props.key}
      draggable={props.draggable}
    >{props.value}</Button>,

  text: (props: any,preview:boolean=false) =>
    <span
      style={props.style}
      key={props.key}
      onMouseDown={props.onmousedown}
      onClick={props.onclick}
      draggable={props.draggable}
    >{props.value}</span>,

  input: (props: any,preview:boolean=false) => (
    <Input
      key={props.key}
      onMouseDown={props.onmousedown}
      onClick={props.onclick}
      style={props.style}
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      checked={props.checked}
      draggable={props.draggable}
    />
  ),

  divWrap: (props: any,preview:boolean=false) =>
    <div
      style={props.style}
      key={props.key}
      onMouseDown={props.onmousedown}
      onClick={props.onclick}
      onDragOver={props.onDragOver}
      draggable={props.draggable}
    >{props.value}</div>,

  img: (props: any,preview:boolean=false) => 
    <>  
      {
        preview?'图片':
        <img key={props.key} 
             src={props.imgurl} 
             style={props.style}
             alt="加载失败" 
        />
      }
    </>
  ,

  carousel : (props:any,preview:boolean=false) => {
    return (
      <>
        {
          preview?'轮播图':
          <Carousel  className={props.className}
              style={props.style}
              key={props.key}
              draggable={props.draggable}
          >
            {
              props.imgs instanceof Array &&
              props.imgs.map((_item: any) => (
                <div>
                  <img style={{...props.style,position:'sticky'}} src={_item} alt="加载失败" />
                  {/* <h3 style={props.style}>{_item}</h3> */}
                </div>
              ))
            }
          </Carousel >
        }
      </>
      
    )
  }  
};