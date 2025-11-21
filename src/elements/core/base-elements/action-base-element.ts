import { html, LitElement, type TemplateResult } from 'lit';

import { SbbElementInternalsMixin } from '../mixins.ts';

/**
 * Whenever an element can be disabled it has disabled property
 * or formDisabled if it's a form element.
 * Because we can't use types here directly we created this helper type.
 */
type MaybeDisabled = {
  disabled?: boolean;
  formDisabled?: boolean;
  disabledInteractive?: boolean;
};

export abstract class SbbActionBaseElement extends SbbElementInternalsMixin(LitElement) {
  protected get maybeDisabled(): boolean | undefined {
    const maybeDisabled = this as MaybeDisabled;
    return maybeDisabled.disabled || maybeDisabled.formDisabled;
  }

  protected get maybeDisabledInteractive(): boolean | undefined {
    return (this as MaybeDisabled).disabledInteractive;
  }

  public constructor() {
    super();
    this.internals.states.add('action');
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    if (
      import.meta.env.DEV &&
      (this.matches(':state(link)') || this.matches(':state(button)')) &&
      this.parentElement?.closest(':state(link), :state(button), a, button')
    ) {
      console.warn(
        `Nested action element detected (${this.localName} inside ${this.parentElement!.closest(':state(link), :state(button), a, button')!.localName}). Maybe use a static variant for the inner action element?`,
        this,
      );
    }
  }

  protected setupBaseEventHandlers(): void {
    this.addEventListener(
      'click',
      (event) => {
        if (this.maybeDisabled && !this.maybeDisabledInteractive) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      },
      // capture is necessary here, as this event handler needs to be executed before any other
      // in order to stop immediate propagation in the disabled case.
      { capture: true },
    );
  }

  /** Override this method to render the component template. */
  protected renderTemplate(): TemplateResult {
    throw new Error('Implementation needed!');
  }

  /** Default render method for button-like components. */
  protected override render(): TemplateResult {
    return html`<span class="sbb-action-base ${this.localName}">${this.renderTemplate()}</span>`;
  }
}
