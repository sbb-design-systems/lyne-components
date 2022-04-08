import { AnimationKeyFrames } from './animation-interface';

let animationPrefix: string | undefined;

const convertCamelCaseToHypen = (str: string): string => str
  // eslint-disable-next-line prefer-named-capture-group
  .replace(/([a-z0-9])([A-Z])/gu, '$1-$2')
  .toLowerCase();

/**
 * Web Animations requires to be hyphenated CSS properties
 * to be written in camelCase when animating
 */
export const processKeyframes = (keyframes: AnimationKeyFrames): AnimationKeyFrames => {
  keyframes.forEach((keyframe) => {
    for (const key in keyframe) {
      // eslint-disable-next-line no-prototype-builtins
      if (keyframe.hasOwnProperty(key)) {
        const value = keyframe[key];

        if (key === 'easing') {
          const newKey = 'animation-timing-function';

          keyframe[newKey] = value;
          delete keyframe[key];
        } else {
          const newKey = convertCamelCaseToHypen(key);

          if (newKey !== key) {
            keyframe[newKey] = value;
            delete keyframe[key];
          }
        }
      }
    }
  });

  return keyframes;
};

export const getAnimationPrefix = (el: HTMLElement): string => {
  if (animationPrefix === undefined) {
    const supportsUnprefixed = (el.style as any).animationName !== undefined;
    const supportsWebkitPrefix = (el.style as any).webkitAnimationName !== undefined;

    animationPrefix = (!supportsUnprefixed && supportsWebkitPrefix)
      ? '-webkit-'
      : '';
  }

  return animationPrefix;
};

export const setStyleProperty = (element: HTMLElement, propertyName: string, value: string | null): void => {
  const prefix = propertyName.startsWith('animation')
    ? getAnimationPrefix(element)
    : '';

  element.style.setProperty(prefix + propertyName, value);
};

export const removeStyleProperty = (element: HTMLElement, propertyName: string): void => {
  const prefix = propertyName.startsWith('animation')
    ? getAnimationPrefix(element)
    : '';

  element.style.removeProperty(prefix + propertyName);
};

export const animationEnd = (el: HTMLElement | null, callback: (ev?: TransitionEvent) => void): () => void => {
  let unRegTrans: (() => void) | undefined;
  const opts: any = {
    passive: true
  };

  const unregister = (): void => {
    if (unRegTrans) {
      unRegTrans();
    }
  };

  const onTransitionEnd = (ev: Event): void => {
    if (el === ev.target) {
      unregister();
      // eslint-disable-next-line callback-return
      callback(ev as TransitionEvent);
    }
  };

  if (el) {
    el.addEventListener('webkitAnimationEnd', onTransitionEnd, opts);
    el.addEventListener('animationend', onTransitionEnd, opts);

    unRegTrans = (): void => {
      el.removeEventListener('webkitAnimationEnd', onTransitionEnd, opts);
      el.removeEventListener('animationend', onTransitionEnd, opts);
    };
  }

  return unregister;
};

export const generateKeyframeRules = (keyframes: any[] = []): string => keyframes
  .map((keyframe) => {
    const {
      offset
    } = keyframe;

    const frameString = [];

    for (const property in keyframe) {
      // eslint-disable-next-line no-prototype-builtins
      if (keyframe.hasOwnProperty(property) && property !== 'offset') {
        frameString.push(`${property}: ${keyframe[property]};`);
      }
    }

    return `${offset * 100}% { ${frameString.join(' ')} }`;
  })
  .join(' ');

const keyframeIds: string[] = [];

export const generateKeyframeName = (keyframeRules: string): string => {
  let index = keyframeIds.indexOf(keyframeRules);

  if (index < 0) {
    index = (keyframeIds.push(keyframeRules) - 1);
  }

  return `ion-animation-${index}`;
};

export const getStyleContainer = (element: HTMLElement): any => {
  const rootNode = (element.getRootNode() as any);

  return (rootNode.head || rootNode);
};

export const createKeyframeStylesheet = (keyframeName: string, keyframeRules: string, element: HTMLElement): HTMLElement => {
  const styleContainer = getStyleContainer(element);
  const keyframePrefix = getAnimationPrefix(element);

  const existingStylesheet = styleContainer.querySelector(`#${keyframeName}`);

  if (existingStylesheet) {
    return existingStylesheet;
  }

  const stylesheet = (element.ownerDocument || document).createElement('style');

  stylesheet.id = keyframeName;
  stylesheet.textContent = `@${keyframePrefix}keyframes ${keyframeName} { ${keyframeRules} } @${keyframePrefix}keyframes ${keyframeName}-alt { ${keyframeRules} }`;

  styleContainer.appendChild(stylesheet);

  return stylesheet;
};

export const addClassToArray = (classes: string[] = [], className: string | string[] | undefined): string[] => {
  if (className !== undefined) {
    const classNameToAppend = (Array.isArray(className))
      ? className
      : [className];

    return [
      ...classes,
      ...classNameToAppend
    ];
  }

  return classes;
};
