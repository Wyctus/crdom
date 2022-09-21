import DoubleLinkedListNode from "./DoubleLinkedListNode";

class DoubleLinkedList<T> {
  private _head: DoubleLinkedListNode<T> | null;
  private _tail: DoubleLinkedListNode<T> | null;
  private _size: number;

  constructor(data?: T) {
    if (data !== undefined) {
      // Initialized with first element
      const node: DoubleLinkedListNode<T> = {
        next: null,
        prev: null,
        data,
      };

      this._head = node;
      this._tail = node;

      this._size = 1;
    } else {
      // Initialized empty
      this._head = null;
      this._tail = null;

      this._size = 0;
    }
  }

  get tail(): DoubleLinkedListNode<T> | null {
    return this._tail;
  }

  get head(): DoubleLinkedListNode<T> | null {
    return this._head;
  }

  get size(): number {
    return this._size;
  }

  insertAfter(reference: DoubleLinkedListNode<T>, data: T): DoubleLinkedListNode<T> {
    const node: DoubleLinkedListNode<T> = {
      next: reference.next,
      prev: reference,
      data,
    };

    if (reference.next) reference.next.prev = node;
    reference.next = node;
    this._size++;

    return node;
  }

  insertBefore(reference: DoubleLinkedListNode<T>, data: T): DoubleLinkedListNode<T> {
    const node: DoubleLinkedListNode<T> = {
      next: reference,
      prev: reference.prev,
      data,
    };

    if (reference.prev) {
      reference.prev.next = node;
    } else {
      this._head = node;
    }
    reference.prev = node;
    this._size++;

    return node;
  }

  private insertFirstNode(data: T): DoubleLinkedListNode<T> {
    const node: DoubleLinkedListNode<T> = {
      next: null,
      prev: null,
      data,
    };

    this._tail = node;
    this._head = node;
    this._size++;

    return node;
  }

  insertAtTail(data: T): DoubleLinkedListNode<T> {
    if (this._tail === null) {
      return this.insertFirstNode(data);
    }

    const node = this.insertAfter(this._tail, data);
    this._tail = node;
    return node;
  }

  insertAtHead(data: T): DoubleLinkedListNode<T> {
    if (this._head === null) {
      return this.insertFirstNode(data);
    }

    const node = this.insertBefore(this._head, data);
    this._head = node;
    return node;
  }

  clear(): void {
    this._head = null;
    this._tail = null;
    this._size = 0;
    // The nodes has are unreferenced now, so they are going to be garbage collected.
  }

  reverse(): void {
    let prev = null;
    let current = this._head;
    let next = null;

    while (current != null) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this._head = prev;
  }

  delete(node: DoubleLinkedListNode<T>): void {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this._head = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this._tail = node.prev;
    }

    this._size--;
  }

  swap(node1: DoubleLinkedListNode<T>, node2: DoubleLinkedListNode<T>): void {
    if (node1.prev === null) {
      // node1 is the head, but it was swapped, so node2 is the new head
      this._head = node2;
    }

    if (node2.prev === null) {
      // node2 is the head, but it was swapped, so node1 is the new head
      this._head = node1;
    }

    if (node1.next === null) {
      // node1 is the tail, but it was swapped, so node2 is the new tail
      this._tail = node2;
    }

    if (node2.next === null) {
      // node2 is the tail, but it was swapped, so node1 is the new tail
      this._tail = node1;
    }

    const tmpNext = node1.next;
    node1.next = node2.next;
    if (tmpNext) tmpNext.prev = node2;
    if (node2.next) node2.next.prev = node1;
    node2.next = tmpNext;

    const tmpPrev = node1.prev;
    node1.prev = node2.prev;
    if (tmpPrev) tmpPrev.next = node2;
    if (node2.prev) node2.prev.next = node1;
    node2.prev = tmpPrev;
  }

  private unlink(node: DoubleLinkedListNode<T>): void {
    if (node.next !== null) {
      node.next.prev = node.prev;
    } else {
      // `node` was the tail
      this._tail = node.prev;
    }

    if (node.prev !== null) {
      node.prev.next = node.next;
    } else {
      // `node` was the head
      this._head = node.next;
    }
  }

  moveAfter(node: DoubleLinkedListNode<T>, location: DoubleLinkedListNode<T>): void {
    // if node and location are the same then we can ignore this move, since it's useless
    if (node === location) return;

    // unlink the node from its original location
    this.unlink(node);

    // linking to the new position
    if (location.next) {
      node.next = location.next;
      node.prev = location;
      location.next.prev = node;
      location.next = node;
    } else {
      // becomes the new tail
      this._tail = node;
      node.next = null;
      node.prev = location;
      location.next = node;
    }
  }

  moveBefore(node: DoubleLinkedListNode<T>, location: DoubleLinkedListNode<T>): void {
    // if node and location are the same then we can ignore this move, since it's useless
    if (node === location) return;

    // unlink the node from its original location
    this.unlink(node);

    // linking to the new position
    if (location.prev) {
      node.next = location;
      node.prev = location.prev;
      location.prev.next = node;
      location.prev = node;
    } else {
      // becomes the new head
      this._head = node;
      node.prev = null;
      node.next = location;
      location.prev = node;
    }
  }

  [Symbol.iterator]() {
    let current = this._head;

    return {
      next: () => {
        const n = {
          value: current as DoubleLinkedListNode<T>,
          done: current === null,
        };

        if (current !== null) {
          current = current.next;
        }

        return n;
      },
    };
  }
}

export default DoubleLinkedList;
