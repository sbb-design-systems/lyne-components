/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// Copied from https://github.com/angular/components/blob/main/src/cdk/testing/testbed/fake-events/type-in-element.ts

import type { SbbFormAssociatedInputMixinType } from '../../mixins.js';

import { dispatchFakeEvent, dispatchKeyboardEvent } from './dispatch-events.js';

const PERIOD = 190;

/** Modifier keys that may be held while typing. */
interface ModifierKeys {
  control?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
}

/**
 * Returns an error which reports that no keys have been specified.
 * @docs-private
 */
function getNoKeysSpecifiedError(): Error {
  return Error('No keys have been specified.');
}

/** Input types for which the value can be entered incrementally. */
const incrementalInputTypes = new Set([
  'text',
  'email',
  'hidden',
  'password',
  'search',
  'tel',
  'url',
]);

/**
 * Checks whether the given Element is a text input element.
 * @docs-private
 */
export function isTextInput(element: Element): element is HTMLInputElement | HTMLTextAreaElement {
  const nodeName = element.nodeName.toLowerCase();
  return (
    nodeName === 'input' ||
    nodeName === 'textarea' ||
    (nodeName.startsWith('sbb-') && nodeName.endsWith('-input'))
  );
}

/**
 * If keys have been specified, focuses an input, sets its value and dispatches
 * the `input` event, simulating the user typing.
 * @param element Element onto which to set the value.
 * @param keys The keys to send to the element.
 * @docs-private
 */
export function typeInElement(
  element: HTMLElement,
  ...keys: (string | { keyCode?: number; key?: string })[]
): void;

/**
 * If keys have been specified, focuses an input, sets its value and dispatches
 * the `input` event, simulating the user typing.
 * @param element Element onto which to set the value.
 * @param modifiers Modifier keys that are held while typing.
 * @param keys The keys to send to the element.
 * @docs-private
 */
export function typeInElement(
  element: HTMLElement,
  modifiers: ModifierKeys,
  ...keys: (string | { keyCode?: number; key?: string })[]
): void;

export function typeInElement(element: HTMLElement, ...modifiersAndKeys: any[]): void {
  const first = modifiersAndKeys[0];
  let modifiers: ModifierKeys;
  let rest: (string | { keyCode?: number; key?: string })[];
  if (
    first !== undefined &&
    typeof first !== 'string' &&
    first.keyCode === undefined &&
    first.key === undefined
  ) {
    modifiers = first;
    rest = modifiersAndKeys.slice(1);
  } else {
    modifiers = {};
    rest = modifiersAndKeys;
  }
  const isInput = isTextInput(element);
  const inputType = element.getAttribute('type') || 'text';
  const keys: { keyCode?: number; key?: string }[] = rest
    .map((k) =>
      typeof k === 'string'
        ? k.split('').map((c) => ({ keyCode: c.toUpperCase().charCodeAt(0), key: c }))
        : [k],
    )
    .reduce((arr, k) => arr.concat(k), []);

  // Throw an error if no keys have been specified. Calling this function with no
  // keys should not result in a focus event being dispatched unexpectedly.
  if (keys.length === 0) {
    throw getNoKeysSpecifiedError();
  }

  // We simulate the user typing in a value by incrementally assigning the value below. The problem
  // is that for some input types, the browser won't allow for an invalid value to be set via the
  // `value` property which will always be the case when going character-by-character. If we detect
  // such an input, we have to set the value all at once or listeners to the `input` event (e.g.
  // the `ReactiveFormsModule` uses such an approach) won't receive the correct value.
  const enterValueIncrementally =
    inputType === 'number'
      ? // The value can be set character by character in number inputs if it doesn't have any decimals.
        keys.every((key) => key.key !== '.' && key.key !== '-' && key.keyCode !== PERIOD)
      : incrementalInputTypes.has(inputType);

  element.focus();

  // When we aren't entering the value incrementally, assign it all at once ahead
  // of time so that any listeners to the key events below will have access to it.
  if (!enterValueIncrementally) {
    (element as HTMLInputElement).value = keys.reduce((value, key) => value + (key.key || ''), '');
  }

  let lastChangeValue = '';
  for (const key of keys) {
    if (
      !dispatchKeyboardEvent(element, 'keydown', key.keyCode, key.key, modifiers).defaultPrevented
    ) {
      dispatchKeyboardEvent(element, 'keypress', key.keyCode, key.key, modifiers);
      if (isInput && key.key) {
        if (key.key.length === 1 && enterValueIncrementally) {
          (element as HTMLInputElement | HTMLTextAreaElement).value += key.key;
          dispatchFakeEvent(element, 'input');
        } else if (key.key === 'Enter' && element.value !== lastChangeValue) {
          lastChangeValue = element.value;
          dispatchFakeEvent(element, 'change');
        }
      }
    }
    dispatchKeyboardEvent(element, 'keyup', key.keyCode, key.key, modifiers);
  }

  // Since we weren't dispatching `input` events while sending the keys, we have to do it now.
  if (!enterValueIncrementally) {
    dispatchFakeEvent(element, 'input');
  }

  // Our input implementations already dispatch change on blur.
  if (isInput && !element.localName.startsWith('sbb') && element.value !== lastChangeValue) {
    element.addEventListener('blur', () => dispatchFakeEvent(element, 'change'), { once: true });
  }
}

/**
 * Clears the text in an input or textarea element.
 * @docs-private
 */
export function clearElement(
  element: HTMLInputElement | HTMLTextAreaElement | (SbbFormAssociatedInputMixinType & HTMLElement),
): void {
  element.focus();
  element.value = '';
  dispatchFakeEvent(element, 'input');
}
