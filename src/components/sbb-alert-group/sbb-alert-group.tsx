import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import { InterfaceSbbAlertGroupAttributes } from './sbb-alert-group.custom';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';

/**
 * @slot unnamed - content slot, should be filled with `sbb-alert` items.
 * @slot accessibility-title - title for this sbb-alert-group which is only visible for screen reader users.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-alert-group.scss',
  tag: 'sbb-alert-group',
})
export class SbbAlertGroup {
  /**
   * The role attribute defines how to announce alerts to the user.
   *
   * 'status': sets aria-live to polite and aria-atomic to true.
   * 'alert': sets aria-live to assertive and aria-atomic to true.
   */
  @Prop({ reflect: true })
  public role: InterfaceSbbAlertGroupAttributes['role'] = 'status';

  /** Title for this alert group which is only visible for screen reader users. */
  @Prop() public accessibilityTitle: string;

  /** Level of the accessibility title, will be rendered as heading tag (e.g. h2). Defaults to level 2. */
  @Prop() public accessibilityTitleLevel: InterfaceTitleAttributes['level'] = '2';

  /** Whether the group currently has any alerts. */
  @State() private _hasAlerts: boolean;

  @Element() private _element: HTMLElement;

  /** Emits when an alert was removed from DOM. */
  @Event({
    eventName: 'did-dismiss-alert',
  })
  public didDismissAlert: EventEmitter<HTMLSbbAlertElement>;

  /** Emits when `sbb-alert-group` becomes empty. */
  @Event({
    eventName: 'empty',
  })
  public empty: EventEmitter<void>;

  /**
   * @internal
   */
  @Listen('dismissal-requested')
  public removeAlert(event: Event): void {
    const target = event.target as HTMLSbbAlertElement;
    const hasFocusInsideAlertGroup = document.activeElement === target;

    target.parentNode.removeChild(target);
    this.didDismissAlert.emit(target);

    // Restore focus
    if (hasFocusInsideAlertGroup) {
      // Set tabindex to 0 the make it focusable and afterwards focus it.
      // This is done to not completely lose focus after removal of an alert.
      // Once the sbb-alert-group was blurred, make the alert group not focusable again.
      this._element.tabIndex = 0;
      this._element.focus();
      this._element.addEventListener('blur', () => this._element.removeAttribute('tabindex'), {
        once: true,
      });
    }
  }

  private _slotChanged(event: Event): void {
    const hadAlerts = this._hasAlerts;
    this._hasAlerts = (event.target as HTMLSlotElement).assignedElements().length > 0;
    if (!this._hasAlerts && hadAlerts) {
      this.empty.emit();
    }
  }

  public render(): JSX.Element {
    const TITLE_TAG_NAME = `h${this.accessibilityTitleLevel}`;

    return (
      <Host class={{ 'sbb-alert-group-empty': !this._hasAlerts }}>
        <div class="sbb-alert-group">
          {this._hasAlerts && (
            <TITLE_TAG_NAME class="sbb-alert-group__title">
              <slot name="accessibility-title">{this.accessibilityTitle}</slot>
            </TITLE_TAG_NAME>
          )}
          <slot onSlotchange={(event) => this._slotChanged(event)} />
        </div>
      </Host>
    );
  }
}
