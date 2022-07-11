import { Component, h, JSX, Prop } from '@stencil/core';
import { InterfacePanelAttributes } from './sbb-panel.custom';

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
  /** The prop for deciding if the panel should contain a link or not */
  @Prop() public hasCallToActionLink? = false;

  @Element() private _element: HTMLElement;

  /**
   * will change the props for the sbb-link
   */
  private _linkMutationObserver = new MutationObserver((mutations) => {
    mutations?.forEach((mutation) => {
      const element = mutation.target as HTMLElement;

      if (element.nodeName !== 'SBB-LINK') return;

      element['visualLinkOnly'] = this.hasCallToActionLink;

      if (element.getAttribute('icon') !== 'chevron-small-right-small') {
        element.setAttribute('icon', 'chevron-small-right-small');
      }

      if (element.getAttribute('icon-placement') !== 'end') {
        element.setAttribute('icon-placement', 'end');
      }

      if (element.getAttribute('text-size') !== 'm') {
        element.setAttribute('text-size', 'm');
      }

      if (element.getAttribute('variant') !== 'block-negative') {
        element.setAttribute('variant', 'block-negative');
      }
    });
  });

  public connectedCallback(): void {
    this._element.querySelectorAll('sbb-link')?.forEach((element) => {
      this._linkMutationObserver.observe(element, {
        attributes: true,
      });
    });
  }

  public render(): JSX.Element {
    return (
      <div class="panel">
        <div class="panel__text">
          <slot name="text" />
        </div>
        <div class="panel__link">
          <slot name="link" />
        </div>
      </div>
    );
  }
}
