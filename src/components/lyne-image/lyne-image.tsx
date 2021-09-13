import * as LyneDesignTokens from '../../../node_modules/lyne-design-tokens/dist/js/tokens.es6.js';

import {
  Component,
  h,
  Prop
} from '@stencil/core';

import { InterfaceImageAttributes } from './lyne-image.custom.d';

console.log(LyneDesignTokens);

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
   * the value of the alt attribute blank, but the attribute itself
   * still needs to be present. In that way we can signal assistive
   * technologies, that they can skip the image.
   */
  @Prop() public alt?: string;

  /**
   * If set to true, we show a blurred version of the image as
   * placeholder before the actual image loads. This should help
   * to improve the perceived loading performance.
   */
  @Prop() public lqip: InterfaceImageAttributes['lqip'] = true;

  /**
   * A caption can provide additional context to the image (e.g.
   * name of the photographer, copyright information and the like).
   */
  @Prop() public caption?: string;

  /**
   * Set to true, if you want to pass a custom focal point for the
   * image. See full documentation here:
   * https://docs.imgix.com/apis/rendering/focalpoint-crop
   */
  @Prop() public customFocalPoint: InterfaceImageAttributes['customFocalPoint'] = false;

  /**
   * If the lazy property is set to true, the module will automatically
   * change the decoding to async, otherwise the decoding is set to auto
   * which leaves the handling up to the browser. Read more about the
   * decoding attribute here:
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding
   */
  @Prop() public decoding: InterfaceImageAttributes['decoding'] = 'auto';

  /**
   * Set to true, to receive visual guideance where the custom focal
   * point is currently set.
   */
  @Prop() public focalPointDebug: InterfaceImageAttributes['focalPointDebug'] = false;

  /**
   * Pass in a floating number between 0 (left) and 1 (right).
   */
  @Prop() public focalPointX: InterfaceImageAttributes['focalPointX'] = 1;

  /**
   * Pass in a floating number between 0 (top) and 1 (bottom).
   */
  @Prop() public focalPointY: InterfaceImageAttributes['focalPointY'] = 1;

  /**
   * In cases when the image is just serving a decorative purpose,
   * we can hide it from assisitive technologies (e.g. an image
   * in a teaser card)
   */
  @Prop() public hideFromScreenreader: InterfaceImageAttributes['hideFromScreenreader'] = false;

  @Prop() public imageSrc?: string;

  @Prop() public imageSrcExamples!: string;

  /**
   * With the support of native image lazy loading, we can now
   * decide whether we want to load the image immediately or only
   * once it is close to the visible viewport. The value eager is
   * best used for images within the initial viewport. We want to
   * load these images as fast as possible to improve the Core Web
   * Vitals values. lazy works best for those images which are
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
   * increases or decreases. Best to use lowercase strings here,
   * separate words with underscores or dashes.
   */
  @Prop() public performanceMark?: string;

  @Prop() public pictureSizesConfig?: object;

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

    const figureClass = 'lyne-image__figure lyne-image__figure--16x9';

    if (!this.imageSrc) {
      this.imageSrc = this.imageSrcExamples;
    }

    const qualitySettings = {
      nonRetina: '45',
      nonRetinaDataSaver: '30',
      retina: '20',
      retinaDataSaver: '10'
    };

    const retinaQuality = qualitySettings.retina;
    const nonRetinaQuality = qualitySettings.nonRetina;

    const imageParameters = {
      autoImprove: 'auto=format,compress,cs=tinysrgb',
      avif: '&fm=avif&auto',
      crop: `&fit=crop&crop=focalpoint&fp-x=${this.focalPointX}&fp-y=${this.focalPointY}&fp-z=1`,
      focalPointDebug: '&fp-debug=true'
    };

    let imageUrlLQIP = `${this.imageSrc}?blur=100&w=100&h=56`;
    let imageUrlWithParams = `${this.imageSrc}?${imageParameters.autoImprove}`;
    let imageUrlWithParamsAVIF = `${this.imageSrc}?${imageParameters.avif}`;

    if (this.customFocalPoint) {
      imageUrlWithParams = `${imageUrlWithParams}${imageParameters.crop}`;
      imageUrlWithParamsAVIF = `${imageUrlWithParamsAVIF}${imageParameters.crop}`;
      imageUrlLQIP = `${imageUrlLQIP}${imageParameters.crop}`;
    }

    if (this.focalPointDebug) {
      imageUrlWithParams = `${imageUrlWithParams}${imageParameters.focalPointDebug}`;
      imageUrlWithParamsAVIF = `${imageUrlWithParamsAVIF}${imageParameters.focalPointDebug}`;
    }

    if (this.hideFromScreenreader) {
      attributes.ariaHidden = 'true';
      attributes.role = 'presentation';
    }

    if (this.loading === 'lazy') {
      this.decoding = 'async';
    }

    if (this.pictureSizesConfig === undefined) {
      this.pictureSizesConfig = {
        breakpoints: [
          {
            mediaQuery: {
              condition: 'max-width',
              conditionValue: LyneDesignTokens.BreakpointMicroMax
            },
            imageDisplayWidth: '320',
            aspectRatio: '16/9'
          }
        ]
      }
    }

    console.log(this.pictureSizesConfig);

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
            this.lqip
              ? (
                <img
                  alt=''
                  class='lyne-image__blur-hash'
                  src={imageUrlLQIP}
                  width='1000'
                  height='562'
                  loading={this.loading}
                  decoding={this.decoding}
                />
              )
              : ''
          }
          <picture>
            <source
              media='(max-width:642px)'
              sizes='320px'
              srcSet={
                `${imageUrlWithParamsAVIF}&w=320&h=180 320w, ` +
                `${imageUrlWithParamsAVIF}&w=640&h=360 640w`
              }
              type='image/avif'
            />
            <source
              media='(max-width:642px)'
              sizes='320px'
              srcSet={
                `${imageUrlWithParams}&w=320&h=180&q=${nonRetinaQuality}320w, ` +
                `${imageUrlWithParams}&w=640&h=360&q=${retinaQuality} 640w`
              }
            />
            <source
              media='(max-width:1024px)'
              sizes='976px'
              srcSet={
                `${imageUrlWithParamsAVIF}&w=976&h=549 976w, ` +
                `${imageUrlWithParamsAVIF}&w=1952&h=1098 1952w`
              }
              type='image/avif'
            />
            <source
              media='(max-width:1024px)'
              sizes='976px'
              srcSet={
                `${imageUrlWithParams}&w=976&h=549&q=${nonRetinaQuality} 976w, ` +
                `${imageUrlWithParams}&w=1952&h=1098q=${retinaQuality} 1952w`
              }
            />
            <source
              media='(min-width:1025px)'
              sizes='1000px'
              srcSet={
                `${imageUrlWithParamsAVIF}&w=1000&h=562 1000w, ` +
                `${imageUrlWithParamsAVIF}&w=2000&h=1124 2000w`
              }
              type='image/avif'
            />
            <source
              media='(min-width:1025px)'
              sizes='1000px'
              srcSet={
                `${imageUrlWithParams}&w=1000&h=562&q=${nonRetinaQuality} 1000w, ` +
                `${imageUrlWithParams}&w=2000&h=1124&q=${retinaQuality} 2000w`
              }
            />
            <img
              alt={this.alt}
              class='lyne-image__img'
              src={this.imageSrc}
              width='1000'
              height='562'
              loading={this.loading}
              decoding={this.decoding}
              ref={(el): void => {
                this._imageElement = el;
              }}
            />
          </picture>
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
