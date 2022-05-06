import {
  AnimationKeyFrames,
  InterfaceAnimationInternal
} from './animation-interface';
import { AbstractAnimation } from './animation-abstract';

export class AnimationWeb extends AbstractAnimation {

  public update = (deep = false, toggleAnimationName = true, step?: number): InterfaceAnimationInternal => {
    if (deep) {
      this.childAnimations.forEach((animation) => {
        animation.update(deep, toggleAnimationName, step);
      });
    }

    this._updateWebAnimation(step);

    return this;
  };

  public setAnimationStep = (step: number): void => {
    const safeStep = Math.min(Math.max(step, 0), 0.9999);

    for (const animation of this.webAnimations) {
      animation.currentTime = animation.effect.getComputedTiming().delay + (this.getDuration() * safeStep);
      animation.pause();
    }
  };

  protected initializeAnimation = (): void => {
    this.beforeAnimation();

    if (this.animationKeyframes.length > 0) {
      this._initializeWebAnimation();
    }

    this.initialized = true;
  };

  protected playImpl = (): void => {
    this._playWebAnimations();
  };

  protected pauseAnimation = (): void => {
    if (this.initialized) {
      this.webAnimations.forEach((animation) => {
        animation.pause();
      });
    }
  };

  protected progressEndImpl(playTo: 0 | 1, step: number): void {
    if (playTo === 0) {
      this.forceDirectionValue = (this.getDirection() === 'reverse')
        ? 'normal'
        : 'reverse';
      if (this.forceDirectionValue === 'reverse') {
        this.willComplete = false;
      }
      this.update();
      this.setAnimationStep(1 - step);
    } else if (playTo === 1) {
      this.update();
      this.setAnimationStep(step);
    }
  }

  protected updateKeyframes = (keyframeValues: AnimationKeyFrames): void => {
    const animations = this.getWebAnimations();

    for (const animation of animations) {
      if (animation.effect.setKeyframes) {
        animation.effect.setKeyframes(keyframeValues);
      } else {
        animation.effect = new KeyframeEffect(animation.effect.target, keyframeValues, animation.effect.getTiming());
      }
    }
  };

  /**
   * Cancels any Web Animations and removes
   * any animation properties from
   * the animation's elements.
   */
  protected cleanUpElements = (): void => {
    this.webAnimations.forEach((animation) => {
      animation.cancel();
    });

    this.webAnimations.length = 0;
  };

  protected resetAnimation = (): void => {
    this.setAnimationStep(0);
    this._updateWebAnimation();
  };

  private _initializeWebAnimation = (): void => {
    for (const element of this.elements) {
      const animation = element.animate(this.animationKeyframes, {
        delay: this.getDelay(),
        direction: this.getDirection(),
        duration: this.getDuration(),
        easing: this.getEasing(),
        fill: this.getFill(),
        id: this.id,
        iterations: this.getIterations()
      });

      animation.pause();

      this.webAnimations.push(animation);
    }

    if (this.webAnimations.length > 0) {
      this.webAnimations[0].onfinish = (): void => {
        this.animationFinish();
      };
    }

  };

  private _playWebAnimations = (): void => {
    this.webAnimations.forEach((animation) => {
      animation.play();
    });

    if (this.animationKeyframes.length === 0 || this.elements.length === 0) {
      this.animationFinish();
    }
  };

  private _updateWebAnimation = (step?: number): void => {
    for (const animation of this.webAnimations) {
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
      this.setAnimationStep(step);
    }
  };

}
