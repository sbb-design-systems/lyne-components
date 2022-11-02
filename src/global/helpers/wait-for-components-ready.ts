import { waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export async function waitForComponentsReady(checkFirstRenderingDone: () => any): Promise<void> {
  await new Promise<void>((resolve: () => void) => {
    if (document.readyState === 'complete') {
      resolve();
      return;
    }
    window.addEventListener('load', resolve, { once: true });
  });

  await waitFor(() => expect(checkFirstRenderingDone()).toBeTruthy());
}
