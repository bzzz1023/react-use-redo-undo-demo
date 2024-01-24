import { useEffect, useState } from "react";
import RedoController from "../../component/redoController";
import useRedo from "react-use-redo-undo";
import { Select, Switch, InputNumber, Spin } from "antd";
import "./index.less";
import CodeShow from "./codeShow";
import Introduction from './introduction'

const selectOptions: any = [];
for (let i = 10; i < 36; i++) {
  selectOptions.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const mockSubmitFormApi = async (flag = true) => {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        code: flag ? 200 : 400,
      });
    }, 300);
  });
};

const App = () => {
  const {
    registerCommand,
    redo,
    undo,
    executeIndex,
    commandMap,
    commandQueue,
  } = useRedo();

  const [spinLoad, setSpinLoad] = useState(false);

  const [formData, setFormData] = useState({
    selectValue: ["a10"],
    switchValue: false,
    numberValue: 0,
  });

  const updateFormData = async (key: string, value: any) => {
    const newData = {
      ...formData,
      [key]: value,
    };
    
    // this step equals execute redo function
    const res: any = await commandMap.updateForm({
      newData,
      oldData: formData,
      changeKey: key,
      changeValue: value,
    });
    console.log("command data === ", res);
  };

  // 注册事件
  const initialRegisterCommand = () => {
    registerCommand({
      commandName: "updateForm",
      execute: (params: any) => {
        return {
          redo: async () => {
            const { newData } = params;
            setSpinLoad(true);
            const res: any = await mockSubmitFormApi(true);
            setSpinLoad(false);
            if (res.code === 200) {
              setFormData(newData);
            } else {
              return false;
            }
          },
          undo: async () => {
            const { oldData } = params;
            setSpinLoad(true);
            const res: any = await mockSubmitFormApi(true);
            setSpinLoad(false);
            if (res.code === 200) {
              setFormData(oldData);
            } else {
              // if execute fail, you must and have to return false
              return false;
            }
          },
        };
      },
      label: "更新表单",
    });
  };

  const handleRedo = async () => {
    const data = await redo();
    console.log("redo data === ", data);
  };

  const handleUndo = async () => {
    const data = await undo();
    console.log("undo data === ", data);
  };

  useEffect(() => {
    initialRegisterCommand();
  }, []);

  return (
    <div className="demo-one-container">
      <div className="demo-container">
        <div style={{ width: 240 }}>
          <RedoController
            redo={handleRedo}
            undo={handleUndo}
            executeIndex={executeIndex}
            commandQueue={commandQueue}
          />
        </div>
        <div className="form-container">
          <div className="form-item">
            <div>Select:</div>
            <Select
              mode="multiple"
              style={{ width: "80%" }}
              onChange={(e) => {
                updateFormData("selectValue", e);
              }}
              value={formData.selectValue}
              options={selectOptions}
            />
          </div>
          <div className="form-item">
            <div>Switch:</div>
            <Switch
              value={formData.switchValue}
              onChange={(e) => {
                updateFormData("switchValue", e);
              }}
            />
          </div>
          <div className="form-item">
            <div>Number:</div>
            <InputNumber
              value={formData.numberValue}
              onChange={(e) => {
                updateFormData("numberValue", e);
              }}
            />
          </div>
          {spinLoad && <Spin className="spin-container" spinning={spinLoad} />}
        </div>
      </div>
      {/* <div className="introduction-box">
        <Introduction />
      </div> */}
      <CodeShow />
    </div>
  );
};
export default App;
