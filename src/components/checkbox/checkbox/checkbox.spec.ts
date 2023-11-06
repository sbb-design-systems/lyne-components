import './checkbox';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

describe('sbb-checkbox', () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-checkbox>Label</sbb-checkbox>`);

    expect(root).dom.to.be.equal(`
      <sbb-checkbox aria-checked="false" aria-disabled="false" aria-required="false" icon-placement="end" role="checkbox" size="m" tabindex="0">
        Label
      </sbb-checkbox>
    `);

    expect(root).shadowDom.to.be.equal(`
      <span class="sbb-checkbox-wrapper">
        <label class="sbb-checkbox">
          <input aria-hidden="true" tabindex="-1" type="checkbox"/>
          <span class="sbb-checkbox__inner">
            <span class="sbb-checkbox__aligner">
              <sbb-visual-checkbox></sbb-visual-checkbox>
            </span>
            <span class="sbb-checkbox__label">
              <slot></slot>
            </span>
          </span>
        </label>
      </span>
    `);
  });

  describe('icon position', () => {
    it('start', async () => {
      const root = await fixture(
        html`<sbb-checkbox icon-name="tickets-class-small" icon-placement="start" size="s"
          >Label</sbb-checkbox
        >`,
      );

      expect(root).dom.to.be.equal(`
        <sbb-checkbox aria-checked="false" aria-disabled="false" aria-required="false" icon-name="tickets-class-small" icon-placement="start" role="checkbox" size="s" tabindex="0">
          Label
        </sbb-checkbox>
      `);
      expect(root).shadowDom.to.be.equal(`
        <span class="sbb-checkbox-wrapper">
          <label class="sbb-checkbox">
            <input aria-hidden="true" tabindex="-1" type="checkbox"/>
            <span class="sbb-checkbox__inner">
              <span class="sbb-checkbox__aligner">
                <sbb-visual-checkbox></sbb-visual-checkbox>
              </span>
              <span class="sbb-checkbox__label">
                <slot></slot>
                <span class="sbb-checkbox__label--icon">
                  <slot name="icon">
                    <sbb-icon aria-hidden="true" data-namespace="default" name="tickets-class-small" role="img">
                  </slot>
                </span>
              </span>
            </span>
          </label>
        </span>
      `);
    });
  });

  describe('state', () => {
    it('checked', async () => {
      const root = await fixture(html`<sbb-checkbox checked>Label</sbb-checkbox>`);

      expect(root).dom.to.be.equal(`
        <sbb-checkbox aria-checked="true" aria-disabled="false" aria-required="false" checked icon-placement="end" role="checkbox" size="m" tabindex="0">
          Label
        </sbb-checkbox>
      `);

      expect(root).shadowDom.to.be.equal(`
        <span class="sbb-checkbox-wrapper">
          <label class="sbb-checkbox">
            <input aria-hidden="true" tabindex="-1" type="checkbox" checked=''/>
            <span class="sbb-checkbox__inner">
              <span class="sbb-checkbox__aligner">
                <sbb-visual-checkbox checked=""></sbb-visual-checkbox>
              </span>
              <span class="sbb-checkbox__label">
                <slot></slot>
              </span>
            </span>
          </label>
        </span>
      `);
    });

    it('indeterminate', async () => {
      const root = await fixture(html`<sbb-checkbox indeterminate>Label</sbb-checkbox>`);

      const input = root.shadowRoot.querySelector('input');
      expect(input.indeterminate).to.be.equal(true);

      expect(root).dom.to.be.equal(`
        <sbb-checkbox aria-checked="mixed" aria-disabled="false" aria-required="false" icon-placement="end" indeterminate role="checkbox" size="m" tabindex="0">
          Label
        </sbb-checkbox>
      `);

      expect(root).shadowDom.to.be.equal(`
        <span class="sbb-checkbox-wrapper">
          <label class="sbb-checkbox">
            <input aria-hidden="true" tabindex="-1" type="checkbox">
            <span class="sbb-checkbox__inner">
              <span class="sbb-checkbox__aligner">
                <sbb-visual-checkbox indeterminate=""></sbb-visual-checkbox>
              </span>
              <span class="sbb-checkbox__label">
                <slot></slot>
              </span>
            </span>
          </label>
        </span>
      `);
    });

    it('unchecked disabled', async () => {
      const root = await fixture(html`<sbb-checkbox disabled>Label</sbb-checkbox>`);
      expect(root).dom.to.be.equal(`
        <sbb-checkbox aria-checked="false" aria-disabled="true" aria-required="false" disabled icon-placement="end" size="m" role="checkbox">
          Label
        </sbb-checkbox>
      `);
      expect(root).shadowDom.to.be.equal(`
        <span class="sbb-checkbox-wrapper">
          <label class="sbb-checkbox">
            <input disabled aria-hidden="true" tabindex="-1" type="checkbox"/>
            <span class="sbb-checkbox__inner">
              <span class="sbb-checkbox__aligner">
                <sbb-visual-checkbox disabled=""></sbb-visual-checkbox>
              </span>
              <span class="sbb-checkbox__label">
                <slot></slot>
              </span>
            </span>
          </label>
        </span>
      `);
    });
  });
});
