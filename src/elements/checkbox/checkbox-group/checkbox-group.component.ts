import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getNextElementIndex, interactivityChecker, isArrowKeyPressed } from '../../core/a11y.ts';
import { forceType } from '../../core/decorators.ts';
import { isLean } from '../../core/dom.ts';
import type { SbbHorizontalFrom, SbbOrientation } from '../../core/interfaces.ts';
import { SbbDisabledMixin, SbbElementInternalsMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbCheckboxPanelElement } from '../checkbox-panel.ts';
import type { SbbCheckboxElement } from '../checkbox.ts';
import type { SbbCheckboxSize } from '../common.ts';

import style from './checkbox-group.scss?lit&inline';

/**
 * It can be used as a container for one or more `sbb-checkbox`.
 *
 * @slot - Use the unnamed slot to add `sbb-checkbox` elements to the `sbb-checkbox-group`.
 * @slot error - Slot used to render a `sbb-error` inside the `sbb-checkbox-group`.
 */
export
@customElement('sbb-checkbox-group')
class SbbCheckboxGroupElement extends SbbDisabledMixin(SbbElementInternalsMixin(LitElement)) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];

  /** Whether the checkbox group is required. */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor required: boolean = false;

  /**
   * Size variant, either xs, s or m.
   * @default 'm' / 'xs' (lean)
   */
  @property() public accessor size: SbbCheckboxSize = isLean() ? 'xs' : 'm';

  /** Overrides the behaviour of `orientation` property. */
  @property({ attribute: 'horizontal-from', reflect: true })
  public accessor horizontalFrom: SbbHorizontalFrom | null = null;

  /** Indicates the orientation of the checkboxes inside the `<sbb-checkbox-group>`. */
  @property({ reflect: true })
  public accessor orientation: SbbOrientation = 'horizontal';

  /** List of contained checkbox elements. */
  public get checkboxes(): (SbbCheckboxElement | SbbCheckboxPanelElement)[] {
    return <(SbbCheckboxElement | SbbCheckboxPanelElement)[]>(
      Array.from(this.querySelectorAll?.('sbb-checkbox, sbb-checkbox-panel') ?? []).filter(
        (el) => el.closest('sbb-checkbox-group') === this,
      )
    );
  }

  public constructor() {
    super();
    this.addEventListener?.('keydown', (e) => this._handleKeyDown(e));
    this.addController(
      new MutationController(this, {
        config: { childList: true, subtree: true },
        callback: () => this.toggleState('has-panel', !!this.querySelector?.('sbb-checkbox-panel')),
      }),
    );
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    // TODO: Use PropertyWatcherController in checkbox
    if (changedProperties.has('disabled')) {
      this.checkboxes.forEach((c) => c.requestUpdate?.('disabled'));
    }
    if (changedProperties.has('required')) {
      this.checkboxes.forEach((c) => c.requestUpdate?.('required'));
    }
    if (changedProperties.has('size')) {
      this.checkboxes.forEach((c) => c.requestUpdate?.('size'));
    }
  }

  private _handleKeyDown(evt: KeyboardEvent): void {
    const enabledCheckboxes: (SbbCheckboxElement | SbbCheckboxPanelElement)[] =
      this.checkboxes.filter(
        (checkbox: SbbCheckboxElement | SbbCheckboxPanelElement) =>
          !checkbox.disabled && interactivityChecker.isVisible(checkbox as HTMLElement),
      );

    if (
      !enabledCheckboxes ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this &&
        (evt.target as HTMLElement).parentElement !== this &&
        (evt.target as HTMLElement).parentElement!.localName !== 'sbb-selection-expansion-panel' &&
        (evt.target as HTMLElement).parentElement!.localName !== 'sbb-selection-action-panel')
    ) {
      return;
    }

    if (isArrowKeyPressed(evt)) {
      const current: number = enabledCheckboxes.findIndex(
        (e: SbbCheckboxElement | SbbCheckboxPanelElement) => e === evt.target,
      );
      const nextIndex: number = getNextElementIndex(evt, current, enabledCheckboxes.length);
      enabledCheckboxes[nextIndex]?.focus();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-checkbox-group">
        <slot></slot>
      </div>
      <slot name="error"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-checkbox-group': SbbCheckboxGroupElement;
  }
}
