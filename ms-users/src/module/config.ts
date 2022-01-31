import * as config from 'config';
import {boolean as yn} from 'boolean';

export class Config {
  static get(key: string): any {
    return config.get(key);
  }

  static getStr(key: string, optional: string = ''): string {
    const data = config.get(key);

    return !data ? optional : data.toString();
  }

  static getBool(key: string, optional: boolean): boolean {
    const data = config.get(key);

    return data === null || data === undefined ? optional : yn(data);
  }

  static getNum(key: string, optional: number): number {
    const data = config.get(key);

    if (data === null || data === undefined) {
      return optional;
    }

    const value = Number(data);

    return isNaN(value) ? optional : value;
  }
}
