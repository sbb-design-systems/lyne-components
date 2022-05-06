export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';

export type AnimationFill = 'auto' | 'none' | 'forwards' | 'backwards' | 'both';

export type AnimationStyles = Record<string, any>;

export interface InterfaceAnimationKeyFrameEdge extends AnimationStyles {
  offset?: number;
}

export interface InterfaceAnimationKeyFrame extends AnimationStyles {
  offset: number;
}

export type AnimationKeyFrames = [InterfaceAnimationKeyFrameEdge, InterfaceAnimationKeyFrameEdge] | InterfaceAnimationKeyFrame[];

export interface InterfaceAnimationCallbackOptions {
  oneTimeCallback: boolean;
}

export interface InterfaceAnimationPlayOptions {
  sync: boolean;
}

export interface InterfaceAnimation {
  parentAnimation: InterfaceAnimation | undefined;
  elements: HTMLElement[];
  childAnimations: InterfaceAnimation[];
  id: string | undefined;

  /**
   * Play the animation
   *
   * If the `sync` options is `true`, the animation will play synchronously.
   * This is the equivalent of running the animation with a duration of 0ms.
   */
  play(opts?: InterfaceAnimationPlayOptions): Promise<void>;

  /**
   * Pauses the animation
   */
  pause(): void;

  /**
   * Stop the animation and reset
   * all elements to their initial state
   */
  stop(): void;

  /**
   * Destroy the animation and all child animations.
   */
  destroy(clearStyleSheets?: boolean): void;

  progressStart(forceLinearEasing?: boolean, step?: number): InterfaceAnimation;
  progressStep(step: number): InterfaceAnimation;
  progressEnd(playTo: 0 | 1 | undefined, step: number, dur?: number): InterfaceAnimation;

  from(property: string, value: any): InterfaceAnimation;
  to(property: string, value: any): InterfaceAnimation;
  fromTo(property: string, fromValue: any, toValue: any): InterfaceAnimation;

  /**
   * Set the keyframes for the animation.
   */
  keyframes(keyframes: AnimationKeyFrames): InterfaceAnimation;

  /**
   * Group one or more animations together
   * to be controlled by a parent animation.
   */
  addAnimation(animationToAdd: InterfaceAnimation | InterfaceAnimation[]): InterfaceAnimation;

  /**
   * Add one or more elements to the animation
   */
  addElement(el: Element | Element[] | Node | Node[] | NodeList): InterfaceAnimation;

  /**
   * Sets the number of times the animation cycle
   * should be played before stopping.
   */
  iterations(iterations: number): InterfaceAnimation;

  /**
   * Sets how the animation applies styles to its
   * elements before and after the animation's execution.
   */
  fill(fill: AnimationFill | undefined): InterfaceAnimation;

  /**
   * Sets whether the animation should play forwards,
   * backwards, or alternating back and forth.
   */
  direction(direction: AnimationDirection | undefined): InterfaceAnimation;

  /**
   * Sets the length of time the animation takes
   * to complete one cycle.
   */
  duration(duration: number | undefined): InterfaceAnimation;

  /**
   * Sets how the animation progresses through the
   * duration of each cycle.
   */
  easing(easing: string | undefined): InterfaceAnimation;

  /**
   * Sets when an animation starts (in milliseconds).
   */
  delay(delay: number | undefined): InterfaceAnimation;

  /**
   * Get an array of keyframes for the animation.
   */
  getKeyframes(): AnimationKeyFrames;

  /**
   * Returns the animation's direction.
   */
  getDirection(): AnimationDirection;

  /**
   * Returns the animation's fill mode.
   */
  getFill(): AnimationFill;

  /**
   * Gets the animation's delay in milliseconds.
   */
  getDelay(): number;

  /**
   * Gets the number of iterations the animation will run.
   */
  getIterations(): number;

  /**
   * Returns the animation's easing.
   */
  getEasing(): string;

  /**
   * Gets the animation's duration in milliseconds.
   */
  getDuration(): number;

  /**
   * Returns the raw Web Animations object
   * for all elements in an Animation.
   * This will return an empty array on
   * browsers that do not support
   * the Web Animations API.
   */
  getWebAnimations(): any[];

  /**
   * Add a function that performs a
   * DOM read to be run after the
   * animation end
   */
  afterAddRead(readFn: () => void): InterfaceAnimation;

  /**
   * Add a function that performs a
   * DOM write to be run after the
   * animation end
   */
  afterAddWrite(writeFn: () => void): InterfaceAnimation;

  /**
   * Clear CSS inline styles from the animation's
   * elements after the animation ends.
   */
  afterClearStyles(propertyNames: string[]): InterfaceAnimation;

  /**
   * Set CSS inline styles to the animation's
   * elements after the animation ends.
   */
  afterStyles(styles: { [property: string]: any }): InterfaceAnimation;

  /**
   * Add CSS class to the animation's
   * elements after the animation ends.
   */
  afterAddClass(className: string | string[]): InterfaceAnimation;

  /**
   * Remove CSS class from the animation's
   * elements after the animation ends.
   */
  afterRemoveClass(className: string | string[]): InterfaceAnimation;

  /**
   * Add a function that performs a
   * DOM read to be run before the
   * animation starts
   */
  beforeAddRead(readFn: () => void): InterfaceAnimation;

  /**
   * Add a function that performs a
   * DOM write to be run before the
   * animation starts
   */
  beforeAddWrite(writeFn: () => void): InterfaceAnimation;

  /**
   * Clear CSS inline styles from the animation's
   * elements before the animation begins.
   */
  beforeClearStyles(propertyNames: string[]): InterfaceAnimation;

  /**
   * Set CSS inline styles to the animation's
   * elements before the animation begins.
   */
  beforeStyles(styles: { [property: string]: any }): InterfaceAnimation;

  /**
   * Add a class to the animation's
   * elements before the animation starts
   */
  beforeAddClass(className: string | string[]): InterfaceAnimation;

  /**
   * Remove a class from the animation's
   * elements before the animation starts
   */
  beforeRemoveClass(className: string | string[]): InterfaceAnimation;

  /**
   * Add a callback to be run
   * upon the animation ending
   */
  // eslint-disable-next-line no-use-before-define
  onFinish(callback: AnimationLifecycle, opts?: InterfaceAnimationCallbackOptions): InterfaceAnimation;
}

export interface InterfaceAnimationInternal extends InterfaceAnimation {

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

export type AnimationLifecycle = (currentStep: 0 | 1, animation: InterfaceAnimation) => void;

export interface InterfaceAnimationOnFinishCallback {
  c: AnimationLifecycle;
  o?: InterfaceAnimationCallbackOptions;
}

export type AnimationBuilder = (baseEl: any, opts?: any) => InterfaceAnimation;
