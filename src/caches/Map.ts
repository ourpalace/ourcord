export default class FakeMap {
  object: object;
  size: number;

  constructor() {
    this.object = {};
    this.size = 0;
    return this;
  }

  public set(key: string | number, data: any): object {
    this.object[key] = data;
    this.updateSize();
    return this.object;
  }
  
  public delete(key: string | number): object {
    delete this.object[key];
    this.updateSize();
    return this.object;
  }

  private updateSize() {
    this.size = Object.keys(this.object).length;
  }

  public toString() {
    return JSON.stringify(this.object)
  }
}