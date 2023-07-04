import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop,
} from '@stencil/core';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';

let nextId = 0;

/**
 * @slot header - Use this to render the sbb-expansion-panel-header
 * @slot content - Use this to render the sbb-expansion-panel-content
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-expansion-panel.scss',
  tag: 'sbb-expansion-panel',
})
export class SbbExpansionPanel implements ComponentInterface {
  /** */
  @Prop() public level?: InterfaceTitleAttributes['level'];

  /** */
  @Prop() public color: 'white' | 'milk' = 'white';

  /** */
  @Prop({ reflect: true }) public expanded = false;

  /** */
  @Prop() public disabled = false;

  /** */
  @Prop({ reflect: true }) public borderless = false;

  /** */
  @Prop({ reflect: true }) public disableAnimation = false;

  /** Emits whenever the autocomplete starts the opening transition. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-open',
  })
  public willOpen: EventEmitter<void>;

  /** Emits whenever the autocomplete is opened. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-open',
  })
  public didOpen: EventEmitter<void>;

  /** Emits whenever the autocomplete begins the closing transition. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-close',
  })
  public willClose: EventEmitter<void>;

  /** Emits whenever the autocomplete is closed. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-close',
  })
  public didClose: EventEmitter<void>;

  @Element() private _element: HTMLElement;

  @Listen('toggle-expanded')
  public toggleExpanded(): void {
    this.expanded = !this.expanded;
    this._element
      .querySelector('sbb-expansion-panel-header')
      .setAttribute('expanded', String(this.expanded));
    this._element.style.setProperty(
      '--sbb-expansion-panel-content-height',
      `${this._contentElement.scrollHeight}px`
    );

    if (this.expanded) {
      this.willOpen.emit();
      this.disableAnimation && this.didOpen.emit();
    } else {
      this.willClose.emit();
      this.disableAnimation && this.didClose.emit();
    }
  }

  private _contentElement: HTMLElement;

  private _onHeaderSlotChange(): void {
    const header = this._element.querySelector('sbb-expansion-panel-header');
    if (!header) {
      return;
    }
    header.setAttribute('expanded', String(this.expanded));
    header.shadowRoot.firstElementChild.setAttribute('id', `header-${nextId}`);
    header.shadowRoot.firstElementChild.setAttribute('aria-controls', `content-${nextId}`);

    const content = this._element.querySelector('sbb-expansion-panel-content');
    content?.setAttribute(
      'icon-space',
      String(![null, undefined, ''].includes(header.getAttribute('icon-name')))
    );
  }

  private _onContentSlotChange(): void {
    const content = this._element.querySelector('sbb-expansion-panel-content');
    if (!content) {
      return;
    }
    content.setAttribute('id', `content-${nextId}`);
    content.setAttribute('aria-labelledby', `header-${nextId}`);
    content.addEventListener('transitionend', (event) => this._onTransitionEnd(event));
  }

  private _onTransitionEnd(event): void {
    // TODO a better condition?
    if (event.propertyName !== 'opacity') {
      return;
    }

    if (this.expanded) {
      this.didOpen.emit();
    } else {
      this.didClose.emit();
    }
  }

  public connectedCallback(): void {
    ++nextId;
  }

  public render(): JSX.Element {
    const TAGNAME = this.level ? `h${this.level}` : 'div';

    return (
      <div class="sbb-expansion-panel">
        <TAGNAME class="sbb-expansion-panel__header">
          <slot name="header" onSlotchange={() => this._onHeaderSlotChange()}></slot>
        </TAGNAME>
        <span class="sbb-expansion-panel__content" ref={(el) => (this._contentElement = el)}>
          <slot name="content" onSlotchange={() => this._onContentSlotChange()}></slot>
        </span>
      </div>
    );
  }
}
