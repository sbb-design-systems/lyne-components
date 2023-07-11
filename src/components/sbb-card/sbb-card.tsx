import { Component, ComponentInterface, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import {
  ButtonType,
  LinkButtonProperties,
  LinkButtonRenderVariables,
  LinkTargetType,
  resolveRenderVariables,
  targetsNewWindow,
} from '../../global/interfaces/link-button-properties';
import { InterfaceSbbCardAttributes } from './sbb-card.custom';
import {
  actionElementHandlerAspect,
  createNamedSlotState,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
  namedSlotChangeHandlerAspect,
} from '../../global/helpers';

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

  /** Option to set the component's background color. */
  @Prop({ reflect: true }) public color: InterfaceSbbCardAttributes['color'] = 'white';

  /** Used to set the component's active state. */
  @Prop({ reflect: true }) public active = false;

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
  @Prop({ reflect: true }) public name: string | undefined;

  /** The <form> element to associate the button with. */
  @Prop() public form?: string | undefined;

  /** The value associated with button `name` when it's submitted with the form data. */
  @Prop() public value?: string | undefined;

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLElement;

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('badge');

  private _handlerRepository = new HandlerRepository(
    this._element,
    actionElementHandlerAspect,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  /**
   * It is used internally to show the `<sbb-card-badge>`.
   *
   * @returns True whether size is equal to m, l, xl or xxl.
   */
  private _hasBadge(): boolean {
    return (
      this._namedSlots['badge'] &&
      (this.size === 'm' || this.size === 'l' || this.size === 'xl' || this.size === 'xxl')
    );
  }

  public render(): JSX.Element {
    const {
      tagName: TAG_NAME,
      attributes,
      hostAttributes,
    }: LinkButtonRenderVariables = resolveRenderVariables(this);
    if (this._hasBadge()) {
      hostAttributes['data-has-badge'] = '';
    }

    return (
      <Host {...hostAttributes}>
        <TAG_NAME class="sbb-card" {...attributes}>
          <span class="sbb-card__wrapper">
            <slot />
          </span>
          {this._hasBadge() && <slot name="badge" />}
          {targetsNewWindow(this) && (
            <span class="sbb-card__opens-in-new-window">
              . {i18nTargetOpensInNewWindow[this._currentLanguage]}
            </span>
          )}
        </TAG_NAME>
      </Host>
    );
  }
}
