import {
  Component,
  h,
  Prop
} from '@stencil/core';

import { InterfaceImageAttributes } from './lyne-image.custom.d';
// import { LyneDesignTokens } from '../../../node_modules/lyne-design-tokens/dist/js/tokens.commonjs.js';

// console.log(LyneDesignTokens);

const eventListenerOptions = {
  once: true,
  passive: true
};

@Component({
  shadow: true,
  styleUrl: 'lyne-image.scss',
  tag: 'lyne-image'
})

export class LyneImage {

  private _figureElement!: HTMLElement;
  private _imageElement!: HTMLElement;

  @Prop() public alt?: string;

  @Prop() public aspectRatio: InterfaceImageAttributes['aspectRatio'] = '16/9';

  @Prop() public blurHash: InterfaceImageAttributes['blurHash'] = true;

  @Prop() public caption?: string;

  @Prop() public hideFromScreenreader: InterfaceImageAttributes['hideFromScreenreader'] = false;

  @Prop() public imageFormat: InterfaceImageAttributes['imageFormat'] = 'auto';

  @Prop() public imageSrc!: string;

  @Prop() public loading: InterfaceImageAttributes['loading'] = 'eager';

  @Prop() public performanceMark?: string;

  @Prop() public width?: '100%';

  private _addLoadedClass(): void {
    this._figureElement.classList.add('lyne-image__figure--loaded');
  }

  private _logPerformanceMarks(): void {
    if (window.performance.mark && this.performanceMark) {
      performance.clearMarks(this.performanceMark);
      performance.mark(this.performanceMark);
    }
  }

  public render(): JSX.Element {

    const attributes: InterfaceImageAttributes = {};

    const aspectRatio = this.aspectRatio.replace(/\//, 'x')
    const figureClass = `lyne-image__figure lyne-image__figure--${aspectRatio}`;

    if (this.hideFromScreenreader) {
      attributes.ariaHidden = 'true';
      attributes.role = 'presentation';
    }

    if (this.loading === 'lazy') {
      attributes.decoding = 'async';
    }

    const imageBlurHashUrl = `${this.imageSrc}?blur=100&w=100`;
    const imageUrl = `${this.imageSrc}?auto=compress,enhance&w=${this.width}&fm=${this.imageFormat}`;

    return (

      <figure
        class={figureClass}
        {...attributes}
        ref={(el): void => {
          this._figureElement = el;
        }}
      >
        {
        this.blurHash
          ? (
            <img
              alt=""
              class='lyne-image__blur-hash'
              src={imageBlurHashUrl}
              width={this.width}
              loading={this.loading}
            />
          )
          : ''
        }
        <img
          alt={this.alt}
          class="lyne-image__img"
          src={imageUrl}
          width={this.width}
          loading={this.loading}
          ref={(el): void => {
            this._imageElement = el;
          }}
        />
      </figure>

    )
  }

  public componentDidRender() {

      this._imageElement.addEventListener('load', () => {

        this._logPerformanceMarks();
        this._addLoadedClass();

      }, eventListenerOptions)

  }

}

