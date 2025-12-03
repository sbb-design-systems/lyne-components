import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { forceType } from '../../core/decorators.ts';
import { isEventPrevented } from '../../core/eventing.ts';
import { SbbElementInternalsMixin, SbbHydrationMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbTitleLevel } from '../../title.ts';
import type { SbbAlertElement } from '../alert.ts';

import style from './alert-group.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-alert` component.
 *
 * @slot - Use the unnamed slot to add `sbb-alert` elements to the `sbb-alert-group`.
 * @slot accessibility-title - title for this `sbb-alert-group` which is only visible for screen reader users.
 */
export
@customElement('sbb-alert-group')
class SbbAlertGroupElement extends SbbHydrationMixin(SbbElementInternalsMixin(LitElement)) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events = {
    empty: 'empty',
  } as const;

  /**
   * The role attribute defines how to announce alerts to the user.
   *
   * 'status': sets aria-live to polite and aria-atomic to true.
   * 'alert': sets aria-live to assertive and aria-atomic to true.
   */
  @property({ reflect: true })
  public override accessor role: 'alert' | 'status' | string = 'status';

  /** Title for this alert group which is only visible for screen reader users. */
  @forceType()
  @property({ attribute: 'accessibility-title' })
  public accessor accessibilityTitle: string = '';

  /** Level of the accessibility title, will be rendered as heading tag (e.g. h2). Defaults to level 2. */
  @property({ attribute: 'accessibility-title-level' })
  public accessor accessibilityTitleLevel: SbbTitleLevel = '2';

  /** Whether the group currently has any alerts. */
  @state() private accessor _hasAlerts: boolean = false;

  public constructor() {
    super();
    this.addEventListener?.(
      'close',
      async (e: Event) => {
        if (!(await isEventPrevented(e))) {
          this._alertClosed(e);
        }
      },
      {
        // We use capture here, because 'close' does not bubble.
        capture: true,
      },
    );
  }

  private _alertClosed(event: Event): void {
    const target = event.target as SbbAlertElement;
    const hasFocusInsideAlertGroup = document.activeElement === target;

    // Restore focus
    if (hasFocusInsideAlertGroup) {
      // Set tabindex to 0 the make it focusable and afterward focus it.
      // This is done to not completely lose focus after removal of an alert.
      // Once the sbb-alert-group was blurred, make the alert group not focusable again.
      this.tabIndex = 0;
      this.focus();
      this.addEventListener('blur', () => this.removeAttribute('tabindex'), {
        once: true,
      });
    }
  }

  private _slotChanged(event: Event): void {
    const hadAlerts = this._hasAlerts;
    this._hasAlerts =
      (event.target as HTMLSlotElement)
        .assignedElements()
        .filter((e) => e instanceof Element && e.localName === 'sbb-alert').length > 0;
    if (!this._hasAlerts && hadAlerts) {
      /** Emits when `sbb-alert-group` becomes empty. */
      this.dispatchEvent(new Event('empty', { composed: true, bubbles: true }));
    }

    this.toggleState('empty', !this._hasAlerts);
  }

  protected override render(): TemplateResult {
    const TITLE_TAG_NAME = `h${this.accessibilityTitleLevel}`;

    /* eslint-disable lit/binding-positions */
    return html`
      <div class="sbb-alert-group">
        ${this._hasAlerts
          ? html`<${unsafeStatic(TITLE_TAG_NAME)} class="sbb-alert-group__title">
              <slot name="accessibility-title">${this.accessibilityTitle}</slot>
            </${unsafeStatic(TITLE_TAG_NAME)}>`
          : nothing}
        <slot @slotchange=${(event: Event) => this._slotChanged(event)}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-alert-group': SbbAlertGroupElement;
  }
}
