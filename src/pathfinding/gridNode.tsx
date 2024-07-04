export default class GridNode {
  private _data: number;
  private _last: [number, number] | undefined;

  public constructor(data: number) {
    this._data = data;
  }

  public getData(): number {
    return this._data;
  }

  public setData(data: number) {
    this._data = data;
  }

  public getLast(): [number, number] | undefined {
    return this._last;
  }

  public setLast(next: [number, number] | undefined) {
    return (this._last = next);
  }
}
