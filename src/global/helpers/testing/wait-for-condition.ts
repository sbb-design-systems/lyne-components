export async function waitForCondition(
  condition: () => boolean | Promise<boolean>,
  interval = 30,
  timeoutInMilliseconds = 10 * 1000
): Promise<void> {
  const start = new Date();
  while (!(await condition()) && start.getTime() + timeoutInMilliseconds >= new Date().getTime()) {
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  if (start.getTime() + timeoutInMilliseconds < new Date().getTime()) {
    return Promise.reject('waitForCondition timeout');
  }
  return Promise.resolve();
}
