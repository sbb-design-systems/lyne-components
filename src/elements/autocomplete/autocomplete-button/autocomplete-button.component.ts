import { type CSSResultGroup, isServer, type PropertyValues, type TemplateResult } from 'lit';

import { miniButtonStyle } from '../../button.pure.ts';
import {
  i18nButton,
  isAndroid,
  isMacOS,
  isSafari,
  SbbActionBaseElement,
  SbbDisabledMixin,
  sbbLiveAnnouncer,
  SbbLanguageController,
  SbbNegativeMixin,
  SbbPropertyWatcherController,
} from '../../core.ts';
import { SbbIconNameMixin } from '../../icon.pure.ts';
import type { SbbOptGroupElement, SbbOptionElement } from '../../option.pure.ts';

/**
 * It displays an icon-only button that can be used in a `sbb-autocomplete-row`.
 *
 * @slot icon - Slot used to display the icon, if one is set
 */
export class SbbAutocompleteButtonElement extends SbbDisabledMixin(
  SbbNegativeMixin(SbbIconNameMixin(SbbActionBaseElement)),
) {
  public static override readonly elementName: string = 'sbb-autocomplete-button';
  public static override readonly role = isSafari ? 'button' : 'option';
  public static override styles: CSSResultGroup = [miniButtonStyle];

  /** Gets the SbbOptionElement on the same row of the button. */
  public get option(): SbbOptionElement | null {
    return this.closest('sbb-autocomplete-row')?.querySelector(
      'sbb-option',
    ) as SbbOptionElement | null;
  }

  /** Gets the parent SbbOptGroupElement, if present. */
  public get optgroup(): SbbOptGroupElement | null {
    return this.closest('sbb-optgroup');
  }

  private _languageController = new SbbLanguageController(this);

  public constructor() {
    super();
    this.internals.states.add('button');
    if (!isSafari) {
      this.internals.ariaRoleDescription = '';
      const updateDescription = (): unknown =>
        (this.internals.ariaDescription = i18nButton[this._languageController.current]);
      updateDescription();
      this._languageController.withHandler(updateDescription);
    }

    if (!isServer) {
      this.setupBaseEventHandlers();
      this.addController(
        new SbbPropertyWatcherController(this, () => this.closest('sbb-optgroup'), {
          disabled: () => this._updateInternals(),
        }),
      );
      this.addController(
        new SbbPropertyWatcherController(this, () => this.closest('sbb-autocomplete'), {
          negative: (e) => (this.negative = e.negative),
        }),
      );
    }
  }

  /**
   * Whether the button is currently active.
   * @internal
   */
  public setActive(value: boolean): void {
    this.toggleState('focus-visible', value);

    // In Safari on macOS, VoiceOver is not announcing anything.
    // We fix this by manually announcing the button's label and description when it is focused.
    if (value && isSafari && isMacOS) {
      const output: string[] = [];
      if (this.ariaLabel) {
        output.push(this.ariaLabel);
      } else if (this.ariaLabelledByElements?.length) {
        output.push(this._textContent(this.ariaLabelledByElements));
      }

      if (this.ariaDescription) {
        output.push(this.ariaDescription);
      } else if (this.ariaDescribedByElements?.length) {
        output.push(this._textContent(this.ariaDescribedByElements));
      }

      output.push(i18nButton[this._languageController.current]);

      sbbLiveAnnouncer.announce(output.join(', '), 'assertive');
    }
  }

  private _textContent(elements: readonly Element[] | null | undefined): string {
    return elements?.map((el) => el.textContent.trim().replace(/\.$/, '')).join('. ') ?? '';
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('disabled')) {
      this._updateInternals();
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    if (isAndroid) {
      // With talkback, only focusable elements can be browsed.
      this.tabIndex = -1;
    }
  }

  protected override isDisabledExternally(): boolean {
    return this.optgroup?.disabled ?? false;
  }

  private _updateInternals(): void {
    if (this.disabled || this.optgroup?.disabled) {
      this.internals.states.add('disabled');
      this.internals.ariaDisabled = 'true';
    } else {
      this.internals.states.delete('disabled');
      this.internals.ariaDisabled = null;
    }
  }

  protected override renderTemplate(): TemplateResult {
    return super.renderIconSlot();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-button': SbbAutocompleteButtonElement;
  }
}
