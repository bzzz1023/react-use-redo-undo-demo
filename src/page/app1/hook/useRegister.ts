import { useEffect, useState, useRef } from "react";

import useHandle from "./useHandle";
import useCommand from "./useCommand";

const registerCommand = ({
  quesList,
  setQuesList,
  loading,
  setLoading,
  cardDetailData,
  setCardDetailData,
  commandMap,
  registerCommand,
}: any) => {
  const {  addCard, removeCard } = useHandle({ setLoading });

  const { addCardCommand } = useCommand({ commandMap });

  useEffect(() => {
    registerCommand({
      commandName: "AddCard",
      execute: (params: any) => {
        let id: string | null = null;
        return {
          redo: async () => {
            // 这里需要后端配合-软删除，id不变
            if (!id) {
              const res:any = await addCard(params);
            } else {
              
            }
            // 第一次新增
            // 取消删除
          },
          undo: async () => {
            const res = removeCard(params);
            return res;
          },
        };
      },
      label: "新增卡片",
    });
  }, []);

  return {
    addCardCommand,
  };
};

export default registerCommand;
