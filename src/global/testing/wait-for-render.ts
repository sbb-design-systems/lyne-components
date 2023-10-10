import { ReactiveElement } from 'lit';

/**
 * Tests if an element is a Lit `ReactiveElement`.
 *
 * @param element the element to test.
 * @return true if the element is a `ReactiveElement`.
 */
export const isReactiveElement = (element: Element): element is ReactiveElement => {
  return Boolean((element as ReactiveElement).updateComplete);
};

/**
 * Waits for all Lit `ReactiveElement` children of the given parent node to
 * finish rendering.
 *
 * @param root a parent node to wait for rendering on.
 */
export const waitForLitRender = async (root: ParentNode): Promise<void> => {
  for (const element of [root, ...root.querySelectorAll('*')] as Element[]) {
    if (isReactiveElement(element)) {
      await element.updateComplete;
      await waitForLitRender(element.renderRoot);
    }
  }
};
