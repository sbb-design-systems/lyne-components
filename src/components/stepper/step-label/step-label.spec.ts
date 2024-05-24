import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import './step-label.js';

describe('sbb-step-label', () => {
  it('renders - Dom', async () => {
    const root = await fixture(html`<sbb-step-label>Label</sbb-step-label>`);
    await expect(root).dom.to.be.equalSnapshot();
  });

  it('renders - ShadomDom', async () => {
    const root = await fixture(html`<sbb-step-label>Label</sbb-step-label>`);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders with icon - Dom', async () => {
    const root = await fixture(html`<sbb-step-label icon-name="tick-small">Label</sbb-step-label>`);
    await expect(root).dom.to.be.equalSnapshot();
  });

  it('renders with icon - ShadowDom', async () => {
    const root = await fixture(html`<sbb-step-label icon-name="tick-small">Label</sbb-step-label>`);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders disabled - Dom', async () => {
    const root = await fixture(html`<sbb-step-label disabled>Label</sbb-step-label>`);
    await expect(root).dom.to.be.equalSnapshot();
  });

  it('renders disabled - ShadowDom', async () => {
    const root = await fixture(html`<sbb-step-label disabled>Label</sbb-step-label>`);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(html`<sbb-step-label>Label</sbb-step-label>`);
});
