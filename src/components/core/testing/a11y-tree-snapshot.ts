import { aTimeout, expect, fixture } from '@open-wc/testing';
import { a11ySnapshot } from '@web/test-runner-commands';
import type { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import { isChromium, isDebugEnvironment, isFirefox, isSafari } from '../dom';

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
 * @param title The title of the section
 * @param template The optional html template
 */
export function testA11yTreeSnapshot(title = 'A11y tree', template?: TemplateResult): void {
  describe(title, () => {
    beforeEach(async () => {
      if (template) {
        await fixture(template);
      }
      await waitForLitRender(document);
    });

    (isChromium() && !isDebugEnvironment() ? it : it.skip)('Chrome', async () => {
      await a11yTreeEqualSnapshot();
    });

    (isSafari() && !isDebugEnvironment() ? it : it.skip)('Safari', async () => {
      await a11yTreeEqualSnapshot();
    });

    (isFirefox() && !isDebugEnvironment() ? it : it.skip)(
      'Firefox',
      async () => {
        await a11yTreeEqualSnapshot();
      },
      5000,
    );
  });
}
