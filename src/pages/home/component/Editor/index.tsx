import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { WorkbenchListState } from '../../../../utils/interface'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';
import { setActiveItem, setElement } from '../../../../store/slices/workbenchList'
const ComponentEdit: React.FC = () => {

  const { TextArea } = Input;
  const { Option } = Select;

  const dispatch = useDispatch()
  const EditInfo: any = useSelector<WorkbenchListState>(state => state.workbenchList.activeItem);


  const [styleTextValue, setStyleTextValue] = useState("")
  useEffect(() => {
    setStyleTextValue(EditInfo && JSON.stringify(EditInfo.args.style, null, 2))
    reset()
  }, [EditInfo])

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    dispatch(setElement(
      {
        id: EditInfo.id,
        type: EditInfo.type,
        focus: true,
        args:
        {
          value: EditInfo.args.value,
          style:
          {
            ...EditInfo.args.style,
            position: values.position,
            left: values.left ? values.left + values.leftSuffix : EditInfo.args.style.left,
            top: values.top ? values.top + values.topSuffix : EditInfo.args.style.top,
            width: values.width ? values.width + values.widthSuffix : EditInfo.args.style.width,
            height: values.height ? values.height + values.heightSuffix : EditInfo.args.style.height,
          }
        }
      }))
    dispatch(setActiveItem({ id: EditInfo.id }))
  };
  const suffixSelector = (name: string) => (
    <Form.Item name={name} noStyle initialValue="px">
      <Select style={{ width: 65 }}>
        <Option value="px">px</Option>
        <Option value="em">em</Option>
      </Select>
    </Form.Item>);
  const reset = () => {
    if (!EditInfo) return;
    const obj = {
      position: EditInfo.args.style.position,
      left: parseFloat(EditInfo.args.style.left),
      top: parseFloat(EditInfo.args.style.top),
      width: parseFloat(EditInfo.args.style.width),
      height: parseFloat(EditInfo.args.style.height),
    }
    form.setFieldsValue(obj)

  }
  const setStyleText = () => {
    dispatch(setElement(
      {
        id: EditInfo.id,
        type: EditInfo.type,
        focus: true,
        args:
        {
          value: EditInfo.args.value,
          style:
          {
            ...EditInfo.args.style,
            ...JSON.parse(styleTextValue)
          }
        }
      }))
    dispatch(setActiveItem({ id: EditInfo.id }))
  }
  return (
    <div className="component-edit-container">
      <div hidden={EditInfo}>
        <h2>暂无选中元素</h2>
      </div>
      <div hidden={!EditInfo}>
        <div className="setstyle-list">
          <h2>自定义样式</h2>
          <Form
            name="style-list"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="position"
              name="position"
              initialValue="absolute"
            >
              <Select>
                <Option value="absolute">absolute</Option>
                <Option value="relative">relative</Option>
                <Option value="static">static</Option>
                <Option value="fixed">fixed</Option>
                <Option value="sticky">sticky</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="left"
              name="left"
            >
              <InputNumber placeholder="默认" addonAfter={suffixSelector('leftSuffix')} />
            </Form.Item>
            <Form.Item
              label="top"
              name="top"
            >
              <InputNumber placeholder="默认" addonAfter={suffixSelector('topSuffix')} />
            </Form.Item>
            <Form.Item
              label="width"
              name="width"
            >
              <InputNumber placeholder="默认" addonAfter={suffixSelector('widthSuffix')} />
            </Form.Item>

            <Form.Item
              label="height"
              name="height"
            >
              <InputNumber placeholder="默认" addonAfter={suffixSelector('heightSuffix')} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
              <Button type="primary" htmlType="submit">
                修改
              </Button>
              <Button type="default" onClick={reset} style={{ margin: '10px 30px' }}>
                重置
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="setstyle-text">
          <h2>代码块样式</h2>
          <TextArea
            autoSize
            placeholder="style对象代码"
            value={styleTextValue}
            style={{ minHeight: '100px' }}
            onChange={e => {
              let val = e.target.value;
              setStyleTextValue(val)
            }}
          />
          <Button type="primary" onClick={setStyleText} style={{ marginTop: '4px' }}>提交</Button>
        </div>
      </div>
    </div>);
};
export default ComponentEdit;
