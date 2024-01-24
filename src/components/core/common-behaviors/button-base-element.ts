import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { getDocumentWritingMode } from '../dom';

import { hostProperties } from './host-properties';

/** Enumeration for type attribute in <button> HTML tag. */
export type ButtonType = 'button' | 'reset' | 'submit';

/** The interface contains attributes that can be set on a <button> tag.  */
export interface ButtonProperties {
  type?: ButtonType;
  name?: string;
  value?: string;
  form?: string;
  disabled?: boolean;
}

/** Button base class. */
export class SbbButtonBaseElement extends LitElement implements ButtonProperties {
  /** The type attribute to use for the button. */
  @property() public type?: ButtonType;

  /** The name attribute to use for the button. */
  @property({ reflect: true }) public name?: string;

  /** The value attribute to use for the button. */
  @property() public value?: string;

  /** The <form> element to associate the button with. */
  @property() public form?: string;
}

/** Sets default render variables for button-like elements. */
export function resolveButtonRenderVariables(
  disabled: boolean = false,
): Record<string, string | undefined> {
  return hostProperties('button', disabled);
}

/** Sets default render variables for button-like elements considering the static case. */
export function resolveButtonOrStaticRenderVariables(
  isStatic: boolean,
  disabled: boolean,
): Record<string, string | undefined> {
  return isStatic ? { dir: getDocumentWritingMode() } : resolveButtonRenderVariables(disabled);
}
