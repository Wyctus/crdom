import Block from "./Block";

interface ImageBlock extends Block {
  type: "ImageBlock";
  url: string;
}

export default ImageBlock;
