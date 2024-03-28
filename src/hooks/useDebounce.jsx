import { useState, useEffect, useMemo } from "react";

function debounce(fn, delay = 500) {
  let timerId;
  return {
    call(...args) {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    cancel() {
      clearTimeout(timerId);
    },
  };
}

export default function useDebounce(initialValue, delay = 500) {
  const [value, setValue] = useState(initialValue);

  const debouncedSetter = useMemo(
    () => debounce((newValue) => setValue(() => newValue), delay),
    [delay]
  );

  useEffect(() => {
    return debouncedSetter.cancel();
  }, [debouncedSetter]);

  return {
    value,
    setValueWithDebounce: debouncedSetter.call,
  };
}

//Added a copy for the state

//Debounce the setter for that state. Memoize that the debounced setter function.

/* 
Q. If you return a fn from a fn. And the returned fn is from a fn as well.
For eg,

const fn2 = fn => () => fn();
const fn3 = fn1 => fn2(fn1);
Will fn3 have stable reference, if 
1) Both fn1 and fn2 are stable
2) Either fn1 or fn2 is stable



*/

/*   
Because we memoized the setter function, if we would have directly created a closure with the primary state(change state)
it would have stale reference to that variable. 
To overcome that issue, we create a new function that take a value that passes it to that debounced setter function.
But you also need to memoize it.
*/
