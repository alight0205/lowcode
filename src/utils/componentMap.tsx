import { Button, Input } from "antd";

export const componentMap: any = {
  button: (props: any) =>
    <Button
      className={props.className}
      style={props.style}
      onMouseDown={props.onmousedown}
      onClick={props.onclick}
      key={props.key}
      draggable={props.draggable}
    >{props.value}</Button>,
  text: (props: any) =>
    <span
      style={props.style}
      key={props.key}
      onMouseDown={props.onmousedown}
      onClick={props.onclick}
      draggable={props.draggable}
    >{props.value}</span>,
  input: (props: any) => (
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
  divWrap: (props: any) =>
    <div
      style={props.style}
      key={props.key}
      onMouseDown={props.onmousedown}
      onClick={props.onclick}
      onDragOver={props.onDragOver}
      draggable={props.draggable}
    >{props.value}</div>
};
