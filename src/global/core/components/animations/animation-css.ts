import { InterfaceAnimationInternal } from './animation-interface';
import {
  animationEnd,
  createKeyframeStylesheet,
  generateKeyframeName,
  generateKeyframeRules,
  processKeyframes,
  removeStyleProperties,
  setStyleProperty
} from './animation-utils';
import { raf } from '../../../helpers/request-animation-frame';
import { AbstractAnimation } from './animation-abstract';

export class AnimationCss extends AbstractAnimation {

  private _keyframeName: string | undefined;

  public setAnimationStep(step: number): void {
    const safeStep = Math.min(Math.max(step, 0), 0.9999);

    const animationDuration = `-${this.getDuration() * safeStep}ms`;

    for (const element of this.elements) {
      if (this.animationKeyframes.length > 0) {
        setStyleProperty(element, 'animation-delay', animationDuration);
        setStyleProperty(element, 'animation-play-state', 'paused');
      }
    }
  }

  public duration(animationDuration: number): InterfaceAnimationInternal {

    /**
     * CSS Animation Durations of 0ms work fine on Chrome
     * but do not run on Safari, so force it to 1ms to
     * get it to run on both platforms.
     */
    if (animationDuration === 0) {
      // eslint-disable-next-line no-param-reassign
      animationDuration = 1;
    }

    this.animationDuration = animationDuration;

    this.update(true, true);

    return this;
  }

  protected initializeAnimation(toggleAnimationName = true): void {
    this.beforeAnimation();

    if (this.animationKeyframes.length > 0) {
      this._initializeCSSAnimation(toggleAnimationName);
    }

    this.initialized = true;
  }

  protected playInternal(): void {
    this._playCSSAnimations();
  }

  protected pauseAnimation(): void {
    if (this.initialized) {
      this.elements.forEach((element) => {
        setStyleProperty(element, 'animation-play-state', 'paused');
      });
    }
  }

  protected progressEndInternal(playTo: 0 | 1, step: number): void {
    if (playTo === 0) {
      this.forceDirectionValue = (this.getDirection() === 'reverse')
        ? 'normal'
        : 'reverse';
      if (this.forceDirectionValue === 'reverse') {
        this.willComplete = false;
      }
      this.forceDelayValue = ((1 - step) * this.getDuration()) * -1;
      this.update(false, false);
    } else if (playTo === 1) {
      this.forceDelayValue = (step * this.getDuration()) * -1;
      this.update(false, false);
    }
  }

  protected updateKeyframes(): void {
    this._initializeCSSAnimation();
  }

  /**
   * Cancels any Web Animations and removes
   * any animation properties from
   * the animation's elements.
   */
  protected cleanUpElements(): void {
    const elementsArray = this.elements.slice();

    raf(() => {
      const propertiesToRemove: string[] = [
        'animation-name',
        'animation-duration',
        'animation-timing-function',
        'animation-iteration-count',
        'animation-delay',
        'animation-play-state',
        'animation-fill-mode',
        'animation-direction'
      ];

      elementsArray.forEach((element: HTMLElement) => removeStyleProperties(element, propertiesToRemove));
    });
  }

  protected resetAnimation(): void {
    this.updateAnimationInternal();
  }

  protected updateAnimationInternal(step?: number, toggleAnimationName = true): void {
    raf(() => {
      for (const element of this.elements) {
        setStyleProperty(element, 'animation-name', this._keyframeName || null);
        setStyleProperty(element, 'animation-duration', `${this.getDuration()}ms`);
        setStyleProperty(element, 'animation-timing-function', this.getEasing());
        setStyleProperty(element, 'animation-delay', (step === undefined || step === null)
          ? `${this.getDelay()}ms`
          : `-${step * this.getDuration()}ms`);
        setStyleProperty(element, 'animation-fill-mode', this.getFill() || null);
        setStyleProperty(element, 'animation-direction', this.getDirection() || null);

        const iterationsCount = (this.getIterations() === Infinity)
          ? 'infinite'
          : this.getIterations()
            .toString();

        setStyleProperty(element, 'animation-iteration-count', iterationsCount);

        if (toggleAnimationName) {
          setStyleProperty(element, 'animation-name', `${this._keyframeName}-alt`);
        }

        raf(() => {
          setStyleProperty(element, 'animation-name', this._keyframeName || null);
        });
      }
    });
  }

  private _initializeCSSAnimation(toggleAnimationName = true): void {
    this.cleanUpStyleSheets();

    const processedKeyframes = processKeyframes(this.animationKeyframes);

    for (const element of this.elements) {
      if (processedKeyframes.length > 0) {
        const keyframeRules = generateKeyframeRules(processedKeyframes);

        this._keyframeName = (this.id === undefined)
          ? generateKeyframeName(keyframeRules)
          : this.id;
        const stylesheet = createKeyframeStylesheet(this._keyframeName, keyframeRules, element);

        this.stylesheets.push(stylesheet);

        setStyleProperty(element, 'animation-duration', `${this.getDuration()}ms`);
        setStyleProperty(element, 'animation-timing-function', this.getEasing());
        setStyleProperty(element, 'animation-delay', `${this.getDelay()}ms`);
        setStyleProperty(element, 'animation-fill-mode', this.getFill());
        setStyleProperty(element, 'animation-direction', this.getDirection());

        const iterationsCount = (this.getIterations() === Infinity)
          ? 'infinite'
          : this.getIterations()
            .toString();

        setStyleProperty(element, 'animation-iteration-count', iterationsCount);
        setStyleProperty(element, 'animation-play-state', 'paused');

        if (toggleAnimationName) {
          setStyleProperty(element, 'animation-name', `${stylesheet.id}-alt`);
        }

        raf(() => {
          setStyleProperty(element, 'animation-name', stylesheet.id || null);
        });
      }
    }
  }

  private _playCSSAnimations(): void {
    this.clearCSSAnimationsTimeout();

    raf(() => {
      this.elements.forEach((element) => {
        if (this.animationKeyframes.length > 0) {
          setStyleProperty(element, 'animation-play-state', 'running');
        }
      });
    });

    if (this.animationKeyframes.length === 0 || this.elements.length === 0) {
      this.animationFinish();
    } else {

      /**
       * This is a catchall in the event that a CSS Animation did not finish.
       * The Web Animations API has mechanisms in place for preventing this.
       * CSS Animations will not fire an `animationend` event
       * for elements with `display: none`. The Web Animations API
       * accounts for this, but using raw CSS Animations requires
       * this workaround.
       */
      const animationDelay = this.getDelay() || 0;
      const animationDuration = this.getDuration() || 0;
      const animationIterations = this.getIterations() || 1;

      // No need to set a timeout when animation has infinite iterations
      if (isFinite(animationIterations)) {
        this.cssAnimationsTimerFallback = setTimeout(this._onAnimationEndFallback, animationDelay + (animationDuration * animationIterations) + AbstractAnimation._ANIMATION_END_FALLBACK_PADDING_MS);
      }

      animationEnd(this.elements[0], () => {
        this.clearCSSAnimationsTimeout();

        /**
         * Ensure that clean up
         * is always done a frame
         * before the onFinish handlers
         * are fired. Otherwise, there
         * may be flickering if a new
         * animation is started on the same
         * element too quickly
         *
         * TODO: Is there a cleaner way to do this?
         */
        raf(() => {
          this._clearCSSAnimationPlayState();
          raf(this.animationFinish);
        });
      });
    }
  }

  private _onAnimationEndFallback(): void {
    this.cssAnimationsTimerFallback = undefined;
    this.animationFinish();
  }

  private _clearCSSAnimationPlayState(): void {
    const propertiesToRemove: string[] = [
      'animation-duration',
      'animation-delay',
      'animation-play-state'
    ];

    this.elements.forEach((element: HTMLElement) => removeStyleProperties(element, propertiesToRemove));
  }

}
