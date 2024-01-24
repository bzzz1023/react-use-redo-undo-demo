import { useEffect, useState, useRef } from "react";
import "./index.less";
import RedoController from "../../component/redoController";
// import useRedo from "../../utils/undo";
import useRedo from "react-use-redo-undo";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import QuesCard from "./components/QuesCard";
import { Button, Switch } from "antd";
import AddModal from "./components/AddModal";
import CardDetail from "./components/CardDetail";
import Loading from "./components/Loading";
import { add, updateOrDelete } from "./api";

const App = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [cardDetailData, setCardDetailData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const [quesList, setQuesList] = useState([
    { id: 1, name: "运动1", sort: 1, content: "" },
    { id: 2, name: "去医院2", sort: 2, content: "" },
    { id: 3, name: "去工作3", sort: 3, content: "" },
    { id: 4, name: "和朋友吃饭4", sort: 4, content: "" },
  ]);

  const {
    registerCommand,
    redo,
    undo,
    executeIndex,
    commandMap,
    commandQueue,
  } = useRedo();

  // 显示详情
  const showCardDetail = (item: any) => {
    setCardDetailData({
      ...item,
    });
  };

  const handleOk = async (value: any) => {
    // id由服务端生成，先拿到id
    setLoading(true);
    const res: any = await add(value);
    setLoading(false);
    // 再增加数据
    commandMap.AddCard({
      ...res.data,
      sort: quesList.length + 1,
    });
  };

  // 新增卡片
  const addCard = (data: any) => {
    setQuesList((preData) => {
      return [...preData, data];
    });
  };

  // 删除卡片
  const removeCard = (id: any) => {
    setQuesList((preData: any) => {
      return preData.filter((item: any) => {
        return item.id !== id;
      });
    });
  };

  const handleCancel = () => {
    setAddModalOpen(false);
  };

  // 删除
  const delCardCommand = async (id: string) => {
    console.log(id);
    const item = quesList.filter((item: any) => {
      return item.id === id;
    });
    await commandMap.DelCard(item[0]);
  };

  const moveCardCommand = (result: any) => {
    if (!result.destination) {
      return;
    }
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    if (startIndex === endIndex) return;
    commandMap.moveCard({ startIndex, endIndex });
  };

  // 拖拽结束
  const moveCardHandle = (startIndex: number, endIndex: number) => {
    setQuesList((preData: any) => {
      const tempQuesList = [...preData];
      const [removed] = tempQuesList.splice(startIndex, 1);
      tempQuesList.splice(endIndex, 0, removed);
      tempQuesList.forEach((item: any, index: number) => {
        item.sort = index + 1;
      });
      return tempQuesList;
    });
  };

  const updateCardCommand = async (newData: any) => {
    await commandMap.updateCard({
      before: cardDetailData,
      after: newData,
    });
  };

  // 更新卡片
  const updateCard = async (params: any) => {
    const { id, ...args } = params;
    setLoading(true);
    const res: any = await updateOrDelete(id);
    setLoading(false);
    if (res.code === 200) {
      // 更新list
      setQuesList((preList: any) => {
        const newList = preList.map((item: any) => {
          if (item.id === id) {
            const updatedItem = {
              ...item,
              ...args,
            };
            return updatedItem;
          }
          return item;
        });
        // 更新弹窗卡片
        setCardDetailData((preCard: any) => {
          return params;
        });
        return newList;
      });
    }
    return res;
  };

  // 注册函数
  const initialRegisterCommand = () => {
 
    registerCommand({
      commandName: "AddCard",
      execute: (params: any) => {
        return {
          redo: () => {
            // 这里需要后端配合-软删除
            // 因为id不变
            addCard(params);
          },
          undo: async () => {
            const { id } = params;
            setLoading(true);
            const res: any = await updateOrDelete(id);
            setLoading(false);
            if (res.code === 200) {
              removeCard(id);
              setCardDetailData({});
            }
          },
        };
      },
      label: "新增卡片",
    });

    registerCommand({
      commandName: "DelCard",
      execute: (params: any) => {
        return {
          redo: async () => {
            const { id } = params;
            setLoading(true);
            const res: any = await updateOrDelete(id);
            setLoading(false);
            if (res.code === 200) {
              removeCard(id);
              setCardDetailData({});
            } else {
              return false;
            }
          },
          undo: async () => {
            console.log(params);
            setLoading(true);
            const res: any = await add(params);
            setLoading(false);
            if (res.code === 200) {
              setQuesList((preList: any) => {
                const newArray = preList.slice();
                newArray.splice(params.sort - 1, 0, params);
                return newArray;
              });
              setCardDetailData(params);
            } else {
              return false;
            }
          },
        };
      },
      label: "删除卡片",
    });

    registerCommand({
      commandName: "moveCard",
      execute: (params: any) => {
        const { startIndex, endIndex } = params;
        return {
          redo: () => {
            moveCardHandle(startIndex, endIndex);
          },
          undo: () => {
            moveCardHandle(endIndex, startIndex);
          },
        };
      },
      label: "移动顺序",
    });

    registerCommand({
      commandName: "updateCard",
      execute: (params: any) => {
        return {
          redo: async () => {
            const { after } = params;
            const res = await updateCard(after);
            return {
              executeSuccess: res.code === 200,
              ...params,
            };
          },
          undo: async () => {
            const { before } = params;
            const res = await updateCard(before);
            return {
              executeSuccess: res.code === 200,
              ...params,
            };
          },
        };
      },
      label: "更新卡片",
    });
  };

  useEffect(() => {
    initialRegisterCommand();
  }, []);

  return (
    <div className="demo-three-container">
      <Loading loading={loading} />
      <AddModal
        addModalOpen={addModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <div className="left-controller">
        <RedoController
          redo={redo}
          undo={undo}
          executeIndex={executeIndex}
          commandQueue={commandQueue}
        />
      </div>
      <div className="right-demo">
        <div className="left-box">
          <div>
            模拟接口成功或者失败&nbsp;&nbsp;
            <Switch
              defaultValue={true}
              onChange={(e) => {
                window.apiStatus = e;
              }}
            />
          </div>
          <div>
            <Button
              onClick={() => {
                setAddModalOpen(true);
              }}
            >
              新增
            </Button>
          </div>
          <DragDropContext onDragEnd={moveCardCommand}>
            <Droppable droppableId="droppable">
              {(provided: any, snapshot: any) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {quesList.map((item: any, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={`${item.id}`}
                      index={index}
                    >
                      {(provided: any, snapshot: any) => {
                        return (
                          <div
                            id={`ques-card-${item.id}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => {
                              showCardDetail(item);
                            }}
                          >
                            <QuesCard
                              {...item}
                              activeId={cardDetailData?.id}
                              delCard={delCardCommand}
                            />
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div
          className={`right-box ${
            !!cardDetailData?.id ? "right-box-open" : "right-box-close"
          }`}
        >
          <CardDetail {...cardDetailData} update={updateCardCommand} />
        </div>
      </div>
    </div>
  );
};

export default App;
