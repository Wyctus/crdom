import Tree from "../Tree/Tree";
import TreeNode from "../Tree/TreeNode";
import Block from "./Block";
import BlockInput from "./BlockInput";
import Listener from "./Listener";

class Document<T> {
  private tree: Tree<Block<T>>;
  private idMap: Map<string, TreeNode<Block<T>>>;
  readonly name: string;
  readonly hasher: (c: T) => string;
  readonly stringifier?: (c: T) => string;
  private listenerMap: Map<string, Listener>;

  constructor(name: string, hasher: (c: T) => string, stringifier?: (c: T) => string) {
    this.tree = new Tree<Block<T>>();
    this.idMap = new Map();

    this.name = name;
    this.hasher = hasher;
    this.stringifier = stringifier;
    this.listenerMap = new Map();
  }

  toMarkup(): string {
    const toString = this.stringifier ?? this.hasher;
    let s: string = `${this.name}\n`;

    for (let [node, level] of this.tree.DFS()) {
      // Ignore the root, it contains no data in the document
      if (node.data === undefined) {
        continue;
      }

      const indent = "  ".repeat(level);
      const contentWithNewlineIndentation = toString(node.data!.content).replace(/\n/g, `\n${indent}`);
      s += `${indent}${contentWithNewlineIndentation}\n`;
    }

    return s;
  }

  private generateID(): string {
    return Math.random().toString(36).substring(2);
  }

  getBlockById(id: string): TreeNode<Block<T>> {
    // Due to the consistency of the data structure provided by its methods, the lookup always finds the node.
    return this.idMap.get(id) as unknown as TreeNode<Block<T>>;
  }

  getBlocksById(ids: string[]): TreeNode<Block<T>>[] {
    return ids.map((id) => this.idMap.get(id) as unknown as TreeNode<Block<T>>);
  }

  insertBlockAtRootEnd(data: BlockInput<T>): string {
    const id: string = this.generateID();
    const block: Block<T> = new Block<T>(id, { ...data }, this.hasher);

    const node = this.tree.insertAtRootEnd(block);
    block.node = node;

    this.idMap.set(id, node);
    this.notify(id, block.crc, block.compoundCRC);

    return id;
  }

  insertBlockAtRootStart(data: BlockInput<T>): string {
    const id: string = this.generateID();
    const block: Block<T> = new Block<T>(id, { ...data }, this.hasher);

    const node = this.tree.insertAtRootStart(block);
    block.node = node;

    this.idMap.set(id, node);
    this.notify(id, block.crc, block.compoundCRC);

    return id;
  }

  insertSubblockAtBlockEnd(blockId: string, data: BlockInput<T>): string {
    const id: string = this.generateID();
    const block: Block<T> = new Block<T>(id, { ...data }, this.hasher);

    const refBlock = this.getBlockById(blockId);
    const node = this.tree.insertAtNodeEnd(refBlock, block);
    block.node = node;

    this.idMap.set(id, node);
    this.notify(id, block.crc, block.compoundCRC);

    return id;
  }

  insertSubblockAtBlockStart(blockId: string, data: BlockInput<T>): string {
    const id: string = this.generateID();
    const block: Block<T> = new Block<T>(id, { ...data }, this.hasher);

    const refBlock = this.getBlockById(blockId);
    const node = this.tree.insertAtNodeStart(refBlock, block);
    block.node = node;

    this.idMap.set(id, node);
    this.notify(id, block.crc, block.compoundCRC);

    return id;
  }

  insertBlockBeforeBlock(blockId: string, data: BlockInput<T>): string {
    const id: string = this.generateID();
    const block: Block<T> = new Block<T>(id, { ...data }, this.hasher);

    const refBlock = this.getBlockById(blockId);
    const node = this.tree.insertBeforeNode(refBlock, block);
    block.node = node;

    this.idMap.set(id, node);
    this.notify(id, block.crc, block.compoundCRC);

    return id;
  }

  insertBlockAfterBlock(blockId: string, data: BlockInput<T>): string {
    const id: string = this.generateID();
    const block: Block<T> = new Block<T>(id, { ...data }, this.hasher);

    const refBlock = this.getBlockById(blockId);
    const node = this.tree.insertAfterNode(refBlock, block);
    block.node = node;

    this.idMap.set(id, node);
    this.notify(id, block.crc, block.compoundCRC);

    return id;
  }

  moveBlockAfterBlock(blockToMoveId: string, locationBlockId: string): void {
    const nodeToMove = this.getBlockById(blockToMoveId);
    const location = this.getBlockById(locationBlockId);

    this.tree.moveAfterNode(nodeToMove, location);
  }

  moveBlockBeforeBlock(blockToMoveId: string, locationBlockId: string): void {
    const nodeToMove = this.getBlockById(blockToMoveId);
    const location = this.getBlockById(locationBlockId);

    this.tree.moveBeforeNode(nodeToMove, location);
  }

  duplicateBlock(blockId: string): string {
    const id: string = this.generateID();

    const block = this.getBlockById(blockId);
    const node = this.tree.duplicateNode(block);

    (node.data as Block<T>).id = id;
    this.idMap.set(id, node);

    this.notify(id, block.data!.crc, block.data!.compoundCRC);

    return id;
  }

  deleteBlock(blockId: string): void {
    const node = this.getBlockById(blockId);
    this.tree.deleteNode(node);
  }

  editBlockData(blockId: string, data: BlockInput<T>): void {
    const node = this.getBlockById(blockId);

    if (node.data !== undefined) {
      node.data.content = data.content;
      node.data.style = data.style;
    } else {
      node.data = new Block(blockId, data, this.hasher);
      node.data.node = node;
    }

    this.notify(node.data.id, node.data.crc, node.data.compoundCRC);
  }

  addListener(callback: Listener): string {
    const listenerId: string = this.generateID();
    this.listenerMap.set(listenerId, callback);

    return listenerId;
  }

  removeListener(listenerId: string): boolean {
    return this.listenerMap.delete(listenerId);
  }

  notify(blockId: string, blockCRC: string, compoundCRC: string): void {
    for (let listener of this.listenerMap.values()) {
      listener(blockId, blockCRC, compoundCRC);
    }
  }

  *blockIterator(): Generator<Block<T>> {
    for (let node of this.tree.root.childrenIterator()) {
      yield node.data as Block<T>;
    }
  }
}

export default Document;
