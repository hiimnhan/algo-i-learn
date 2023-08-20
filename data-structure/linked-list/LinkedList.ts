import Comparator from '../../helper/Comparator';
import LinkedListNode from './LinkedListNode';

interface ILinkedList<T> {
    append(value: T): LinkedList<T>;
    prepend(value: T): LinkedList<T>;
    insert(value: T, index: number): LinkedList<T>;
    delete(value: T): LinkedListNode<T> | null;
    find({ value, callback }: {
        value?: T,
        callback?: (...args: any) => any
    }): LinkedListNode<T> | null;
    deleteTail(): LinkedListNode<T> | null;
    deleteHead(): LinkedListNode<T> | null;
    fromArray(array: Array<T>): LinkedList<T>;
    toArray(): Array<T>;
    reverse(): LinkedList<T>
    get size(): number;
}

export default class LinkedList<T> implements ILinkedList<T> {
    private _head: LinkedListNode<T> | null;
    private _tail: LinkedListNode<T> | null;
    private _comparator: Comparator;
    private _size: number;

    constructor() {
        this._head = null;
        this._tail = null;
        this._comparator = new Comparator();
        this._size = 0;
    }

    append(value: T): LinkedList<T> {
        const node = new LinkedListNode(value, this._head);
        if (!this._head) {
            this._head = node;
            this._tail = node;
        }

        this._size++;


        return this;
    }

    prepend(value: T): LinkedList<T> {
        const node = new LinkedListNode(value, this._head);
        this._head = node;

        if (!this._tail) this._tail = node;

        this._size++;
        return this;
    }

    insert(value: T, index: number): LinkedList<T> {
        index = index < 0 ? 0 : index;
        if (index === 0) this.prepend(value);
        else {
            let count = 1;
            let current = this._head;
            const node = new LinkedListNode(value);

            while (current) {
                if (count === index) break;
                current = current.next;
                count++;
            }

            if (current) {
                node.next = current.next;
                current.next = node;
            } else {
                if (this._tail) {
                    this._tail.next = node;
                    this._tail = node;
                } else {
                    this._head = node;
                    this._tail = node;
                }
            }
        }

        this._size++;

        return this;
    }

    delete(value: T): LinkedListNode<T> | null {
        if (!this._head) return null;
        let deletedNode: LinkedListNode<T> | null = null;

        while (this._head && this._comparator.deepEqual(this._head.value, value)) {
            deletedNode = this._head;
            this._head = this._head.next;
            this._size--;
        }

        let current = this._head;

        if (current !== null) {
            while (current.next) {
                if (this._comparator.deepEqual(current.next.value, value)) {
                    deletedNode = current.next;
                    current.next = current.next.next;
                    this._size--;
                } else {
                    current = current?.next;
                }
            }
        }

        if (this._comparator.deepEqual(this._tail?.value, value)) {
            this._tail = current;
            this._size--;
        }

        return deletedNode;
    }

    find({ value, callback }: { value?: T | undefined; callback?: ((...args: any) => any) | undefined; }): LinkedListNode<T> | null {
        if (!this._head) return null;
        let current: LinkedListNode<T> | null = this._head;

        while (current) {
            if (callback && callback(current.value)) {
                return current;
            }

            if (value !== undefined && this._comparator.deepEqual(current.value, value)) {
                return current
            }

            current = current.next;
        }

        return null;
    }

    deleteTail(): LinkedListNode<T> | null {
        if (!this._head) return null;
        const deletedTail = this._tail;
        this._size--;
        if (this._head === this._tail) {
            this._head = null;
            this._tail = null;
            return deletedTail;
        }

        let current = this._head;

        if (current) {
            while (current.next) {
                if (!current.next.next) {
                    current.next = null;
                } else {
                    current = current.next;
                }
            }
        }
        this._tail = current;

        return deletedTail;
    }

    deleteHead(): LinkedListNode<T> | null {
        if (!this._head) return null;

        const deletedHead = this._head;
        this._size--;
        if (this._head.next) {
            this._head = this._head.next
        } else {
            this._head = null;
            this._tail = null;
        }

        return deletedHead;
    }

    fromArray(array: T[]): LinkedList<T> {
        array.forEach(value => this.append(value));

        return this;
    }

    toArray(): T[] {
        if (!this._head) return []
        const nodes: T[] = [];

        let current: LinkedListNode<T> | null = this._head;

        while (current) {
            nodes.push(current.value);
            current = current.next;
        }

        return nodes;
    }

    reverse(): LinkedList<T> {
        let current: LinkedListNode<T> | null = this._head;
        let prev: LinkedListNode<T> | null = null;
        let next: LinkedListNode<T> | null = null;

        while (current) {
            next = current.next;
            current.next = prev;

            prev = current;
            current = next;
        }

        this._tail = this._head;
        this._head = prev;

        return this;
    }

    get size(): number {
        return this._size;
    }
}