import { CSSResultGroup, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import {
  Constructor,
  LanguageController,
  NamedSlotStateController,
} from '../core/common-behaviors';
import { ACTION_ELEMENTS, hostContext } from '../core/dom';
import { actionElementHandlerAspect, HandlerRepository } from '../core/eventing';
import { SbbIconPlacement } from '../core/interfaces';

import '../icon';

import style from './link.scss?lit&inline';

export type SbbLinkSize = 'xs' | 's' | 'm';

export declare class SbbLinkCommonInterface {
  public variant: 'block' | 'inline';
  public size?: SbbLinkSize;
  public isStatic: boolean;
  protected language: LanguageController;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbLinkCommonElementMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<SbbLinkCommonInterface> & T => {
  class SbbLinkCommonElement extends superClass implements Partial<SbbLinkCommonInterface> {
    public static styles: CSSResultGroup = style;

    /** Variant of the link (block or inline). */
    @property({ reflect: true }) public variant: 'block' | 'inline' = 'block';

    /**
     * Text size, the link should get in the non-button variation.
     * With inline variant, the text size adapts to where it is used.
     */
    @property({ reflect: true }) public size: SbbLinkSize = 's';

    /**
     * Set this property to true if you want only a visual representation of a
     * link, but no interaction (a span instead of a link/button will be rendered).
     */
    @property({ attribute: 'is-static', reflect: true, type: Boolean }) public isStatic = false;

    /** Moves the icon to the end of the component if set to true. */
    @property({ attribute: 'icon-placement' })
    public iconPlacement?: SbbIconPlacement = 'start';

    protected language = new LanguageController(this);
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
    }

    public override disconnectedCallback(): void {
      super.disconnectedCallback();
      this._handlerRepository.disconnect();
    }
  }
  return SbbLinkCommonElement as unknown as Constructor<SbbLinkCommonInterface> & T;
};
