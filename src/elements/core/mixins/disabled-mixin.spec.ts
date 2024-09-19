import { expect } from '@open-wc/testing';
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { fixture } from '../testing/private.js';
import { waitForLitRender } from '../testing.js';

import { SbbDisabledMixin, SbbDisabledTabIndexActionMixin } from './disabled-mixin.js';

/** Dummy docs */
@customElement('sbb-disabled-test')
class SbbDisabledTestElement extends SbbDisabledTabIndexActionMixin(SbbDisabledMixin(LitElement)) {}

describe(`sbb-button`, () => {
  let element: SbbDisabledTestElement;

  function assertDisabled(element: SbbDisabledTestElement): void {
    expect(element.tabIndex).to.be.equal(-1);
    expect(element).not.to.have.attribute('tabindex');
    expect(element).to.have.attribute('aria-disabled', 'true');
  }

  function assertEnabled(element: SbbDisabledTestElement): void {
    expect(element.tabIndex).to.be.equal(0);
    expect(element).to.have.attribute('tabindex', '0');
    expect(element).not.to.have.attribute('aria-disabled');
  }

  function assertDisabledInteractive(element: SbbDisabledTestElement): void {
    expect(element.tabIndex).to.be.equal(0);
    expect(element).to.have.attribute('tabindex', '0');
    expect(element).to.have.attribute('aria-disabled', 'true');
  }

  beforeEach(async () => {
    element = await fixture(html`<sbb-disabled-test>I am a test button</sbb-disabled-test>`);
  });

  it('should set attributes when enabled', async () => {
    assertEnabled(element);
  });

  it('should set attributes when disabled initially', async () => {
    element = await fixture(
      html`<sbb-disabled-test disabled>I am a test button</sbb-disabled-test>`,
    );

    assertDisabled(element);
  });

  it('should update attributes on attribute change', async () => {
    element.setAttribute('disabled', 'true');
    await waitForLitRender(element);

    assertDisabled(element);

    element.removeAttribute('disabled');
    await waitForLitRender(element);

    assertEnabled(element);
  });

  it('should update attributes on property change', async () => {
    element.disabled = true;
    await waitForLitRender(element);

    assertDisabled(element);

    element.disabled = false;
    await waitForLitRender(element);

    assertEnabled(element);
  });

  it('should ignore disabledInteractive when enabled', async () => {
    element.disabledInteractive = true;

    assertEnabled(element);
  });

  describe('disabled interactive', () => {
    it('should set attributes when disabled initially', async () => {
      element = await fixture(
        html`<sbb-disabled-test disabled disabled-interactive>
          I am a test button
        </sbb-disabled-test>`,
      );

      assertDisabledInteractive(element);
    });

    it('should update attributes on attribute change', async () => {
      element.setAttribute('disabled', 'true');
      element.setAttribute('disabled-interactive', 'true');
      await waitForLitRender(element);

      assertDisabledInteractive(element);

      element.removeAttribute('disabled-interactive');
      await waitForLitRender(element);

      assertDisabled(element);
    });

    it('should update attributes on property change', async () => {
      element.disabled = true;
      element.disabledInteractive = true;
      await waitForLitRender(element);

      assertDisabledInteractive(element);

      element.disabledInteractive = false;
      await waitForLitRender(element);

      assertDisabled(element);
    });
  });
});

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-disabled-test': SbbDisabledTestElement;
  }
}
