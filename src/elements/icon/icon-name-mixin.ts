import { html, type LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { forceType, omitEmptyConverter } from '../core/decorators.ts';
import type { AbstractConstructor, SbbElementInternalsMixinType } from '../core/mixins.ts';

import './icon.component.ts';

export declare class SbbIconNameMixinType {
  public accessor iconName: string;
  protected renderIconSlot(classname?: string): TemplateResult;
  protected renderIconName(): string;
}

/**
 * Enhance your component with an iconName property and provides a template for the icon slot.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbIconNameMixin = <
  T extends AbstractConstructor<LitElement & SbbElementInternalsMixinType>,
>(
  superClass: T,
): AbstractConstructor<SbbIconNameMixinType> & T => {
  abstract class SbbIconNameElement extends superClass implements Partial<SbbIconNameMixinType> {
    /**
     * The icon name we want to use, choose from the small icon variants
     * from the ui-icons category from here
     * https://icons.app.sbb.ch.
     */
    @forceType()
    @property({ attribute: 'icon-name', converter: omitEmptyConverter })
    public accessor iconName: string = '';

    protected renderIconSlot(classname?: string): TemplateResult {
      const iconName = this._renderIconName();

      return html`
        <slot name="icon">
          ${iconName
            ? html`<sbb-icon name=${iconName} class=${classname || nothing}></sbb-icon>`
            : nothing}
        </slot>
      `;
    }

    protected renderIconName(): string {
      return this.iconName;
    }

    private _renderIconName(): string {
      const iconName = this.renderIconName();
      this.toggleState('has-icon-name', !!iconName);
      return iconName;
    }
  }

  return SbbIconNameElement as unknown as AbstractConstructor<SbbIconNameMixinType> & T;
};
