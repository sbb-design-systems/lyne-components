import type { CSSResultGroup, PropertyDeclaration } from 'lit';
import { property } from 'lit/decorators.js';

import { miniButtonStyle } from '../../button.pure.ts';
import { boxSizingStyles, i18nShowCalendar, idReference } from '../../core.ts';
import { datepickerButtonStyle, SbbDatepickerButtonBase } from '../common/datepicker-button.ts';
import type { SbbDatepickerElement } from '../datepicker/datepicker.component.ts';

/**
 * Combined with a `sbb-datepicker`, it can be used to select a date from a `sbb-calendar`.
 */
export class SbbDatepickerToggleElement<T = Date> extends SbbDatepickerButtonBase<T> {
  public static override readonly elementName: string = 'sbb-datepicker-toggle';
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    miniButtonStyle,
    datepickerButtonStyle,
  ];

  protected override iconName = 'calendar-small';

  /** Datepicker reference. */
  @idReference()
  @property()
  public accessor datepicker: SbbDatepickerElement<T> | null = null;

  public constructor() {
    super();
    this.addEventListener?.('click', () => {
      if (import.meta.env.DEV && !this.datepicker) {
        console.warn('sbb-datepicker-toggle: No datepicker connected.');
        console.log(this);
      }
      if (!this.datepicker?.isOpen) {
        this.datepicker?.open();
      }
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.internals.ariaLabel = i18nShowCalendar[this.language.current];
    const formField = this.closest?.('sbb-form-field');
    if (formField && !this.hasAttribute('datepicker')) {
      this.datepicker ??= formField.querySelector<SbbDatepickerElement<T>>('sbb-datepicker');
    }
  }

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);
    if (name === 'datepicker' && this.datepicker && this.datepicker.trigger !== this) {
      this.datepicker.trigger = this;
    } else if (!name && this.hasUpdated) {
      this.internals.ariaLabel = i18nShowCalendar[this.language.current];
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-datepicker-toggle': SbbDatepickerToggleElement;
  }
}
