import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import type { SbbActionBaseElement } from '../../core/base-elements.ts';
import { isLean } from '../../core/dom.ts';
import { type AbstractConstructor, SbbNegativeMixin } from '../../core/mixins.ts';

import style from './link.scss?lit&inline';

export type SbbLinkSize = 'xs' | 's' | 'm';

export declare class SbbLinkCommonElementMixinType extends SbbNegativeMixin(SbbActionBaseElement) {
  public accessor size: SbbLinkSize;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbLinkCommonElementMixin = <T extends AbstractConstructor<SbbActionBaseElement>>(
  superClass: T,
): AbstractConstructor<SbbLinkCommonElementMixinType> & T => {
  abstract class SbbLinkCommonElement
    extends SbbNegativeMixin(superClass)
    implements Partial<SbbLinkCommonElementMixinType>
  {
    public static styles: CSSResultGroup = style;

    /**
     * Text size, the link should get in the non-button variation.
     * With inline variant, the text size adapts to where it is used.
     * @default 's' / 'xs' (lean)
     */
    @property({ reflect: true }) public accessor size: SbbLinkSize = isLean() ? 'xs' : 's';

    public constructor() {
      super();
      this.internals.states.add('sbb-link');
    }

    protected override renderTemplate(): TemplateResult {
      return html`<slot></slot>`;
    }
  }
  return SbbLinkCommonElement as unknown as AbstractConstructor<SbbLinkCommonElementMixinType> & T;
};
