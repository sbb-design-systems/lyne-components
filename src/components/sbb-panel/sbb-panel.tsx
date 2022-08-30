import { Component, h, JSX, Prop, Element } from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'sbb-panel.scss',
  tag: 'sbb-panel',
})

/**
 * @slot text - to render the text
 * @slot link- to render the link
 */
export class SbbPanel {
  @Element() private _element: HTMLElement;

  /**
   * Link for the hero teaser.
   */
  @Prop() public text?: string;

  /**
   * Link for the hero teaser.
   */
  @Prop() public linkText?: string;

  /**
   * href for the hero teaser.
   */
  @Prop() public href?: string;

  private _hasLinkSlot: boolean;

  public componentWillLoad(): void {
    // Check link slots
    this._hasLinkSlot = Boolean(this._element.querySelector('[slot="link"]'));
  }

  public render(): JSX.Element {
    return (
      <div class="panel">
        <div class="panel__text">
          <slot name="text">{this.text}</slot>
        </div>
        {(this.linkText || this._hasLinkSlot) && (
          <div class="panel__link">
            <slot name="link">
              <sbb-link
                icon-name="chevron-small-right-small"
                icon-placement="end"
                text-size="m"
                negative
                href={this.href}
              >
                {this.linkText}
              </sbb-link>
            </slot>
          </div>
        )}
      </div>
    );
  }
}
