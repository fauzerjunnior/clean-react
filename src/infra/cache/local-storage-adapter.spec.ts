import faker from '@faker-js/faker';
import 'jest-localstorage-mock';
import { LocalStorageAdapter } from '@/infra/cache';

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should call localStorage.setItem with correct values', async () => {
    const sut = makeSut();

    const key = faker.database.column();
    const value = JSON.parse(faker.datatype.json());

    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    );
  });

  test('should call localStorage.remoteItem if value is null', async () => {
    const sut = makeSut();

    const key = faker.database.column();

    sut.set(key, undefined);
    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test('should call localStorage.getItem with correct value', async () => {
    const sut = makeSut();

    const key = faker.database.column();
    const value = JSON.parse(faker.datatype.json());
    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(value));

    const obj = sut.get(key);
    expect(obj).toEqual(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});
