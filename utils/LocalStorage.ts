import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { RecoilState, useRecoilState } from 'recoil';

const getData = async (storageKey: string): Promise<string | null> => {
  try {
    return AsyncStorage.getItem(storageKey);
  } catch (e) {
    // error reading value
  }
  return null;
};

const storeData = async (storageKey: string, value: string) => {
  try {
    AsyncStorage.setItem(storageKey, value);
  } catch (e) {
    // saving error
  }
};

/**
 * The type T must be able to be JSON.stringify and be recovered from JSON.parse
 */
export const useLocalStorageRecoilState = <T>(
  key: string,
  recoilState: RecoilState<T>
): [T, (newValue: T) => void] => {
  const [value, setValue] = useRecoilState(recoilState);

  // Onmount, take the local data and save it to recoil.
  useEffect(() => {
    getData(key).then(
      (storedValue) =>
        storedValue !== null && setValue(JSON.parse(storedValue) as T)
    );
  }, [key, setValue]);

  // For all future changes, save them to the local storage
  const updateValue = (newValue: T) => {
    setValue(newValue);
    storeData(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
};

export enum Store {
  FLASHCARD_SETS = '@flashcard-sets',
}
