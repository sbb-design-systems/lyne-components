import { Component, Event, EventEmitter, h, Host, JSX, Prop, State } from '@stencil/core';
import {
  ButtonType,
  LinkButtonProperties,
  LinkTargetType,
} from '../../global/interfaces/link-button-properties';
import { InterfaceSbbCardAttributes } from './sbb-card.custom';

/**
 * @slot unnamed - Slot to render the content.
 * @slot badge - Slot to render `<sbb-card-badge>`.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-card.scss',
  tag: 'sbb-card',
})
export class SbbCard implements LinkButtonProperties {
  /**
   * Size variant, either xs, s, m, l, xl or xxl.
   */
  @Prop() public size?: InterfaceSbbCardAttributes['size'] = 'm';

  /**
   * Id used to identify the inner element.
   */
  @Prop() public idValue?: string;

  /* @internal */
  @State() private _hasBadge = false;

  /**
   * This will be forwarded as aria-label to the relevant nested element.
   */
  @Prop() public accessibilityLabel: string | undefined;

  /**
   * This will be forwarded as aria-describedby to the relevant nested element.
   */
  @Prop() public accessibilityDescribedby: string | undefined;

  /**
   * This will be forwarded as aria-labelledby to the relevant nested element.
   */
  @Prop() public accessibilityLabelledby: string | undefined;

  /**
   *  The href value you want to link to.
   */
  @Prop() public href: string | undefined;

  /**
   * Whether the browser will show the download dialog on click.
   */
  @Prop() public download?: boolean | undefined;

  /**
   * The relationship of the linked URL as space-separated link types.
   */
  @Prop() public rel?: string | undefined;

  /**
   * Where to display the linked URL.
   */
  @Prop() public target?: LinkTargetType | string | undefined;

  /**
   * Default behaviour of the button.
   */
  @Prop() public type: ButtonType | undefined;

  /**
   * The name of the button.
   */
  @Prop() public name: string | undefined;

  /**
   * The <form> element to associate the button with.
   */
  @Prop() public form?: string | undefined;

  /**
   * The value associated with button `name` when it's submitted with the form data.
   */
  @Prop() public value?: string | undefined;

  /**
   * Id sent in the click event payload.
   */
  @Prop() public eventId?: string | undefined;

  /**
   * Emits whenever the native button click event triggers.
   * TODO: similar to the one in sbb-button. To be fixed together.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'sbb-card-button_click',
  })
  public click: EventEmitter<any> | undefined;

  /**
   * The function triggered on button click.
   */
  public emitButtonClick(): void {
    this.click.emit(this.eventId);
  }

  /**
   * It is used internally to show the `<sbb-card-badge>`.
   *
   * @returns True whether size is equal to m, l, xl or xxl.
   */
  private _showSBBBadge(): boolean {
    return this.size === 'm' || this.size === 'l' || this.size === 'xl' || this.size === 'xxl';
  }

  public render(): JSX.Element {
    return (
      <Host class={{ 'sbb-card--has-badge': this._showSBBBadge() && this._hasBadge }}>
        {this._showSBBBadge() && (
          <slot
            name="badge"
            onSlotchange={(event) =>
              (this._hasBadge = (event.target as HTMLSlotElement).assignedElements().length > 0)
            }
          />
        )}
        <span class="sbb-card__content">
          <slot />
        </span>
      </Host>
    );
  }
}
