import {
  Component,
  ComponentInterface,
  Element,
  h,
  Host,
  JSX,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import {
  ButtonType,
  forwardHostEvent,
  LinkButtonProperties,
  LinkButtonRenderVariables,
  LinkTargetType,
  resolveRenderVariables,
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
export class SbbCard implements ComponentInterface, LinkButtonProperties {
  /** Size variant, either xs, s, m, l, xl or xxl. */
  @Prop({ reflect: true }) public size?: InterfaceSbbCardAttributes['size'] = 'm';

  /** Option to set the component background color. */
  @Prop({ reflect: true }) public negative: boolean;

  /** Used to set the component's active state. */
  @Prop({ reflect: true }) public active = false;

  /** Id used to identify the inner element. */
  @Prop() public cardId?: string;

  /* @internal */
  @State() private _hasBadge = false;

  /** The href value you want to link to. */
  @Prop({ reflect: true }) public href: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @Prop() public download?: boolean | undefined;

  /** Default behaviour of the button. */
  @Prop() public type: ButtonType | undefined;

  /** The name of the button. */
  @Prop() public name: string | undefined;

  /** The <form> element to associate the button with. */
  @Prop() public form?: string | undefined;

  /** The value associated with button `name` when it's submitted with the form data. */
  @Prop() public value?: string | undefined;

  /** This will be forwarded as aria-label to the relevant nested element. */
  @Prop() public accessibilityLabel: string | undefined;

  /** This will be forwarded as aria-describedby to the relevant nested element. */
  @Prop() public accessibilityDescribedby: string | undefined;

  /** This will be forwarded as aria-labelledby to the relevant nested element. */
  @Prop() public accessibilityLabelledby: string | undefined;

  @Element() private _element!: HTMLElement;

  public connectedCallback(): void {
    // Forward focus call to action element
    this._element.focus = (options: FocusOptions) => this._actionElement().focus(options);
  }

  private _actionElement(): HTMLElement {
    return this._element.shadowRoot.firstElementChild as HTMLElement;
  }

  @Listen('click')
  public handleClick(event: Event): void {
    forwardHostEvent(event, this._element, this._actionElement());
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
    const {
      tagName: TAG_NAME,
      attributes,
      screenReaderNewWindowInfo,
    }: LinkButtonRenderVariables = resolveRenderVariables(this);

    return (
      <Host class={{ 'sbb-card--has-badge': this._showSBBBadge() && this._hasBadge }}>
        <TAG_NAME
          id={this.cardId}
          class="sbb-card"
          {...attributes}
          ref={(btn) => this.form && btn?.setAttribute('form', this.form)}
        >
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
            {screenReaderNewWindowInfo && (
              <span class="sbb-card__opens-in-new-window">
                . {i18nTargetOpensInNewWindow[getDocumentLang()]}
              </span>
            )}
          </span>
        </TAG_NAME>
      </Host>
    );
  }
}
