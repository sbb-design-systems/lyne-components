import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html } from 'lit';
import { property } from 'lit/decorators.js';

import { isLean } from '../dom.ts';
import type { SbbHorizontalFrom, SbbOrientation } from '../interfaces.ts';
import { SbbDisabledMixin, SbbRequiredMixin } from '../mixins.ts';
import { boxSizingStyles } from '../styles.ts';

import { SbbElement } from './element.ts';
import style from './selection-group-base-element.scss?inline';

/**
 * It can be used as a container for one or more `sbb-checkbox`.
 *
 * @slot - Use the unnamed slot to add `sbb-checkbox` elements to the `sbb-checkbox-group`.
 * @slot error - Slot used to render a `sbb-error` inside the `sbb-checkbox-group`.
 */
export abstract class SbbSelectionGroupBaseElement<T extends SbbElement> extends SbbDisabledMixin(
  SbbRequiredMixin(SbbElement),
) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /**
   * Size variant, either xs, s or m.
   * @default 'm' / 'xs' (lean)
   */
  @property() public accessor size: 'xs' | 's' | 'm' = isLean() ? 'xs' : 'm';

  /** Overrides the behavior of `orientation` property. */
  @property({ attribute: 'horizontal-from', reflect: true })
  public accessor horizontalFrom: SbbHorizontalFrom | null = null;

  /** Indicates the orientation of the checkboxes or panels inside the group. */
  @property({ reflect: true })
  public accessor orientation: SbbOrientation = 'horizontal';

  protected abstract readonly selectionElementSelectors: string;
  protected abstract readonly panelElementSelector: string;

  /**
   * List of contained selection elements.
   * @internal
   */
  public get selectionElements(): T[] {
    return <T[]>(
      Array.from(this.querySelectorAll?.(this.selectionElementSelectors) ?? []).filter(
        (el) => el.closest?.(this.localName) === this,
      )
    );
  }

  protected constructor() {
    super();
    this.addController(
      new MutationController(this, {
        config: { childList: true, subtree: true },
        callback: () =>
          this.toggleState('has-panel', !!this.querySelector?.(this.panelElementSelector)),
      }),
    );
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    // TODO: Use PropertyWatcherController in selection elements
    if (changedProperties.has('disabled')) {
      this.selectionElements.forEach((c) => c.requestUpdate?.('disabled'));
    }
    if (changedProperties.has('required')) {
      this.selectionElements.forEach((c) => c.requestUpdate?.('required'));
    }
    if (changedProperties.has('size')) {
      this.selectionElements.forEach((c) => c.requestUpdate?.('size'));
    }
  }

  protected onSlotChange(): void {}

  protected override render(): TemplateResult {
    return html`
      <slot @slotchange=${() => this.onSlotChange()}></slot>
      <slot name="error"></slot>
    `;
  }
}
