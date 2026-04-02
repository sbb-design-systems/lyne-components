import { unsafeCSS, type CSSResultGroup, type TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import type { SbbActionBaseElement } from '../../core/base-elements.ts';
import { type AbstractConstructor, SbbNegativeMixin } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';

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
    public static styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

    public constructor() {
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
