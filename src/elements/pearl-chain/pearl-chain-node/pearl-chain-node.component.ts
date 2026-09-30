import {
  type CSSResultGroup,
  html,
  nothing,
  type PropertyValues,
  svg,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ref } from 'lit/directives/ref.js';

import {
  defaultDateAdapter,
  forceType,
  SbbElement,
  SbbPropertyWatcherController,
} from '../../core.ts';
import type { SbbPearlChainElement } from '../pearl-chain/pearl-chain.component.ts';

import style from './pearl-chain-node.scss?inline';

/**
 * The possible bullet types of a `sbb-pearl-chain-node`.
 */
export type SbbPearlChainNodeType =
  | 'start'
  | 'end'
  | 'stop'
  | 'skip'
  | 'commercial'
  | 'boarding'
  | 'alighting'
  | 'exceptional'
  | 'exceptional-skip'
  | 'exceptional-boarding'
  | 'exceptional-alighting'
  | 'stop-duty'
  | 'stop-on-demand'
  | 'boarding-on-demand'
  | 'alighting-on-demand';

const parseTriState = (value: unknown): 'arrival' | 'departure' | true | null =>
  value === 'arrival' || value === 'departure'
    ? value
    : value === '' || value === true
      ? true
      : null;

/**
 * Represents a station/point of interest within a `sbb-pearl-chain`.
 */
export class SbbPearlChainNodeElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-pearl-chain-node';
  public static override styles: CSSResultGroup = unsafeCSS(style);

  /** Decides how the bullet is rendered. Defaults to _empty_ (no bullet). */
  @property() public accessor type: SbbPearlChainNodeType | null = null;

  /** Marks the node as disrupted, coloring the bullet red (if rendered). */
  @forceType(parseTriState)
  @property()
  public accessor disrupted: 'arrival' | 'departure' | true | null = null;

  /** Marks the node as a walk connection. Does not affect the bullet color. */
  @forceType(parseTriState)
  @property()
  public accessor walk: 'arrival' | 'departure' | true | null = null;

  /** Marks the connection as unsure, rendering the line dashed. Does not affect the bullet. */
  @forceType(parseTriState)
  @property()
  public accessor unsure: 'arrival' | 'departure' | true | null = null;

  /** Marks the node as irrelevant, coloring the bullet gray (if rendered); supersedes `disrupted`. */
  @forceType(parseTriState)
  @property()
  public accessor irrelevant: 'arrival' | 'departure' | true | null = null;

  /** The arrival date/time at this node. Accepts ISO 8601 datetime strings. */
  @property()
  public set arrival(value: Date | string | null) {
    this._arrival = defaultDateAdapter.getValidDateOrNull(defaultDateAdapter.deserialize(value));
  }
  public get arrival(): Date | null {
    return this._arrival;
  }
  private _arrival: Date | null = null;

  /** The departure date/time at this node. Accepts ISO 8601 datetime strings. */
  @property()
  public set departure(value: Date | string | null) {
    this._departure = defaultDateAdapter.getValidDateOrNull(defaultDateAdapter.deserialize(value));
  }
  public get departure(): Date | null {
    return this._departure;
  }
  private _departure: Date | null = null;

  protected get now(): Date {
    return this._chain?.now ?? this._now;
  }
  private _now: Date = new Date();

  protected svgElem: Element | undefined;

  private _chain: SbbPearlChainElement | null = null;

  public constructor() {
    super();
    this.addController(
      new SbbPropertyWatcherController(this, () => this.closest('sbb-pearl-chain'), {
        now: () => this.requestUpdate(),
      }),
    );
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._chain = this.closest('sbb-pearl-chain');
    this._chain?.addNode(this);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._chain?.removeNode(this);
    this._chain = null;
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    if (changedProperties.size > 0) {
      this._chain?.requestUpdate();
    }
  }

  private _isPast(): boolean {
    return !!this.departure && this.departure.getTime() < this.now.getTime();
  }

  private _renderBullet(): TemplateResult | typeof nothing {
    switch (this.type) {
      case 'start':
      case 'end':
      case 'commercial':
      case 'exceptional':
        return svg`
          <circle r="50%" fill="currentColor" />
        `;
      case 'stop':
        return svg`
          <circle
            stroke="currentColor"
          />
        `;
      case 'skip':
        return svg`
          <path d="m3.65 2.59c-.36.36-.59.86-.59 1.41 0 1.1.9 2 2 2 .55 0 1.05-.22 1.41-.59l1.42 1.42c-.73.72-1.72 1.17-2.83 1.17-2.21 0-4-1.79-4-4 0-1.1.45-2.1 1.17-2.83l1.42 1.42zm1.41-2.59c2.21 0 4 1.79 4 4 0 .55-.11 1.08-.32 1.56l-1.69-1.69c-.06-1-.86-1.8-1.87-1.87l-1.68-1.68c.48-.21 1.01-.32 1.56-.32z" fill="currentColor"/>
          <path class="dash" d="m1.06 0 7.78 7.78-1.06 1.06-7.78-7.78 1.06-1.06z"/>
        `;
      case 'exceptional-skip':
        return svg`
          <path d="m9.5 8.5c-.9.9-2.1 1.5-3.5 1.5-2.7 0-5-2.2-5-5 0-1.4.6-2.6 1.5-3.5l7 7zm-3.5-8.5c2.8 0 5 2.2 5 5 0 .8-.2 1.6-.6 2.3l-6.7-6.7c.7-.4 1.5-.6 2.3-.6z" fill="currentColor"/>
          <rect class="dash" x="1.41431" width="14" height="2" transform="rotate(45 1.41431 0)"/>
        `;
      case 'stop-duty':
        return svg`
          <circle
            class="outer-circle"
            stroke="currentColor"
          />
        `;
      case 'boarding':
      case 'exceptional-boarding':
        return svg`
          <circle
            class="outer-circle"
            stroke="currentColor"
          />
          <path d="m1.85 5c0 .84.34 1.64.92 2.23.59.58 1.39.92 2.23.92.84 0 1.64-.34 2.23-.92.58-.59.92-1.39.92-2.23l-3.15 0-3.15 0z" fill="currentColor"/>
        `;
      case 'alighting':
      case 'exceptional-alighting':
        return svg`
          <circle
            class="outer-circle"
            stroke="currentColor"
          />
          <path d="m8.15 5c0-.84-.34-1.64-.92-2.23-.59-.58-1.39-.92-2.23-.92-.84 0-1.64.34-2.23.92-.58.59-.92 1.39-.92 2.23l3.15 0 3.15 0z" fill="currentColor"/>
        `;
      case 'stop-on-demand':
        return svg`
          <circle
            class="outer-circle"
            stroke="currentColor"
          />
          <circle
            fill="currentColor"
            r="20%"
          />
        `;
      case 'boarding-on-demand':
        return svg`
          <circle
            class="outer-circle"
            stroke="currentColor"
          />
          <path d="m3 5c0 .53.21 1.04.59 1.41.37.38.88.59 1.41.59.53 0 1.04-.21 1.41-.59.38-.37.59-.88.59-1.41l-2 0h-2z" fill="currentColor"/>
        `;
      case 'alighting-on-demand':
        return svg`
          <circle
            class="outer-circle"
            stroke="currentColor"
          />
          <path d="m7 5c0-.53-.21-1.04-.59-1.41-.37-.38-.88-.59-1.41-.59-.53 0-1.04.21-1.41.59-.38.37-.59.88-.59 1.41l2 0h2z" fill="currentColor"/>
        `;
      default:
        return nothing;
    }
  }

  protected override render(): TemplateResult {
    return html`
      <svg
        viewBox=${this.type === 'exceptional-skip' ? '0 0 12 12' : '0 0 10 10'}
        class="bullet ${classMap({
          [`bullet--${this.type}`]: !!this.type,
          'bullet--irrelevant': !!this.irrelevant,
          'bullet--disruption': !!this.disrupted,
          'bullet--past': this._isPast(),
        })}"
        ${ref((el?: Element): void => {
          this.svgElem = el;
        })}
      >
        ${this._renderBullet()}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-pearl-chain-node': SbbPearlChainNodeElement;
  }
}
