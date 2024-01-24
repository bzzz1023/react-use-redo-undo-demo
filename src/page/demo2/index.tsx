import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import RedoController from "../../component/redoController";
import useRedo from "react-use-redo-undo";
import "./index.less";
import CodeShow from "./codeShow";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const App: React.FC = () => {
  const [form] = Form.useForm();

  const [formState, setFormState] = useState({
    username: undefined,
    password: undefined,
  });

  const {
    registerCommand,
    redo,
    undo,
    executeIndex,
    commandMap,
    commandQueue,
  } = useRedo();

  const updateFormData = async (item: any, items: any) => {
    const _key = item[0].name[0];
    const _value = item[0].value;
    const formObj: any = {};
    items.forEach((e: any) => {
      const _key = e.name[0];
      const _value = e.value;
      formObj[_key] = _value;
    });
    
    // 这一步相当于保存变量，并没有执行实际操作
    commandMap.updateForm({
      updateKey: _key,
      updateValue: _value,
      beforeFormData: formState,
      afterFormData: formObj,
    });
    setFormState(formObj);
  };

  const handleRedo = () => {
    const redoData: any = redo();
    const {
      params: { afterFormData },
    } = redoData;
    form.setFieldsValue(afterFormData);
  };

  const handleUndo = () => {
    undo();
  };

  const initialRegisterCommand = () => {
    registerCommand({
      commandName: "updateForm",
      execute: (params: any) => {
        return {
          redo: () => {
            // 这里不做任何操作，直接返回
            return { executeSuccess: true, params };
          },
          undo: () => {
            const { beforeFormData } = params;
            form.setFieldsValue(beforeFormData);
          },
        };
      },
      label: "更新表单",
    });
  };

  useEffect(() => {
    initialRegisterCommand();
  }, []);

  return (
    <div className="demo2-out-container">
      <div className="demo-container">
        <div style={{ width: 240 }}>
          <RedoController
            undo={handleUndo}
            redo={handleRedo}
            executeIndex={executeIndex}
            commandQueue={commandQueue}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFieldsChange={updateFormData}
          >
            <Form.Item<FieldType> label="Username" name="username">
              <Input />
            </Form.Item>
            <Form.Item<FieldType> label="Password" name="password">
              <Input />
            </Form.Item>
          </Form>
        </div>
      </div>
      <CodeShow />
    </div>
  );
};

export default App;
