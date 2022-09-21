interface DoubleLinkedListNode<T> {
  next: DoubleLinkedListNode<T> | null;
  prev: DoubleLinkedListNode<T> | null;
  data: T;
}

export default DoubleLinkedListNode;
