import { useEffect, useRef } from "react";

/**
 * Custom hook that adds an event listener to a specified DOM element.
 *
 * @param {string} eventType - The type of the event to listen for.
 * @param {function} callback - The callback function to execute when the event is triggered.
 * @param {Object} [element=window] - The DOM element to which the event listener will be added. Defaults to the global window object.
 */
export default function useEventListener(
  eventType,
  callback,
  element = window,
  options
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e) => callbackRef.current(e);

    element.addEventListener(eventType, handler, options);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element, options]);
}
