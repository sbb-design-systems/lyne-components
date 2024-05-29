import type { LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

import type { SbbSelectionExpansionPanelElement } from '../../selection-expansion-panel.js';

import type { AbstractConstructor } from './constructor.js';

export declare class SbbPanelMixinType {
  public color: 'white' | 'milk';
  public borderless: boolean;
  public get isSelectionPanelInput(): boolean;
}

/**
 * Mixin for common panel behaviors
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbPanelMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbPanelMixinType> & T => {
  abstract class SbbPanelElement extends superClass implements SbbPanelMixinType {
    /** The background color of the panel. */
    @property() public color: 'white' | 'milk' = 'white';

    /** Whether the unselected panel has a border. */
    @property({ reflect: true, type: Boolean }) public borderless = false;

    @state() private _isSelectionPanelInput = false;

    /**
     * Whether the input is the main input of a selection panel.
     * @internal
     */
    public get isSelectionPanelInput(): boolean {
      return this._isSelectionPanelInput;
    }

    private _selectionPanelElement: SbbSelectionExpansionPanelElement | null = null;

    public override connectedCallback(): void {
      super.connectedCallback();
      // We can use closest here, as we expect the parent sbb-selection-expansion-panel to be in light DOM.
      this._selectionPanelElement = this.closest('sbb-selection-expansion-panel');
      this._isSelectionPanelInput =
        !!this._selectionPanelElement &&
        !this.closest?.('sbb-selection-expansion-panel [slot="content"]');

      this.toggleAttribute(
        'data-is-inside-selection-expansion-panel',
        !!this._selectionPanelElement,
      );
      this.toggleAttribute('data-is-selection-expansion-panel-input', this._isSelectionPanelInput);
    }
  }

  return SbbPanelElement as AbstractConstructor<SbbPanelMixinType> & T;
};
