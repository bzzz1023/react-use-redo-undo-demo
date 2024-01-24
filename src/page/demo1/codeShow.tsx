import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const App = () => {
  return (
    <div>
      <div style={{ fontSize: 16 }}>
        受控组件比较常规，开发者在组件外部维护数据的增删改查
      </div>
      <SyntaxHighlighter
        showLineNumbers={true}
        startingLineNumber={0}
        language={`jsx`}
        lineNumberStyle={{ color: "#ddd", fontSize: 16 }}
        wrapLines={true}
      >
        {`
      const App = () => {
            // export fcuntion from hook
            const {
              registerCommand,
              redo,
              undo,
              executeIndex,
              commandMap,
              commandQueue,
            } = useRedo();

            // maintain form data state
            const [formData, setFormData] = useState({
              selectValue: ["a10"],
              switchValue: false,
              numberValue: 0,
            });

            // update form data function
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
          
            // register command function
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
                        // if execute fail, you must and have to return false
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
                label: "updateForm",
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
                        style={{ width: "30%" }}
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
                <CodeShow />
              </div>
            );


      }

    `}
      </SyntaxHighlighter>
    </div>
  );
};

export default App;
