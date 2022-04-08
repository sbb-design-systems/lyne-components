import { raf } from '../helpers';

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
  removeStyleProperty,
  setStyleProperty
} from './animation-utils';

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

export const createAnimation = (animationId?: string): InterfaceAnimation => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let _delay: number | undefined;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let _duration: number | undefined;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let _easing: string | undefined;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let _iterations: number | undefined;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let _fill: AnimationFill | undefined;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let _direction: AnimationDirection | undefined;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let _keyframes: AnimationKeyFrames = [];
  let beforeAddClasses: string[] = [];
  let beforeRemoveClasses: string[] = [];
  let initialized = false;
  let parentAnimation: InterfaceAnimationInternal | undefined;
  let beforeStylesValue: { [property: string]: any } = {};
  let afterAddClasses: string[] = [];
  let afterRemoveClasses: string[] = [];
  let afterStylesValue: { [property: string]: any } = {};
  let numAnimationsRunning = 0;
  let shouldForceLinearEasing = false;
  let shouldForceSyncPlayback = false;
  let cssAnimationsTimerFallback: any;
  let forceDirectionValue: AnimationDirection | undefined;
  let forceDurationValue: number | undefined;
  let forceDelayValue: number | undefined;
  let willComplete = true;
  let finished = false;
  let shouldCalculateNumAnimations = true;
  let keyframeName: string | undefined;
  // eslint-disable-next-line prefer-const
  let ani: InterfaceAnimationInternal;

  const id: string | undefined = animationId;
  const onFinishCallbacks: InterfaceAnimationOnFinishCallback[] = [];
  const onFinishOneTimeCallbacks: InterfaceAnimationOnFinishCallback[] = [];
  const elements: HTMLElement[] = [];
  const childAnimations: InterfaceAnimationInternal[] = [];
  const stylesheets: HTMLElement[] = [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _beforeAddReadFunctions: any[] = [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _beforeAddWriteFunctions: any[] = [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _afterAddReadFunctions: any[] = [];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _afterAddWriteFunctions: any[] = [];
  const webAnimations: any[] = [];
  const supportsAnimationEffect = (typeof (AnimationEffect as any) === 'function' || typeof (window as any).AnimationEffect === 'function');
  const supportsWebAnimations = (typeof (Element as any) === 'function') && (typeof (Element as any).prototype.animate === 'function') && supportsAnimationEffect;
  const ANIMATION_END_FALLBACK_PADDING_MS = 100;

  const getWebAnimations = (): any[] => webAnimations;

  /**
   * Removes the animation's stylesheets
   * from the DOM.
   */
  const cleanUpStyleSheets = (): void => {
    stylesheets.forEach((stylesheet) => {

      /**
       * When sharing stylesheets, it's possible
       * for another animation to have already
       * cleaned up a particular stylesheet
       */
      if (stylesheet && stylesheet.parentNode) {
        stylesheet.parentNode.removeChild(stylesheet);
      }
    });

    stylesheets.length = 0;
  };

  /**
   * Cancels any Web Animations and removes
   * any animation properties from
   * the animation's elements.
   */
  const cleanUpElements = (): void => {
    if (supportsWebAnimations) {
      webAnimations.forEach((animation) => {
        animation.cancel();
      });

      webAnimations.length = 0;
    } else {
      const elementsArray = elements.slice();

      raf(() => {
        elementsArray.forEach((element) => {
          removeStyleProperty(element, 'animation-name');
          removeStyleProperty(element, 'animation-duration');
          removeStyleProperty(element, 'animation-timing-function');
          removeStyleProperty(element, 'animation-iteration-count');
          removeStyleProperty(element, 'animation-delay');
          removeStyleProperty(element, 'animation-play-state');
          removeStyleProperty(element, 'animation-fill-mode');
          removeStyleProperty(element, 'animation-direction');
        });
      });
    }
  };

  /**
   * Cancels any Web Animations, removes
   * any animation properties from the
   * animation's elements, and removes the
   * animation's stylesheets from the DOM.
   */
  const cleanUp = (clearStyleSheets?: boolean): void => {
    cleanUpElements();

    if (clearStyleSheets) {
      cleanUpStyleSheets();
    }
  };

  const clearOnFinish = (): InterfaceAnimationInternal => {
    onFinishCallbacks.length = 0;
    onFinishOneTimeCallbacks.length = 0;

    return ani;
  };

  const destroy = (clearStyleSheets?: boolean): InterfaceAnimationInternal => {
    childAnimations.forEach((childAnimation) => {
      childAnimation.destroy(clearStyleSheets);
    });

    cleanUp(clearStyleSheets);

    elements.length = 0;
    childAnimations.length = 0;
    _keyframes.length = 0;

    clearOnFinish();

    initialized = false;
    shouldCalculateNumAnimations = true;

    return ani;
  };

  const resetFlags = (): void => {
    shouldForceLinearEasing = false;
    shouldForceSyncPlayback = false;
    shouldCalculateNumAnimations = true;
    forceDirectionValue = undefined;
    forceDurationValue = undefined;
    forceDelayValue = undefined;
    numAnimationsRunning = 0;
    finished = false;
    willComplete = true;
  };

  const onFinish = (callback: AnimationLifecycle, opts?: InterfaceAnimationCallbackOptions): InterfaceAnimationInternal => {
    const callbacks = (opts && opts.oneTimeCallback)
      ? onFinishOneTimeCallbacks
      : onFinishCallbacks;

    callbacks.push({
      c: callback,
      o: opts
    });

    return ani;
  };

  const beforeAddRead = (readFn: () => void): InterfaceAnimationInternal => {
    _beforeAddReadFunctions.push(readFn);

    return ani;
  };

  const beforeAddWrite = (writeFn: () => void): InterfaceAnimationInternal => {
    _beforeAddWriteFunctions.push(writeFn);

    return ani;
  };

  const afterAddRead = (readFn: () => void): InterfaceAnimationInternal => {
    _afterAddReadFunctions.push(readFn);

    return ani;
  };

  const afterAddWrite = (writeFn: () => void): InterfaceAnimationInternal => {
    _afterAddWriteFunctions.push(writeFn);

    return ani;
  };

  const beforeAddClass = (className: string | string[] | undefined): InterfaceAnimationInternal => {
    beforeAddClasses = addClassToArray(beforeAddClasses, className);

    return ani;
  };

  const beforeRemoveClass = (className: string | string[] | undefined): InterfaceAnimationInternal => {
    beforeRemoveClasses = addClassToArray(beforeRemoveClasses, className);

    return ani;
  };

  /**
   * Set CSS inline styles to the animation's
   * elements before the animation begins.
   */
  const beforeStyles = (styles: { [property: string]: any } = {}): InterfaceAnimationInternal => {
    beforeStylesValue = styles;

    return ani;
  };

  /**
   * Clear CSS inline styles from the animation's
   * elements before the animation begins.
   */
  const beforeClearStyles = (propertyNames: string[] = []): InterfaceAnimationInternal => {
    for (const property of propertyNames) {
      beforeStylesValue[property] = '';
    }

    return ani;
  };

  const afterAddClass = (className: string | string[] | undefined): InterfaceAnimationInternal => {
    afterAddClasses = addClassToArray(afterAddClasses, className);

    return ani;
  };

  const afterRemoveClass = (className: string | string[] | undefined): InterfaceAnimationInternal => {
    afterRemoveClasses = addClassToArray(afterRemoveClasses, className);

    return ani;
  };

  const afterStyles = (styles: { [property: string]: any } = {}): InterfaceAnimationInternal => {
    afterStylesValue = styles;

    return ani;
  };

  const afterClearStyles = (propertyNames: string[] = []): InterfaceAnimationInternal => {
    for (const property of propertyNames) {
      afterStylesValue[property] = '';
    }

    return ani;
  };

  const getFill = (): AnimationFill => {
    if (_fill !== undefined) {
      return _fill;
    }
    if (parentAnimation) {
      return parentAnimation.getFill();
    }

    return 'both';
  };

  const getDirection = (): AnimationDirection => {
    if (forceDirectionValue !== undefined) {
      return forceDirectionValue;
    }
    if (_direction !== undefined) {
      return _direction;
    }
    if (parentAnimation) {
      return parentAnimation.getDirection();
    }

    return 'normal';

  };

  const getEasing = (): string => {
    if (shouldForceLinearEasing) {
      return 'linear';
    }
    if (_easing !== undefined) {
      return _easing;
    }
    if (parentAnimation) {
      return parentAnimation.getEasing();
    }

    return 'linear';
  };

  const getDuration = (): number => {
    if (shouldForceSyncPlayback) {
      return 0;
    }
    if (forceDurationValue !== undefined) {
      return forceDurationValue;
    }
    if (_duration !== undefined) {
      return _duration;
    }
    if (parentAnimation) {
      return parentAnimation.getDuration();
    }

    return 0;
  };

  const getIterations = (): number => {
    if (_iterations !== undefined) {
      return _iterations;
    }
    if (parentAnimation) {
      return parentAnimation.getIterations();
    }

    return 1;
  };

  const getDelay = (): number => {
    if (forceDelayValue !== undefined) {
      return forceDelayValue;
    }
    if (_delay !== undefined) {
      return _delay;
    }
    if (parentAnimation) {
      return parentAnimation.getDelay();
    }

    return 0;
  };

  const getKeyframes = (): AnimationKeyFrames => _keyframes;

  const setAnimationStep = (step: number): void => {
    const safeStep = Math.min(Math.max(step, 0), 0.9999);

    if (supportsWebAnimations) {
      webAnimations.forEach((animation) => {
        animation.currentTime = animation.effect.getComputedTiming().delay + (getDuration() * safeStep);
        animation.pause();
      });
    } else {
      const animationDuration = `-${getDuration() * safeStep}ms`;

      elements.forEach((element) => {
        if (_keyframes.length > 0) {
          setStyleProperty(element, 'animation-delay', animationDuration);
          setStyleProperty(element, 'animation-play-state', 'paused');
        }
      });
    }
  };

  const updateWebAnimation = (step?: number): void => {
    webAnimations.forEach((animation) => {
      animation.effect.updateTiming({
        delay: getDelay(),
        direction: getDirection(),
        duration: getDuration(),
        easing: getEasing(),
        fill: getFill(),
        iterations: getIterations()
      });
    });

    if (step !== undefined) {
      setAnimationStep(step);
    }
  };

  const updateCSSAnimation = (toggleAnimationName = true, step?: number): void => {
    raf(() => {
      elements.forEach((element) => {
        setStyleProperty(element, 'animation-name', keyframeName || null);
        setStyleProperty(element, 'animation-duration', `${getDuration()}ms`);
        setStyleProperty(element, 'animation-timing-function', getEasing());
        setStyleProperty(element, 'animation-delay', (step === undefined || step === null)
          ? `${getDelay()}ms`
          : `-${step * getDuration()}ms`);
        setStyleProperty(element, 'animation-fill-mode', getFill() || null);
        setStyleProperty(element, 'animation-direction', getDirection() || null);

        const iterationsCount = (getIterations() === Infinity)
          ? 'infinite'
          : getIterations()
            .toString();

        setStyleProperty(element, 'animation-iteration-count', iterationsCount);

        if (toggleAnimationName) {
          setStyleProperty(element, 'animation-name', `${keyframeName}-alt`);
        }

        raf(() => {
          setStyleProperty(element, 'animation-name', keyframeName || null);
        });
      });
    });
  };

  const update = (deep = false, toggleAnimationName = true, step?: number): InterfaceAnimationInternal => {
    if (deep) {
      childAnimations.forEach((animation) => {
        animation.update(deep, toggleAnimationName, step);
      });
    }

    if (supportsWebAnimations) {
      updateWebAnimation(step);
    } else {
      updateCSSAnimation(toggleAnimationName, step);
    }

    return ani;
  };

  const direction = (animationDirection: AnimationDirection): InterfaceAnimationInternal => {
    _direction = animationDirection;

    update(true);

    return ani;
  };

  const fill = (animationFill: AnimationFill): InterfaceAnimationInternal => {
    _fill = animationFill;

    update(true);

    return ani;
  };

  const delay = (animationDelay: number): InterfaceAnimationInternal => {
    _delay = animationDelay;

    update(true);

    return ani;
  };

  const easing = (animationEasing: string): InterfaceAnimationInternal => {
    _easing = animationEasing;

    update(true);

    return ani;
  };

  const duration = (animationDuration: number): InterfaceAnimationInternal => {

    /**
     * CSS Animation Durations of 0ms work fine on Chrome
     * but do not run on Safari, so force it to 1ms to
     * get it to run on both platforms.
     */
    if (!supportsWebAnimations && animationDuration === 0) {
      // eslint-disable-next-line no-param-reassign
      animationDuration = 1;
    }

    _duration = animationDuration;

    update(true);

    return ani;
  };

  const iterations = (animationIterations: number): InterfaceAnimationInternal => {
    _iterations = animationIterations;

    update(true);

    return ani;
  };

  const parent = (animation: InterfaceAnimationInternal): InterfaceAnimationInternal => {
    parentAnimation = animation;

    return ani;
  };

  const addElement = (el: Element | Element[] | Node | Node[] | NodeList | undefined | null): InterfaceAnimationInternal => {
    if (el !== null && el !== undefined) {

      if ((el as Node).nodeType === 1) {
        elements.push(el as any);
      } else if ((el as NodeList).length >= 0) {
        for (let i = 0; i < (el as NodeList).length; i++) {
          elements.push((el as any)[i]);
        }
      } else {
        console.error('Invalid addElement value');
      }
    }

    return ani;
  };

  const addAnimation = (animationToAdd: InterfaceAnimationInternal | InterfaceAnimationInternal[]): InterfaceAnimationInternal => {
    if (animationToAdd !== null && animationToAdd !== undefined) {
      if (Array.isArray(animationToAdd)) {
        for (const animation of animationToAdd) {
          animation.parent(ani);
          childAnimations.push(animation);
        }
      } else {
        animationToAdd.parent(ani);
        childAnimations.push(animationToAdd);
      }
    }

    return ani;
  };

  const initializeCSSAnimation = (toggleAnimationName = true): void => {
    cleanUpStyleSheets();

    const processedKeyframes = processKeyframes(_keyframes);

    elements.forEach((element) => {
      if (processedKeyframes.length > 0) {
        const keyframeRules = generateKeyframeRules(processedKeyframes);

        keyframeName = (animationId === undefined)
          ? generateKeyframeName(keyframeRules)
          : animationId;
        const stylesheet = createKeyframeStylesheet(keyframeName, keyframeRules, element);

        stylesheets.push(stylesheet);

        setStyleProperty(element, 'animation-duration', `${getDuration()}ms`);
        setStyleProperty(element, 'animation-timing-function', getEasing());
        setStyleProperty(element, 'animation-delay', `${getDelay()}ms`);
        setStyleProperty(element, 'animation-fill-mode', getFill());
        setStyleProperty(element, 'animation-direction', getDirection());

        const iterationsCount = (getIterations() === Infinity)
          ? 'infinite'
          : getIterations()
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
    });
  };

  const updateKeyframes = (keyframeValues: AnimationKeyFrames): void => {
    if (supportsWebAnimations) {
      getWebAnimations()
        .forEach((animation) => {
          if (animation.effect.setKeyframes) {
            animation.effect.setKeyframes(keyframeValues);
          } else {
            animation.effect = new KeyframeEffect(animation.effect.target, keyframeValues, animation.effect.getTiming());
          }
        });
    } else {
      initializeCSSAnimation();
    }
  };

  const keyframes = (keyframeValues: AnimationKeyFrames): InterfaceAnimationInternal => {
    const different = _keyframes !== keyframeValues;

    _keyframes = keyframeValues;

    if (different) {
      updateKeyframes(_keyframes);
    }

    return ani;
  };

  const clearCSSAnimationsTimeout = (): void => {
    if (cssAnimationsTimerFallback) {
      clearTimeout(cssAnimationsTimerFallback);
    }
  };

  const applyStylesBeforeAfterAnimations = (addClasses: string[], removeClasses: string[], styles: { [p: string]: any }): void => {
    elements.forEach((el) => {
      const elementClassList = el.classList;

      addClasses.forEach((c) => elementClassList.add(c));
      removeClasses.forEach((c) => elementClassList.remove(c));

      for (const property in styles) {
        // eslint-disable-next-line no-prototype-builtins
        if (styles.hasOwnProperty(property)) {
          setStyleProperty(el, property, styles[property]);
        }
      }
    });
  };

  /**
   * Run all "before" animation hooks.
   */
  const beforeAnimation = (): void => {
    // Runs all before read callbacks
    _beforeAddReadFunctions.forEach((callback) => callback());

    // Runs all before write callbacks
    _beforeAddWriteFunctions.forEach((callback) => callback());

    // Update styles and classes before animation runs
    applyStylesBeforeAfterAnimations(beforeAddClasses, beforeRemoveClasses, beforeStylesValue);
  };

  /**
   * Run all "after" animation hooks.
   */
  const afterAnimation = (): void => {
    clearCSSAnimationsTimeout();

    // Runs all after read callbacks
    _afterAddReadFunctions.forEach((callback) => callback());

    // Runs all after write callbacks
    _afterAddWriteFunctions.forEach((callback) => callback());

    // Update styles and classes before animation ends
    const currentStep = willComplete
      ? 1
      : 0;

    applyStylesBeforeAfterAnimations(afterAddClasses, afterRemoveClasses, afterStylesValue);

    onFinishCallbacks.forEach((onFinishCallback) => onFinishCallback.c(currentStep, ani));

    onFinishOneTimeCallbacks.forEach((onFinishCallback) => onFinishCallback.c(currentStep, ani));

    onFinishOneTimeCallbacks.length = 0;

    shouldCalculateNumAnimations = true;
    if (willComplete) {
      finished = true;
    }
    willComplete = true;
  };

  const animationFinish = (): void => {
    if (numAnimationsRunning === 0) {
      return;
    }

    numAnimationsRunning--;

    if (numAnimationsRunning === 0) {
      afterAnimation();
      if (parentAnimation) {
        parentAnimation.animationFinish();
      }
    }
  };

  const initializeWebAnimation = (): void => {
    elements.forEach((element) => {
      const animation = element.animate(_keyframes, {
        delay: getDelay(),
        direction: getDirection(),
        duration: getDuration(),
        easing: getEasing(),
        fill: getFill(),
        id,
        iterations: getIterations()
      });

      animation.pause();

      webAnimations.push(animation);
    });

    if (webAnimations.length > 0) {
      webAnimations[0].onfinish = (): void => {
        animationFinish();
      };
    }

  };

  const initializeAnimation = (toggleAnimationName = true): void => {
    beforeAnimation();

    if (_keyframes.length > 0) {
      if (supportsWebAnimations) {
        initializeWebAnimation();
      } else {
        initializeCSSAnimation(toggleAnimationName);
      }
    }

    initialized = true;
  };

  const pauseAnimation = (): void => {
    if (initialized) {
      if (supportsWebAnimations) {
        webAnimations.forEach((animation) => {
          animation.pause();
        });
      } else {
        elements.forEach((element) => {
          setStyleProperty(element, 'animation-play-state', 'paused');
        });
      }
    }
  };

  const onAnimationEndFallback = (): void => {
    cssAnimationsTimerFallback = undefined;
    animationFinish();
  };

  const clearCSSAnimationPlayState = (): void => {
    elements.forEach((element) => {
      removeStyleProperty(element, 'animation-duration');
      removeStyleProperty(element, 'animation-delay');
      removeStyleProperty(element, 'animation-play-state');
    });
  };

  const resetAnimation = (): void => {
    if (supportsWebAnimations) {
      setAnimationStep(0);
      updateWebAnimation();
    } else {
      updateCSSAnimation();
    }
  };

  const playWebAnimations = (): void => {
    webAnimations.forEach((animation) => {
      animation.play();
    });

    if (_keyframes.length === 0 || elements.length === 0) {
      animationFinish();
    }
  };

  const playCSSAnimations = (): void => {
    clearCSSAnimationsTimeout();

    raf(() => {
      elements.forEach((element) => {
        if (_keyframes.length > 0) {
          setStyleProperty(element, 'animation-play-state', 'running');
        }
      });
    });

    if (_keyframes.length === 0 || elements.length === 0) {
      animationFinish();
    } else {

      /**
       * This is a catchall in the event that a CSS Animation did not finish.
       * The Web Animations API has mechanisms in place for preventing this.
       * CSS Animations will not fire an `animationend` event
       * for elements with `display: none`. The Web Animations API
       * accounts for this, but using raw CSS Animations requires
       * this workaround.
       */
      const animationDelay = getDelay() || 0;
      const animationDuration = getDuration() || 0;
      const animationIterations = getIterations() || 1;

      // No need to set a timeout when animation has infinite iterations
      if (isFinite(animationIterations)) {
        cssAnimationsTimerFallback = setTimeout(onAnimationEndFallback, animationDelay + (animationDuration * animationIterations) + ANIMATION_END_FALLBACK_PADDING_MS);
      }

      animationEnd(elements[0], () => {
        clearCSSAnimationsTimeout();

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
          clearCSSAnimationPlayState();
          raf(animationFinish);
        });
      });
    }
  };

  const play = (opts?: InterfaceAnimationPlayOptions): Promise<void> => new Promise<void>((resolve) => {
    if (opts && opts.sync) {
      shouldForceSyncPlayback = true;

      // eslint-disable-next-line no-return-assign
      onFinish(() => shouldForceSyncPlayback = false, {
        oneTimeCallback: true
      });
    }
    if (!initialized) {
      initializeAnimation();
    }

    if (finished) {
      resetAnimation();
      finished = false;
    }

    if (shouldCalculateNumAnimations) {
      numAnimationsRunning = childAnimations.length + 1;
      shouldCalculateNumAnimations = false;
    }

    onFinish(() => resolve(), {
      oneTimeCallback: true
    });

    childAnimations.forEach((animation) => {
      animation.play();
    });

    if (supportsWebAnimations) {
      playWebAnimations();
    } else {
      playCSSAnimations();
    }
  });

  const progressStart = (forceLinearEasing = false, step?: number): InterfaceAnimationInternal => {
    childAnimations.forEach((animation) => {
      animation.progressStart(forceLinearEasing, step);
    });

    pauseAnimation();
    shouldForceLinearEasing = forceLinearEasing;

    if (!initialized) {
      initializeAnimation();
    }
    update(false, true, step);

    return ani;
  };

  const progressStep = (step: number): InterfaceAnimationInternal => {
    childAnimations.forEach((animation) => {
      animation.progressStep(step);
    });
    setAnimationStep(step);

    return ani;
  };

  const progressEnd = (playTo: 0 | 1 | undefined, step: number, dur?: number): InterfaceAnimationInternal => {
    shouldForceLinearEasing = false;

    childAnimations.forEach((animation) => {
      animation.progressEnd(playTo, step, dur);
    });

    if (dur !== undefined) {
      forceDurationValue = dur;
    }

    finished = false;

    willComplete = true;

    if (playTo === 0) {
      forceDirectionValue = (getDirection() === 'reverse')
        ? 'normal'
        : 'reverse';

      if (forceDirectionValue === 'reverse') {
        willComplete = false;
      }

      if (supportsWebAnimations) {
        update();
        setAnimationStep(1 - step);
      } else {
        forceDelayValue = ((1 - step) * getDuration()) * -1;
        update(false, false);
      }
    } else if (playTo === 1) {
      if (supportsWebAnimations) {
        update();
        setAnimationStep(step);
      } else {
        forceDelayValue = (step * getDuration()) * -1;
        update(false, false);
      }
    }

    if (playTo !== undefined) {
      onFinish(() => {
        forceDurationValue = undefined;
        forceDirectionValue = undefined;
        forceDelayValue = undefined;
      }, {
        oneTimeCallback: true
      });

      if (!parentAnimation) {
        play();
      }
    }

    return ani;
  };

  const pause = (): InterfaceAnimationInternal => {
    childAnimations.forEach((animation) => {
      animation.pause();
    });

    pauseAnimation();

    return ani;
  };

  const stop = (): void => {
    childAnimations.forEach((animation) => {
      animation.stop();
    });

    if (initialized) {
      cleanUpElements();
      initialized = false;
    }

    resetFlags();
  };

  const from = (property: string, value: any): InterfaceAnimationInternal => {
    const firstFrame = _keyframes[0] as InterfaceAnimationKeyFrameEdge | undefined;

    if (firstFrame !== undefined && (firstFrame.offset === undefined || firstFrame.offset === 0)) {
      firstFrame[property] = value;
    } else {
      _keyframes = [
        {
          offset: 0,
          [property]: value
        },
        ..._keyframes
      ] as InterfaceAnimationKeyFrame[];
    }

    return ani;
  };

  const to = (property: string, value: any): InterfaceAnimationInternal => {
    const lastFrame = _keyframes[_keyframes.length - 1] as InterfaceAnimationKeyFrameEdge | undefined;

    if (lastFrame !== undefined && (lastFrame.offset === undefined || lastFrame.offset === 1)) {
      lastFrame[property] = value;
    } else {
      _keyframes = [
        ..._keyframes,
        {
          offset: 1,
          [property]: value
        }
      ] as InterfaceAnimationKeyFrame[];
    }

    return ani;
  };

  const fromTo = (property: string, fromValue: any, toValue: any): InterfaceAnimation => from(property, fromValue)
    .to(property, toValue);

  ani = {
    addAnimation,
    addElement,
    afterAddClass,
    afterAddRead,
    afterAddWrite,
    afterClearStyles,
    afterRemoveClass,
    afterStyles,
    animationFinish,
    beforeAddClass,
    beforeAddRead,
    beforeAddWrite,
    beforeClearStyles,
    beforeRemoveClass,
    beforeStyles,
    childAnimations,
    delay,
    destroy,
    direction,
    duration,
    easing,
    elements,
    fill,
    from,
    fromTo,
    getDelay,
    getDirection,
    getDuration,
    getEasing,
    getFill,
    getIterations,
    getKeyframes,
    getWebAnimations,
    id,
    iterations,
    keyframes,
    onFinish,
    parent,
    parentAnimation,
    pause,
    play,
    progressEnd,
    progressStart,
    progressStep,
    stop,
    to,
    update
  };

  return ani;
};
