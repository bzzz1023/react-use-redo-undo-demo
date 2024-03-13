import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { DoublyLinkedList } from "./array2DouCirLink";

const directionMap: any = {
  left: 1,
  right: 0,
  top: -0.5,
  bottom: 0.5,
};

const RotateMenu: React.FC<any> = (userProps) => {
  const { items, selectedKey, direction, width, onSelect } = userProps;
  // 存储当前key
  const currentKeyRef = useRef<string | null>(null);
  const [angle, setAngle] = useState(0);

  // 存储循环队列
  const loopList = useRef<any>({});

  // 每一个圆圈的样式
  const getMenuItemClass = (key: string) => {
    const cls = `menu-item-box ${selectedKey === key ? "item-active" : ""}`;
    return cls;
  };

  const setLoopList = (arr: any) => {
    const circularLinkedList = new DoublyLinkedList(arr);
    loopList.current = circularLinkedList;
  };

  // 推导
  const onChangeAngle = (key: string) => {
    if (key === currentKeyRef.current) {
      return;
    }
    const nextIndex: number = items.findIndex((e: any) => {
      return e.key === key;
    });
    let curIndex: number = items.findIndex((e: any) => {
      return e.key === currentKeyRef.current;
    });

    // 默认初始位置
    curIndex = curIndex === -1 ? 0 : curIndex;
    const pivot = items.length / 2;

    const step =
      Math.abs(nextIndex - curIndex) <= pivot
        ? Math.abs(nextIndex - curIndex)
        : items.length - Math.abs(nextIndex - curIndex);

    let t: number;
    // 下标在pivot同侧
    // 右转为 1，左 -1
    if (Math.abs(nextIndex - curIndex) <= pivot) {
      t = nextIndex > curIndex ? -1 : 1;
    } else {
      t = nextIndex > curIndex ? 1 : -1;
    }
    setAngle(angle + (360 / items.length) * step * t);
    currentKeyRef.current = key;
  };

  // 双方循环链表
  const handleChangeAngle = (key: string) => {
    let endKey = currentKeyRef.current || items[0].key;
    const data = loopList.current.findShortestPathAndDir(key, endKey);
    if (!data) return;
    const { step, direction } = data;
    setAngle(angle + (360 / items.length) * step * direction);
    currentKeyRef.current = key;
  };

  useEffect(()=>{
    setLoopList(items)
  },[])

  useEffect(() => {
    selectedKey && handleChangeAngle(selectedKey);
  }, [selectedKey]);

  return (
    <div className="awesome-cool-rotate-menu">
      <div
        className="menu-box"
        style={{
          transform: `rotate(${angle}deg)`,
          transition: `all 1s`,
        }}
      >
        {items.map((element: any, index: number) => {
          let radius = (width as number) || 120;
          let n = items.length;
          const angleIncrement = (2 * Math.PI) / n;
          const initialAngle = Math.PI * directionMap[direction || "right"];
          const itemAngle = initialAngle + index * angleIncrement;
          const x = radius * Math.cos(itemAngle);
          const y = radius * Math.sin(itemAngle);
          return (
            <div
              key={index}
              className={`${getMenuItemClass(element.key)}`}
              onClick={() => {
                onSelect(element.key);
              }}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%) rotate(${-1 * angle}deg)`,
              }}
            >
              {element.key}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RotateMenu;
