import { expect } from '@open-wc/testing';
import { LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { fixture } from '../testing/private.js';

import { SbbElementInternalsMixin } from './element-internals-mixin.js';

/** Dummy docs */
@customElement('sbb-element-internals-test')
class SbbElementInternalsTestElement extends SbbElementInternalsMixin(LitElement) {
  public static override readonly role = 'text';

  protected override render(): TemplateResult {
    return html`Button`;
  }
}

describe(`SbbElementInternalsMixin`, () => {
  let element: SbbElementInternalsTestElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-element-internals-test></sbb-element-internals-test>`);
  });

  it('should have the defined role', async () => {
    expect(element['internals'].role).to.equal(SbbElementInternalsTestElement.role);
  });

  it('should allow setting state', async () => {
    element['toggleState']('test');
    expect(element).to.match(':state(test)');
  });

  it('should allow unsetting state', async () => {
    element['toggleState']('test');
    element['toggleState']('test');
    expect(element).to.not.match(':state(test)');
  });

  it('should allow force setting state', async () => {
    element['toggleState']('test', true);
    expect(element).to.match(':state(test)');
  });

  it('should allow force setting state when already set', async () => {
    element['toggleState']('test');
    element['toggleState']('test', true);
    expect(element).to.match(':state(test)');
  });

  it('should allow force unsetting state', async () => {
    element['toggleState']('test');
    element['toggleState']('test', false);
    expect(element).to.not.match(':state(test)');
  });

  it('should allow force unsetting state when already unset', async () => {
    element['toggleState']('test', false);
    expect(element).to.not.match(':state(test)');
  });
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-element-internals-test': SbbElementInternalsTestElement;
  }
}
