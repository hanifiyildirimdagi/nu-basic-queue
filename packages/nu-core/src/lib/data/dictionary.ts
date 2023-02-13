/* eslint-disable @typescript-eslint/ban-types */
// TODO?: Add a summary
export class DictionaryItem<K, V> {
  public Key: K;
  public Value: V;
  constructor(key: K, value: V) {
    this.Key = key;
    this.Value = value;
  }
  public toJSON(): string {
    return JSON.stringify(this);
  }
}

// TODO?: Add a summary
export class Dictionary<K, V> extends Array<DictionaryItem<K, V>> {
  constructor() {
    super();
  }

  // TODO?: Add a summary
  public add(key: K, value: V): number {
    return super.push(new DictionaryItem<K, V>(key, value));
  }

  // TODO?: Add a summary
  public getValue(objectKey: K) {
    return super.find((x: DictionaryItem<K, V>) => x.Key === objectKey)?.Value;
  }

  // TODO?: Add a summary
  public setValue(key: K, newValue: V): void {
    const i = super.findIndex((x) => x.Key === key);
    if (i == -1) return;
    this[i].Value = newValue;
  }

  // TODO?: Add a summary
  public static fromObject<T extends Object>(obj: T): Dictionary<string, any> {
    if (typeof obj === 'string')
      throw new Error('Data cannot be returned from a String type.');
    if (typeof obj === 'number')
      throw new Error('Data cannot be returned from a Number type.');
    if (typeof obj === 'boolean')
      throw new Error('Data cannot be returned from a Boolean type.');

    const keys = Object.keys(obj);
    if (keys.length === 0) throw new Error('Object is empty.');
    const result = new Dictionary<string, any>();
    for (const i in keys) {
      const value: any = Object.values(obj)[i];
      result.add(keys[i], value);
    }
    return result;
  }

  // TODO?: Add a summary
  public toValueList(): Array<V> {
    return this.map((x) => x.Value);
  }

  // TODO?: Add a summary
  public toKeyList(): Array<K> {
    return this.map((x) => x.Key);
  }
}
