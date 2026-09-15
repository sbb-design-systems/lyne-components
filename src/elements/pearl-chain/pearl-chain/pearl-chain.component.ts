import { IntersectionController } from '@lit-labs/observers/intersection-controller.js';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';
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

import { defaultDateAdapter, SbbElement } from '../../core.ts';
import type { SbbPearlChainNodeElement } from '../../pearl-chain.pure.ts';

import style from './pearl-chain.scss?inline';

interface Point {
  x: number;
  y: number;
}

/** Gap (in px) left before a node's bullet, so the line doesn't touch it. */
const NODE_GAP = 2;

/** Interval (in ms) at which the component is re-rendered. */
const RENDERING_INTERVAL = 30 * 1000;

/**
 * Linearly interpolates between two points.
 */
const lerp = (from: Point, to: Point, ratio: number): Point => ({
  x: from.x + (to.x - from.x) * ratio,
  y: from.y + (to.y - from.y) * ratio,
});

/** Pulls `to` back towards `from` by `gap` px, along the line's direction. */
const pullBack = (from: Point, to: Point, gap: number): Point => {
  const length = Math.hypot(to.x - from.x, to.y - from.y);
  return length === 0 ? to : lerp(from, to, Math.max(0, (length - gap) / length));
};

/**
 * It displays a chain of `sbb-pearl-chain-node` elements connected by lines,
 * representing a journey with its stops.
 */
export class SbbPearlChainElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-pearl-chain';
  public static override styles: CSSResultGroup = unsafeCSS(style);

  /**
   * A configured date which acts as the current date instead of the real current date.
   * Only recommended for testing purposes.
   */
  @property()
  public set now(value: Date | string | null) {
    this._userNow =
      defaultDateAdapter.getValidDateOrNull(defaultDateAdapter.deserialize(value)) ?? new Date();
  }
  public get now(): Date {
    return this._userNow ?? this._systemNow;
  }
  private _userNow: Date | null = null;
  private _systemNow = new Date();

  private _svgElem: Element | undefined;
  private _nodes: SbbPearlChainNodeElement[] = [];
  private _orientation: 'horizontal' | 'vertical' = 'vertical';
  private _systemNowIntervalId: ReturnType<typeof setInterval> | undefined;

  public constructor() {
    super();
    this.addController(
      new ResizeController(this, { callback: () => this._positionLines(), skipInitial: true }),
    );
    this.addController(
      new IntersectionController(this, {
        callback: () => this._positionLines(),
        skipInitial: true,
      }),
    );
  }

  /**
   * Registers a `sbb-pearl-chain-node` with this pearl chain.
   * @internal
   */
  public addNode(node: SbbPearlChainNodeElement): void {
    if (this._nodes.includes(node)) {
      return;
    }
    this._nodes.push(node);
    // Keep nodes ordered by DOM position, regardless of registration order.
    this._nodes.sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
    this.requestUpdate();
  }

  /**
   * Unregisters a `sbb-pearl-chain-node` from this pearl chain.
   * @internal
   */
  public removeNode(node: SbbPearlChainNodeElement): void {
    const index = this._nodes.indexOf(node);
    if (index === -1) {
      return;
    }
    this._nodes.splice(index, 1);
    this.requestUpdate();
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    // Update the component every RENDERING_INTERVAL ms, so the pulsing dot and line segments are re-rendered as "now" progresses.
    this._systemNowIntervalId = setInterval(() => {
      this._systemNow = new Date();
      this.requestUpdate();
    }, RENDERING_INTERVAL);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this._systemNowIntervalId);
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    this._positionLines();
  }

  /**
   * Positions the rendered lines (and dot) to connect the bullet nodes, and toggles
   * `:state(horizontal)` based on whether nodes are spread more horizontally than vertically.
   */
  private _positionLines(): void {
    const elements = this.shadowRoot?.querySelectorAll<SVGLineElement | SVGCircleElement>(
      '[data-segment]',
    );
    if (!elements?.length || !this._svgElem) {
      return;
    }
    const svgRect = this._svgElem.getBoundingClientRect();

    // Get the center coordinates of each node relative to the svg
    const nodesCords = this._nodes.map((node) => {
      const rect = node['svgElem']?.getBoundingClientRect() ?? node.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - svgRect.left,
        y: rect.top + rect.height / 2 - svgRect.top,
        size: rect.width,
      };
    });

    this._updateOrientation(nodesCords);

    elements.forEach((el) => {
      const index = Number(el.dataset.segment);
      const start = nodesCords[index];
      const end = this._needsGap(this._nodes[index + 1])
        ? pullBack(start, nodesCords[index + 1], NODE_GAP + nodesCords[index + 1].size / 2)
        : nodesCords[index + 1];

      switch (el.dataset.role) {
        case 'dot': {
          const ratio = this._progressRatio(this._nodes[index], this._nodes[index + 1])!;
          const nowCords = lerp(nodesCords[index], nodesCords[index + 1], ratio);
          el.setAttribute('cx', `${nowCords.x}`);
          el.setAttribute('cy', `${nowCords.y}`);
          break;
        }
        // The line immediately before the pulsing dot.
        case 'before': {
          const ratio = this._progressRatio(this._nodes[index], this._nodes[index + 1])!;
          const nowCords = lerp(nodesCords[index], nodesCords[index + 1], ratio);
          el.setAttribute('x1', `${start.x}`);
          el.setAttribute('y1', `${start.y}`);
          el.setAttribute('x2', `${nowCords.x}`);
          el.setAttribute('y2', `${nowCords.y}`);
          break;
        }
        // The line immediately after the pulsing dot.
        case 'after': {
          const ratio = this._progressRatio(this._nodes[index], this._nodes[index + 1])!;
          const nowCords = lerp(start, end, ratio);
          el.setAttribute('x1', `${nowCords.x}`);
          el.setAttribute('y1', `${nowCords.y}`);
          el.setAttribute('x2', `${end.x}`);
          el.setAttribute('y2', `${end.y}`);
          break;
        }
        default: {
          el.setAttribute('x1', `${start.x}`);
          el.setAttribute('y1', `${start.y}`);
          el.setAttribute('x2', `${end.x}`);
          el.setAttribute('y2', `${end.y}`);
        }
      }
    });
  }

  /**
   * Toggles `:state(horizontal)` when the nodes are spread more horizontally than vertically
   * TODO: maybe optimize it
   */
  private _updateOrientation(nodesCords: Point[]): void {
    const xs = nodesCords.map((c) => c.x);
    const ys = nodesCords.map((c) => c.y);
    const spreadX = Math.max(...xs) - Math.min(...xs);
    const spreadY = Math.max(...ys) - Math.min(...ys);
    this.toggleState('horizontal', spreadX > spreadY);
    this._orientation = spreadX > spreadY ? 'horizontal' : 'vertical';
  }

  /** No gap for `start` or `end` bullets. */
  private _needsGap(node: SbbPearlChainNodeElement): boolean {
    return (
      this._orientation === 'horizontal' &&
      node.type !== null &&
      node.type !== 'start' &&
      node.type !== 'end'
    );
  }

  /**
   * Ratio (0-1) of "now" between the line's start departure and end arrival, or
   * `null` if "now" is outside that window (or either date is missing).
   */
  private _progressRatio(
    start: SbbPearlChainNodeElement,
    end: SbbPearlChainNodeElement,
  ): number | null {
    const from = start.departure;
    const to = end.arrival;
    if (!from || !to) {
      return null;
    }
    const now = this.now.getTime();
    if (now < from.getTime() || now > to.getTime()) {
      return null;
    }
    return (now - from.getTime()) / (to.getTime() - from.getTime());
  }

  /**
   * Returns a map of CSS classes for a line segment between two nodes, based on its state.
   */
  private _lineClasses(
    start: SbbPearlChainNodeElement,
    end: SbbPearlChainNodeElement,
  ): Record<string, boolean> {
    return {
      'line--past': this._isLinePast(end),
      'line--walk':
        start.walk === true ||
        start.walk === 'departure' ||
        end.walk === true ||
        end.walk === 'arrival',
      'line--unsure':
        start.unsure === true ||
        start.unsure === 'departure' ||
        end.unsure === true ||
        end.unsure === 'arrival',
      'line--irrelevant':
        start.irrelevant === true ||
        start.irrelevant === 'departure' ||
        end.irrelevant === true ||
        end.irrelevant === 'arrival',
      'line--disruption':
        start.disrupted === true ||
        start.disrupted === 'departure' ||
        end.disrupted === true ||
        end.disrupted === 'arrival',
    };
  }

  /** A line is "past" once we've already arrived at its ending node. */
  private _isLinePast(end: SbbPearlChainNodeElement): boolean {
    const now = this.now;
    const pastTime = end.arrival ?? end.departure;
    return !!pastTime && pastTime.getTime() < now.getTime();
  }

  /** A line is "current" if "now" falls between its start departure and end arrival. */
  private _isLineCurrent(start: SbbPearlChainNodeElement, end: SbbPearlChainNodeElement): boolean {
    return this._progressRatio(start, end) !== null;
  }

  /** Renders one segment: a single line, or (when "now" falls within it) a gray/normal split + pulsing dot. */
  private _renderSegment(
    start: SbbPearlChainNodeElement,
    end: SbbPearlChainNodeElement,
    index: number,
  ): TemplateResult {
    const classes = this._lineClasses(start, end);

    if (!classes['line--disruption'] && !classes['line--walk'] && this._isLineCurrent(start, end)) {
      // The "current" line is split into two lines: a gray "past" line and a normal line, with a pulsing dot at the split point.
      // A "disrupted" or "walk" line is never split.
      return svg`
        <line class="line line--past" data-segment="${index}" data-role="before"></line>
        <line class="line ${classMap(classes)}" data-segment="${index}" data-role="after"></line>
        <circle class="now-dot" data-segment="${index}" data-role="dot"></circle>
      `;
    }

    return svg`<line class="line ${classMap(classes)}" data-segment="${index}"></line>`;
  }

  protected override render(): TemplateResult {
    return html`
      <svg
        class="sbb-pearl-chain__svg"
        ${ref((el?: Element): void => {
          this._svgElem = el;
        })}
      >
        ${
          this._nodes.length > 1
            ? Array.from({ length: this._nodes.length - 1 }, (_, index) =>
                this._renderSegment(this._nodes[index], this._nodes[index + 1], index),
              )
            : nothing
        }
      </svg>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-pearl-chain': SbbPearlChainElement;
  }
}
