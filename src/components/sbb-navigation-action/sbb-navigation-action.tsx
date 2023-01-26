import { Component, h, Element, JSX, Prop, Listen, ComponentInterface, State } from '@stencil/core';
import {
  ButtonType,
  forwardHostEvent,
  LinkButtonProperties,
  LinkButtonRenderVariables,
  LinkTargetType,
  PopupType,
  resolveRenderVariables,
} from '../../global/interfaces/link-button-properties';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';
import { hostContext } from '../../global/helpers/host-context';
import { AgnosticMutationObserver as MutationObserver } from '../../global/helpers/mutation-observer';
import { isValidAttribute } from '../../global/helpers/is-valid-attribute';

// This approach allows us to just check whether an attribute has been added or removed
// from the DOM, instead of a `Watch()` decorator that would check the value change 
// and get us into a loop.
const navigationActionObserverConfig: MutationObserverInit = {
  attributeFilter: ['active'],
};

/**
 * @slot unnamed - Use this slot to provide the navigation action label.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-navigation-action.scss',
  tag: 'sbb-navigation-action',
})
export class SbbNavigationAction implements ComponentInterface, LinkButtonProperties {
  /**
   * Action size variant.
   */
  @Prop({ reflect: true }) public size?: 'l' | 'm' | 's' = 'l';

  /**
   * The href value you want to link to (if it is not present, navigation action becomes a button).
   */
  @Prop() public href: string | undefined;

  /**
   * Where to display the linked URL.
   */
  @Prop() public target?: LinkTargetType | string | undefined;

  /**
   * The relationship of the linked URL as space-separated link types.
   */
  @Prop() public rel?: string | undefined;

  /**
   * Whether the browser will show the download dialog on click.
   */
  @Prop() public download?: boolean;

  /**
   * The type attribute to use for the button.
   */
  @Prop() public type: ButtonType | undefined;

  /**
   * Whether the action is active.
   */
  @Prop({ reflect: true }) public active = false;

  /**
   * The name attribute to use for the button.
   */
  @Prop() public name: string | undefined;

  /**
   * The value attribute to use for the button.
   */
  @Prop() public value?: string;

  /**
   * When an interaction of this button has an impact on another element(s) in the document, the id
   * of that element(s) needs to be set. The value will be forwarded to the 'aria-controls' attribute
   * to the relevant nested element.
   */
  @Prop() public accessibilityControls: string | undefined;

  /**
   * If you use the button to trigger another widget which itself is covering
   * the page, you must provide an according attribute for aria-haspopup.
   */
  @Prop() public accessibilityHaspopup: PopupType | undefined;

  /**
   * This will be forwarded as aria-label to the relevant nested element.
   */
  @Prop() public accessibilityLabel: string | undefined;

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element: HTMLSbbNavigationActionElement;

  private _navigationMarker: HTMLSbbNavigationMarkerElement;
  private _navigationActionAttributeObserver = new MutationObserver(() =>
    this._onActiveActionChange()
  );

  public connectedCallback(): void {
    this._navigationActionAttributeObserver.observe(this._element, navigationActionObserverConfig);

    // Forward focus call to action element
    this._element.focus = (options: FocusOptions) => this._actionElement().focus(options);

    // Check if the current element is nested inside a navigation marker.
    this._navigationMarker = hostContext(
      'sbb-navigation-marker',
      this._element
    ) as HTMLSbbNavigationMarkerElement;
  }

  public disconnectedCallback(): void {
    this._navigationActionAttributeObserver.disconnect();
  }

  private _actionElement(): HTMLElement {
    return this._element.shadowRoot.firstElementChild as HTMLElement;
  }

  // Check whether the `active` attribute has been added or removed from the DOM
  // and call the `select()` or `reset()` method accordingly.
  private _onActiveActionChange(): void {
    if (isValidAttribute(this._element, 'active')) {
      this._navigationMarker?.select(this._element);
    } else {
      this._navigationMarker?.reset();
    }
  }

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
  }

  @Listen('click')
  public handleClick(event: Event): void {
    forwardHostEvent(event, this._element, this._actionElement());

    if (!this.active) {
      this._navigationMarker?.select(this._element);
    }
  }

  public render(): JSX.Element {
    const { tagName: TAG_NAME, attributes }: LinkButtonRenderVariables = resolveRenderVariables(
      this,
      this._currentLanguage,
      false
    );
    return (
      <TAG_NAME class="sbb-navigation-action" {...attributes}>
        <slot />
      </TAG_NAME>
    );
  }
}
