import type { PlaywrightLauncher, ProductType } from '@web/test-runner-playwright';
import type { Browser, LaunchOptions } from 'playwright';
import * as playwright from 'playwright';

import { playwrightWebsocketAddress } from './container-playwright-browser-plugin.ts';

interface PlaywrightLauncherPrivate {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __connectBrowserPromise: Promise<Browser> | undefined;
  browser: Browser | undefined;
  product: ProductType;
  launchOptions: LaunchOptions;
}

/**
 * Configure playwright browser execution to run the browsers in a container.
 *
 * @see https://github.com/microsoft/playwright/issues/26482
 * @param browser The playwright browser launcher.
 */
export function configureRemotePlaywrightBrowser(browser: PlaywrightLauncher): void {
  // The original implementation calls launch instead of connect,
  // so we overwrite the original method with this variant which
  // calls connect with the websocket endpoint.
  async function getOrStartBrowser(this: PlaywrightLauncherPrivate): Promise<Browser> {
    if (this.__connectBrowserPromise) {
      return this.__connectBrowserPromise;
    }

    if (!this.browser || !this.browser?.isConnected()) {
      this.__connectBrowserPromise = (async () => {
        // eslint-disable-next-line import-x/namespace
        return await playwright[this.product].connect(playwrightWebsocketAddress, {
          headers: { 'x-playwright-launch-options': JSON.stringify(this.launchOptions) },
        });
      })();
      this.browser = await this.__connectBrowserPromise;
      this.__connectBrowserPromise = undefined;
    }
    return this.browser;
  }
  (browser as any).getOrStartBrowser = getOrStartBrowser;

  // Inside the container the dev server from `@web/test-runner` is not available
  // so we need to adapt the address to point to the host machine.
  const startSession = browser.startSession;
  browser.startSession = async function (sessionId: string, url: string): Promise<void> {
    await startSession.call(
      this,
      sessionId,
      url.replace('http://localhost:', 'http://host.containers.internal:'),
    );
  };
}
