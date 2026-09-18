import { type CSSResultGroup, type PropertyValues, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  type AbstractConstructor,
  forceType,
  type SbbActionBaseElement,
  SbbNegativeMixin,
} from '../../core.ts';
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

export declare class SbbButtonCommonElementMixinType extends SbbNegativeMixin(
  SbbIconNameMixin(SbbActionBaseElement),
) {
  public accessor size: 's' | 'm' | 'l' | null;
  public accessor loading: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbButtonCommonElementMixin = <T extends AbstractConstructor<SbbActionBaseElement>>(
  superClass: T,
): AbstractConstructor<SbbButtonCommonElementMixinType> & T => {
  abstract class SbbButtonCommonElementClass
    extends SbbNegativeMixin(SbbIconNameMixin(superClass))
    implements Partial<SbbButtonCommonElementMixinType>
  {
    public static styles: CSSResultGroup = [unsafeCSS(style)];
    /**
     * Size variant, either s (lean theme default), m (standard theme default) or l.
     */
    @property({ reflect: true }) public accessor size: SbbButtonCommonElementMixinType['size'] =
      null;

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
        } else {
          this.internals.ariaBusy = null;
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
      `;
    }
  }
  return SbbButtonCommonElementClass as unknown as AbstractConstructor<SbbButtonCommonElementMixinType> &
    T;
};
