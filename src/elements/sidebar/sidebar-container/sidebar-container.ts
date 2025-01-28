import {
  type CSSResultGroup,
  html,
  isServer,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';

import type { SbbSidebarElement } from '../sidebar.js';

import style from './sidebar-container.scss?lit&inline';

const sidebarContainerRegistry = new Set<SbbSidebarContainerElement>();

let sidebarContainerResizeObserver: ResizeObserver | undefined;

/**
 * This is the parent component to one or two `<sbb-sidebar>`s that validates the state internally
 * and coordinates the backdrop and content styling.
 *
 * @slot - Use the unnamed slot to add `sbb-sidebar` and `sbb-sidebar-content` elements.
 */
export
@customElement('sbb-sidebar-container')
class SbbSidebarContainerElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /**
   * Associated sidebars.
   */
  public get sidebars(): SbbSidebarElement[] {
    return Array.from(this.querySelectorAll<SbbSidebarElement>(':scope > sbb-sidebar'));
  }

  private _forcedClosedSidebars = new WeakSet<SbbSidebarElement>();

  public override connectedCallback(): void {
    super.connectedCallback();

    sidebarContainerResizeObserver ??=
      !isServer &&
      new ResizeObserver(() => {
        Array.from(sidebarContainerRegistry)
          .sort((c1, c2) => c1.compareDocumentPosition(c2) & Node.DOCUMENT_POSITION_FOLLOWING)
          .forEach((c) => c._calculateSpaceState());
      });

    if (!isServer && sidebarContainerRegistry.size === 0) {
      sidebarContainerResizeObserver.observe(document?.documentElement);
    }

    sidebarContainerRegistry.add(this);

    this._calculateSpaceState();
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

    this._calculateSpaceState();
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
      this.parentElement?.closest<SbbSidebarContainerElement>('sbb-sidebar-container');

    const parentSidebars = parentSidebarContainer?.sidebars;

    if (parentSidebars) {
      await Promise.all(
        parentSidebars.map((sidebar) =>
          sidebar.updateComplete.then(() => sidebar.animationComplete),
        ),
      );
    }

    const width = this.offsetWidth ?? 0;
    if (width === 0) {
      return;
    }

    const minWidth = 320;
    const sidebars = this.sidebars;
    const hasForcedClosedParentContainer =
      parentSidebars?.some((sidebar) => sidebar.hasAttribute('data-minimum-space')) ?? false;
    const sumOfAllRelevantSidebarWidths = sidebars
      .filter((sidebar) => sidebar.mode === 'side')
      .reduce((accumulator, currentValue) => accumulator + (currentValue.offsetWidth ?? 0), 0);
    const isMinimumSpace = width - sumOfAllRelevantSidebarWidths <= minWidth;

    sidebars.forEach((sidebar) => {
      sidebar.toggleAttribute('data-minimum-space', isMinimumSpace);

      if (sidebar.mode !== 'side') {
        return;
      }

      if ((isMinimumSpace || hasForcedClosedParentContainer) && sidebar.opened) {
        // We have to close the sidebar when the remaining width is below the minimum or the parent container runs out of space.

        if (sidebar.isOpen && !sidebar.hasAttribute('data-skip-animation')) {
          // If the sidebar is opened visually, add a special data attribute that controls the z-index.
          // Without this solution, when the sidebar is closed, it would appear visually as if it were in 'over' mode.
          sidebar.toggleAttribute('data-minimum-space-closing', true);
        }

        sidebar.opened = false;
        this._forcedClosedSidebars.add(sidebar);

        if (sidebar.hasAttribute('data-minimum-space-closing')) {
          sidebar.updateComplete
            .then(() => sidebar.animationComplete)
            .then(() => sidebar.removeAttribute('data-minimum-space-closing'));
        }
      } else if (
        // We have to open the sidebar when the remaining width of the sidebar and the parent container
        // is above the minimum.
        // We only programmatically open the sidebar when the cause of closing was this logic.
        !isMinimumSpace &&
        !hasForcedClosedParentContainer &&
        this._forcedClosedSidebars.has(sidebar)
      ) {
        sidebar.opened = true;

        this._forcedClosedSidebars.delete(sidebar);
      }
    });
  }

  protected override render(): TemplateResult {
    return html`<div class="sbb-sidebar-container-backdrop"></div>
      <slot @slotchange=${() => this._calculateSpaceState()}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sidebar-container': SbbSidebarContainerElement;
  }
}
