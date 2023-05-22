import { waitFor } from '@storybook/testing-library';

export async function waitForStablePosition(
  elementCallback: () => HTMLElement | Promise<HTMLElement>,
  stableDurationMs = 2000
): Promise<void> {
  const element = await waitFor(elementCallback);
  const getPositionString = (): string => JSON.stringify(element.getBoundingClientRect());

  let positionString: string;
  do {
    positionString = getPositionString();
    await new Promise((resolve) => setTimeout(resolve, stableDurationMs));
  } while (positionString !== getPositionString());
}
