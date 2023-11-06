import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './sbb-form-field';

describe('sbb-form-field', () => {
  it('renders input', async () => {
    const root = await fixture(
      html` <sbb-form-field label="Fill input">
        <input placeholder="This is an input" />
      </sbb-form-field>`,
    );

    expect(root).dom.to.be.equal(`
      <sbb-form-field error-space="none" size="m" label="Fill input" width="default" data-input-empty data-input-type="input">
        <label data-creator="SBB-FORM-FIELD" slot="label" for="sbb-form-field-input-0">
          Fill input
        </label>
        <input placeholder="This is an input" id="sbb-form-field-input-0">
      </sbb-form-field>
    `);
    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-form-field__space-wrapper">
        <div class="sbb-form-field__wrapper" id="overlay-anchor">
          <slot name="prefix"></slot>
          <div class="sbb-form-field__input-container">
            <span aria-hidden="true" class="sbb-form-field__label-spacer"></span>
            <span class="sbb-form-field__label">
              <span class="sbb-form-field__label-ellipsis">
                <slot name="label"></slot>
              </span>
            </span>
            <div class="sbb-form-field__input">
              <slot></slot>
            </div>
          </div>
          <slot name="suffix"></slot>
        </div>
        <div class="sbb-form-field__error">
          <slot name="error"></slot>
        </div>
      </div>
    `);
  });

  it('renders slotted label', async () => {
    const root = await fixture(html`
      <sbb-form-field>
        <span slot="label">Fill input</span>
        <input slot="input" class="input" placeholder="This is an input" />
      </sbb-form-field>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-form-field error-space="none" size="m" width="default">
        <span slot="label">
          Fill input
        </span>
        <input class="input" placeholder="This is an input" slot="input">
      </sbb-form-field>
    `);

    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-form-field__space-wrapper">
        <div class="sbb-form-field__wrapper" id="overlay-anchor">
          <slot name="prefix"></slot>
          <div class="sbb-form-field__input-container">
            <span aria-hidden="true" class="sbb-form-field__label-spacer"></span>
            <span class="sbb-form-field__label">
              <span class="sbb-form-field__label-ellipsis">
                <slot name="label">
                </slot>
              </span>
            </span>
            <div class="sbb-form-field__input">
              <slot></slot>
            </div>
          </div>
          <slot name="suffix"></slot>
        </div>
        <div class="sbb-form-field__error">
          <slot name="error"></slot>
        </div>
      </div>
    `);
  });

  it('renders disabled input', async () => {
    const root = await fixture(html`
      <sbb-form-field label="Fill input">
        <input slot="input" class="input" disabled placeholder="This is an input" />
      </sbb-form-field>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-form-field error-space="none" size="m" label="Fill input" width="default">
        <label data-creator="SBB-FORM-FIELD" slot="label">
          Fill input
        </label>
        <input class="input" disabled="" placeholder="This is an input" slot="input">
      </sbb-form-field>
    `);
    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-form-field__space-wrapper">
        <div class="sbb-form-field__wrapper" id="overlay-anchor">
          <slot name="prefix"></slot>
          <div class="sbb-form-field__input-container">
            <span aria-hidden="true" class="sbb-form-field__label-spacer"></span>
            <span class="sbb-form-field__label">
              <span class="sbb-form-field__label-ellipsis">
                <slot name="label"></slot>
              </span>
            </span>
            <div class="sbb-form-field__input">
              <slot></slot>
            </div>
          </div>
          <slot name="suffix"></slot>
        </div>
        <div class="sbb-form-field__error">
          <slot name="error"></slot>
        </div>
      </div>
    `);
  });

  it('renders readonly input with error', async () => {
    const root = await fixture(html`
      <sbb-form-field label="Fill input">
        <input
          aria-describedby="error"
          class="input"
          readonly
          placeholder="This is an input"
          slot="input"
        />
        <sbb-form-error id="error"> You can't change this value. </sbb-form-error>
      </sbb-form-field>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-form-field error-space="none" size="m" label="Fill input" width="default" data-has-error>
        <label data-creator="SBB-FORM-FIELD" slot="label">
          Fill input
        </label>
        <input aria-describedby="error" class="input" placeholder="This is an input" readonly="" slot="input">
        <sbb-form-error id="error" role="status" slot="error">
          You can't change this value.
        </sbb-form-error>
      </sbb-form-field>
    `);
    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-form-field__space-wrapper">
        <div class="sbb-form-field__wrapper" id="overlay-anchor">
          <slot name="prefix"></slot>
          <div class="sbb-form-field__input-container">
            <span aria-hidden="true" class="sbb-form-field__label-spacer"></span>
            <span class="sbb-form-field__label">
              <span class="sbb-form-field__label-ellipsis">
                <slot name="label"></slot>
              </span>
            </span>
            <div class="sbb-form-field__input">
              <slot></slot>
            </div>
          </div>
          <slot name="suffix"></slot>
        </div>
        <div class="sbb-form-field__error">
          <slot name="error"></slot>
        </div>
      </div>
    `);
  });

  it('should render select without label', async () => {
    const root = await fixture(html`
      <sbb-form-field>
        <select>
          <option>Value 1</option>
          <option>Value 2</option>
          <option>Value 3</option>
        </select>
      </sbb-form-field>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-form-field error-space="none" size="m" width="default" data-input-type="select">
        <select>
          <option>Value 1</option>
          <option>Value 2</option>
          <option>Value 3</option>
        </select>
      </sbb-form-field>
    `);
    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-form-field__space-wrapper">
        <div class="sbb-form-field__wrapper" id="overlay-anchor">
          <slot name="prefix"></slot>
          <div class="sbb-form-field__input-container">
            <div class="sbb-form-field__input">
              <slot></slot>
            </div>
            <sbb-icon aria-hidden="true" class="sbb-form-field__select-input-icon"
              data-namespace="default" name="chevron-small-down-small" role="img"
            ></sbb-icon>
          </div>
          <slot name="suffix"></slot>
        </div>
        <div class="sbb-form-field__error">
          <slot name="error"></slot>
        </div>
      </div>
    `);
  });

  it('renders select with optional flag and borderless', async () => {
    const root = await fixture(html`
      <sbb-form-field label="Select option:" optional="true" borderless="">
        <select>
          <option>Value 1</option>
          <option>Value 2</option>
          <option>Value 3</option>
        </select>
      </sbb-form-field>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-form-field error-space="none" size="m" label="Select option:" optional="true" borderless="" width="default" data-input-type="select">
        <label data-creator="SBB-FORM-FIELD" slot="label" for="sbb-form-field-input-1">
          Select option:
        </label>
        <select id="sbb-form-field-input-1">
          <option>Value 1</option>
          <option>Value 2</option>
          <option>Value 3</option>
        </select>
      </sbb-form-field>
    `);
    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-form-field__space-wrapper">
        <div class="sbb-form-field__wrapper" id="overlay-anchor">
          <slot name="prefix"></slot>
          <div class="sbb-form-field__input-container">
            <span aria-hidden="true" class="sbb-form-field__label-spacer"></span>
            <span class="sbb-form-field__label">
              <span class="sbb-form-field__label-ellipsis">
                <slot name="label"></slot>
                <span aria-hidden="true">&nbsp;(optional)</span>
              </span>
            </span>
            <div class="sbb-form-field__input">
              <slot></slot>
            </div>
            <sbb-icon aria-hidden="true" class="sbb-form-field__select-input-icon"
            data-namespace="default" name="chevron-small-down-small" role="img"
            ></sbb-icon>
          </div>
          <slot name="suffix"></slot>
        </div>
        <div class="sbb-form-field__error">
          <slot name="error"></slot>
        </div>
      </div>
    `);
  });
});
