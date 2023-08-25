import TrieNode from './TrieNode';

export default class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let curr: TrieNode = this.root;
        for (let w of word) {
            if (!curr.children.has(w)) curr.children.set(w, new TrieNode());
            curr = curr.children.get(w) as TrieNode;
        }

        curr.isEnd = true;
    }

    search(word: string): boolean {
        let curr = this.root;
        for (let w of word) {
            if (!curr.children.has(w)) return false;
            curr = curr.children.get(w) as TrieNode;
        }

        return curr.isEnd;
    }

    startWith(prefix: string): boolean {
        let curr = this.root;
        for (let p of prefix) {
            if (!curr.children.has(p)) return false;
            curr = curr.children.get(p) as TrieNode;
        }

        return true;
    }
}