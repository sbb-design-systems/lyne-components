import { expect } from '@open-wc/testing';
import { LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { fixture } from '../testing/private.ts';

import { SbbReadonlyMixin } from './readonly-mixin.ts';

/** Dummy docs */
@customElement('sbb-readonly-test')
class SbbReadonlyTestElement extends SbbReadonlyMixin(LitElement) {
  public override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

describe(`SbbReadonlyMixin`, () => {
  let element: SbbReadonlyTestElement;

  it('should respect initially unset readonly attribute', async () => {
    element = await fixture(html`<sbb-readonly-test></sbb-readonly-test>`);

    expect(element.readOnly).to.be.false;
  });

  it('should respect initially set readonly attribute', async () => {
    element = await fixture(html`<sbb-readonly-test readonly></sbb-readonly-test>`);

    expect(element.readOnly).to.be.true;
  });

  it('should reflect attribute', async () => {
    element = await fixture(html`<sbb-readonly-test></sbb-readonly-test>`);

    element.readOnly = true;
    expect(element).to.have.attribute('readonly');

    element.readOnly = false;
    expect(element).not.to.have.attribute('readonly');
  });

  it('should handle removed element with property change', async () => {
    element = await fixture(html`<sbb-readonly-test></sbb-readonly-test>`);

    element.remove();
    element.readOnly = true;

    expect(element.readOnly).to.be.true;
    expect(element).to.have.attribute('readonly');
  });

  it('should handle removed element with attribute change', async () => {
    element = await fixture(html`<sbb-readonly-test></sbb-readonly-test>`);

    element.remove();
    element.toggleAttribute('readonly', true);

    expect(element.readOnly).to.be.true;
    expect(element).to.have.attribute('readonly');
  });
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-readonly-test': SbbReadonlyTestElement;
  }
}
