import { DoubleLinkedList, DoubleLinkedListNode } from "../DoubleLinkedList";
import TreeNode from "./TreeNode";

class Tree<T> {
  private _root: TreeNode<T>;

  constructor(data?: T) {
    this._root = new TreeNode<T>({
      parent: null,
      children: undefined,
      data,
    });
  }

  get root(): TreeNode<T> {
    return this._root;
  }

  insertAtNodeEnd(node: TreeNode<T>, data: T): TreeNode<T> {
    const newNode: TreeNode<T> = new TreeNode({
      parent: node,
      children: undefined,
      data,
    });

    if (node.children !== undefined) {
      const listElement = node.children.insertAtTail(newNode);
      newNode.setListReference(listElement);
    } else {
      node.children = new DoubleLinkedList(newNode);
      newNode.setListReference(node.children.head as DoubleLinkedListNode<TreeNode<T>>);
    }

    return newNode;
  }

  insertAtNodeStart(node: TreeNode<T>, data: T): TreeNode<T> {
    const newNode: TreeNode<T> = new TreeNode({
      parent: node,
      children: undefined,
      data,
    });

    if (node.children !== undefined) {
      const listElement = node.children.insertAtHead(newNode);
      newNode.setListReference(listElement);
    } else {
      node.children = new DoubleLinkedList(newNode);
      newNode.setListReference(node.children.head as DoubleLinkedListNode<TreeNode<T>>);
    }

    return newNode;
  }

  insertAtRootEnd(data: T): TreeNode<T> {
    return this.insertAtNodeEnd(this._root, data);
  }

  insertAtRootStart(data: T): TreeNode<T> {
    return this.insertAtNodeStart(this._root, data);
  }

  /**
   * Moves the `node` and the subtree under it to the parent of the `location` node,
   * so `node` and `location` become siblings and `node` will be on the right of `location`.
   *
   * @param node Node to move.
   * @param location Node to move to.
   */
  moveAfterNode(node: TreeNode<T>, location: TreeNode<T>): void {
    if (node.listReference !== undefined && location.listReference !== undefined) {
      location.parent?.children?.moveAfter(node.listReference, location.listReference);
    }
  }

  /**
   * Moves the `node` and the subtree under it to the parent of the `location` node,
   * so `node` and `location` become siblings and `node` will be on the left of `location`.
   *
   * @param node Node to move.
   * @param location Node to move to.
   */
  moveBeforeNode(node: TreeNode<T>, location: TreeNode<T>): void {
    if (node.listReference !== undefined && location.listReference !== undefined) {
      location.parent?.children?.moveBefore(node.listReference, location.listReference);
    }
  }

  insertAfterNode(location: TreeNode<T>, data: T): TreeNode<T> {
    if (location.parent === null) {
      throw new Error("You cannot insert after the root in a tree, since it has no parent!");
    }

    const newNode: TreeNode<T> = new TreeNode({
      parent: location.parent,
      children: undefined,
      data,
    });

    // `children` is not undefined, since `location` is a child of `location.parent`.
    const children = location.parent?.children as unknown as DoubleLinkedList<TreeNode<T>>;

    const listReference = children.insertAfter(location.listReference as unknown as DoubleLinkedListNode<TreeNode<T>>, newNode);
    newNode.setListReference(listReference);

    return newNode;
  }

  insertBeforeNode(location: TreeNode<T>, data: T): TreeNode<T> {
    if (location.parent === null) {
      throw new Error("You cannot insert before the root in a tree, since it has no parent!");
    }

    const newNode: TreeNode<T> = new TreeNode({
      parent: location.parent,
      children: undefined,
      data,
    });

    // `children` is not undefined, since `location` is a child of `location.parent`.
    const children = location.parent?.children as unknown as DoubleLinkedList<TreeNode<T>>;

    const listReference = children.insertBefore(location.listReference as unknown as DoubleLinkedListNode<TreeNode<T>>, newNode);
    newNode.setListReference(listReference);

    return newNode;
  }

  deleteNode(node: TreeNode<T>): void {
    if (node.parent === null) {
      throw new Error("You cannot delete the root in a tree.");
    }
    node.parent?.children?.delete(node.listReference as unknown as DoubleLinkedListNode<TreeNode<T>>);
  }

  duplicateNode(node: TreeNode<T>): TreeNode<T> {
    if (node.parent === null) {
      throw new Error("You cannot duplicate the root in a tree.");
    }

    const n = this.insertAfterNode(node, node.data as T);
    for (let c of node.childrenIterator()) {
      this.copyAfter(c, n);
    }

    return n;
  }

  private copyAfter(node: TreeNode<T>, location: TreeNode<T>) {
    const n = this.insertAtNodeEnd(location, node.data as T);

    for (let child of node.childrenIterator()) {
      this.copyAfter(child, n);
    }
  }

  private *DFSFromNode(node: TreeNode<T>, level: number): Generator<[TreeNode<T>, number]> {
    yield [node, level];
    if (node.children) {
      for (let w of node.children) {
        yield* this.DFSFromNode(w.data, level + 1);
      }
    }
  }

  *DFS(): Generator<[TreeNode<T>, number]> {
    yield* this.DFSFromNode(this._root, 0);
  }
}

export default Tree;
