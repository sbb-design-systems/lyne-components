import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { ButtonProperties, ButtonType } from '../interfaces';

import { Constructor } from './constructor';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ButtonPropertiesMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): Constructor<ButtonProperties> & T => {
  class SbbButtonBaseElement extends superClass implements ButtonProperties {
    /** The type attribute to use for the button. */
    @property() public type?: ButtonType;

    /** Whether the button is disabled. */
    @property({ reflect: true, type: Boolean }) public disabled?: boolean = false;

    /** The name attribute to use for the button. */
    @property({ reflect: true }) public name?: string;

    /** The value attribute to use for the button. */
    @property() public value?: string;

    /** The <form> element to associate the button with. */
    @property() public form?: string;
  }
  return SbbButtonBaseElement as Constructor<ButtonProperties> & T;
};
