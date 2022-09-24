import BlockData from "./BlockData";

type BlockInput<T> = Omit<BlockData<T>, "id">;

export default BlockInput;
