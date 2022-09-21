import Block from "./Block";
import SpecializedBlock from "./SpecializedBlock";

type OmitIdFromBlock<T extends Block> = T extends Block ? Omit<T, "id"> : never;
type SpecializedBlockInput = OmitIdFromBlock<SpecializedBlock>;

export default SpecializedBlockInput;
