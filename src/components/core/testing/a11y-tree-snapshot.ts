import { aTimeout, expect, fixture } from '@open-wc/testing';
import { a11ySnapshot } from '@web/test-runner-commands';
import type { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';
import type { Context } from 'mocha';

import { isChromium, isDebugEnvironment, isFirefox, isSafari } from '../dom';

import { testIf } from './mocha-extensions';
import { waitForLitRender } from './wait-for-render';

/**
 * Get the a11y tree snapshot and tests its snapshot.
 * Since the snapshot is list of nodes, we have to stringify it
 * and create an html wrapper in order to use the `equalSnapshot` function.
 */
async function a11yTreeEqualSnapshot(): Promise<void> {
  await aTimeout(500);
  const snapshot = await a11ySnapshot({});

  const htmlWrapper = await fixture(html`<p>${JSON.stringify(snapshot, null, 2)}</p>`);
  await expect(htmlWrapper).to.be.equalSnapshot();
}

/**
 * The function creates and tests the accessibility tree snapshot on each browser.
 * If a template is passed, it will be instantiated before the snapshot is taken.
 * Note:
 * We skip a11yTreeSnashots in debug environment because they not consistent on Puppeteer
 * @param title The title of the section
 * @param template The optional html template
 */
export function testA11yTreeSnapshot(
  template?: TemplateResult,
  title = 'A11y tree',
  skip: { chrome?: boolean; firefox?: boolean; safari?: boolean } = {},
): void {
  describe(title, () => {
    beforeEach(async () => {
      if (template) {
        await fixture(template);
      }
      await waitForLitRender(document);
    });

    testIf(!skip.chrome && isChromium() && !isDebugEnvironment(), 'Chrome', async () => {
      await a11yTreeEqualSnapshot();
    });

    testIf(!skip.safari && isSafari() && !isDebugEnvironment(), 'Safari', async () => {
      await a11yTreeEqualSnapshot();
    });

    testIf(
      !skip.firefox && isFirefox() && !isDebugEnvironment(),
      'Firefox',
      async function (this: Context) {
        this.timeout(5000);
        await a11yTreeEqualSnapshot();
      },
    );
  });
}
