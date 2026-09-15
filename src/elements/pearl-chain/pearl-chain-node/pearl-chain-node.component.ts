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
    this._chain?.requestUpdate();
  }

  private _isPast(): boolean {
    return !!this.departure && this.departure.getTime() < this.now.getTime();
  }

  private _renderBullet(): TemplateResult | typeof nothing {
    switch (this.type) {
      case 'start':
      case 'end':
      case 'commercial':
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
          <path d="M3.65 2.59c-.36.36-.59.86-.59 1.41 0 1.1.9 2 2 2 .55 0 1.05-.22 1.41-.59L7.89 6.83C7.16 7.55 6.17 8 5.06 8c-2.21 0-4-1.79-4-4 0-1.1.45-2.1 1.17-2.83L3.65 2.59ZM5.06 0c2.21 0 4 1.79 4 4 0 .55-.11 1.08-.32 1.56L7.05 3.87c-.06-1-.86-1.8-1.87-1.87L3.5.32C3.98.11 4.51 0 5.06 0Z" fill="currentColor"/>
          <path class="dash" d="M1.06 0 8.84 7.78 7.78 8.84 0 1.06 1.06 0Z"/>
        `;
      case 'stop-duty':
        return svg`
          <circle
            class="outer-circle"
            stroke="currentColor"
          />
        `;
      case 'boarding':
        return svg`
          <circle
            class="outer-circle"
            stroke="currentColor"
          />
          <path d="M1.85 5C1.85 5.84 2.19 6.64 2.77 7.23 3.36 7.81 4.16 8.15 5 8.15 5.84 8.15 6.64 7.81 7.23 7.23 7.81 6.64 8.15 5.84 8.15 5L5 5 1.85 5Z" fill="currentColor"/>
        `;
      case 'alighting':
        return svg`
          <circle
            class="outer-circle"
            stroke="currentColor"
          />
          <path d="M8.15 5C8.15 4.16 7.81 3.36 7.23 2.77 6.64 2.19 5.84 1.85 5 1.85 4.16 1.85 3.36 2.19 2.77 2.77 2.19 3.36 1.85 4.16 1.85 5L5 5 8.15 5Z" fill="currentColor"/>
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
          <path d="M3 5C3 5.53 3.21 6.04 3.59 6.41 3.96 6.79 4.47 7 5 7 5.53 7 6.04 6.79 6.41 6.41 6.79 6.04 7 5.53 7 5L5 5H3Z" fill="currentColor"/>
        `;
      case 'alighting-on-demand':
        return svg`
          <circle
            class="outer-circle"
            stroke="currentColor"
          />
          <path d="M7 5C7 4.47 6.79 3.96 6.41 3.59 6.04 3.21 5.53 3 5 3 4.47 3 3.96 3.21 3.59 3.59 3.21 3.96 3 4.47 3 5L5 5H7Z" fill="currentColor"/>
        `;
      default:
        return nothing;
    }
  }

  protected override render(): TemplateResult {
    return html`
      <svg
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
