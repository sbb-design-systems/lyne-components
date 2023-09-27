import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbVisualCheckbox } from './sbb-visual-checkbox';

describe('sbb-visual-checkbox', (): void => {
  it('renders', async (): Promise<void> => {
    const element: SbbVisualCheckbox = await fixture(
      html`<sbb-visual-checkbox></sbb-visual-checkbox>`,
    );
    assert.instanceOf(element, SbbVisualCheckbox);
  });
});
