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

// TODO: Discuss solution with registry
const sidebarContainerRegistry = new Set<SbbSidebarContainerElement>();

const sidebarContainerResizeObserver =
  !isServer &&
  new ResizeObserver(() => {
    Array.from(sidebarContainerRegistry)
      .sort((c1, c2) => c1.compareDocumentPosition(c2) & Node.DOCUMENT_POSITION_FOLLOWING)
      .forEach((c) => c.reactToAvailableSpace());
  });

sidebarContainerResizeObserver?.observe(document?.documentElement);

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
  private _awaitingParentAnimation = false;

  public constructor() {
    super();
    // TODO: remove or keep
    // new ResizeController(this, {
    //   skipInitial: true,
    //   callback: () => this.updateWidthState(),
    // });
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    sidebarContainerRegistry.add(this);

    this.reactToAvailableSpace();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    sidebarContainerRegistry.delete(this);
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this.reactToAvailableSpace();
  }

  /**
   * Closes and opens sidebars depending on available width
   * of the container and its parent container.
   * TODO: method name?
   */
  public async reactToAvailableSpace(): Promise<void> {
    if (this._awaitingParentAnimation) {
      return;
    }

    const parentSidebarContainer =
      this.parentElement?.closest<SbbSidebarContainerElement>('sbb-sidebar-container');

    const parentSidebars = parentSidebarContainer?.sidebars;

    if (parentSidebars) {
      this._awaitingParentAnimation = true;
      await Promise.all(
        parentSidebars.map((sidebar) =>
          sidebar.updateComplete.then(() => sidebar.animationComplete),
        ),
      );
      this._awaitingParentAnimation = false;
    }

    const width = this.offsetWidth ?? 0;
    if (width === 0) {
      return;
    }

    // TODO: discuss where the minimum is taken from
    const minWidth = '320px'; //getComputedStyle(this).getPropertyValue(      '--sbb-sidebar-container-min-visible-content-width',    );

    const sidebars = this.sidebars;
    const hasForcedClosedParentContainer =
      parentSidebars?.some((sidebar) => sidebar.hasAttribute('data-minimum-space')) ?? false;
    const sumOfAllRelevantSidebarWidths = sidebars
      .filter((sidebar) => sidebar.mode === 'side')
      .reduce((accumulator, currentValue) => accumulator + (currentValue.offsetWidth ?? 0), 0);
    const isMinimumSpace = width - sumOfAllRelevantSidebarWidths <= (parseInt(minWidth) || 320);

    sidebars.forEach((sidebar) => {
      sidebar.toggleAttribute('data-minimum-space', isMinimumSpace);

      if (sidebar.mode !== 'side') {
        return;
      }

      if ((isMinimumSpace || hasForcedClosedParentContainer) && sidebar.opened) {
        // We have to close the sidebar when the remaining width is below the minimum or the parent container runs out of space.

        if (sidebar.isOpen) {
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
      <slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sidebar-container': SbbSidebarContainerElement;
  }
}
