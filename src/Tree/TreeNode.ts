import { DoubleLinkedList, DoubleLinkedListNode } from "../DoubleLinkedList";

interface ITreeNode<T> {
  parent: TreeNode<T> | null;
  children?: DoubleLinkedList<TreeNode<T>>;
  data?: T;
}

class TreeNode<T> {
  private _parent: TreeNode<T> | null;
  /**
   * To save memory, if a node has no children then the children field is set to `undefined`, instead of `[]`.
   * The `[]` is an object, so it has a prototype which causes memory overhead.
   *
   * Not huge difference, but if there are thousands of leaf nodes then it makes a difference.
   * Based on my measurements, depending on the JS engine the overhead of one `[]` is between 30-100 bytes!
   *
   * This implementation used a linked list instead of an array, but similarly, this also has an overhead.
   * The empty list size consists of two `null` nodes, a `number` and a large prototype.
   * So this optimization makes even more sense here.
   *
   * The reason behind using linked lists instead of arrays for storing the children is to be able to
   * insert childs at any location, reorder and delete them, all in O(1) complexity.
   */
  private _children?: DoubleLinkedList<TreeNode<T>>;
  private _listReference?: DoubleLinkedListNode<TreeNode<T>>;
  private _data?: T;

  constructor(node: ITreeNode<T>) {
    this._parent = node.parent;
    this._children = node.children;
    this._data = node.data;
  }

  get parent(): TreeNode<T> | null {
    return this._parent;
  }

  get children(): DoubleLinkedList<TreeNode<T>> | undefined {
    return this._children;
  }

  set children(children: DoubleLinkedList<TreeNode<T>> | undefined) {
    this._children = children;
  }

  get data(): T | undefined {
    return this._data;
  }

  set data(data: T | undefined) {
    this._data = data;
  }

  get listReference(): DoubleLinkedListNode<TreeNode<T>> | undefined {
    return this._listReference;
  }

  setListReference(listReference: DoubleLinkedListNode<TreeNode<T>>) {
    this._listReference = listReference;
  }

  *childrenIterator() {
    if (this._children) {
      for (let child of this._children) {
        yield child.data;
      }
    }
  }
}

export default TreeNode;
