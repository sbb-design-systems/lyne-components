import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import './divider';

describe('sbb-divider', () => {
  it('should render with default values', async () => {
    const element: Element = await fixture(html`<sbb-divider></sbb-divider>`);
    expect(element).dom.to.be.equal(
      `<sbb-divider orientation='horizontal' aria-orientation='horizontal' role='separator'></sbb-divider>`,
    );
    expect(element).shadowDom.to.be.equal(`<div class='sbb-divider'></div>`);
  });

  it('should render with orientation horizontal', async () => {
    const element: Element = await fixture(
      html`<sbb-divider orientation="horizontal"></sbb-divider>`,
    );
    expect(element).dom.to.be.equal(
      `<sbb-divider orientation='horizontal' aria-orientation='horizontal' role='separator'></sbb-divider>`,
    );
    expect(element).shadowDom.to.be.equal(`<div class='sbb-divider'></div>`);
  });

  it('should render with orientation vertical', async () => {
    const element: Element = await fixture(
      html`<sbb-divider orientation="vertical"></sbb-divider>`,
    );
    expect(element).dom.to.be.equal(
      `<sbb-divider orientation='vertical' aria-orientation='vertical' role='separator'></sbb-divider>`,
    );
    expect(element).shadowDom.to.be.equal(`<div class='sbb-divider'></div>`);
  });

  testA11yTreeSnapshot(undefined, html`<sbb-divider></sbb-divider>`);
});
