import {
  Component,
  Element,
  h,
  JSX,
  Prop,
  ComponentInterface,
  State,
  Host,
  Watch,
} from '@stencil/core';
import { i18nTargetOpensInNewWindow } from '../../global/i18n';
import {
  ButtonType,
  LinkButtonProperties,
  LinkTargetType,
  resolveRenderVariables,
  targetsNewWindow,
} from '../../global/interfaces/link-button-properties';
import { InterfaceSbbHeaderActionAttributes } from './sbb-header-action.custom';
import { isBreakpoint } from '../../global/helpers/breakpoint';
import { toggleDatasetEntry } from '../../global/helpers/dataset';
import { AgnosticResizeObserver as ResizeObserver } from '../../global/helpers/resize-observer';
import {
  actionElementHandlerAspect,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/helpers';

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
   * https://icons.app.sbb.ch.
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
  @Prop({ reflect: true }) public name: string | undefined;

  /** The value associated with button `name` when it's submitted with the form data. */
  @Prop() public value?: string;

  /** Form attribute if component is displayed as a button. */
  @Prop() public form?: string;

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLElement;

  private _documentResizeObserver = new ResizeObserver(() => this._updateExpanded());

  private _handlerRepository = new HandlerRepository(
    this._element,
    actionElementHandlerAspect,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  public connectedCallback(): void {
    this._documentResizeObserver.observe(document.documentElement);
    this._updateExpanded();
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._documentResizeObserver.disconnect();
    this._handlerRepository.disconnect();
  }

  @Watch('expandFrom')
  private _updateExpanded(): void {
    toggleDatasetEntry(this._element, 'expanded', !isBreakpoint('zero', this.expandFrom));
  }

  public render(): JSX.Element {
    const { tagName: TAG_NAME, attributes, hostAttributes } = resolveRenderVariables(this);
    return (
      <Host {...hostAttributes}>
        <TAG_NAME class="sbb-header-action" {...attributes}>
          <span class="sbb-header-action__wrapper">
            <span class="sbb-header-action__icon">
              <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
            </span>
            <span class="sbb-header-action__text">
              <slot />
              {targetsNewWindow(this) && (
                <span class="sbb-header-action__opens-in-new-window">
                  . {i18nTargetOpensInNewWindow[this._currentLanguage]}
                </span>
              )}
            </span>
          </span>
        </TAG_NAME>
      </Host>
    );
  }
}
