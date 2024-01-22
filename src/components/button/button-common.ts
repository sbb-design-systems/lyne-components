import { CSSResultGroup, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { Constructor, NamedSlotStateController } from '../core/common-behaviors';
import { ACTION_ELEMENTS, hostContext, toggleDatasetEntry } from '../core/dom';
import { actionElementHandlerAspect, HandlerRepository } from '../core/eventing';

import '../icon';

import style from './button.scss?lit&inline';

export type SbbButtonSize = 'l' | 'm';
export type SbbButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'transparent';

export declare class SbbButtonCommonInterface {
  public variant: SbbButtonVariant;
  public size?: SbbButtonSize;
  public isStatic: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbButtonCommonElementMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbButtonCommonInterface> & T => {
  class SbbButtonCommonElement extends superClass implements Partial<SbbButtonCommonInterface> {
    public static styles: CSSResultGroup = style;
    /** Variant of the button, like primary, secondary etc. */
    @property({ reflect: true }) public variant: SbbButtonVariant = 'primary';

    /** Size variant, either l or m. */
    @property({ reflect: true }) public size?: SbbButtonSize = 'l';

    /**
     * Set this property to true if you want only a visual representation of a
     * button, but no interaction (a span instead of a link/button will be rendered).
     */
    @property({ attribute: 'is-static', reflect: true, type: Boolean }) public isStatic = false;

    private _handlerRepository = new HandlerRepository(this, actionElementHandlerAspect);

    public constructor(...args: any[]) {
      super(args);
      new NamedSlotStateController(this);
    }

    public override connectedCallback(): void {
      super.connectedCallback();
      // Check if the current element is nested in an action element.
      this.isStatic = this.isStatic || !!hostContext(ACTION_ELEMENTS, this);
      this._handlerRepository.connect();

      const formField = this.closest?.('sbb-form-field') ?? this.closest?.('[data-form-field]');
      if (formField) {
        toggleDatasetEntry(this, 'iconSmall', true);
      }
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this._handlerRepository.disconnect();
    }
  }
  return SbbButtonCommonElement as unknown as Constructor<SbbButtonCommonInterface> & T;
};
