import Style from "./Style";
import { crc32 } from "crc";
import BlockInput from "./BlockInput";
import { TreeNode } from "../Tree";

class Block<T> {
  private _id: string;
  private _content: T;
  private _style?: Style;
  private _contentCRC: string;
  private _styleCRC: string;
  private _subtreeCRC: string;
  private hasher: (c: T) => string;
  private _node?: TreeNode<Block<T>>;

  constructor(id: string, data: BlockInput<T>, hasher: (c: T) => string) {
    this._id = id;
    this.hasher = hasher;

    this._content = data.content;
    this._style = data.style;
    this._contentCRC = this.calculateContentCRC(data.content);
    this._styleCRC = this.calculateStyleCRC(data.style);
    this._subtreeCRC = "";
  }

  private calculateContentCRC(content: T): string {
    return crc32(this.hasher(content)).toString(16);
  }

  private calculateStyleCRC(style: Style | undefined): string {
    const stringified: string = `${style?.backgroundColor}|${style?.color}|${style?.fontFamily}|${style?.fontSize}`;
    return crc32(stringified).toString(16);
  }

  get content(): T {
    return this._content;
  }

  set content(content: T) {
    this._content = content;
    this._contentCRC = this.calculateContentCRC(content);

    // Updating the parent CRC
    let p = this._node?.parent;
    while (p && p.data) {
      let compound = "";
      for (let child of p.childrenIterator()) {
        compound += child.data!.compoundCRC;
      }
      p.data!.subtreeCRC = crc32(compound).toString(16);
      p = p.parent;
    }
  }

  get style(): Style | undefined {
    return this._style;
  }

  set style(style: Style | undefined) {
    this._style = style;
    this._styleCRC = this.calculateStyleCRC(style);
  }

  get crc(): string {
    return this._contentCRC + this._styleCRC;
  }

  get compoundCRC(): string {
    return this.crc + this._subtreeCRC;
  }

  set subtreeCRC(crc: string) {
    this._subtreeCRC = crc;
  }

  get node(): TreeNode<Block<T>> | undefined {
    return this._node;
  }

  set node(node: TreeNode<Block<T>> | undefined) {
    this._node = node;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  *subblocks(): Generator<Block<T>> {
    if (this.node) {
      for (let child of this.node.childrenIterator()) {
        yield child.data as Block<T>;
      }
    }
  }
}

export default Block;
