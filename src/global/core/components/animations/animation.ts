import {
  AnimationDirection,
  AnimationFill,
  AnimationKeyFrames,
  AnimationLifecycle,
  InterfaceAnimation,
  InterfaceAnimationCallbackOptions,
  InterfaceAnimationKeyFrame,
  InterfaceAnimationKeyFrameEdge,
  InterfaceAnimationPlayOptions
} from './animation-interface';
import {
  addClassToArray,
  animationEnd,
  createKeyframeStylesheet,
  generateKeyframeName,
  generateKeyframeRules,
  processKeyframes,
  removeStyleProperties,
  setStyleProperty
} from './animation-utils';
import { raf } from '../../../helpers/request-animation-frame';

interface InterfaceAnimationOnFinishCallback {
  c: AnimationLifecycle;
  o?: InterfaceAnimationCallbackOptions;
}

interface InterfaceAnimationInternal extends InterfaceAnimation {

  /**
   * Sets the parent animation.
   */
  parent(animation: InterfaceAnimation): InterfaceAnimation;

  /**
   * Updates any existing animations.
   */
  update(deep: boolean, toggleAnimationName: boolean, step?: number): InterfaceAnimation;

  animationFinish(): void;
}

export class Animation implements InterfaceAnimationInternal {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private static readonly ANIMATION_END_FALLBACK_PADDING_MS = 100;

  public constructor(animationId?: string) {
    this.id = animationId;
  }

  public parentAnimation: InterfaceAnimationInternal | undefined;
  public id: string | undefined;
  public elements: HTMLElement[] = [];
  public childAnimations: InterfaceAnimationInternal[] = [];

  private _delay: number | undefined;
  private _duration: number | undefined;
  private _easing: string | undefined;
  private _iterations: number | undefined;
  private _fill: AnimationFill | undefined;
  private _direction: AnimationDirection | undefined;
  private _keyframes: AnimationKeyFrames = [];
  private _beforeAddReadFunctions: any[] = [];
  private _beforeAddWriteFunctions: any[] = [];
  private _afterAddReadFunctions: any[] = [];
  private _afterAddWriteFunctions: any[] = [];
  private _beforeAddClasses: string[] = [];
  private _beforeRemoveClasses: string[] = [];
  private _initialized = false;
  private _beforeStylesValue: { [property: string]: any } = {};
  private _afterAddClasses: string[] = [];
  private _afterRemoveClasses: string[] = [];
  private _afterStylesValue: { [property: string]: any } = {};
  private _numAnimationsRunning = 0;
  private _shouldForceLinearEasing = false;
  private _shouldForceSyncPlayback = false;
  private _cssAnimationsTimerFallback: any;
  private _forceDirectionValue: AnimationDirection | undefined;
  private _forceDurationValue: number | undefined;
  private _forceDelayValue: number | undefined;
  private _willComplete = true;
  private _finished = false;
  private _shouldCalculateNumAnimations = true;
  private _keyframeName: string | undefined;
  private _onFinishCallbacks: InterfaceAnimationOnFinishCallback[] = [];
  private _onFinishOneTimeCallbacks: InterfaceAnimationOnFinishCallback[] = [];
  private _stylesheets: HTMLElement[] = [];
  private _webAnimations: any[] = [];
  private _supportsAnimationEffect = (typeof (AnimationEffect as any) === 'function' || typeof (window as any).AnimationEffect === 'function');
  private _supportsWebAnimations = (typeof (Element as any) === 'function') && (typeof (Element as any).prototype.animate === 'function') && this._supportsAnimationEffect;

  public getWebAnimations = (): any[] => this._webAnimations;

  public parent = (animation: InterfaceAnimationInternal): InterfaceAnimationInternal => {
    this.parentAnimation = animation;

    return this;
  };

  public addElement = (el: Element | Element[] | Node | Node[] | NodeList | undefined | null): InterfaceAnimationInternal => {
    if (el !== null && el !== undefined) {
      if ((el as Node).nodeType === 1) {
        this.elements.push(el as any);
      } else if ((el as NodeList).length >= 0) {
        this.elements.push(...Array.from(el as NodeList) as any);
      } else {
        console.error('Invalid addElement value');
      }
    }

    return this;
  };

  public addAnimation = (animationToAdd: InterfaceAnimationInternal | InterfaceAnimationInternal[]): InterfaceAnimationInternal => {
    if (animationToAdd !== null && animationToAdd !== undefined) {
      if (Array.isArray(animationToAdd)) {
        for (const animation of animationToAdd) {
          animation.parent(this);
          this.childAnimations.push(animation);
        }
      } else {
        animationToAdd.parent(this);
        this.childAnimations.push(animationToAdd);
      }
    }

    return this;
  };

  public beforeAddClass = (className: string | string[] | undefined): InterfaceAnimationInternal => {
    this._beforeAddClasses = addClassToArray(this._beforeAddClasses, className);

    return this;
  };

  public afterAddClass = (className: string | string[] | undefined): InterfaceAnimationInternal => {
    this._afterAddClasses = addClassToArray(this._afterAddClasses, className);

    return this;
  };

  public beforeRemoveClass = (className: string | string[] | undefined): InterfaceAnimationInternal => {
    this._beforeRemoveClasses = addClassToArray(this._beforeRemoveClasses, className);

    return this;
  };

  public afterRemoveClass = (className: string | string[] | undefined): InterfaceAnimationInternal => {
    this._afterRemoveClasses = addClassToArray(this._afterRemoveClasses, className);

    return this;
  };

  /**
   * Set CSS inline styles to the animation's
   * elements before the animation begins.
   */
  public beforeStyles = (styles: { [property: string]: any } = {}): InterfaceAnimationInternal => {
    this._beforeStylesValue = styles;

    return this;
  };

  public afterStyles = (styles: { [property: string]: any } = {}): InterfaceAnimationInternal => {
    this._afterStylesValue = styles;

    return this;
  };

  /**
   * Clear CSS inline styles from the animation's
   * elements before the animation begins.
   */
  public beforeClearStyles = (propertyNames: string[] = []): InterfaceAnimationInternal => {
    for (const property of propertyNames) {
      this._beforeStylesValue[property] = '';
    }

    return this;
  };

  public afterClearStyles = (propertyNames: string[] = []): InterfaceAnimationInternal => {
    for (const property of propertyNames) {
      this._afterStylesValue[property] = '';
    }

    return this;
  };

  public beforeAddRead = (readFn: () => void): InterfaceAnimationInternal => {
    this._beforeAddReadFunctions.push(readFn);

    return this;
  };

  public afterAddRead = (readFn: () => void): InterfaceAnimationInternal => {
    this._afterAddReadFunctions.push(readFn);

    return this;
  };

  public beforeAddWrite = (writeFn: () => void): InterfaceAnimationInternal => {
    this._beforeAddWriteFunctions.push(writeFn);

    return this;
  };

  public afterAddWrite = (writeFn: () => void): InterfaceAnimationInternal => {
    this._afterAddWriteFunctions.push(writeFn);

    return this;
  };

  public play = (opts?: InterfaceAnimationPlayOptions): Promise<void> => new Promise<void>((resolve) => {
    if (opts && opts.sync) {
      this._shouldForceSyncPlayback = true;

      // eslint-disable-next-line no-return-assign
      this.onFinish(() => this._shouldForceSyncPlayback = false, {
        oneTimeCallback: true
      });
    }
    if (!this._initialized) {
      this._initializeAnimation();
    }

    if (this._finished) {
      this._resetAnimation();
      this._finished = false;
    }

    if (this._shouldCalculateNumAnimations) {
      this._numAnimationsRunning = this.childAnimations.length + 1;
      this._shouldCalculateNumAnimations = false;
    }

    this.onFinish(() => resolve(), {
      oneTimeCallback: true
    });

    this.childAnimations.forEach((animation) => {
      animation.play();
    });

    if (this._supportsWebAnimations) {
      this._playWebAnimations();
    } else {
      this._playCSSAnimations();
    }
  });

  public pause = (): InterfaceAnimationInternal => {
    this.childAnimations.forEach((animation) => {
      animation.pause();
    });

    this._pauseAnimation();

    return this;
  };

  public stop = (): void => {
    this.childAnimations.forEach((animation) => {
      animation.stop();
    });

    if (this._initialized) {
      this._cleanUpElements();
      this._initialized = false;
    }

    this._resetFlags();
  };

  public update = (deep = false, toggleAnimationName = true, step?: number): InterfaceAnimationInternal => {
    if (deep) {
      this.childAnimations.forEach((animation) => {
        animation.update(deep, toggleAnimationName, step);
      });
    }

    if (this._supportsWebAnimations) {
      this._updateWebAnimation(step);
    } else {
      this._updateCSSAnimation(toggleAnimationName, step);
    }

    return this;
  };

  public destroy = (clearStyleSheets?: boolean): InterfaceAnimationInternal => {
    this.childAnimations.forEach((childAnimation) => {
      childAnimation.destroy(clearStyleSheets);
    });

    this._cleanUp(clearStyleSheets);

    this.elements.length = 0;
    this.childAnimations.length = 0;
    this._keyframes.length = 0;

    this._clearOnFinish();

    this._initialized = false;
    this._shouldCalculateNumAnimations = true;

    return this;
  };

  public animationFinish = (): void => {
    if (this._numAnimationsRunning === 0) {
      return;
    }

    this._numAnimationsRunning--;

    if (this._numAnimationsRunning === 0) {
      this._afterAnimation();
      if (this.parentAnimation) {
        this.parentAnimation.animationFinish();
      }
    }
  };

  public onFinish = (callback: AnimationLifecycle, opts?: InterfaceAnimationCallbackOptions): InterfaceAnimationInternal => {
    const callbacks = (opts && opts.oneTimeCallback)
      ? this._onFinishOneTimeCallbacks
      : this._onFinishCallbacks;

    callbacks.push({
      c: callback,
      o: opts
    });

    return this;
  };

  public progressStart = (forceLinearEasing = false, step?: number): InterfaceAnimationInternal => {
    this.childAnimations.forEach((animation) => {
      animation.progressStart(forceLinearEasing, step);
    });

    this._pauseAnimation();
    this._shouldForceLinearEasing = forceLinearEasing;

    if (!this._initialized) {
      this._initializeAnimation();
    }
    this.update(false, true, step);

    return this;
  };

  public progressStep = (step: number): InterfaceAnimationInternal => {
    this.childAnimations.forEach((animation) => {
      animation.progressStep(step);
    });
    this._setAnimationStep(step);

    return this;
  };

  public progressEnd = (playTo: 0 | 1 | undefined, step: number, dur?: number): InterfaceAnimationInternal => {
    this._shouldForceLinearEasing = false;

    this.childAnimations.forEach((animation) => {
      animation.progressEnd(playTo, step, dur);
    });

    if (dur !== undefined) {
      this._forceDurationValue = dur;
    }

    this._finished = false;

    this._willComplete = true;

    if (playTo === 0) {
      this._forceDirectionValue = (this.getDirection() === 'reverse')
        ? 'normal'
        : 'reverse';

      if (this._forceDirectionValue === 'reverse') {
        this._willComplete = false;
      }

      if (this._supportsWebAnimations) {
        this.update();
        this._setAnimationStep(1 - step);
      } else {
        this._forceDelayValue = ((1 - step) * this.getDuration()) * -1;
        this.update(false, false);
      }
    } else if (playTo === 1) {
      if (this._supportsWebAnimations) {
        this.update();
        this._setAnimationStep(step);
      } else {
        this._forceDelayValue = (step * this.getDuration()) * -1;
        this.update(false, false);
      }
    }

    if (playTo !== undefined) {
      this.onFinish(() => {
        this._forceDurationValue = undefined;
        this._forceDirectionValue = undefined;
        this._forceDelayValue = undefined;
      }, {
        oneTimeCallback: true
      });

      if (!this.parentAnimation) {
        this.play();
      }
    }

    return this;
  };

  public getFill = (): AnimationFill => this._fill ?? this.parentAnimation?.getFill() ?? 'both';

  public getDirection = (): AnimationDirection => this._forceDirectionValue ?? this._direction ?? this.parentAnimation?.getDirection() ?? 'normal';

  public getEasing = (): string => (
    this._shouldForceLinearEasing
      ? 'linear'
      : this._easing ?? this.parentAnimation?.getEasing() ?? 'linear'
  );

  public getDuration = (): number => (
    this._shouldForceSyncPlayback
      ? 0
      : this._forceDurationValue ?? this._duration ?? this.parentAnimation?.getDuration() ?? 0
  );

  public getIterations = (): number => this._iterations ?? this.parentAnimation?.getIterations() ?? 1;

  public getDelay = (): number => this._forceDelayValue ?? this._delay ?? this.parentAnimation?.getDelay() ?? 0;

  public getKeyframes = (): AnimationKeyFrames => this._keyframes;

  public direction = (animationDirection: AnimationDirection): InterfaceAnimationInternal => {
    this._direction = animationDirection;

    this.update(true);

    return this;
  };

  public fill = (animationFill: AnimationFill): InterfaceAnimationInternal => {
    this._fill = animationFill;

    this.update(true);

    return this;
  };

  public delay = (animationDelay: number): InterfaceAnimationInternal => {
    this._delay = animationDelay;

    this.update(true);

    return this;
  };

  public easing = (animationEasing: string): InterfaceAnimationInternal => {
    this._easing = animationEasing;

    this.update(true);

    return this;
  };

  public duration = (animationDuration: number): InterfaceAnimationInternal => {

    /**
     * CSS Animation Durations of 0ms work fine on Chrome
     * but do not run on Safari, so force it to 1ms to
     * get it to run on both platforms.
     */
    if (!this._supportsWebAnimations && animationDuration === 0) {
      // eslint-disable-next-line no-param-reassign
      animationDuration = 1;
    }

    this._duration = animationDuration;

    this.update(true);

    return this;
  };

  public keyframes = (keyframeValues: AnimationKeyFrames): InterfaceAnimationInternal => {
    const different = this._keyframes !== keyframeValues;

    this._keyframes = keyframeValues;

    if (different) {
      this._updateKeyframes(this._keyframes);
    }

    return this;
  };

  public iterations = (animationIterations: number): InterfaceAnimationInternal => {
    this._iterations = animationIterations;

    this.update(true);

    return this;
  };

  public from = (property: string, value: any): InterfaceAnimationInternal => {
    const firstFrame = this._keyframes[0] as InterfaceAnimationKeyFrameEdge | undefined;

    if (firstFrame !== undefined && (firstFrame.offset === undefined || firstFrame.offset === 0)) {
      firstFrame[property] = value;
    } else {
      this._keyframes = [
        {
          offset: 0,
          [property]: value
        },
        ...this._keyframes
      ] as InterfaceAnimationKeyFrame[];
    }

    return this;
  };

  public to = (property: string, value: any): InterfaceAnimationInternal => {
    const lastFrame = this._keyframes[this._keyframes.length - 1] as InterfaceAnimationKeyFrameEdge | undefined;

    if (lastFrame !== undefined && (lastFrame.offset === undefined || lastFrame.offset === 1)) {
      lastFrame[property] = value;
    } else {
      this._keyframes = [
        ...this._keyframes,
        {
          offset: 1,
          [property]: value
        }
      ] as InterfaceAnimationKeyFrame[];
    }

    return this;
  };

  // eslint-disable-next-line arrow-body-style
  public fromTo = (property: string, fromValue: any, toValue: any): InterfaceAnimation => {
    return this
      .from(property, fromValue)
      .to(property, toValue);
  };

  private _initializeAnimation = (toggleAnimationName = true): void => {
    this._beforeAnimation();

    if (this._keyframes.length > 0) {
      if (this._supportsWebAnimations) {
        this._initializeWebAnimation();
      } else {
        this._initializeCSSAnimation(toggleAnimationName);
      }
    }

    this._initialized = true;
  };

  private _initializeWebAnimation = (): void => {
    this.elements.forEach((element) => {
      const animation = element.animate(this._keyframes, {
        delay: this.getDelay(),
        direction: this.getDirection(),
        duration: this.getDuration(),
        easing: this.getEasing(),
        fill: this.getFill(),
        id: this.id,
        iterations: this.getIterations()
      });

      animation.pause();

      this._webAnimations.push(animation);
    });

    if (this._webAnimations.length > 0) {
      this._webAnimations[0].onfinish = (): void => {
        this.animationFinish();
      };
    }

  };

  private _initializeCSSAnimation = (toggleAnimationName = true): void => {
    this._cleanUpStyleSheets();

    const processedKeyframes = processKeyframes(this._keyframes);

    for (const element of this.elements) {
      if (processedKeyframes.length > 0) {
        const keyframeRules = generateKeyframeRules(processedKeyframes);

        this._keyframeName = (this.id === undefined)
          ? generateKeyframeName(keyframeRules)
          : this.id;
        const stylesheet = createKeyframeStylesheet(this._keyframeName, keyframeRules, element);

        this._stylesheets.push(stylesheet);

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
  };

  /**
   * Run all "before" animation hooks.
   */
  private _beforeAnimation = (): void => {
    // Runs all before read callbacks
    this._beforeAddReadFunctions.forEach((callback) => callback());

    // Runs all before write callbacks
    this._beforeAddWriteFunctions.forEach((callback) => callback());

    // Update styles and classes before animation runs
    this._applyStylesBeforeAfterAnimations(this._beforeAddClasses, this._beforeRemoveClasses, this._beforeStylesValue);
  };

  /**
   * Run all "after" animation hooks.
   */
  private _afterAnimation = (): void => {
    this._clearCSSAnimationsTimeout();

    // Runs all after read callbacks
    this._afterAddReadFunctions.forEach((callback) => callback());

    // Runs all after write callbacks
    this._afterAddWriteFunctions.forEach((callback) => callback());

    // Update styles and classes before animation ends
    const currentStep = this._willComplete
      ? 1
      : 0;

    this._applyStylesBeforeAfterAnimations(this._afterAddClasses, this._afterRemoveClasses, this._afterStylesValue);

    this._onFinishCallbacks.forEach((onFinishCallback) => onFinishCallback.c(currentStep, this));

    this._onFinishOneTimeCallbacks.forEach((onFinishCallback) => onFinishCallback.c(currentStep, this));

    this._onFinishOneTimeCallbacks.length = 0;

    this._shouldCalculateNumAnimations = true;
    if (this._willComplete) {
      this._finished = true;
    }
    this._willComplete = true;
  };

  private _applyStylesBeforeAfterAnimations = (addClasses: string[], removeClasses: string[], styles: { [p: string]: any }): void => {
    for (const el of this.elements) {
      const elementClassList = el.classList;

      addClasses.forEach((c) => elementClassList.add(c));
      removeClasses.forEach((c) => elementClassList.remove(c));

      for (const property in styles) {
        // eslint-disable-next-line no-prototype-builtins
        if (styles.hasOwnProperty(property)) {
          setStyleProperty(el, property, styles[property]);
        }
      }
    }
  };

  private _playWebAnimations = (): void => {
    this._webAnimations.forEach((animation) => {
      animation.play();
    });

    if (this._keyframes.length === 0 || this.elements.length === 0) {
      this.animationFinish();
    }
  };

  private _playCSSAnimations = (): void => {
    this._clearCSSAnimationsTimeout();

    raf(() => {
      this.elements.forEach((element) => {
        if (this._keyframes.length > 0) {
          setStyleProperty(element, 'animation-play-state', 'running');
        }
      });
    });

    if (this._keyframes.length === 0 || this.elements.length === 0) {
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
        this._cssAnimationsTimerFallback = setTimeout(this._onAnimationEndFallback, animationDelay + (animationDuration * animationIterations) + Animation.ANIMATION_END_FALLBACK_PADDING_MS);
      }

      animationEnd(this.elements[0], () => {
        this._clearCSSAnimationsTimeout();

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
  };

  private _pauseAnimation = (): void => {
    if (this._initialized) {
      if (this._supportsWebAnimations) {
        this._webAnimations.forEach((animation) => {
          animation.pause();
        });
      } else {
        this.elements.forEach((element) => {
          setStyleProperty(element, 'animation-play-state', 'paused');
        });
      }
    }
  };

  private _onAnimationEndFallback = (): void => {
    this._cssAnimationsTimerFallback = undefined;
    this.animationFinish();
  };

  private _setAnimationStep = (step: number): void => {
    const safeStep = Math.min(Math.max(step, 0), 0.9999);

    if (this._supportsWebAnimations) {
      for (const animation of this._webAnimations) {
        animation.currentTime = animation.effect.getComputedTiming().delay + (this.getDuration() * safeStep);
        animation.pause();
      }
    } else {
      const animationDuration = `-${this.getDuration() * safeStep}ms`;

      for (const element of this.elements) {
        if (this._keyframes.length > 0) {
          setStyleProperty(element, 'animation-delay', animationDuration);
          setStyleProperty(element, 'animation-play-state', 'paused');
        }
      }
    }
  };

  private _updateWebAnimation = (step?: number): void => {
    for (const animation of this._webAnimations) {
      animation.effect.updateTiming({
        delay: this.getDelay(),
        direction: this.getDirection(),
        duration: this.getDuration(),
        easing: this.getEasing(),
        fill: this.getFill(),
        iterations: this.getIterations()
      });
    }

    if (step !== undefined) {
      this._setAnimationStep(step);
    }
  };

  private _updateCSSAnimation = (toggleAnimationName = true, step?: number): void => {
    raf(() => {
      this.elements.forEach((element) => {
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
      });
    });
  };

  private _updateKeyframes = (keyframeValues: AnimationKeyFrames): void => {
    if (this._supportsWebAnimations) {
      const animations = this.getWebAnimations();

      for (const animation of animations) {
        if (animation.effect.setKeyframes) {
          animation.effect.setKeyframes(keyframeValues);
        } else {
          animation.effect = new KeyframeEffect(animation.effect.target, keyframeValues, animation.effect.getTiming());
        }
      }
    } else {
      this._initializeCSSAnimation();
    }
  };

  private _clearCSSAnimationsTimeout = (): void => {
    if (this._cssAnimationsTimerFallback) {
      clearTimeout(this._cssAnimationsTimerFallback);
    }
  };

  private _clearCSSAnimationPlayState = (): void => {
    const propertiesToRemove: string[] = [
      'animation-duration',
      'animation-delay',
      'animation-play-state'
    ];

    this.elements.forEach((element: HTMLElement) => removeStyleProperties(element, propertiesToRemove));
  };

  /**
   * Removes the animation's stylesheets
   * from the DOM.
   */
  private _cleanUpStyleSheets = (): void => {
    for (const stylesheet of this._stylesheets) {

      /**
       * When sharing stylesheets, it's possible
       * for another animation to have already
       * cleaned up a particular stylesheet
       */
      stylesheet?.parentNode?.removeChild(stylesheet);
    }

    this._stylesheets.length = 0;
  };

  /**
   * Cancels any Web Animations and removes
   * any animation properties from
   * the animation's elements.
   */
  private _cleanUpElements = (): void => {
    if (this._supportsWebAnimations) {
      this._webAnimations.forEach((animation) => {
        animation.cancel();
      });

      this._webAnimations.length = 0;
    } else {
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
  };

  /**
   * Cancels any Web Animations, removes
   * any animation properties from the
   * animation's elements, and removes the
   * animation's stylesheets from the DOM.
   */
  private _cleanUp = (clearStyleSheets?: boolean): void => {
    this._cleanUpElements();

    if (clearStyleSheets) {
      this._cleanUpStyleSheets();
    }
  };

  private _clearOnFinish = (): InterfaceAnimationInternal => {
    this._onFinishCallbacks.length = 0;
    this._onFinishOneTimeCallbacks.length = 0;

    return this;
  };

  private _resetAnimation = (): void => {
    if (this._supportsWebAnimations) {
      this._setAnimationStep(0);
      this._updateWebAnimation();
    } else {
      this._updateCSSAnimation();
    }
  };

  private _resetFlags = (): void => {
    this._shouldForceLinearEasing = false;
    this._shouldForceSyncPlayback = false;
    this._shouldCalculateNumAnimations = true;
    this._forceDirectionValue = undefined;
    this._forceDurationValue = undefined;
    this._forceDelayValue = undefined;
    this._numAnimationsRunning = 0;
    this._finished = false;
    this._willComplete = true;
  };

}
