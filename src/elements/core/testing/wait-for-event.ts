export function waitForEvent(
  element: HTMLElement,
  eventName: string,
  timeout = 1000,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const signal = AbortSignal.timeout(timeout);
    const timeoutReached = (): void => reject(`Timeout of ${timeout} reached`);
    signal.addEventListener('abort', timeoutReached);
    element.addEventListener(
      eventName,
      () => {
        signal.removeEventListener('abort', timeoutReached);
        resolve();
      },
      { passive: true, signal },
    );
  });
}
