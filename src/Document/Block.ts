import Style from "./Style";

interface Block {
  id: string;
  type: "TextBlock" | "ImageBlock";
  style?: Style;
}

export default Block;
