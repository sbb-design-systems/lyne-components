import type { CSSResultGroup, PropertyDeclaration } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { idReference } from '../../core/decorators.js';
import { i18nShowCalendar } from '../../core/i18n.js';
import { SbbDatepickerButtonBase } from '../common.js';
import type { SbbDatepickerElement } from '../datepicker.js';

import style from './datepicker-toggle.scss?lit&inline';

/**
 * Combined with a `sbb-datepicker`, it can be used to select a date from a `sbb-calendar`.
 */
export
@customElement('sbb-datepicker-toggle')
class SbbDatepickerToggleElement<T = Date> extends SbbDatepickerButtonBase<T> {
  public static override styles: CSSResultGroup = style;

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
    } else if (!name) {
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
