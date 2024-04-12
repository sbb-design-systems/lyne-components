function partialDescribeEach<T extends Record<string, unknown[]>>(
  cases: T,
  payload: Record<keyof T, unknown>,
  suiteRun: (params: { [K in keyof T]: T[K][number] }) => void,
): void {
  const [key, ...keys] = Object.keys(cases);
  const values = cases[key];
  if (keys.length) {
    const partialCases = keys.reduce(
      (current, next) => Object.assign(current, { [next]: cases[next] }),
      {} as T,
    );
    for (const value of values) {
      partialDescribeEach(partialCases, { ...payload, [key]: value }, suiteRun);
    }
  } else {
    for (const value of values) {
      const finalPayload = { ...payload, [key]: value };
      describe(
        Object.entries(finalPayload)
          .map(([key, value]) => `${key}=${value}`)
          .join(', '),
        function () {
          suiteRun.call(this, finalPayload);
        },
      );
    }
  }
}

export function describeEach<T extends Record<string, unknown[]>>(
  cases: T,
  suiteRun: (params: { [K in keyof T]: T[K][number] }) => void,
): void {
  partialDescribeEach(cases, {} as Record<keyof T, unknown>, suiteRun);
}
