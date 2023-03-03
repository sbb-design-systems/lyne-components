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
import {
  ButtonType,
  dispatchClickEventWhenButtonAndSpaceKeyup,
  dispatchClickEventWhenEnterKeypress,
  handleLinkButtonClick,
  LinkButtonProperties,
  LinkButtonRenderVariables,
  LinkTargetType,
  resolveRenderVariables,
  targetsNewWindow,
} from '../../global/interfaces/link-button-properties';
import { InterfaceLinkAttributes } from './sbb-link.custom';
import { ACTION_ELEMENTS, hostContext } from '../../global/helpers/host-context';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';
import {
  createNamedSlotState,
  queryAndObserveNamedSlotState,
  queryNamedSlotState,
} from '../../global/helpers/observe-named-slot-changes';

/**
 * @slot unnamed - Link Content
 * @slot icon - Slot used to display the icon, if one is set
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-link.scss',
  tag: 'sbb-link',
})
export class SbbLink implements ComponentInterface, LinkButtonProperties {
  /** Variant of the link (block or inline). */
  @Prop({ reflect: true }) public variant: InterfaceLinkAttributes['variant'] = 'block';

  /** Negative coloring variant flag. */
  @Prop({ reflect: true }) public negative = false;

  /**
   * Text size, the link should get in the non-button variation.
   * With inline variant, the text size adapts to where it is used.
   */
  @Prop({ reflect: true }) public size: InterfaceLinkAttributes['size'] = 's';

  /**
   * Set this property to true if you want only a visual representation of a
   * link, but no interaction (a span instead of a link/button will be rendered).
   */
  @Prop({ attribute: 'static', mutable: true, reflect: true }) public isStatic = false;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/.
   * Inline variant doesn't support icons.
   */
  @Prop() public iconName?: string;

  /** Moves the icon to the end of the component if set to true. */
  @Prop() public iconPlacement?: InterfaceLinkAttributes['iconPlacement'] = 'start';

  /** The href value you want to link to (if it is not present link becomes a button). */
  @Prop() public href: string | undefined;

  /** Where to display the linked URL. */
  @Prop() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @Prop() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @Prop() public download?: boolean;

  /** The type attribute to use for the button. */
  @Prop() public type: ButtonType | undefined;

  /** Whether the button is disabled. */
  @Prop({ reflect: true }) public disabled = false;

  /** The name attribute to use for the button. */
  @Prop() public name: string | undefined;

  /** The value attribute to use for the button. */
  @Prop() public value?: string;

  /** The <form> element to associate the button with. */
  @Prop() public form?: string;

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('icon');

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLElement;

  public connectedCallback(): void {
    // Check if the current element is nested in an action element.
    this.isStatic = this.isStatic || !!hostContext(ACTION_ELEMENTS, this._element);
    this._namedSlots = queryAndObserveNamedSlotState(this._element, this._namedSlots);
  }

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
  }

  @Listen('click')
  public handleClick(event: Event): void {
    handleLinkButtonClick(event);
  }

  @Listen('keypress')
  public handleKeypress(event: KeyboardEvent): void {
    dispatchClickEventWhenEnterKeypress(event);
  }

  @Listen('keyup')
  public handleKeyup(event: KeyboardEvent): void {
    dispatchClickEventWhenButtonAndSpaceKeyup(event);
  }

  @Listen('sbbNamedSlotChange', { passive: true })
  public handleSlotNameChange(event: CustomEvent<Set<string>>): void {
    this._namedSlots = queryNamedSlotState(this._element, this._namedSlots, event.detail);
  }

  public render(): JSX.Element {
    const {
      tagName: TAG_NAME,
      attributes,
      hostAttributes,
    }: LinkButtonRenderVariables = resolveRenderVariables(this);

    // See https://github.com/ionic-team/stencil/issues/2703#issuecomment-1050943715 on why form attribute is set with `setAttribute`
    return (
      <Host {...hostAttributes}>
        <TAG_NAME class="sbb-link" {...attributes}>
          {this.variant !== 'inline' && (this.iconName || this._namedSlots.icon) && (
            <span class="sbb-link__icon">
              <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
            </span>
          )}
          <slot />
          {targetsNewWindow(this) && (
            <span class="sbb-link__opens-in-new-window">
              . {i18nTargetOpensInNewWindow[this._currentLanguage]}
            </span>
          )}
        </TAG_NAME>
      </Host>
    );
  }
}
