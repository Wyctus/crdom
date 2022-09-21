import Block from "./Block";

interface TextBlock extends Block {
  type: "TextBlock";
  content: string;
}

export default TextBlock;
