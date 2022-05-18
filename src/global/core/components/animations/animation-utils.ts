import { AnimationKeyFrames } from './animation-interface';

const convertCamelCaseToHypen = (str: string): string => str
  // eslint-disable-next-line prefer-named-capture-group
  .replace(/([a-z0-9])([A-Z])/gu, '$1-$2')
  .toLowerCase();

/**
 * Web Animations requires to be hyphenated CSS properties
 * to be written in camelCase when animating
 */
export const processKeyframes = (keyframes: AnimationKeyFrames): AnimationKeyFrames => {
  for (const keyframe of keyframes) {
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

          // eslint-disable-next-line max-depth
          if (newKey !== key) {
            keyframe[newKey] = value;
            delete keyframe[key];
          }
        }
      }
    }
  }

  return keyframes;
};

export const setStyleProperty = (element: HTMLElement, propertyName: string, value: string | null): void => {
  element.style.setProperty(propertyName, value);
};

export const removeStyleProperty = (element: HTMLElement, propertyName: string): void => {
  element.style.removeProperty(propertyName);
};

export const removeStyleProperties = (element: HTMLElement, propertyNames: string[]): void => {
  propertyNames.forEach((propertyName: string) => removeStyleProperty(element, propertyName));
};

export const animationEnd = (el: HTMLElement | null, callback: (ev?: TransitionEvent) => void): () => void => {
  let unregisterTransition: (() => void) | undefined;
  const opts: any = {
    passive: true
  };

  const unregister = (): void => unregisterTransition?.();

  const onTransitionEnd = (ev: Event): void => {
    if (el === ev.target) {
      unregister();
      // eslint-disable-next-line callback-return
      callback(ev as TransitionEvent);
    }
  };

  if (el) {
    el.addEventListener('animationend', onTransitionEnd, opts);

    unregisterTransition = (): void => {
      el.removeEventListener('animationend', onTransitionEnd, opts);
    };
  }

  return unregister;
};

export const generateKeyframeRules = (keyframes: any[] = []): string => keyframes
  .map((keyframe) => {
    const {
      offset, ...properties
    } = keyframe;

    const frameString = Object.entries(properties)
      .map(([
        key,
        value
      ]) => `${key}: ${value};`);

    return `${offset * 100}% { ${frameString.join(' ')} }`;
  })
  .join(' ');

const keyframeIds: string[] = [];

export const generateKeyframeName = (keyframeRules: string): string => {
  let index = keyframeIds.indexOf(keyframeRules);

  if (index < 0) {
    index = (keyframeIds.push(keyframeRules) - 1);
  }

  return `lyne-animation-${index}`;
};

export const getStyleContainer = (element: HTMLElement): any => {
  const rootNode = (element.getRootNode() as any);

  return (rootNode.head || rootNode);
};

export const createKeyframeStylesheet = (keyframeName: string, keyframeRules: string, element: HTMLElement): HTMLElement => {
  const styleContainer = getStyleContainer(element);

  const existingStylesheet = styleContainer.querySelector(`#${keyframeName}`);

  if (existingStylesheet) {
    return existingStylesheet;
  }

  const stylesheet = (element.ownerDocument || document).createElement('style');

  stylesheet.id = keyframeName;
  stylesheet.textContent = `@keyframes ${keyframeName} { ${keyframeRules} } @keyframes ${keyframeName}-alt { ${keyframeRules} }`;

  styleContainer.appendChild(stylesheet);

  return stylesheet;
};

export const addClassToArray = (classes: string[] = [], className: string | string[] | undefined): string[] => (
  className === undefined
    ? classes
    : classes.concat(className)
);
