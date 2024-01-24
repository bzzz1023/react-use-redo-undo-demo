import "./index.less";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useEffect, useState } from "react";
import Foo from "./utils";
import useCache from "../../utils/useCache";
import { Button } from "antd";
const App = () => {
  useEffect(() => {}, []);
  return (
    <div className="intro-container">
      <div style={{ fontWeight: 600 }}>介绍</div>
      <div>
        撤销回退功能的本质是保存每一步的上下文，但是这个插件有以下不同点：
      </div>
      <div>1、使用注册方法的机制，更精准的控制每一个步骤</div>
      <div>2、支持同步和异步操作</div>
      <div>3、根据接口返回状态，控制是否撤销或退回</div>
      <br />
      <div>注意：小心闭包引起的失误</div>
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
      <div>
        提醒：若是执行失败，必须要返回
        {JSON.stringify({ executeSuccess: false })}
        （executeSuccess必须返回false，执行栈才会保持当前状态）
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
              return {executeSuccess:true,params:params}
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
      <br />
      <div style={{ fontWeight: 600 }}>触发注册事件</div>
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
