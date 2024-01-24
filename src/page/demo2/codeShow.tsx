import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const App = () => {
  return (
    <div>
      <br />
      <div style={{ fontSize: 16 }}>
        非受控组件的不同点在于，组件自身内部会维护数据，不需要在组件外部维护。
        <br />
        因此，用户修改表单的同时，组件内部会自动维护数据更新，此时，如果在commandMap.updateForm的redo里也更新表单，就会造成2次修改。
        <br />
        为了解决这个问题，在redo函数中不做任何操作，而是直接将参数返回
        <br />
        在下一次redo的时候，拿到redo的返回值，再更新表单
      </div>
      <SyntaxHighlighter
        showLineNumbers={true}
        startingLineNumber={0}
        language={`jsx`}
        lineNumberStyle={{ color: "#ddd", fontSize: 16 }}
        wrapLines={true}
      >
        {`
          // 关键步骤
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

          // 回退步骤，在这里更新表单
          const handleRedo = () => {
            const redoData: any = redo();
            const {
              params: { afterFormData },
            } = redoData;
            form.setFieldsValue(afterFormData);
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

          `}
      </SyntaxHighlighter>
    </div>
  );
};

export default App;
