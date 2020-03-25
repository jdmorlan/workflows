interface ValueCollection {
  [prop: string]: any;
}

class Form {
  private _values: ValueCollection;

  constructor() {
    this._values = {};
  }

  toJS() {
    return this._values;
  }

  set(key: string): Function {
    return (value: any) => {
      this._values[key] = value;
    };
  }

  get(key: string): any {
    return this._values[key];
  }
}

export default Form;
