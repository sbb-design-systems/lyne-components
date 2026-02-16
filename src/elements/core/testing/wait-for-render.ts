import type { ReactiveElement } from 'lit';

import type { SbbHydrationMixinType } from '../mixins.ts';

/**
 * Tests if an element is a Lit `ReactiveElement`.
 *
 * @param element the element to test.
 * @return true if the element is a `ReactiveElement`.
 */
export const isReactiveElement = (
  element: Element,
): element is ReactiveElement & Partial<SbbHydrationMixinType> => {
  return Boolean((element as ReactiveElement).updateComplete);
};

const promiseComplete = Promise.resolve();

/**
 * Waits for all Lit `ReactiveElement` children of the given parent node to
 * finish rendering.
 *
 * @param node a parent node to wait for rendering on.
 */
export const waitForLitRender = async <
  T extends HTMLElement | DocumentFragment = HTMLElement | DocumentFragment,
>(
  node: T | Promise<T>,
): Promise<T> => {
  const root = await node;
  (root.parentElement ?? root)
    .querySelectorAll?.('[defer-hydration]')
    .forEach((e) => e.removeAttribute('defer-hydration'));
  const completables = [root as Element, ...root.querySelectorAll('*')]
    .filter(isReactiveElement)
    .map((e) => [
      e.updateComplete,
      e.hydrationComplete ?? promiseComplete,
      waitForLitRender(e.renderRoot),
    ])
    .flat(Infinity);
  await Promise.all(completables);
  return root;
};
