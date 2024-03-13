interface IData {
  key: string;
  [propName: string]: any;
}

export class Node {
  data: IData;
  next: any;
  prev: any;

  constructor(data: IData) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList {
  head: any;
  tail: any;

  constructor(array: any) {
    this.head = null;
    this.tail = null;
    this.array2Link(array);
  }

  append(data: IData) {
    const newNode: any = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.tail.next = this.head; // make it circular
    this.head.prev = this.tail;
  }

  array2Link(array: any) {
    array.forEach((item: any) => {
      this.append(item);
    });
  }

  // 寻找2个节点的最短路径
  findShortestPathAndDir(startKey: string, endKey: string) {
    let currentNext = this.head;
    let currentPrev = this.tail;
    let step = 0;

    if (!startKey || !endKey) return;

    if (startKey === endKey) return;

    while (
      currentNext.data.key !== startKey &&
      currentPrev.data.key !== startKey
    ) {
      currentNext = currentNext.next;
      currentPrev = currentPrev.prev;
    }
    // 找到起始点
    currentNext = currentPrev =
      currentNext.data.key === startKey ? currentNext : currentPrev;

    // 开始寻找第二个点
    while (currentNext.data.key !== endKey && currentPrev.data.key !== endKey) {
      currentNext = currentNext.next;
      currentPrev = currentPrev.prev;
      step++;
    }
    // 方向，右为1，左为-1
    let direction = currentNext.data.key === endKey ? 1 : -1;
    return {
      step,
      direction,
    };
  }
}
