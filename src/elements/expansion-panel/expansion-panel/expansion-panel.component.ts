import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { forceType } from '../../core/decorators.ts';
import { isLean, isZeroAnimationDuration } from '../../core/dom.ts';
import type { SbbOpenedClosedState } from '../../core/interfaces.ts';
import {
  SbbElementInternalsMixin,
  SbbHydrationMixin,
  ɵstateController,
} from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbTitleLevel } from '../../title.ts';
import type { SbbExpansionPanelContentElement } from '../expansion-panel-content.ts';
import type { SbbExpansionPanelHeaderElement } from '../expansion-panel-header.ts';

import style from './expansion-panel.scss?lit&inline';

let nextId = 0;

/**
 * It displays an expandable summary-details widget.
 *
 * @slot - Use the unnamed slot to add a `sbb-expansion-panel-header` and a `sbb-expansion-panel-content` element.
 */
export
@customElement('sbb-expansion-panel')
class SbbExpansionPanelElement extends SbbHydrationMixin(SbbElementInternalsMixin(LitElement)) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events = {
    beforeopen: 'beforeopen',
    open: 'open',
    beforeclose: 'beforeclose',
    close: 'close',
  } as const;

  /** Heading level; if unset, a `div` will be rendered. */
  @property({ attribute: 'title-level' }) public accessor titleLevel: SbbTitleLevel | null = null;

  /** The background color of the panel. */
  @property({ reflect: true }) public accessor color: 'white' | 'milk' = 'white';

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
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor borderless: boolean = false;

  /**
   * Size variant, either l or s.
   * @default 'l' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: 's' | 'l' = isLean() ? 's' : 'l';

  /** The state of the component. */
  private set _state(state: SbbOpenedClosedState) {
    if (this._stateInternal) {
      this.internals.states.delete(`state-${this._stateInternal}`);
    }
    this._stateInternal = state;
    if (this._stateInternal) {
      this.internals.states.add(`state-${this._stateInternal}`);
    }
  }
  private get _state(): SbbOpenedClosedState {
    return this._stateInternal;
  }
  private _stateInternal!: SbbOpenedClosedState;

  private _progressiveId = `-${++nextId}`;
  private _headerRef?: SbbExpansionPanelHeaderElement;
  private _contentRef?: SbbExpansionPanelContentElement;

  public constructor() {
    super();

    this._state = 'closed';
    this.addEventListener?.('toggleexpanded', (ev: Event) => {
      if (ev.target === this._headerRef) {
        this._toggleExpanded();
      }
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.toggleState('accordion', !!this.closest?.('sbb-accordion'));
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.internals.states.delete('accordion');
  }

  private _toggleExpanded(): void {
    this.expanded = !this.expanded;
  }

  private _onExpandedChange(): void {
    this._headerRef?.setAttribute('aria-expanded', String(this.expanded));
    this._contentRef?.setAttribute('aria-hidden', String(!this.expanded));

    if (this.expanded) {
      this._open();
    } else if (this._state === 'opened') {
      this._close();
    }
  }

  private _open(): void {
    this._state = 'opening';
    /** Emits whenever the `sbb-expansion-panel` starts the opening transition. */
    this.dispatchEvent(new Event('beforeopen'));

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `opened` state.
    if (!this.hasUpdated || this._isZeroAnimationDuration()) {
      this._handleOpening();
    }
  }

  private _close(): void {
    this._state = 'closing';
    /** Emits whenever the `sbb-expansion-panel` begins the closing transition. */
    this.dispatchEvent(new Event('beforeclose'));

    // If the animation duration is zero, the animationend event is not always fired reliably.
    // In this case we directly set the `closed` state.
    if (this._isZeroAnimationDuration()) {
      this._handleClosing();
    }
  }

  private _isZeroAnimationDuration(): boolean {
    return isZeroAnimationDuration(this, '--sbb-expansion-panel-animation-duration');
  }

  private _handleOpening(): void {
    this._state = 'opened';
    /** Emits whenever the `sbb-expansion-panel` is opened. */
    this.dispatchEvent(new Event('open'));
  }

  private _handleClosing(): void {
    this._state = 'closed';
    /** Emits whenever the `sbb-expansion-panel` is closed. */
    this.dispatchEvent(new Event('close'));
  }

  private _updateDisabledOnHeader(newDisabledValue: boolean): void {
    if (this._headerRef) {
      this._headerRef.disabled = newDisabledValue;
    }
  }

  private _handleSlotchange(): void {
    const children = Array.from(this.children ?? []);
    const header = children.find(
      (e): e is SbbExpansionPanelHeaderElement => e.localName === 'sbb-expansion-panel-header',
    );
    const content = children.find(
      (e): e is SbbExpansionPanelContentElement => e.localName === 'sbb-expansion-panel-content',
    );
    if (this._headerRef === header && this._contentRef === content) {
      return;
    }
    if (header && this._headerRef !== header) {
      header.id ||= `sbb-expansion-panel-header${this._progressiveId}`;
      header.setAttribute('aria-expanded', String(this.expanded));
      header.toggleAttribute('disabled', this.disabled);
    }
    if (content && this._contentRef !== content) {
      content.id ||= `sbb-expansion-panel-content${this._progressiveId}`;
      content.setAttribute('aria-hidden', String(!this.expanded));
    }

    this._headerRef = header;
    this._contentRef = content;
    if (this._headerRef && this._contentRef) {
      this._headerRef.setAttribute('aria-controls', this._contentRef.id);
      this._contentRef.setAttribute('aria-labelledby', this._headerRef.id);
      ɵstateController(this._contentRef).toggle(
        'icon-space',
        ɵstateController(this._headerRef).has('icon'),
      );
    }
  }

  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open-opacity' && this._state === 'opening') {
      this._handleOpening();
    } else if (event.animationName === 'close' && this._state === 'closing') {
      this._handleClosing();
    }
  }

  protected override render(): TemplateResult {
    const TAGNAME = this.titleLevel ? `h${this.titleLevel}` : 'div';

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAGNAME)} class="sbb-expansion-panel__header">
        <slot name="header" @slotchange=${this._handleSlotchange}></slot>
      </${unsafeStatic(TAGNAME)}>
      <div class="sbb-expansion-panel__content-wrapper" @animationend=${this._onAnimationEnd}>
        <span class="sbb-expansion-panel__content">
          <slot name="content" @slotchange=${this._handleSlotchange}></slot>
        </span>
      </div>
    `;
    /* eslint-enable lit/binding-positions */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-expansion-panel': SbbExpansionPanelElement;
  }
}
