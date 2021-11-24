export interface Conclusion<T> {
  (t: T): Promise<void> | void;
}