import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should return initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should save value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorageMock.getItem('test-key')).toBe(JSON.stringify('updated'));
  });

  it('should read from localStorage on mount', () => {
    localStorageMock.setItem('test-key', JSON.stringify('stored-value'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('stored-value');
  });

  it('should handle function updates', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(2);
  });

  it('should handle complex objects', () => {
    const initialValue = { name: 'John', age: 30 };
    const { result } = renderHook(() => useLocalStorage('test-key', initialValue));

    act(() => {
      result.current[1]({ name: 'Jane', age: 25 });
    });

    expect(result.current[0]).toEqual({ name: 'Jane', age: 25 });
    expect(localStorageMock.getItem('test-key')).toBe(
      JSON.stringify({ name: 'Jane', age: 25 })
    );
  });

  it('should handle errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const invalidJson = '{ invalid json }';
    localStorageMock.setItem('test-key', invalidJson);

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    // Should fallback to initial value on parse error
    expect(result.current[0]).toBe('default');
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});

