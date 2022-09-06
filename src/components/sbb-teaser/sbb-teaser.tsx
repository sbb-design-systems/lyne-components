import { Component, h, JSX, Prop, Watch } from '@stencil/core';
import { InterfaceTeaserAttributes } from './sbb-teaser.custom';
import { AccessibilityProperties } from '../../global/interfaces/accessibility-properties';

/**
 * @slot image - Slot used to render the image
 * @slot title - Slot used to render the title
 * @slot description - Slot used to render the description
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-teaser.scss',
  tag: 'sbb-teaser',
})

/**
 * Generalized Teaser - for displaying an image, title and paragraph
 */
export class SbbTeaser implements AccessibilityProperties {
  /**
   * The text which gets exposed to screen reader users. The text should
   * reflect all the information
   *
   * Example text: Connection from X to Y, via Z, on date X.
   * Ticket price starts at X.
   */
  @Prop() public accessibilityLabel!: string | undefined;

  /** This will be forwarded as aria-describedby to the relevant nested element. */
  @Prop() public accessibilityDescribedby: string | undefined;

  /** This will be forwarded as aria-labelledby to the relevant nested element. */
  @Prop() public accessibilityLabelledby: string | undefined;

  /**
   * Check if accessibilityLabel is provided since it is a required prop,
   * otherwise throw an error.
   */
  @Watch('accessibilityLabel')
  private _validateAccessibilityLabel(newValue: string): void {
    const isBlank = typeof newValue !== 'string' || newValue === '';
    if (isBlank) {
      throw new Error('accessibilityLabel: required');
    }
  }

  /**
   * component attributes
   * ----------------------------------------------------------------
   */

  /** The href value you want to link to */
  @Prop() public href!: string;

  /**
   * Teaser variant -
   * when this is true the text-content will be under the image
   * otherwise it will be displayed next to the image.
   */
  @Prop() public isStacked: boolean;

  /**
   * Heading level of the sbb-title element (e.g. h1-h6)
   */
  @Prop() public titleLevel: InterfaceTeaserAttributes['titleLevel'] = '5';

  public componentWillLoad(): void {
    // Validate props
    this._validateAccessibilityLabel(this.accessibilityLabel);
  }

  public render(): JSX.Element {
    return (
      <a
        aria-label={this.accessibilityLabel}
        aria-describedby={this.accessibilityDescribedby}
        aria-labelledby={this.accessibilityLabelledby}
        class={{ teaser: true, ['teaser--is-stacked']: this.isStacked }}
        href={this.href}
      >
        <span class="teaser__container">
          <span class="teaser__image-wrapper">
            <slot name="image" />
          </span>
          <span class="teaser__text">
            <sbb-title level={this.titleLevel} visualLevel="5" class="teaser__lead">
              <slot name="title" />
            </sbb-title>
            <span class="teaser__description">
              <slot name="description" />
            </span>
          </span>
        </span>
      </a>
    );
  }
}
