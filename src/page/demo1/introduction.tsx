import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
const App = () => {
  return (
    <SyntaxHighlighter
      showLineNumbers={true}
      startingLineNumber={0}
      language={`jsx`}
      lineNumberStyle={{ color: "#ddd", fontSize: 16 }}
      wrapLines={true}
    >
      {`
        本质在于，在执行下一步的时候，记录当前和下一步的数据状态。
        但是，不同于普通的撤销和回退，而是使用注册方法的方式，精确的控制每一个步骤

        受控组件为例，开发者在组件外部维护好数据即可

        1、解构hook
        const {
          registerCommand, // 注册方法
          redo, // 撤回
          undo, // 回退
          executeIndex, // 当前执行下标
          commandMap, // 保存方法的map
          commandQueue, // 执行栈
        } = useRedo();

        2、registerCommand<ICommandParams> 注册执行方法
        interface IExecuteFunc {
          (params: any): { redo: Function; undo: Function };
        }
        
        interface ICommandParams {
          commandName: string;
          execute: IExecuteFunc;
          label?: string;
        }

        3、更新数据的时候，实际相当于执行execute里的redo方法（注意同步和异步）
        commandMap.updateForm({
          newData:newData,
          oldData: formData,
        });

     `}
    </SyntaxHighlighter>
  );
};

export default App;
