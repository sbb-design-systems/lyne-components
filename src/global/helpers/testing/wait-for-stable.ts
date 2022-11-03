export async function waitForStable<T = any>(
  check: () => T,
  stableDurationMs: number
): Promise<void> {
  let checked: T, checkedAfterInterval: T;
  do {
    checked = check();
    await new Promise((resolve) => setTimeout(resolve, stableDurationMs));
    checkedAfterInterval = check();
  } while (checked !== checkedAfterInterval);
}
