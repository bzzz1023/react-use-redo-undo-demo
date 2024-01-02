/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useRef, useState } from "react";

interface ICommandMap {
  [propName: string]: (param: any) => any;
}

interface IExecuteFunc {
  (params: any): { redo: Function; undo: Function };
}

interface ICommandParams {
  commandName: string;
  execute: IExecuteFunc;
  label?: string;
}

interface ICommand {
  commandName: string;
  redo: Function;
  undo: Function;
  label?: string;
}

interface IExecuteRes {
  executeSuccess: boolean;
  params: any;
}

const isObject = (obj: {}) => {
  return Object.prototype.toString.call(obj) === "[object Object]";
};

function isAsyncFunction(fn: any) {
  return fn[Symbol.toStringTag] === "AsyncFunction";
}

export default () => {
  const [commandMap, setCommandMap] = useState<ICommandMap>({} as ICommandMap);

  let [currentCommandIndex, setCurrentCommandIndex] = useState(-1);

  let [commandQueue, setCommandQueue] = useState<ICommand[]>([]);

  const getSuccessFlag = (executeRes: IExecuteRes) => {
    return (
      executeRes === undefined ||
      executeRes.toString() === "true" ||
      (isObject(executeRes) && executeRes.executeSuccess)
    );
  };

  const getFailFlag = (executeRes: IExecuteRes) => {
    return (
      (executeRes !== undefined && executeRes.toString()) === "false" ||
      (isObject(executeRes) && !executeRes.executeSuccess) ||
      false
    );
  };

  const registerCommand = (command: ICommandParams) => {
    const { commandName, execute, label } = command;
    commandMap[commandName] = (params: any) => {
      try {
        const { redo, undo } = execute(params);
        const executeFunc = (executeRes: IExecuteRes) => {
          const successFlag = getSuccessFlag(executeRes);
          const failFlag = getFailFlag(executeRes);
          if (successFlag) {
            setCurrentCommandIndex((preCurrentCommandIndex: number) => {
              setCommandQueue((preCommandQueue: ICommand[]) => {
                const newCommandQueue = preCommandQueue.slice(
                  0,
                  preCurrentCommandIndex + 1
                );
                const newCommand = {
                  commandName,
                  redo,
                  undo,
                  label,
                };
                return [...newCommandQueue, newCommand];
              });
              return preCurrentCommandIndex + 1;
            });
            return { executeSuccess: true, params, commandName };
          } else if (!failFlag) {
            return { executeSuccess: false, params, commandName };
          } else {
            const msg = `something is wrong with returned value`;
            throw new Error(`${msg}`);
          }
        };

        if (isAsyncFunction(redo)) {
          return new Promise((res) => {
            redo().then((data: any) => {
              res(executeFunc(data));
            });
          });
        } else {
          return executeFunc(redo());
        }
      } catch (error) {
        console.log(`${error}`);
      }
    };
    setCommandMap({ ...commandMap });
  };

  const redo = () => {
    try {
      const funcMap = commandQueue[currentCommandIndex + 1];
      if (!funcMap) return;
      const { redo, commandName } = funcMap;
      const executeFunc = (executeRes: IExecuteRes) => {
        const successFlag = getSuccessFlag(executeRes);
        const failFlag = getFailFlag(executeRes);
        const customParams = (isObject(executeRes) && executeRes.params) || {};

        if (successFlag) {
          setCurrentCommandIndex((preCurrentCommandIndex: number) => {
            return preCurrentCommandIndex + 1;
          });
          return {
            executeSuccess: true,
            params: customParams,
            commandName,
          };
        } else if (!failFlag) {
          return {
            executeSuccess: false,
            params: customParams,
            commandName,
          };
        } else {
          const msg = `something is wrong with returned value`;
          throw new Error(`${msg}`);
        }
      };
      if (isAsyncFunction(redo)) {
        return new Promise((res) => {
          redo().then((data: any) => {
            res(executeFunc(data));
          });
        });
      } else {
        return executeFunc(redo());
      }
    } catch (error) {
      console.log(`Redo Error - ${error}`);
    }
  };

  const undo = () => {
    try {
      const funcMap = commandQueue[currentCommandIndex];
      if (!funcMap) return;
      const { undo, commandName } = funcMap;
      const executeFunc = (executeRes: IExecuteRes) => {
        const successFlag = getSuccessFlag(executeRes);
        const failFlag = getFailFlag(executeRes);
        const customParams = (isObject(executeRes) && executeRes.params) || {};
        if (successFlag) {
          setCurrentCommandIndex((preCurrentCommandIndex: number) => {
            return preCurrentCommandIndex - 1;
          });
          return {
            executeSuccess: true,
            params: customParams,
            commandName,
          };
        } else if (!failFlag) {
          return {
            executeSuccess: false,
            params: customParams,
            commandName,
          };
        } else {
          const msg = `something is wrong with returned value`;
          throw new Error(`${msg}`);
        }
      };

      if (isAsyncFunction(undo)) {
        return new Promise((res) => {
          undo().then((data: any) => {
            res(executeFunc(data));
          });
        });
      } else {
        return executeFunc(undo());
      }
    } catch (error) {
      console.log(`Undo Error - ${error}`);
    }
  };

  return {
    registerCommand,
    currentCommandIndex,
    commandQueue,
    commandMap,
    redo,
    undo,
  };
};
