import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import '../../form-field';
import './button-link';
import '../button-common';

describe('sbb-button-link', () => {
  it('renders a primary sbb-button-link without icon', async () => {
    const root = await fixture(html`
      <sbb-button-link variant="primary" size="m" href="#" target="_blank" rel="noopener" download>
        Label Text
      </sbb-button-link>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-button-link variant="primary" size="m" href='#' target='_blank' rel='noopener' download dir='ltr' role='link' tabindex='0'>
        Label Text
      </sbb-button-link>
    `);
    expect(root).shadowDom.to.be.equal(`
      <a class="sbb-button" href="#" rel="noopener" role="presentation" tabindex="-1" target="_blank" download>
        <span class="sbb-button__label">
          <slot></slot>
            <span class="sbb-button__opens-in-new-window">
            . Link target opens in new window.
            </span>
        </span>
      </a>
    `);
  });

  it('renders a disabled primary sbb-button-link with slotted icon', async () => {
    const root = await fixture(html`
      <sbb-button-link variant="primary" href="#" disabled>
        <sbb-icon slot="icon" name="chevron-small-left-small"></sbb-icon>
        Label Text
      </sbb-button-link>
    `);

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-button-link variant="primary" href="#" disabled size="l" role="link" dir="ltr" aria-disabled='true'>
        <sbb-icon slot="icon" name="chevron-small-left-small" role="img" aria-hidden="true" data-namespace="default"></sbb-icon>
        Label Text
      </sbb-button-link>
    `);
    expect(root).shadowDom.to.be.equal(`
      <a class="sbb-button" href="#" role='presentation' tabindex='-1'>
        <span class="sbb-button__icon">
          <slot name="icon"></slot>
        </span>
        <span class="sbb-button__label"><slot></slot></span>
      </a>
    `);
  });

  it('renders a sbb-button-link inside an anchor as span element', async () => {
    const root = (
      await fixture(html`
        <a href="#">
          <sbb-button-link variant="secondary" negative href="#">This is a link</sbb-button-link>
        </a>
      `)
    ).querySelector('sbb-button-link');

    expect(root).dom.to.be.equal(`
      <sbb-button-link variant='secondary' negative href="#" size='l' is-static dir="ltr">
        This is a link
      </sbb-button-link>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class='sbb-button'>
        <span class='sbb-button__label'><slot></slot></span>
      </span>
    `);
  });

  it('renders a sbb-button as span element by setting is-static property', async () => {
    const root = await fixture(
      html`<sbb-button-link variant="secondary" is-static>This is a static link</sbb-button-link>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-button-link variant='secondary' size='l' is-static dir="ltr">
        This is a static link
      </sbb-button-link>
    `);
    expect(root).shadowDom.to.be.equal(`
      <span class='sbb-button'>
        <span class='sbb-button__label'><slot></slot></span>
      </span>
    `);
  });

  it('should detect icon button', async () => {
    const root = await fixture(
      html`<sbb-button-link><sbb-icon name="app-icon-medium"></sbb-icon></sbb-button-link>`,
    );

    expect(root).to.have.attribute('data-icon-only');
  });

  it('should detect icon button when there is space around icon', async () => {
    const root = await fixture(
      html`<sbb-button-link> <sbb-icon name="app-icon-medium"></sbb-icon> </sbb-button-link>`,
    );

    expect(root).to.have.attribute('data-icon-only');
  });

  it('should render form field button variant when inside of a form field', async () => {
    const root = await fixture(
      html` <sbb-form-field>
        <input />
        <sbb-button-link slot="suffix" icon-name="cross-small"></sbb-button-link>
      </sbb-form-field>`,
    );
    const button = root.querySelector('sbb-button-link');
    expect(button).to.have.attribute('data-icon-small');
  });
});
