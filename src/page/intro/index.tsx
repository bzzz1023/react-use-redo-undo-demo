import "./index.less";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useEffect, useState } from "react";
import Foo from "./utils";
import useCache from "../../utils/useCache";
import { Button } from "antd";
const App = () => {
  let [state, setState] = useState(1);

  const sleep = (delay: number) => {
    return new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, delay);
    });
  };

  const change = async () => {
    await sleep(1000);

    state++;
    setState(state);
    await sleep(1000);
    state++;
    setState(state);
    await sleep(2000);
    state++;
    setState(state);
  };

  return (
    <div className="intro-container">
      <Button onClick={change}>改变</Button>
      <div>num:{state}</div>
      <div style={{ fontWeight: 600 }}>介绍</div>
      <br />
      <div>
        撤销回退功能的本质是保存每个步骤的上下文，但是这个插件有以下不同点：
      </div>
      <br />
      <div>1、使用注册方法的机制，更精准的控制每一个步骤</div>
      <div>2、支持同步和异步操作</div>
      <div>3、根据函数返回状态，控制执行栈进退</div>
      <br />
      <div>注意：小心闭包函数引起的失误</div>
      <br />
      <div style={{ fontWeight: 600 }}>安装</div>

      <SyntaxHighlighter
        showLineNumbers={true}
        startingLineNumber={0}
        language={`jsx`}
        lineNumberStyle={{ color: "#ddd", fontSize: 16 }}
        wrapLines={true}
      >
        {`npm install react-use-redo-undo`}
      </SyntaxHighlighter>
      <div style={{ fontWeight: 600 }}>引入Hook</div>

      <SyntaxHighlighter
        showLineNumbers={true}
        startingLineNumber={0}
        language={`jsx`}
        lineNumberStyle={{ color: "#ddd", fontSize: 16 }}
        wrapLines={true}
      >
        {`
        import useRedo from 'react-use-redo-undo'

        const {
          registerCommand, // 注册方法
          redo, // 撤回
          undo, // 回退
          executeIndex, // 当前执行下标
          commandMap, // 保存方法的map
          commandQueue, // 执行栈
        } = useRedo();
        `}
      </SyntaxHighlighter>
      <br />
      <div style={{ fontWeight: 600 }}>注册方法函数</div>
      <br />
      <div>1、execute是闭包函数，导出redo和undo</div>
      <div>
        2、redo和undo可以是同步函数，也可以是异步函数，并且可以获取函数执行后的返回值
      </div>
      <SyntaxHighlighter
        showLineNumbers={true}
        startingLineNumber={0}
        language={`jsx`}
        lineNumberStyle={{ color: "#ddd", fontSize: 16 }}
        wrapLines={true}
      >
        {`
        registerCommand({
          commandName:"updateForm", // required
          execute:(params:any)=>{ // required
            redo: ()=>{
              // execute redo

              // if success
              return {executeSuccess:true,params:params} 
              // or return true
              // or 不return

              // if fail 必须
              return {executeSuccess:false,params:params} 
              // or return false
            },
            undo: ()=>{
              // execute undo
              return {executeSuccess:true,params:params}
            },
          },
          label:"更新表单"  // required
        })
        `}
      </SyntaxHighlighter>
      <div>注意：若是执行失败，需要保持当前执行栈，必须按照以下格式返回 </div>
      <SyntaxHighlighter
        showLineNumbers={true}
        startingLineNumber={0}
        language={`jsx`}
        lineNumberStyle={{ color: "#ddd", fontSize: 16 }}
        wrapLines={true}
      >
        {`
          return {
            executeSuccess:false
          }

          或者

          return false
        `}
      </SyntaxHighlighter>
      <br />
      <div style={{ fontWeight: 600 }}>触发注册事件</div>
      <br />
      <div>使用commandMap[commandName]触发</div>
      <SyntaxHighlighter
        showLineNumbers={true}
        startingLineNumber={0}
        language={`jsx`}
        lineNumberStyle={{ color: "#ddd", fontSize: 16 }}
        wrapLines={true}
      >
        {`
        //  调用注册方法，相当于执行redo
        const commandResData = commandMap.updateForm({})

        //  如果execute redo方法是异步的
        //  const commandResData = await commandMap.updateForm({})
        
        // 往前一步，并且可以拿到返回值
        const undoResData = undo()
        // 异步
        // const undoResData = await undo()

        // 往后一步，同理如上
        const redoResData = redo()
        `}
      </SyntaxHighlighter>
    </div>
  );
};

export default App;
