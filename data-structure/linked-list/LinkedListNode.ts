export default class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;

  constructor(value: T);
  constructor(value: T, next: LinkedListNode<T> | null);

  constructor(value: T, next: LinkedListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback?: (value: T) => string) {
    return callback ? callback(this.value) : `${this.value}`
  };

}
