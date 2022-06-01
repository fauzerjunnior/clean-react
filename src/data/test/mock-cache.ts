import { SetStorage, GetStorage } from '@/data/protocols/cache';
import faker from '@faker-js/faker';

export class SetStorageMock implements SetStorage {
  key: string;

  value: any;

  /* istanbul ignore next */
  set(key: string, value: any): void {
    this.key = key;
    this.value = value;
  }
}

export class GetStorageSpy implements GetStorage {
  key: string;

  value: any = faker.datatype.json();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get(key: string): any {
    this.key = key;
    return this.value;
  }
}
