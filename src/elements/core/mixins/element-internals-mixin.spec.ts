import { expect } from '@open-wc/testing';
import { LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { fixture } from '../testing/private.ts';

import { SbbElementInternalsMixin, ɵstateController } from './element-internals-mixin.ts';

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
    ɵstateController(element).toggle('test');
    expect(element).to.match(':state(test)');
  });

  it('should allow unsetting state', async () => {
    ɵstateController(element).toggle('test');
    ɵstateController(element).toggle('test');
    expect(element).to.not.match(':state(test)');
  });

  it('should allow force setting state', async () => {
    ɵstateController(element).toggle('test', true);
    expect(element).to.match(':state(test)');
  });

  it('should allow force setting state when already set', async () => {
    ɵstateController(element).toggle('test');
    ɵstateController(element).toggle('test', true);
    expect(element).to.match(':state(test)');
  });

  it('should allow force unsetting state', async () => {
    ɵstateController(element).toggle('test');
    ɵstateController(element).toggle('test', false);
    expect(element).to.not.match(':state(test)');
  });

  it('should allow force unsetting state when already unset', async () => {
    ɵstateController(element).toggle('test', false);
    expect(element).to.not.match(':state(test)');
  });
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-element-internals-test': SbbElementInternalsTestElement;
  }
}
