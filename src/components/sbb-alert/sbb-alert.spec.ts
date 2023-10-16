import { SbbAlert } from '../sbb-alert';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import '../sbb-alert';
import '../sbb-link';
import '../sbb-icon';
import '../sbb-title';
import '../sbb-button';

describe('sbb-alert', () => {
  let element: SbbAlert;

  it('should render default properties', async () => {
    element = await fixture(
      html`<sbb-alert disable-animation title-content="Interruption">Alert content</sbb-alert>`,
    );

    expect(element).dom.to.be.equal(
      `
        <sbb-alert disable-animation title-content="Interruption" size="m">
           Alert content
        </sbb-alert>
      `,
    );
    expect(element).shadowDom.to.be.equal(
      `
        <div class="sbb-alert__transition-wrapper">
          <div class="sbb-alert">
            <span class="sbb-alert__icon">
              <slot name="icon">
                <sbb-icon
                  aria-hidden="true"
                  data-namespace="default"
                  name="info"
                  role="img"
                ></sbb-icon>
              </slot>
            </span>
            <span class="sbb-alert__content">
              <sbb-title class="sbb-alert__title" aria-level="3" level="3" negative visual-level="5" role="heading">
                <slot name="title">Interruption</slot>
              </sbb-title>
              <p class="sbb-alert__content-slot">
                <slot></slot>
              </p>
            </span>
            <span class="sbb-alert__close-button-wrapper">
            <sbb-divider aria-orientation="vertical" role="separator" class="sbb-alert__close-button-divider" negative="" orientation="vertical" aria-orientation="vertical"></sbb-divider>
            <sbb-button aria-label="Close message" data-icon-only dir="ltr" class="sbb-alert__close-button" icon-name="cross-small" negative role="button" size="m" tabindex="0" variant="transparent"></sbb-button>
            </span>
          </div>
        </div>
      `,
    );
  });

  it('should render customized properties', async () => {
    element = await fixture(
      html`<sbb-alert
        title-content="Interruption"
        title-level="2"
        size="l"
        disable-animation="true"
        icon-name="disruption"
        accessibility-label="label"
        href="https://www.sbb.ch"
        rel="noopener"
        target="_blank"
        link-content="Show much more"
        >Alert content</sbb-alert
      >`,
    );

    expect(element).dom.to.be.equal(
      `
        <sbb-alert title-content="Interruption" title-level="2" size="l" disable-animation="true" icon-name="disruption" accessibility-label="label" href="https://www.sbb.ch" rel="noopener" target="_blank" link-content="Show much more">
           Alert content
        </sbb-alert>
      `,
    );
    expect(element).shadowDom.to.be.equal(
      `
        <div class="sbb-alert__transition-wrapper">
          <div class="sbb-alert">
            <span class="sbb-alert__icon">
              <slot name="icon">
                <sbb-icon
                  aria-hidden="true"
                  data-namespace="default"
                  name="disruption"
                  role="img"
                ></sbb-icon>
              </slot>
            </span>
            <span class="sbb-alert__content">
              <sbb-title class="sbb-alert__title" aria-level="2" role="heading" level="2" negative visual-level="3">
                <slot name="title">Interruption</slot>
              </sbb-title>
              <p class="sbb-alert__content-slot">
                <slot></slot>
              </p>
              <sbb-link negative variant="inline" aria-label="label" dir="ltr" role="link" size="s" tabindex="0" href="https://www.sbb.ch" rel="noopener" target="_blank">
                Show much more
              </sbb-link>
            </span>
            <span class="sbb-alert__close-button-wrapper">
            <sbb-divider class="sbb-alert__close-button-divider" negative aria-orientation="vertical" orientation="vertical" role="separator"></sbb-divider>
            <sbb-button aria-label="Close message" class="sbb-alert__close-button" data-icon-only dir="ltr" icon-name="cross-small" negative size="m" role="button" tabindex="0" variant="transparent"></sbb-button>
            </span>
          </div>
        </div>
      `,
    );
  });

  it('should hide close button in readonly mode', async () => {
    element = await fixture(
      html`<sbb-alert title-content="Interruption" readonly>Alert content</sbb-alert>`,
    );

    expect(element.shadowRoot.querySelector('.sbb-alert__close-button-wrapper')).to.be.null;
  });
});
