import { isServer, type LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import type { SbbCheckboxGroupElement } from '../../checkbox/checkbox-group.js';
import type { SbbCheckboxPanelElement } from '../../checkbox/checkbox-panel.js';
import type { SbbRadioButtonGroupElement } from '../../radio-button/radio-button-group.js';
import type { SbbRadioButtonPanelElement } from '../../radio-button/radio-button-panel.js';
import { forceType } from '../decorators.js';
import type { SbbStateChange } from '../interfaces/types.js';

import type { AbstractConstructor } from './constructor.js';
import {
  SbbElementInternalsMixin,
  type SbbElementInternalsMixinType,
} from './element-internals-mixin.js';

export declare class SbbSelectionPanelMixinType {
  public accessor color: 'white' | 'milk';
  public accessor borderless: boolean;

  protected set checked(checked: boolean);
  protected get checked(): boolean;

  protected set disabled(disabled: boolean);
  protected get disabled(): boolean;

  protected group: SbbRadioButtonGroupElement | SbbCheckboxGroupElement | null;
  protected sizeAttributeObserver: MutationObserver | null;

  protected initFromInput(event: Event): void;
  protected onInputStateChange(event: CustomEvent<SbbStateChange>): void;
}

/**
 * Mixin for common selection panel behaviors
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbSelectionPanelMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbSelectionPanelMixinType & SbbElementInternalsMixinType> & T => {
  abstract class SbbSelectionPanelElement
    extends SbbElementInternalsMixin(superClass)
    implements Partial<SbbSelectionPanelMixinType>
  {
    /** The background color of the panel. */
    @property({ reflect: true }) public accessor color: 'white' | 'milk' = 'white';

    /** Whether the unselected panel has a border. */
    @forceType()
    @property({ reflect: true, type: Boolean })
    public accessor borderless: boolean = false;

    /** Whether the selection panel is checked. */
    protected set checked(checked: boolean) {
      this.toggleState('checked', checked);
    }
    protected get checked(): boolean {
      return this.internals.states.has('checked');
    }

    /** Whether the selection panel is disabled. */
    protected set disabled(disabled: boolean) {
      this.toggleState('disabled', disabled);
    }
    protected get disabled(): boolean {
      return this.internals.states.has('disabled');
    }

    protected group: SbbRadioButtonGroupElement | SbbCheckboxGroupElement | null = null;

    protected sizeAttributeObserver = !isServer
      ? new MutationObserver((mutationsList: MutationRecord[]) =>
          this._onSizeAttributesChange(mutationsList),
        )
      : null;

    protected constructor(...args: any[]) {
      super(args);
      this.addEventListener?.('panelconnected', (e) => this.initFromInput(e));
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      this.group = this.closest('sbb-radio-button-group, sbb-checkbox-group');
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this.sizeAttributeObserver?.disconnect();
    }

    protected initFromInput(event: Event): void {
      const input = event.target as SbbCheckboxPanelElement | SbbRadioButtonPanelElement;

      this.checked = input.checked;
      this.disabled = input.disabled;
      this.sizeAttributeObserver?.disconnect();
      // The size of the inner panel can change due direct change on the panel or due to change of the input-group size.
      this.sizeAttributeObserver?.observe(input, { attributeFilter: ['size'] });
    }

    protected onInputStateChange(event: CustomEvent<SbbStateChange>): void {
      if (event.detail.type === 'disabled') {
        this.disabled = event.detail.disabled;
      } else if (event.detail.type === 'checked') {
        this.checked = event.detail.checked;
      }
    }

    /**
     * Set the data-size in two cases:
     * - if there's no group, so the size change comes directly from a change on the inner panel;
     * - if there's a wrapper group and its size changes, syncing it with the panel size.
     *
     * On the other hand, if there's a wrapper group and the size changes on the inner panel, the data-size doesn't change.
     */
    private _onSizeAttributesChange(mutationsList: MutationRecord[]): void {
      for (const mutation of mutationsList) {
        if (mutation.attributeName === 'size') {
          const group = this.group;
          const size = (mutation.target as HTMLElement).getAttribute('size')!;
          if (!group || group.size === size) {
            this.setAttribute('data-size', size);
          }
        }
      }
    }
  }

  return SbbSelectionPanelElement as unknown as AbstractConstructor<
    SbbSelectionPanelMixinType & SbbElementInternalsMixinType
  > &
    T;
};
