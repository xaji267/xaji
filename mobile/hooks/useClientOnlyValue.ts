import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

/**
 * Returns the provided value when running on the client, otherwise returns the fallback value.
 * This is useful for preventing hydration mismatches when using server-side rendering.
 */
export function useClientOnlyValue<T>(clientValue: T, fallbackValue: T): T {
  const [value, setValue] = useState(
    Platform.OS === 'web' ? fallbackValue : clientValue
  );

  useEffect(() => {
    if (Platform.OS === 'web') {
      setValue(clientValue);
    }
  }, [clientValue]);

  return value;
}