import { isServer, type LitElement } from 'lit';

import type { AbstractConstructor } from './constructor.ts';

export declare class SbbDynamicStylesheetMixinType {
  protected get dynamicStyleSheet(): CSSStyleSheet | null;
  protected createHostRules(): CSSStyleRule | null;
}

/**
 * Mixin for encapsulating the dynamic stylesheet logic.
 * This is used in components that need to dynamically update their stylesheets.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbDynamicStylesheetMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbDynamicStylesheetMixinType> & T => {
  abstract class SbbDynamicStylesheetElement
    extends superClass
    implements Partial<SbbDynamicStylesheetMixinType>
  {
    protected get dynamicStyleSheet(): CSSStyleSheet | null {
      return this._dynamicStyleSheet ?? null;
    }
    private _dynamicStyleSheet: CSSStyleSheet | null = null;

    protected override createRenderRoot(): HTMLElement | DocumentFragment {
      const renderRoot = super.createRenderRoot();

      if (!isServer) {
        this._dynamicStyleSheet = new CSSStyleSheet();

        // In theory renderRoot could also be something else than shadowRoot in which case the
        // optional chaining access should be safe.
        (renderRoot as ShadowRoot).adoptedStyleSheets?.push(this._dynamicStyleSheet);
      }

      return renderRoot;
    }

    protected createHostRules(): CSSStyleRule | null {
      if (!this._dynamicStyleSheet) {
        return null;
      }
      const index = this._dynamicStyleSheet.insertRule(':host {}');
      return this._dynamicStyleSheet.cssRules[index] as CSSStyleRule;
    }
  }

  return SbbDynamicStylesheetElement as unknown as AbstractConstructor<SbbDynamicStylesheetMixinType> &
    T;
};
