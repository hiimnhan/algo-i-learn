import LinkedList from '../linked-list/LinkedList';

interface IStack<T> {
    isEmpty(): boolean;
    peek(): T | null;
    push(value: T): Stack<T>;
    pop(): T | null;
    get size(): number;
    toArray(): Array<T>;
}
export default class Stack<T> implements IStack<T> {
    private _list: LinkedList<T>;

    constructor() {
        this._list = new LinkedList();
    }

    isEmpty(): boolean {
        return this._list.isEmpty();
    }

    peek(): T | null {
        const val = this._list.tail?.value;
        return val || null;
    }

    push(value: T): Stack<T> {
        this._list.append(value);

        return this;
    }

    pop(): T | null {
        const val = this._list.deleteTail()?.value;
        return val || null;
    }

    toArray(): T[] {
        return this._list.toArray();
    }

    get size(): number {
        return this._list.size;
    }
}