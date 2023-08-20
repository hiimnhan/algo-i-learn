export default class Comparator {

    constructor() { }

    deepEqual(a: any, b: any): boolean {
        if (typeof a !== typeof b) return false;

        if (typeof a !== 'object') {
            if (Number.isNaN(a) && Number.isNaN(b)) return true;
            return a === b;
        }

        if (a === null || b === null) return a === b;

        if (a === b) return true;

        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) return false;
            for (let i = 0; i < a.length; i++) {
                if (!this.deepEqual(a[i], b[i])) return false;
            }
            return true;
        }

        if (Array.isArray(a) || Array.isArray(b)) return false;

        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);

        if (aKeys.length !== bKeys.length) return false;

        for (const key of aKeys) {
            if (!bKeys.includes) return false;
            if (!this.deepEqual(a[key], b[key])) return false;
        }


        return true;
    }
}