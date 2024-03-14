import { waitFor } from '@storybook/test';

export async function waitForComponentsReady(checkFirstRenderingDone: () => any): Promise<void> {
  await new Promise<void>((resolve: () => void) => {
    if (document.readyState === 'complete') {
      resolve();
      return;
    }
    window.addEventListener('load', resolve, { once: true });
  });

  await waitFor(() => checkFirstRenderingDone());
}
