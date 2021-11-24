import { Dictionary } from "./Dictionary";

export class LRUCache<T> {

  private _cache: Dictionary<T> = {};
  private _keylist: string[];
  private _next: number = 0;

  constructor(
    private size: number
  ) {
    this._keylist = new Array(size);
  }

  has(key: string): boolean {
    return this._cache[key] !== undefined;
  }

  get(key: string): T | undefined {
    return this._cache[key];
  }

  set(key: string, t: T) {
    if (this._cache[this._keylist[this._next]] !== undefined) delete this._cache[this._keylist[this._next]];
    this._cache[key] = t;
    this._keylist[this._next] = key;
    this._next = (this._next + 1) % this.size;
  }

}