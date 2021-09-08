import {
  Component,
  h,
  Prop
} from '@stencil/core';

import { InterfaceImageAttributes } from './lyne-image.custom.d';

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

  /**
   * An alt text is not always necessary (e.g. in teaser cards when
   * additional link text is provided). In this case we can leave
   * it blank, but the attribute still needs to be present. In that
   * way we can signal assistive technologies that they can leave
   * the image out.
   */
  @Prop() public alt?: string;

  /**
   * If set to true, we show a blurred version of the image as
   * placeholder before the actual image loads. This should help
   * to improve the perceived loading performance.
   */
  @Prop() public blurHash: InterfaceImageAttributes['blurHash'] = true;

  /**
   * A caption can provide additional context to the image (e.g.
   * name of the photographer, copyright information and the like).
   */
  @Prop() public caption?: string;

  @Prop() public decoding: InterfaceImageAttributes['decoding'] = 'auto';

  /**
   * In cases when the image is just serving a decorative purpose,
   * we can hide it from assisitive technologies (e.g. an image
   * in a teaser card)
   */
  @Prop() public hideFromScreenreader: InterfaceImageAttributes['hideFromScreenreader'] = false;

  @Prop() public imageFormat: InterfaceImageAttributes['imageFormat'] = 'auto';

  @Prop() public imageSrc!: string;

  /**
   * With the support of native image lazy loading, we can now
   * decide whether we want to load the image immediately or only
   * once it is close to the visible viewport. The value eager is
   * best used for images within the initial viewport. We want to
   * load these images as fast as possible to improve the Core Web
   * Vitals values. Lazy works best for those images which are
   * further down the page or invisible during the loading of the
   * initial viewport.
   */
  @Prop() public loading: InterfaceImageAttributes['loading'] = 'eager';

  /**
   * With performance.mark you can log a timestamp associated with
   * the name you define in performanceMark when a certain event is
   * happening. In our case we will log the performance.mark into
   * the PerformanceEntry API once the image is fully loaded.
   * Performance monitoring tools like SpeedCurve or Lighthouse are
   * then able to grab these entries from the PerformanceEntry API
   * and give us additional information and insights about our page
   * loading behaviour. We are then also able to montior these
   * values over a long time period to see if our performance
   * increases or decreases.
   */
  @Prop() public performanceMark?: string;

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

    // const aspectRatio = this.aspectRatio.replace(/\//u, 'x');
    // const figureClass = `lyne-image__figure lyne-image__figure--${aspectRatio}`;
    const figureClass = `lyne-image__figure lyne-image__figure--1x1`;

    if (this.hideFromScreenreader) {
      attributes.ariaHidden = 'true';
      attributes.role = 'presentation';
    }

    if (this.loading === 'lazy') {
      this.decoding = 'async';
    }

    const imageBlurHashUrl = `${this.imageSrc}?blur=100&w=100`;
    const imageUrl = `${this.imageSrc}?auto=compress,enhance&w=300`;

    return (

      <figure
        class={figureClass}
        {...attributes}
        ref={(el): void => {
          this._figureElement = el;
        }}
      >
        <div class='lyne-image__wrapper'>
          {
            this.blurHash
              ? (
                <img
                  alt=''
                  class='lyne-image__blur-hash'
                  src={imageBlurHashUrl}
                  width="300"
                  loading={this.loading}
                  decoding={this.decoding}
                />
              )
              : ''
          }
          <img
            alt={this.alt}
            class='lyne-image__img'
            src={imageUrl}
            width="300"
            loading={this.loading}
            decoding={this.decoding}
            ref={(el): void => {
              this._imageElement = el;
            }}
          />
        </div>
        {
          this.caption
            ? (
              <figcaption class='lyne-image__caption' innerHTML={this.caption}></figcaption>
            )
            : ''
        }
      </figure>
    );
  }

  public componentDidRender(): void {
    this._imageElement.addEventListener('load', () => {
      this._logPerformanceMarks();
      this._addLoadedClass();
    }, eventListenerOptions);
  }

}
