import {
  type CSSResultGroup,
  nothing,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  type AbstractConstructor,
  boxSizingStyles,
  type SbbActionBaseElement,
} from '../../core.ts';
import { forceType, isLean, SbbNegativeMixin } from '../../core.ts';
import { SbbIconNameMixin } from '../../icon.pure.ts';

import buttonAccentStyleString from './accent-button.scss?inline';
import style from './button-common.scss?inline';
import miniButtonStyleString from './mini-button-common.scss?inline';
import miniButtonLabelStyleString from './mini-button-label-common.scss?inline';
import buttonPrimaryStyleString from './primary-button.scss?inline';
import buttonSecondaryStyleString from './secondary-button.scss?inline';
import buttonTransparentStyleString from './transparent-button.scss?inline';

export const buttonPrimaryStyle = unsafeCSS(buttonPrimaryStyleString);
export const buttonSecondaryStyle = unsafeCSS(buttonSecondaryStyleString);
export const buttonAccentStyle = unsafeCSS(buttonAccentStyleString);
export const buttonTransparentStyle = unsafeCSS(buttonTransparentStyleString);
export const miniButtonStyle = unsafeCSS(miniButtonStyleString);
export const miniButtonLabelStyle = unsafeCSS(miniButtonLabelStyleString);

export type SbbButtonSize = 'l' | 'm' | 's';

export declare class SbbButtonCommonElementMixinType extends SbbNegativeMixin(
  SbbIconNameMixin(SbbActionBaseElement),
) {
  public accessor size: SbbButtonSize;
  public accessor loading: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbButtonCommonElementMixin = <T extends AbstractConstructor<SbbActionBaseElement>>(
  superClass: T,
): AbstractConstructor<SbbButtonCommonElementMixinType> & T => {
  const baseClass = SbbNegativeMixin(SbbIconNameMixin(superClass));

  abstract class SbbButtonCommonElementClass
    extends baseClass
    implements Partial<SbbButtonCommonElementMixinType>
  {
    public static styles: CSSResultGroup = [
      (baseClass as unknown as { styles: CSSResultGroup }).styles ?? [],
      boxSizingStyles,
      unsafeCSS(style),
    ];
    /**
     * Size variant, either l, m or s.
     * @default 'm' / 's' (lean)
     */
    @property({ reflect: true }) public accessor size: SbbButtonSize = isLean() ? 's' : 'm';

    /**
     * Whether the button indicates a loading state.
     * The animation kicks in after a delay of 300ms, configurable with --sbb-button-loading-delay CSS variable.
     */
    @forceType()
    @property({ reflect: true, type: Boolean })
    public accessor loading: boolean = false;

    protected constructor(...args: unknown[]) {
      super(...args);
      this.internals.states.add('sbb-button');
    }

    protected override willUpdate(changedProperties: PropertyValues<this>): void {
      super.willUpdate(changedProperties);

      if (changedProperties.has('loading')) {
        if (this.loading) {
          this.internals.ariaBusy = 'true';
          this.internals.ariaDisabled = 'true';
          // For performance reasons, we only set the width if the button is loading and don't track width changes during active loading state.
          const offsetWidth = this.offsetWidth;
          this.style?.setProperty('--sbb-button-width', `${offsetWidth || 136}px`);
        } else {
          this.internals.ariaBusy = null;
          this.style?.removeProperty('--sbb-button-width');
          if (!this.maybeDisabledInteractive) {
            this.internals.ariaDisabled = null;
          }
        }
      }
    }

    protected override renderTemplate(): TemplateResult {
      return html`
        ${super.renderIconSlot()}
        <span class="sbb-button__label">
          <slot></slot>
        </span>
        ${this.loading && !this.maybeDisabled
          ? html`<div class="sbb-button-loading-border"></div>`
          : nothing}
      `;
    }
  }
  return SbbButtonCommonElementClass as unknown as AbstractConstructor<SbbButtonCommonElementMixinType> &
    T;
};
