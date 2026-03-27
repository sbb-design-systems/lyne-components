import { expect } from '@open-wc/testing';
import { executeServerCommand } from '@web/test-runner-commands';
import type { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import { isChromium } from '../../dom.ts';
import { testIf } from '../mocha-extensions.ts';
import { waitForLitRender } from '../wait-for-render.ts';

import { fixture } from './fixture.ts';

export function a11yTreeSnapshot(options: { selector: string }): Promise<A11yNode> {
  return executeServerCommand('a11y-tree', options);
}

let nextId = 0;

/**
 * Get the a11y tree snapshot and tests its snapshot.
 * Since the snapshot is list of nodes, we have to stringify it
 * and create a html wrapper in order to use the `equalSnapshot` function.
 */
async function a11yTreeEqualSnapshot(): Promise<void> {
  const currentFixture = Array.from(document.body.children)
    .filter((child) => child.localName === 'div' && child.classList.length === 0)
    .at(-1)!;
  currentFixture.id = `a11y-fixture-${nextId++}`;
  currentFixture.ariaLabel = 'Fixture Container';

  const snapshot = await a11yTreeSnapshot({ selector: `#${currentFixture.id}` });
  currentFixture.removeAttribute('id');
  currentFixture.removeAttribute('aria-label');

  const htmlWrapper = await fixture(html`<p>${JSON.stringify(snapshot, null, 2)}</p>`);
  await expect(htmlWrapper).to.be.equalSnapshot();
}

/**
 * The function creates and tests the accessibility tree snapshot on each browser.
 * If a template is passed, it will be instantiated before the snapshot is taken.
 * @param title The title of the section
 * @param template The optional html template
 * @param exclude Which browsers should be excluded from testing.
 */
export function testA11yTreeSnapshot(
  template?: TemplateResult,
  title = 'A11y tree',
  exclude: { chrome?: boolean; firefox?: boolean; safari?: boolean } = {},
): void {
  describe(title, () => {
    beforeEach(async () => {
      if (template) {
        await fixture(template);
      }
      await waitForLitRender(document.documentElement);
    });

    testIf(isChromium && !exclude.chrome, 'Chrome', async () => {
      await a11yTreeEqualSnapshot();
    });

    // TODO: Try if tests on CI are no longer flaky
    // testIf(isSafari && !exclude.safari, 'Safari', async () => {
    //   await a11yTreeEqualSnapshot();
    // });

    // Only Chromium is supported at the moment
    // testIf(isFirefox && !exclude.firefox, 'Firefox', async () => {
    //  await a11yTreeEqualSnapshot();
    //});
  });
}

export interface A11yNode {
  /**
   * Whether this node is ignored for accessibility
   */
  ignored?: boolean;
  /**
   * This `Node`'s role, whether explicit or implicit.
   */
  role?: string;
  /**
   * The accessible name for this `Node`.
   */
  name?: string;
  /**
   * The accessible description for this `Node`.
   */
  description?: string;
  /**
   * The value for this `Node`.
   */
  value?: string;

  atomic?: boolean;
  autocomplete?: string;
  busy?: boolean | string;
  checked?: boolean | string;
  describedby?: string;
  disabled?: boolean;
  editable?: boolean | string;
  expanded?: boolean;
  focusable?: boolean;
  focused?: boolean;
  hasPopup?: string;
  invalid?: boolean | string;
  labelledby?: string;
  level?: string;
  live?: string;
  multiline?: boolean;
  multiselectable?: boolean;
  orientation?: string;
  pressed?: boolean | string;
  readonly?: boolean;
  relevant?: string;
  required?: boolean;
  roledescription?: string;
  selected?: boolean;
  settable?: boolean;
  valuemin?: string;
  valuemax?: string;
  valuetext?: string;
  children?: A11yNode[];
}
