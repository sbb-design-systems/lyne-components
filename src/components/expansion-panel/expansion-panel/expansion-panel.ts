import { CSSResult, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { toggleDatasetEntry } from '../../core/dom';
import { EventEmitter, ConnectedAbortController } from '../../core/eventing';
import { SbbOverlayState } from '../../core/overlay';
import { TitleLevel } from '../../title';
import { type SbbExpansionPanelContent } from '../expansion-panel-content';
import { type SbbExpansionPanelHeader } from '../expansion-panel-header';

import style from './expansion-panel.scss?lit&inline';

let nextId = 0;

/**
 * @slot - Use this slot to add a `sbb-expansion-panel-header` and a `sbb-expansion-panel-content` element.
 * @slot header - Use this to render the sbb-expansion-panel-header.
 * @slot content - Use this to render the sbb-expansion-panel-content.
 * @event {CustomEvent<void>} will-open - Emits whenever the sbb-expansion-panel starts the opening transition.
 * @event {CustomEvent<void>} did-open - Emits whenever the sbb-expansion-panel is opened.
 * @event {CustomEvent<void>} will-close - Emits whenever the sbb-expansion-panel begins the closing transition.
 * @event {CustomEvent<void>} did-close - Emits whenever the sbb-expansion-panel is closed.
 */
@customElement('sbb-expansion-panel')
export class SbbExpansionPanel extends LitElement {
  public static override styles: CSSResult = style;
  public static readonly events = {
    willOpen: 'will-open',
    didOpen: 'did-open',
    willClose: 'will-close',
    didClose: 'did-close',
  } as const;

  /** Heading level; if unset, a `div` will be rendered. */
  @property({ attribute: 'title-level' }) public titleLevel?: TitleLevel;

  /** The background color of the panel. */
  @property() public color: 'white' | 'milk' = 'white';

  /** Whether the panel is expanded. */
  @property({ reflect: true, type: Boolean })
  public set expanded(value: boolean) {
    this._expanded = value;
    this._onExpandedChange();
  }
  public get expanded(): boolean {
    return this._expanded;
  }
  private _expanded: boolean = false;

  /** Whether the panel is disabled, so its expanded state can't be changed. */
  @property({ reflect: true, type: Boolean })
  public set disabled(value: boolean) {
    this._disabled = value;
    this._updateDisabledOnHeader(this._disabled);
  }
  public get disabled(): boolean {
    return this._disabled;
  }
  private _disabled: boolean = false;

  /** Whether the panel has no border. */
  @property({ reflect: true, type: Boolean }) public borderless = false;

  /** Whether the animations should be disabled. */
  @property({ attribute: 'disable-animation', reflect: true, type: Boolean })
  public disableAnimation = false;

  /** Emits whenever the sbb-expansion-panel starts the opening transition. */
  private _willOpen: EventEmitter<void> = new EventEmitter(this, SbbExpansionPanel.events.willOpen);

  /** Emits whenever the sbb-expansion-panel is opened. */
  private _didOpen: EventEmitter<void> = new EventEmitter(this, SbbExpansionPanel.events.didOpen);

  /** Emits whenever the sbb-expansion-panel begins the closing transition. */
  private _willClose: EventEmitter<void> = new EventEmitter(
    this,
    SbbExpansionPanel.events.willClose,
  );

  /** Emits whenever the sbb-expansion-panel is closed. */
  private _didClose: EventEmitter<void> = new EventEmitter(this, SbbExpansionPanel.events.didClose);

  private _abort = new ConnectedAbortController(this);
  private _state: SbbOverlayState = 'closed';

  private _toggleExpanded(): void {
    this.expanded = !this.expanded;
  }

  private _onExpandedChange(): void {
    this._headerRef.setAttribute('aria-expanded', String(this.expanded));
    this._contentRef.setAttribute('aria-hidden', String(!this.expanded));

    if (this.expanded) {
      this._willOpen.emit();
      this._state = 'opening';
      // As with 0s duration, transitionEnd will not be fired, we need to programmatically trigger didOpen event
      if (this.disableAnimation) {
        this._onOpened();
      }
    } else if (this._state === 'opened') {
      this._willClose.emit();
      this._state = 'closing';
      // As with 0s duration, transitionEnd will not be fired, we need to programmatically trigger didClose event
      if (this.disableAnimation) {
        this._onClosed();
      }
    }
  }

  private _updateDisabledOnHeader(newDisabledValue: boolean): void {
    this._headerRef.disabled = newDisabledValue;
  }

  private _transitionEventController: AbortController;
  private _progressiveId = `-${++nextId}`;
  private _headerRef: SbbExpansionPanelHeader;
  private _contentRef: SbbExpansionPanelContent;
  private _contentWrapperRef: HTMLElement;

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('toggle-expanded', () => this._toggleExpanded(), { signal });
    const accordion = this.closest('sbb-accordion');
    toggleDatasetEntry(this, 'accordion', !!accordion);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._transitionEventController?.abort();
    toggleDatasetEntry(this, 'accordion', false);
  }

  private _onOpened(): void {
    this._didOpen.emit();
    this._state = 'opened';
  }

  private _onClosed(): void {
    this._didClose.emit();
    this._state = 'closed';
  }

  private _onHeaderSlotChange(event): void {
    const elements = (event.target as HTMLSlotElement).assignedElements();

    // Changing titleLevel sometimes triggers a slot change with no assigned elements.
    if (!elements.length) {
      return;
    }

    this._headerRef = elements.find(
      (e): e is SbbExpansionPanelHeader => e.tagName === 'SBB-EXPANSION-PANEL-HEADER',
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

  private _onContentSlotChange(event: Event): void {
    const elements = (event.target as HTMLSlotElement).assignedElements();

    if (!elements.length) {
      return;
    }

    this._transitionEventController?.abort();

    this._contentRef = (event.target as HTMLSlotElement)
      .assignedElements()
      .find((e): e is SbbExpansionPanelContent => e.tagName === 'SBB-EXPANSION-PANEL-CONTENT');

    this._contentWrapperRef = this.shadowRoot.querySelector(
      '.sbb-expansion-panel__content-wrapper',
    );

    if (!this._contentRef || !this._contentWrapperRef) {
      return;
    }

    this._transitionEventController = new AbortController();
    this._contentRef.setAttribute('aria-hidden', String(!this.expanded));
    this._contentWrapperRef.addEventListener(
      'transitionend',
      (event) => this._onTransitionEnd(event),
      {
        signal: this._transitionEventController.signal,
      },
    );
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

  private _onTransitionEnd(event: TransitionEvent): void {
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

  protected override render(): TemplateResult {
    const TAGNAME = this.titleLevel ? `h${this.titleLevel}` : 'div';

    /* eslint-disable lit/binding-positions */
    return html`
      <div class="sbb-expansion-panel">
        <${unsafeStatic(TAGNAME)} class="sbb-expansion-panel__header">
          <slot name="header" @slotchange=${(event: Event) =>
            this._onHeaderSlotChange(event)}></slot>
        </${unsafeStatic(TAGNAME)}>
        <div class="sbb-expansion-panel__content-wrapper" >
          <span class="sbb-expansion-panel__content">
            <slot name="content" @slotchange=${(event: Event) =>
              this._onContentSlotChange(event)}></slot>
          </span>
        </div>
      </div>
    `;
    /* eslint-disable lit/binding-positions */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-expansion-panel': SbbExpansionPanel;
  }
}
