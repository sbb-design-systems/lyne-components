import { isServer, type LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import type { SbbCheckboxGroupElement } from '../../checkbox/checkbox-group.js';
import type { SbbCheckboxPanelElement } from '../../checkbox/checkbox-panel.js';
import type { SbbRadioButtonGroupElement } from '../../radio-button/radio-button-group.js';
import type { SbbRadioButtonPanelElement } from '../../radio-button/radio-button-panel.js';
import { forceType } from '../decorators.js';
import type { SbbStateChange } from '../interfaces/types.js';

import type { AbstractConstructor } from './constructor.js';

export declare class SbbSelectionPanelMixinType {
  public accessor color: 'white' | 'milk';
  public accessor borderless: boolean;

  protected set checked(checked: boolean);
  protected get checked(): boolean;

  protected set disabled(disabled: boolean);

  protected get group(): SbbRadioButtonGroupElement | SbbCheckboxGroupElement | null;

  protected sizeAttributeObserver: MutationObserver | null;

  protected initFromInput(event: Event): void;
  protected onSizeAttributesChange(mutationsList: MutationRecord[]): void;
  protected onInputStateChange(event: CustomEvent<SbbStateChange>): void;
}

/**
 * Mixin for common selection panel behaviors
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbSelectionPanelMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbSelectionPanelMixinType> & T => {
  abstract class SbbSelectionPanelElement
    extends superClass
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
      this.toggleAttribute('data-checked', checked);
    }
    protected get checked(): boolean {
      return this.hasAttribute('data-checked');
    }

    /** Whether the selection panel is disabled. */
    protected set disabled(disabled: boolean) {
      this.toggleAttribute('data-disabled', disabled);
    }

    protected get group(): SbbRadioButtonGroupElement | SbbCheckboxGroupElement | null {
      return this.closest('sbb-radio-button-group, sbb-checkbox-group') as
        | SbbRadioButtonGroupElement
        | SbbCheckboxGroupElement;
    }

    protected sizeAttributeObserver = !isServer
      ? new MutationObserver((mutationsList: MutationRecord[]) =>
          this.onSizeAttributesChange(mutationsList),
        )
      : null;

    protected constructor(...args: any[]) {
      super(args);
      this.addEventListener?.('panelconnected', (e) => this.initFromInput(e));
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

    /**
     * Set the data-size in two cases:
     * - if there's no group, so the size change comes directly from a change on the inner panel;
     * - if there's a wrapper group and its size changes, syncing it with the panel size.
     *
     * On the other hand, if there's a wrapper group and the size changes on the inner panel, the data-size doesn't change.
     */
    protected onSizeAttributesChange(mutationsList: MutationRecord[]): void {
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

    protected onInputStateChange(event: CustomEvent<SbbStateChange>): void {
      if (event.detail.type === 'disabled') {
        this.disabled = event.detail.disabled;
        return;
      } else if (event.detail.type !== 'checked') {
        return;
      }

      this.checked = event.detail.checked;
    }
  }

  return SbbSelectionPanelElement as unknown as AbstractConstructor<SbbSelectionPanelMixinType> & T;
};
