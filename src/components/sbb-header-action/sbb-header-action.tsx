import { Component, h, JSX, Prop, Element, Listen, ComponentInterface } from '@stencil/core';
import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import {
  ButtonType,
  forwardHostEvent,
  LinkButtonProperties,
  LinkTargetType,
  PopupType,
  resolveRenderVariables,
} from '../../global/interfaces/link-button-properties';
import { InterfaceSbbHeaderActionAttributes } from './sbb-header-action.custom';

/**
 * @slot icon - Slot used to render the action icon.
 * @slot unnamed - Slot used to render the action text.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-header-action.scss',
  tag: 'sbb-header-action',
})
export class SbbHeaderAction implements ComponentInterface, LinkButtonProperties {
  /**
   * Used to set the minimum breakpoint from which the text is displayed.
   * E.g. if set to 'large', the text will be visible for breakpoints large, wide, ultra,
   * and hidden for all the others.
   */
  @Prop({ reflect: true }) public expandFrom: InterfaceSbbHeaderActionAttributes['expandFrom'] =
    'medium';

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/.
   */
  @Prop() public iconName?: string;

  /** The href value you want to link to (if it is not present sbb-header-action becomes a button). */
  @Prop() public href: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @Prop() public download?: boolean;

  /** Type attribute if component is displayed as a button. */
  @Prop() public type: ButtonType | undefined;

  /** Name attribute if component is displayed as a button. */
  @Prop() public name: string | undefined;

  /** The value associated with button `name` when it's submitted with the form data. */
  @Prop() public value?: string;

  /** Form attribute if component is displayed as a button. */
  @Prop() public form?: string;

  /**
   * If you use the button to trigger another widget which itself is covering
   * the page, you must provide an according attribute for aria-haspopup.
   */
  @Prop() public accessibilityHaspopup: PopupType | undefined;

  /** This will be forwarded as aria-label to the relevant nested element. */
  @Prop() public accessibilityLabel: string | undefined;

  @Element() private _element: HTMLElement;

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

  public render(): JSX.Element {
    const {
      tagName: TAG_NAME,
      attributes,
      screenReaderNewWindowInfo,
    } = resolveRenderVariables(this);
    return (
      <TAG_NAME class="sbb-header-action" {...attributes}>
        <span class="sbb-header-action__icon">
          <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
        </span>
        <span class="sbb-header-action__text">
          <slot />
          {screenReaderNewWindowInfo && (
            <span class="sbb-header-action__opens-in-new-window">
              . {i18nTargetOpensInNewWindow[getDocumentLang()]}
            </span>
          )}
        </span>
      </TAG_NAME>
    );
  }
}
