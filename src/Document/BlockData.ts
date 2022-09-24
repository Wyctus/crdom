import Style from "./Style";

interface BlockData<T> {
  id: string;
  content: T;
  style?: Style;
}

export default BlockData;
