import {
  AnimationDirection,
  AnimationFill,
  AnimationKeyFrames,
  AnimationLifecycle,
  InterfaceAnimation,
  InterfaceAnimationCallbackOptions,
  InterfaceAnimationInternal,
  InterfaceAnimationKeyFrame,
  InterfaceAnimationKeyFrameEdge,
  InterfaceAnimationOnFinishCallback,
  InterfaceAnimationPlayOptions
} from './animation-interface';
import {
  addClassToArray,
  setStyleProperty
} from './animation-utils';

export abstract class AbstractAnimation implements InterfaceAnimationInternal {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  protected static readonly _ANIMATION_END_FALLBACK_PADDING_MS = 100;

  public constructor(animationId?: string) {
    this.id = animationId;
  }

  public parentAnimation: InterfaceAnimationInternal | undefined;
  public id: string | undefined;
  public elements: HTMLElement[] = [];
  public childAnimations: InterfaceAnimationInternal[] = [];

  protected animationDuration: number | undefined;
  protected animationKeyframes: AnimationKeyFrames = [];
  protected cssAnimationsTimerFallback: NodeJS.Timeout;
  protected finished = false;
  protected forceDelayValue: number | undefined;
  protected forceDirectionValue: AnimationDirection | undefined;
  protected forceDurationValue: number | undefined;
  protected initialized = false;
  protected shouldForceLinearEasing = false;
  protected stylesheets: HTMLElement[] = [];
  protected webAnimations: any[] = [];
  protected willComplete = true;

  private _afterAddClasses: string[] = [];
  private _afterAddReadFunctions: (() => void)[] = [];
  private _afterAddWriteFunctions: (() => void)[] = [];
  private _afterRemoveClasses: string[] = [];
  private _afterStylesValue: { [property: string]: any } = {};
  private _beforeAddClasses: string[] = [];
  private _beforeAddReadFunctions: (() => void)[] = [];
  private _beforeAddWriteFunctions: (() => void)[] = [];
  private _beforeRemoveClasses: string[] = [];
  private _beforeStylesValue: { [property: string]: any } = {};
  private _delay: number | undefined;
  private _direction: AnimationDirection | undefined;
  private _easing: string | undefined;
  private _fill: AnimationFill | undefined;
  private _iterations: number | undefined;
  private _numAnimationsRunning = 0;
  private _onFinishCallbacks: InterfaceAnimationOnFinishCallback[] = [];
  private _onFinishOneTimeCallbacks: InterfaceAnimationOnFinishCallback[] = [];
  private _shouldCalculateNumAnimations = true;
  private _shouldForceSyncPlayback = false;

  protected abstract initializeAnimation(toggleAnimationName?: boolean): void;

  protected abstract updateAnimationInternal(step?: number, toggleAnimationName?: boolean): void;

  protected abstract playInternal(): void;

  protected abstract progressEndInternal(playTo: 0 | 1, step: number): void;

  protected abstract pauseAnimation(): void;

  protected abstract setAnimationStep(step: number): void;

  protected abstract updateKeyframes(keyframeValues?: AnimationKeyFrames): void;

  /**
   * Cancels any Web Animations and removes
   * any animation properties from
   * the animation's elements.
   */
  protected abstract cleanUpElements(): void;

  protected abstract resetAnimation(): void;

  public getWebAnimations(): any[] {
    return this.webAnimations;
  }

  public parent(animation: InterfaceAnimationInternal): InterfaceAnimationInternal {
    this.parentAnimation = animation;

    return this;
  }

  public addElement(el: Element | Element[] | Node | Node[] | NodeList | undefined | null): InterfaceAnimationInternal {
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
  }

  public addAnimation(animationToAdd: InterfaceAnimationInternal | InterfaceAnimationInternal[]): InterfaceAnimationInternal {
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
  }

  public beforeAddClass(className: string | string[] | undefined): InterfaceAnimationInternal {
    this._beforeAddClasses = addClassToArray(this._beforeAddClasses, className);

    return this;
  }

  public afterAddClass(className: string | string[] | undefined): InterfaceAnimationInternal {
    this._afterAddClasses = addClassToArray(this._afterAddClasses, className);

    return this;
  }

  public beforeRemoveClass(className: string | string[] | undefined): InterfaceAnimationInternal {
    this._beforeRemoveClasses = addClassToArray(this._beforeRemoveClasses, className);

    return this;
  }

  public afterRemoveClass(className: string | string[] | undefined): InterfaceAnimationInternal {
    this._afterRemoveClasses = addClassToArray(this._afterRemoveClasses, className);

    return this;
  }

  /**
   * Set CSS inline styles to the animation's
   * elements before the animation begins.
   */
  public beforeStyles(styles: { [property: string]: any } = {}): InterfaceAnimationInternal {
    this._beforeStylesValue = styles;

    return this;
  }

  public afterStyles(styles: { [property: string]: any } = {}): InterfaceAnimationInternal {
    this._afterStylesValue = styles;

    return this;
  }

  /**
   * Clear CSS inline styles from the animation's
   * elements before the animation begins.
   */
  public beforeClearStyles(propertyNames: string[] = []): InterfaceAnimationInternal {
    for (const property of propertyNames) {
      this._beforeStylesValue[property] = '';
    }

    return this;
  }

  public afterClearStyles(propertyNames: string[] = []): InterfaceAnimationInternal {
    for (const property of propertyNames) {
      this._afterStylesValue[property] = '';
    }

    return this;
  }

  public beforeAddRead(readFn: () => void): InterfaceAnimationInternal {
    this._beforeAddReadFunctions.push(readFn);

    return this;
  }

  public afterAddRead(readFn: () => void): InterfaceAnimationInternal {
    this._afterAddReadFunctions.push(readFn);

    return this;
  }

  public beforeAddWrite(writeFn: () => void): InterfaceAnimationInternal {
    this._beforeAddWriteFunctions.push(writeFn);

    return this;
  }

  public afterAddWrite(writeFn: () => void): InterfaceAnimationInternal {
    this._afterAddWriteFunctions.push(writeFn);

    return this;
  }

  public play(opts?: InterfaceAnimationPlayOptions): Promise<void> {
    return new Promise<void>((resolve) => {
      if (opts && opts.sync) {
        this._shouldForceSyncPlayback = true;

        // eslint-disable-next-line no-return-assign
        this.onFinish(() => this._shouldForceSyncPlayback = false, {
          oneTimeCallback: true
        });
      }
      if (!this.initialized) {
        this.initializeAnimation(true);
      }

      if (this.finished) {
        this.resetAnimation();
        this.finished = false;
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

      this.playInternal();
    });
  }

  public pause(): InterfaceAnimationInternal {
    this.childAnimations.forEach((animation) => {
      animation.pause();
    });

    this.pauseAnimation();

    return this;
  }

  public stop(): void {
    this.childAnimations.forEach((animation) => {
      animation.stop();
    });

    if (this.initialized) {
      this.cleanUpElements();
      this.initialized = false;
    }

    this._resetFlags();
  }

  public update(deep = false, toggleAnimationName = true, step?: number): InterfaceAnimationInternal {
    if (deep) {
      this.childAnimations.forEach((animation) => {
        animation.update(deep, toggleAnimationName, step);
      });
    }

    this.updateAnimationInternal(step, toggleAnimationName);

    return this;
  }

  public destroy(clearStyleSheets?: boolean): InterfaceAnimationInternal {
    this.childAnimations.forEach((childAnimation) => {
      childAnimation.destroy(clearStyleSheets);
    });

    this._cleanUp(clearStyleSheets);

    this.elements.length = 0;
    this.childAnimations.length = 0;
    this.animationKeyframes.length = 0;

    this._clearOnFinish();

    this.initialized = false;
    this._shouldCalculateNumAnimations = true;

    return this;
  }

  public animationFinish(): void {
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
  }

  public onFinish(callback: AnimationLifecycle, opts?: InterfaceAnimationCallbackOptions): InterfaceAnimationInternal {
    const callbacks = (opts && opts.oneTimeCallback)
      ? this._onFinishOneTimeCallbacks
      : this._onFinishCallbacks;

    callbacks.push({
      c: callback,
      o: opts
    });

    return this;
  }

  public progressStart(forceLinearEasing = false, step?: number): InterfaceAnimationInternal {
    this.childAnimations.forEach((animation) => {
      animation.progressStart(forceLinearEasing, step);
    });

    this.pauseAnimation();
    this.shouldForceLinearEasing = forceLinearEasing;

    if (!this.initialized) {
      this.initializeAnimation(true);
    }
    this.update(false, true, step);

    return this;
  }

  public progressStep(step: number): InterfaceAnimationInternal {
    this.childAnimations.forEach((animation) => {
      animation.progressStep(step);
    });
    this.setAnimationStep(step);

    return this;
  }

  public progressEnd(playTo: 0 | 1 | undefined, step: number, dur?: number): InterfaceAnimationInternal {
    this.shouldForceLinearEasing = false;

    this.childAnimations.forEach((animation) => {
      animation.progressEnd(playTo, step, dur);
    });

    if (dur !== undefined) {
      this.forceDurationValue = dur;
    }

    this.finished = false;

    this.willComplete = true;

    this.progressEndInternal(playTo, step);

    if (playTo !== undefined) {
      this.onFinish(() => {
        this.forceDurationValue = undefined;
        this.forceDirectionValue = undefined;
        this.forceDelayValue = undefined;
      }, {
        oneTimeCallback: true
      });

      if (!this.parentAnimation) {
        this.play();
      }
    }

    return this;
  }

  public getFill(): AnimationFill {
    return this._fill ?? this.parentAnimation?.getFill() ?? 'both';
  }

  public getDirection(): AnimationDirection {
    return this.forceDirectionValue ?? this._direction ?? this.parentAnimation?.getDirection() ?? 'normal';
  }

  public getEasing(): string {
    return this.shouldForceLinearEasing
      ? 'linear'
      : this._easing ?? this.parentAnimation?.getEasing() ?? 'linear';
  }

  public getDuration(): number {
    return this._shouldForceSyncPlayback
      ? 0
      : this.forceDurationValue ?? this.animationDuration ?? this.parentAnimation?.getDuration() ?? 0;
  }

  public getIterations(): number {
    return this._iterations ?? this.parentAnimation?.getIterations() ?? 1;
  }

  public getDelay(): number {
    return this.forceDelayValue ?? this._delay ?? this.parentAnimation?.getDelay() ?? 0;
  }

  public getKeyframes(): AnimationKeyFrames {
    return this.animationKeyframes;
  }

  public direction(animationDirection: AnimationDirection): InterfaceAnimationInternal {
    this._direction = animationDirection;

    this.update(true, true);

    return this;
  }

  public fill(animationFill: AnimationFill): InterfaceAnimationInternal {
    this._fill = animationFill;

    this.update(true, true);

    return this;
  }

  public delay(animationDelay: number): InterfaceAnimationInternal {
    this._delay = animationDelay;

    this.update(true, true);

    return this;
  }

  public easing(animationEasing: string): InterfaceAnimationInternal {
    this._easing = animationEasing;

    this.update(true, true);

    return this;
  }

  public duration(animationDuration: number): InterfaceAnimationInternal {

    this.animationDuration = animationDuration;

    this.update(true, true);

    return this;
  }

  public keyframes(keyframeValues: AnimationKeyFrames): InterfaceAnimationInternal {
    const different = this.animationKeyframes !== keyframeValues;

    this.animationKeyframes = keyframeValues;

    if (different) {
      this.updateKeyframes(this.animationKeyframes);
    }

    return this;
  }

  public iterations(animationIterations: number): InterfaceAnimationInternal {
    this._iterations = animationIterations;

    this.update(true, true);

    return this;
  }

  public from(property: string, value: any): InterfaceAnimationInternal {
    const firstFrame = this.animationKeyframes[0] as InterfaceAnimationKeyFrameEdge | undefined;

    if (firstFrame !== undefined && (firstFrame.offset === undefined || firstFrame.offset === 0)) {
      firstFrame[property] = value;
    } else {
      this.animationKeyframes = [
        {
          offset: 0,
          [property]: value
        },
        ...this.animationKeyframes
      ] as InterfaceAnimationKeyFrame[];
    }

    return this;
  }

  public to(property: string, value: any): InterfaceAnimationInternal {
    const lastFrame = this.animationKeyframes[this.animationKeyframes.length - 1] as InterfaceAnimationKeyFrameEdge | undefined;

    if (lastFrame !== undefined && (lastFrame.offset === undefined || lastFrame.offset === 1)) {
      lastFrame[property] = value;
    } else {
      this.animationKeyframes = [
        ...this.animationKeyframes,
        {
          offset: 1,
          [property]: value
        }
      ] as InterfaceAnimationKeyFrame[];
    }

    return this;
  }

  public fromTo(property: string, fromValue: any, toValue: any): InterfaceAnimation {
    return this
      .from(property, fromValue)
      .to(property, toValue);
  }

  /**
   * Run all "before" animation hooks.
   */
  protected beforeAnimation(): void {
    // Runs all before read callbacks
    this._beforeAddReadFunctions.forEach((callback) => callback());

    // Runs all before write callbacks
    this._beforeAddWriteFunctions.forEach((callback) => callback());

    // Update styles and classes before animation runs
    this._applyStylesBeforeAfterAnimations(this._beforeAddClasses, this._beforeRemoveClasses, this._beforeStylesValue);
  }

  /**
   * Removes the animation's stylesheets
   * from the DOM.
   */
  protected cleanUpStyleSheets(): void {
    for (const stylesheet of this.stylesheets) {

      /**
       * When sharing stylesheets, it's possible
       * for another animation to have already
       * cleaned up a particular stylesheet
       */
      stylesheet?.parentNode?.removeChild(stylesheet);
    }

    this.stylesheets.length = 0;
  }

  protected clearCSSAnimationsTimeout(): void {
    if (this.cssAnimationsTimerFallback) {
      clearTimeout(this.cssAnimationsTimerFallback);
    }
  }

  /**
   * Run all "after" animation hooks.
   */
  private _afterAnimation(): void {
    this.clearCSSAnimationsTimeout();

    // Runs all after read callbacks
    this._afterAddReadFunctions.forEach((callback) => callback());

    // Runs all after write callbacks
    this._afterAddWriteFunctions.forEach((callback) => callback());

    // Update styles and classes before animation ends
    const currentStep = this.willComplete
      ? 1
      : 0;

    this._applyStylesBeforeAfterAnimations(this._afterAddClasses, this._afterRemoveClasses, this._afterStylesValue);

    this._onFinishCallbacks.forEach((onFinishCallback) => onFinishCallback.c(currentStep, this));

    this._onFinishOneTimeCallbacks.forEach((onFinishCallback) => onFinishCallback.c(currentStep, this));

    this._onFinishOneTimeCallbacks.length = 0;

    this._shouldCalculateNumAnimations = true;
    if (this.willComplete) {
      this.finished = true;
    }
    this.willComplete = true;
  }

  private _applyStylesBeforeAfterAnimations(addClasses: string[], removeClasses: string[], styles: { [p: string]: any }): void {
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
  }

  /**
   * Cancels any Web Animations, removes
   * any animation properties from the
   * animation's elements, and removes the
   * animation's stylesheets from the DOM.
   */
  private _cleanUp(clearStyleSheets?: boolean): void {
    this.cleanUpElements();

    if (clearStyleSheets) {
      this.cleanUpStyleSheets();
    }
  }

  private _clearOnFinish(): InterfaceAnimationInternal {
    this._onFinishCallbacks.length = 0;
    this._onFinishOneTimeCallbacks.length = 0;

    return this;
  }

  private _resetFlags(): void {
    this.shouldForceLinearEasing = false;
    this._shouldForceSyncPlayback = false;
    this._shouldCalculateNumAnimations = true;
    this.forceDirectionValue = undefined;
    this.forceDurationValue = undefined;
    this.forceDelayValue = undefined;
    this._numAnimationsRunning = 0;
    this.finished = false;
    this.willComplete = true;
  }

}
