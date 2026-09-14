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

import { defaultDateAdapter, forceType, SbbElement } from '../../core.ts';
import type { SbbPearlChainElement } from '../pearl-chain/pearl-chain.component.ts';

import style from './pearl-chain-node.scss?inline';

/** Properties that affect the chain's rendering when changed. */
const RENDER_RELEVANT_PROPERTIES = [
  'type',
  'disrupted',
  'irrelevant',
  'walk',
  'arrival',
  'departure',
] as const;

/**
 * The possible bullet types of a `sbb-pearl-chain-node`.
 * ponytail: only 'start'/'end' are visually implemented for now; the remaining
 * types are pending confirmed designs and currently render like _empty_.
 */
export type SbbPearlChainNodeType =
  | 'start'
  | 'end'
  | 'stop'
  | 'boarding'
  | 'alighting'
  | 'skip'
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
    if (RENDER_RELEVANT_PROPERTIES.some((prop) => changedProperties.has(prop))) {
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
        return svg`
          <circle cx="50%" cy="50%" r="50%" fill="currentcolor" />
        `;
      case 'stop':
        return svg`
          <circle
            cx="50%"
            cy="50%"
            stroke="currentcolor"
          />
        `;
      default:
        // ponytail: other types deferred until Figma designs are confirmed.
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
