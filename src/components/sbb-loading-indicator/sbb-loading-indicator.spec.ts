import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-loading-indicator';

describe('sbb-loading-indicator', () => {
  it('renders with variant `window`', async () => {
    const root = await fixture(
      html`<sbb-loading-indicator variant="window" size="m"></sbb-loading-indicator>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-loading-indicator variant="window" size="m" color="default" role="progressbar" aria-busy='true'>  
        </sbb-loading-indicator>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-loading-indicator">
          <span class="sbb-loading-indicator__animated-element">
            <span>
              <span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </span>
          </span>
        </span>
      `,
    );
  });

  it('renders with variant `window` and color smoke', async () => {
    const root = await fixture(
      html`<sbb-loading-indicator variant="window" size="m" color="smoke"></sbb-loading-indicator>`,
    );

    expect(root).dom.to.be.equal(
      `
      <sbb-loading-indicator variant="window" size="m" color="smoke" role="progressbar" aria-busy='true'>
        
      </sbb-loading-indicator>
    `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-loading-indicator">
          <span class="sbb-loading-indicator__animated-element">
            <span>
              <span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </span>
          </span>
        </span>
      `,
    );
  });

  it('renders with variant `window` and color white', async () => {
    const root = await fixture(
      html`<sbb-loading-indicator variant="window" size="m" color="white"></sbb-loading-indicator>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-loading-indicator variant="window" size="m" color="white" role="progressbar" aria-busy='true'>
        </sbb-loading-indicator>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-loading-indicator">
          <span class="sbb-loading-indicator__animated-element">
            <span>
              <span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </span>
          </span>
        </span>
      `,
    );
  });

  it('renders with variant `circle`', async () => {
    const root = await fixture(
      html`<sbb-loading-indicator variant="circle"></sbb-loading-indicator>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-loading-indicator variant="circle" size="s" color="default" role="progressbar" aria-busy="true">
        </sbb-loading-indicator>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-loading-indicator">
          <span class="sbb-loading-indicator__animated-element"></span>
        </span>
      `,
    );
  });

  it('renders with variant `circle` and color smoke', async () => {
    const root = await fixture(
      html`<sbb-loading-indicator variant="circle" color="smoke"></sbb-loading-indicator>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-loading-indicator variant="circle" color="smoke" size="s" role="progressbar" aria-busy="true">
        </sbb-loading-indicator>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-loading-indicator">
          <span class="sbb-loading-indicator__animated-element"></span>
        </span>
      `,
    );
  });

  it('renders with variant `circle` and color white', async () => {
    const root = await fixture(
      html`<sbb-loading-indicator variant="circle" color="white"></sbb-loading-indicator>`,
    );

    expect(root).dom.to.be.equal(
      `
        <sbb-loading-indicator variant="circle" color="white" size="s" role="progressbar" aria-busy="true">
        </sbb-loading-indicator>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <span class="sbb-loading-indicator">
          <span class="sbb-loading-indicator__animated-element"></span>
        </span>
      `,
    );
  });
});
