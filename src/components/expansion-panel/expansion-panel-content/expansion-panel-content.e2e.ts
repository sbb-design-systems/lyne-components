import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbExpansionPanelContent } from './sbb-expansion-panel-content';

describe('sbb-expansion-panel-content', () => {
  let element: SbbExpansionPanelContent;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-expansion-panel-content>Content</sbb-expansion-panel-content>`,
    );
    assert.instanceOf(element, SbbExpansionPanelContent);
  });
});
