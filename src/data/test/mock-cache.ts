import { SetStorage } from '@/data/protocols/cache';

export class SetStorageMock implements SetStorage {
  key: string;

  value: any;

  /* istanbul ignore next */
  set(key: string, value: any): void {
    this.key = key;
    this.value = value;
  }
}
