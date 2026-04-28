import { type CSSResultGroup, type TemplateResult, unsafeCSS } from 'lit';
import { html } from 'lit/static-html.js';

import {
  type AbstractConstructor,
  boxSizingStyles,
  SbbActionBaseElement,
  SbbNegativeMixin,
} from '../../core.ts';

import style from './link.scss?inline';

export declare class SbbLinkCommonElementMixinType extends SbbNegativeMixin(SbbActionBaseElement) {}

export interface SbbLinkCommonElementMixinConstructor {
  styles: CSSResultGroup;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbLinkCommonElementMixin = <T extends AbstractConstructor<SbbActionBaseElement>>(
  superClass: T,
): AbstractConstructor<SbbLinkCommonElementMixinType> &
  T &
  SbbLinkCommonElementMixinConstructor => {
  abstract class SbbLinkCommonElement
    extends SbbNegativeMixin(superClass)
    implements Partial<SbbLinkCommonElementMixinType>
  {
    public static styles: CSSResultGroup = [
      (superClass as unknown as { styles: CSSResultGroup }).styles ?? [],
      boxSizingStyles,
      unsafeCSS(style),
    ];

    protected constructor() {
      super();
      this.internals.states.add('sbb-link');
    }

    protected override renderTemplate(): TemplateResult {
      return html`<slot></slot>`;
    }
  }
  return SbbLinkCommonElement as unknown as AbstractConstructor<SbbLinkCommonElementMixinType> &
    T &
    SbbLinkCommonElementMixinConstructor;
};
