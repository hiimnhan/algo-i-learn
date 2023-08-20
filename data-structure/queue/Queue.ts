import LinkedList from '../linked-list/LinkedList';

interface IQueue<T> {
    isEmpty(): boolean;
    peek(): T | null;
    enqueue(value: T): Queue<T>;
    dequeue(): T | null;
    get size(): number;
    toArray(): Array<T>;
}
export default class Queue<T> implements IQueue<T>{
    private _list: LinkedList<T>;

    constructor() {
        this._list = new LinkedList();
    }

    isEmpty(): boolean {
        return this._list.isEmpty();
    }

    peek(): T | null {
        const value = this._list.head?.value;
        return value || null;
    }

    enqueue(value: T): Queue<T> {
        this._list.append(value);
        return this;
    }

    dequeue(): T | null {
        const val = this._list.deleteHead()?.value;
        return val || null;
    }

    toArray(): T[] {
        return this._list.toArray();
    }

    get size(): number {
        return this._list.size;
    }
}