import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbVisualCheckboxElement } from './visual-checkbox';

describe('sbb-visual-checkbox', (): void => {
  it('renders', async (): Promise<void> => {
    const element: SbbVisualCheckboxElement = await fixture(
      html`<sbb-visual-checkbox></sbb-visual-checkbox>`,
    );
    assert.instanceOf(element, SbbVisualCheckboxElement);
  });
});
