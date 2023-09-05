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
  Watch,
} from '@stencil/core';
import { InterfaceTitleAttributes } from '../sbb-title/sbb-title.custom';
import { toggleDatasetEntry } from '../../global/dom';
import { InterfaceSbbExpansionPanelAttributes } from './sbb-expansion-panel.custom';
import { AgnosticResizeObserver } from '../../global/observers';

let nextId = 0;

/**
 * @slot header - Use this to render the sbb-expansion-panel-header.
 * @slot content - Use this to render the sbb-expansion-panel-content.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-expansion-panel.scss',
  tag: 'sbb-expansion-panel',
})
export class SbbExpansionPanel implements ComponentInterface {
  /** Heading level; if unset, a `div` will be rendered. */
  @Prop() public titleLevel?: InterfaceTitleAttributes['level'];

  /** The background color of the panel. */
  @Prop() public color: InterfaceSbbExpansionPanelAttributes['color'] = 'white';

  /** Whether the panel is expanded. */
  @Prop({ mutable: true, reflect: true }) public expanded = false;

  /** Whether the panel is disabled, so its expanded state can't be changed. */
  @Prop({ reflect: true }) public disabled = false;

  /** Whether the panel has no border. */
  @Prop({ reflect: true }) public borderless = false;

  /** Whether the animations should be disabled. */
  @Prop({ reflect: true }) public disableAnimation = false;

  private _resizeObserverTimeout: ReturnType<typeof setTimeout> | null = null;
  private _panelContentResizeObserver = new AgnosticResizeObserver(() =>
    this._onPanelContentResize(),
  );

  /** Emits whenever the sbb-expansion-panel starts the opening transition. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-open',
  })
  public willOpen: EventEmitter<void>;

  /** Emits whenever the sbb-expansion-panel is opened. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-open',
  })
  public didOpen: EventEmitter<void>;

  /** Emits whenever the sbb-expansion-panel begins the closing transition. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-close',
  })
  public willClose: EventEmitter<void>;

  /** Emits whenever the sbb-expansion-panel is closed. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-close',
  })
  public didClose: EventEmitter<void>;

  @Element() private _element!: HTMLSbbExpansionPanelElement;

  @Listen('toggle-expanded')
  public toggleExpanded(): void {
    this.expanded = !this.expanded;
  }

  @Watch('expanded')
  public onExpandedChange(): void {
    this._headerRef.setAttribute('aria-expanded', String(this.expanded));
    this._contentRef.setAttribute('aria-hidden', String(!this.expanded));

    if (this.expanded) {
      this.willOpen.emit();
      // As with 0s duration, transitionEnd will not be fired, we need to programmatically trigger didOpen event
      if (this.disableAnimation) {
        this._onOpened();
      }
    } else {
      this.willClose.emit();
      // As with 0s duration, transitionEnd will not be fired, we need to programmatically trigger didClose event
      if (this.disableAnimation) {
        this._onClosed();
      }
    }
  }

  @Watch('disabled')
  public updateDisabledOnHeader(newDisabledValue: boolean): void {
    this._headerRef.disabled = newDisabledValue;
  }

  private _transitionEventController: AbortController;
  private _progressiveId = `-${++nextId}`;
  private _headerRef: HTMLSbbExpansionPanelHeaderElement;
  private _contentRef: HTMLSbbExpansionPanelContentElement;

  public connectedCallback(): void {
    const accordion = this._element.closest('sbb-accordion');
    toggleDatasetEntry(this._element, 'accordion', !!accordion);
  }

  public componentDidLoad(): void {
    this._setPanelContentHeight();
  }

  public disconnectedCallback(): void {
    this._transitionEventController?.abort();
    toggleDatasetEntry(this._element, 'accordion', false);
    this._panelContentResizeObserver.disconnect();
  }

  private _onOpened(): void {
    this.didOpen.emit();
    this._panelContentResizeObserver.observe(this._contentRef);
  }

  private _onClosed(): void {
    this.didClose.emit();
    this._panelContentResizeObserver.unobserve(this._contentRef);
  }

  private _onHeaderSlotChange(event): void {
    const elements = (event.target as HTMLSlotElement).assignedElements();

    // Changing titleLevel sometimes triggers a slot change with no assigned elements.
    if (!elements.length) {
      return;
    }

    this._headerRef = elements.find(
      (e): e is HTMLSbbExpansionPanelHeaderElement => e.tagName === 'SBB-EXPANSION-PANEL-HEADER',
    );

    if (!this._headerRef) {
      return;
    }

    this._headerRef.setAttribute('aria-expanded', String(this.expanded));
    if (this.disabled) {
      this._headerRef.setAttribute('disabled', String(this.disabled));
    }
    this._linkHeaderAndContent();
  }

  private _onContentSlotChange(event): void {
    const elements = (event.target as HTMLSlotElement).assignedElements();

    if (!elements.length) {
      return;
    }

    if (this._contentRef) {
      this._panelContentResizeObserver.unobserve(this._contentRef);
    }
    this._transitionEventController?.abort();

    this._contentRef = (event.target as HTMLSlotElement)
      .assignedElements()
      .find(
        (e): e is HTMLSbbExpansionPanelContentElement =>
          e.tagName === 'SBB-EXPANSION-PANEL-CONTENT',
      );

    if (!this._contentRef) {
      return;
    }

    this._panelContentResizeObserver.observe(this._contentRef);

    this._transitionEventController = new AbortController();
    this._contentRef.setAttribute('aria-hidden', String(!this.expanded));
    this._contentRef.addEventListener('transitionend', (event) => this._onTransitionEnd(event), {
      signal: this._transitionEventController.signal,
    });
    this._linkHeaderAndContent();
  }

  private _linkHeaderAndContent(): void {
    if (!this._headerRef || !this._contentRef) {
      return;
    }

    if (!this._headerRef.id) {
      this._headerRef.setAttribute('id', `sbb-expansion-panel-header${this._progressiveId}`);
    }
    this._headerRef.setAttribute(
      'aria-controls',
      this._contentRef.id || `sbb-expansion-panel-content${this._progressiveId}`,
    );

    if (!this._contentRef.id) {
      this._contentRef.setAttribute('id', `sbb-expansion-panel-content${this._progressiveId}`);
    }
    this._contentRef.setAttribute(
      'aria-labelledby',
      this._headerRef.id || `sbb-expansion-panel-header${this._progressiveId}`,
    );
    toggleDatasetEntry(this._contentRef, 'iconSpace', this._headerRef.hasAttribute('data-icon'));
  }

  private _onTransitionEnd(event): void {
    // All transitions have the same timing and opacity is defined last, be sure that they have all been performed.
    if (event.propertyName !== 'opacity') {
      return;
    }

    if (this.expanded) {
      this._onOpened();
    } else {
      this._onClosed();
    }
  }

  private _onPanelContentResize(): void {
    if (!this.expanded) {
      return;
    }

    clearTimeout(this._resizeObserverTimeout);

    toggleDatasetEntry(this._element, 'resizeDisableAnimation', true);
    this._setPanelContentHeight();

    // Disable the animation when resizing the panel content to avoid strange height transition effects.
    this._resizeObserverTimeout = setTimeout(
      () => toggleDatasetEntry(this._element, 'resizeDisableAnimation', false),
      150,
    );
  }

  private _setPanelContentHeight(): void {
    const panelContentHeight =
      this._contentRef?.scrollHeight && !this.disableAnimation
        ? `${this._contentRef?.scrollHeight}px`
        : 'auto';
    this._element.style.setProperty('--sbb-expansion-panel-content-height', panelContentHeight);
  }

  public render(): JSX.Element {
    const TAGNAME = this.titleLevel ? `h${this.titleLevel}` : 'div';

    return (
      <div class="sbb-expansion-panel">
        <TAGNAME class="sbb-expansion-panel__header">
          <slot name="header" onSlotchange={(event) => this._onHeaderSlotChange(event)}></slot>
        </TAGNAME>
        <span class="sbb-expansion-panel__content">
          <slot name="content" onSlotchange={(event) => this._onContentSlotChange(event)}></slot>
        </span>
      </div>
    );
  }
}
