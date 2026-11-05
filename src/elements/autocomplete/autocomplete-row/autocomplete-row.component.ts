import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';

import {
  i18nAutocompleteActionsHint,
  isAndroid,
  isIOS,
  isSafari,
  SbbElement,
  SbbLanguageController,
  SbbPropertyWatcherController,
} from '../../core.ts';

import style from './autocomplete-row.scss?inline';

/**
 * The component is used as a wrapper for an option and one or more action buttons.
 *
 * @slot - Use the unnamed slot to add a `sbb-option` followed by one or more `sbb-autocomplete-button` elements.
 */
export class SbbAutocompleteRowElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-autocomplete-row';
  public static override readonly role: string = 'group';
  public static override styles: CSSResultGroup = [unsafeCSS(style)];

  private _assignedDescription?: string;
  private _languageController = new SbbLanguageController(this).withHandler(() =>
    this._updateAriaDescription(),
  );

  public constructor() {
    super();

    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-autocomplete'), {
        negative: (e) => this.toggleState('negative', e.negative),
      }),
    );

    this.addController(
      new SbbPropertyWatcherController(this, () => this.querySelector('sbb-option'), {
        disabled: (e) => this.toggleState('disabled', e.disabled),
      }),
    );
  }

  private _updateAriaDescription(): void {
    if (isIOS || isAndroid) {
      // On mobile devices, the user will arrive at all options and actions anyway.
      return;
    }
    const hasButton = !!this.querySelector('sbb-autocomplete-button');
    const option = this.querySelector('sbb-option');
    if (!option) {
      return;
    }

    if (hasButton) {
      option['internals'].ariaDescription =
        i18nAutocompleteActionsHint[this._languageController.current];
    } else if (!hasButton && option['internals'].ariaDescription) {
      option['internals'].ariaDescription = null;
    }

    // VoiceOver doesn't read ariaDescription of elementInternals.
    // We need to set the ariaDescription on the option itself for VoiceOver to read it.
    if (isSafari) {
      if (
        hasButton &&
        (!option.ariaDescription ||
          (this._assignedDescription &&
            option.ariaDescription === this._assignedDescription &&
            option.ariaDescription !==
              i18nAutocompleteActionsHint[this._languageController.current]))
      ) {
        option.ariaDescription = i18nAutocompleteActionsHint[this._languageController.current];
        this._assignedDescription = option.ariaDescription;
      } else if (
        !hasButton &&
        this._assignedDescription &&
        option.ariaDescription === this._assignedDescription
      ) {
        option.ariaDescription = null;
        this._assignedDescription = undefined;
      }
    }
  }

  protected override render(): TemplateResult {
    return html`<slot @slotchange=${this._updateAriaDescription}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-row': SbbAutocompleteRowElement;
  }
}
