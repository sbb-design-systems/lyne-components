import {
  type CSSResultGroup,
  html,
  isServer,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';

import { ɵstateController } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import { sidebarContainerCommonStyle } from '../common.ts';
import type { SbbSidebarElement } from '../sidebar.ts';

import style from './sidebar-container.scss?lit&inline';

const sidebarContainerRegistry = new Set<SbbSidebarContainerElement>();
let sidebarContainerResizeObserver: ResizeObserver | undefined;

const MIN_WIDTH_BEFORE_COLLAPSE = 320;

/**
 * This is the parent component to one or two `<sbb-sidebar>`s that validates the state internally
 * and coordinates the backdrop and content styling.
 *
 * @slot - Use the unnamed slot to add `sbb-sidebar` and `sbb-sidebar-content` elements.
 */
export
@customElement('sbb-sidebar-container')
class SbbSidebarContainerElement extends LitElement {
  public static override styles: CSSResultGroup = [
    boxSizingStyles,
    sidebarContainerCommonStyle,
    style,
  ];

  /** The sidebar children. */
  public get sidebars(): SbbSidebarElement[] {
    return Array.from(this.querySelectorAll?.<SbbSidebarElement>(`:scope > sbb-sidebar`) ?? []);
  }

  /** The sidebar child with the `start` position. */
  public get start(): SbbSidebarElement | null {
    return this.querySelector?.<SbbSidebarElement>(`:scope > sbb-sidebar:not([position='end'])`);
  }

  /** The sidebar child with the `end` position. */
  public get end(): SbbSidebarElement | null {
    return this.querySelector?.<SbbSidebarElement>(`:scope > sbb-sidebar[position='end']`);
  }

  private _forcedClosedSidebars = new WeakSet<SbbSidebarElement>();

  public override connectedCallback(): void {
    super.connectedCallback();

    sidebarContainerResizeObserver ??=
      !isServer && new ResizeObserver(() => this._handleWidthChange());

    if (!isServer && sidebarContainerRegistry.size === 0) {
      sidebarContainerResizeObserver.observe(document?.documentElement);
    }

    sidebarContainerRegistry.add(this);

    this._handleWidthChange();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    sidebarContainerRegistry.delete(this);

    if (sidebarContainerRegistry.size === 0) {
      sidebarContainerResizeObserver?.disconnect();
    }
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this._handleWidthChange();
  }

  private _handleWidthChange(): void {
    Array.from(sidebarContainerRegistry)
      .sort((c1, c2) => c1.compareDocumentPosition(c2) & Node.DOCUMENT_POSITION_FOLLOWING)
      .forEach((c) => c._calculateSpaceState());
  }

  /**
   * Closes and opens sidebars depending on available width
   * of the container and its parent container.
   */
  private async _calculateSpaceState(): Promise<void> {
    if (isServer) {
      return;
    }

    const parentSidebarContainer =
      this.parentElement?.closest?.<SbbSidebarContainerElement>('sbb-sidebar-container');

    const parentSidebars = parentSidebarContainer?.sidebars ?? [];

    for (const sidebar of parentSidebars) {
      // Using Promise.all did create some confusing problems, so we decided to await it sequentially.
      await sidebar.updateComplete.then(() => sidebar.animationComplete);
    }

    const width = this.offsetWidth ?? 0;
    if (width === 0) {
      return;
    }

    const sidebars = this.sidebars;
    const hasForcedClosedParentContainer =
      parentSidebars.some((sidebar) => sidebar.matches(':state(mode-over-forced)')) ?? false;
    const sumOfAllRelevantSidebarWidths = sidebars
      .filter((sidebar) => sidebar.mode === 'side')
      .reduce((accumulator, currentValue) => accumulator + (currentValue.offsetWidth ?? 0), 0);
    const isMinimumSpace = width - sumOfAllRelevantSidebarWidths < MIN_WIDTH_BEFORE_COLLAPSE;

    for (const sidebar of sidebars) {
      const wasMinimum = sidebar.matches(':state(mode-over-forced)');
      const controller = ɵstateController(sidebar);
      controller.toggle('mode-over-forced', isMinimumSpace);

      if (sidebar.mode !== 'side') {
        continue;
      }

      if ((isMinimumSpace || hasForcedClosedParentContainer) && sidebar.opened && !wasMinimum) {
        // We have to close the sidebar when the remaining width is below the minimum or the parent container runs out of space.

        if (sidebar.isOpen && !sidebar.matches(':state(skip-animation)')) {
          // If the sidebar is opened visually, add a special data attribute that controls the z-index.
          // Without this solution, when the sidebar is closed, it would appear visually as if it were in 'over' mode.
          controller.add('mode-over-forced-closing');
        }

        sidebar.opened = false;
        this._forcedClosedSidebars.add(sidebar);

        if (sidebar.matches(':state(mode-over-forced-closing)')) {
          sidebar.updateComplete
            .then(() => sidebar.animationComplete)
            .then(() => controller.delete('mode-over-forced-closing'));
        }
      } else if (
        // We have to open the sidebar when the remaining width of the sidebar and the parent container
        // is above the minimum.
        // We only programmatically open the sidebar when the cause of closing was this logic.
        !isMinimumSpace &&
        !hasForcedClosedParentContainer &&
        this._forcedClosedSidebars.has(sidebar)
      ) {
        // If the sidebar was manually opened (in forced over mode)
        // and the sidebar becomes enough space available, it stays open, but we need to ensure that
        // the focus trap is reset.
        sidebar['cedeFocus']();
        sidebar.opened = true;
        this._forcedClosedSidebars.delete(sidebar);
      }
    }
  }

  protected override render(): TemplateResult {
    return html`<div
        class="sbb-sidebar-container-backdrop"
        @click=${() => this.sidebars.forEach((s) => s.close())}
      ></div>
      <slot @slotchange=${() => this._handleWidthChange()}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sidebar-container': SbbSidebarContainerElement;
  }
}
