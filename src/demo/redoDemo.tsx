import { useEffect, useState } from "react";
import useRedo from "./undo";
import "./index.less";
import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Upload,
} from "antd";

const mockApi = async (code = 200) => {
  return new Promise((res, _) => {
    setTimeout(() => {
      res({
        code,
      });
    }, 200);
  });
};

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const App = () => {
  const {
    registerCommand,
    redo,
    undo,
    currentCommandIndex,
    commandMap,
    commandQueue,
  } = useRedo();
  const [form] = Form.useForm();

  // record current form data
  const [formData, setFormData] = useState({
    inputNumber: 2,
    switch: false,
    radioGroup: "a",
    radioButton: "b",
    checkboxGroup: ["A", "B"],
    rate: 1,
  });

  // 注册事件
  const initialRegisterCommand = () => {
    registerCommand({
      commandName: "updateForm",
      execute: (params: any) => {
        return {
          redo: async () => {
            // const { newData } = params;
            // mock api fail
            // form.setFieldsValue(newData);
            // return
			// 获取当前
			// const code =
            const data: any = await mockApi();
            if (data.code === 200) {
              return { executeSuccess: true, params };
            } else {
              return { executeSuccess: false, params };
            }
          },
          undo: () => {
            const { oldData } = params;
            form.setFieldsValue(oldData);
          },
        };
      },
      label: "updateForm",
    });
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const onFieldsChange = async (changeField: any, allFields: any) => {
    const tempFormData: any = {};
    allFields.forEach((item: any) => {
      const key = item.name[0];
      const value = item.value;
      tempFormData[key] = value;
    });
    const data = await commandMap.updateForm({
      oldData: formData,
      newData: tempFormData,
    });
    console.log(112233, data);

    setFormData({
      ...tempFormData,
    });
  };

  useEffect(() => {
    form.setFieldsValue(formData);
    initialRegisterCommand();
  }, []);

  return (
    <div className="redo-demo-container">
      {/* 控制 */}
      <div>
        <div>
          <div>
            <Button
              onClick={async () => {
                const res: any = await redo();
                if (res === undefined) {
                  return;
                }

                const {
                  params: { newData },
                } = res;
                form.setFieldsValue(newData);
              }}
            >
              Redo
            </Button>
          </div>

          <div>
            <Button
              onClick={async () => {
                const res: any = await undo();
              }}
            >
              Undo
            </Button>
          </div>
        </div>
        <div>index==={currentCommandIndex}</div>
        {commandQueue.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={
                currentCommandIndex < index ? "undo-normal" : "undo-light"
              }
            >
              <div>
                {index}:{item.label}
              </div>
            </div>
          );
        })}
      </div>
      {/* 表单 */}
      <div>
        <Form
          form={form}
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          onFieldsChange={onFieldsChange}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="InputNumber">
            <Form.Item name="inputNumber" noStyle>
              <InputNumber min={1} max={10} />
            </Form.Item>
            <span className="ant-form-text" style={{ marginLeft: 8 }}>
              machines
            </span>
          </Form.Item>

          <Form.Item name="switch" label="Switch" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="radioGroup" label="Radio.Group">
            <Radio.Group>
              <Radio value="a">item 1</Radio>
              <Radio value="b">item 2</Radio>
              <Radio value="c">item 3</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="radioButton"
            label="Radio.Button"
            rules={[{ required: true, message: "Please pick an item!" }]}
          >
            <Radio.Group>
              <Radio.Button value="a">item 1</Radio.Button>
              <Radio.Button value="b">item 2</Radio.Button>
              <Radio.Button value="c">item 3</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="checkboxGroup" label="Checkbox.Group">
            <Checkbox.Group>
              <Row>
                <Col span={8}>
                  <Checkbox value="A" style={{ lineHeight: "32px" }}>
                    A
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="B" style={{ lineHeight: "32px" }}>
                    B
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="C" style={{ lineHeight: "32px" }}>
                    C
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="D" style={{ lineHeight: "32px" }}>
                    D
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="E" style={{ lineHeight: "32px" }}>
                    E
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="F" style={{ lineHeight: "32px" }}>
                    F
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item name="rate" label="Rate">
            <Rate />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="reset">reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default App;
