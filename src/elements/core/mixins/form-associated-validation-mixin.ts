import { type LitElement } from 'lit';

import type { AbstractConstructor, Constructor } from './constructor.js';
import {
  SbbFormAssociatedMixin,
  type SbbFormAssociatedMixinType,
} from './form-associated-mixin.js';

const validityKeys: Required<ValidityStateFlags> = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valueMissing: false,
};

export declare abstract class SbbFormAssociatedValidationMixinType<
  V = string,
> extends SbbFormAssociatedMixinType<V> {
  public get validity(): ValidityState;
  public get validationMessage(): string;
  public get willValidate(): boolean;

  public checkValidity(): boolean;
  public reportValidity(): boolean;
  public setValidity(flags?: ValidityStateFlags, message?: string): void;
}

/**
 * The SbbFormAssociatedValidationMixin enables setting validity.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbFormAssociatedValidationMixin = <
  T extends AbstractConstructor<LitElement>,
  V = string,
>(
  superClass: T,
): Constructor<SbbFormAssociatedValidationMixinType<V>> & T => {
  abstract class SbbFormAssociatedCheckboxElement
    extends SbbFormAssociatedMixin<T, V>(superClass)
    implements Partial<SbbFormAssociatedValidationMixinType<V>>
  {
    /**
     * Returns the ValidityState object for internals target element.
     */
    public override get validity(): ValidityState {
      return this.internals.validity;
    }

    /**
     * Returns the error message that would be shown to the user
     * if internals target element was to be checked for validity.
     */
    public override get validationMessage(): string {
      return this.internals.validationMessage;
    }

    /**
     * Returns true if internals target element will be validated
     * when the form is submitted; false otherwise.
     */
    public override get willValidate(): boolean {
      return this.internals.willValidate;
    }

    /**
     * Returns true if internals target element has no validity problems; false otherwise.
     * Fires an invalid event at the element in the latter case.
     */
    public override checkValidity(): boolean {
      return this.internals.checkValidity();
    }

    /**
     * Returns true if internals target element has no validity problems; otherwise,
     * returns false, fires an invalid event at the element,
     * and (if the event isn't canceled) reports the problem to the user.
     */
    public override reportValidity(): boolean {
      return this.internals.reportValidity();
    }

    /**
     * Marks this element as suffering from the constraints indicated by the flags argument,
     * and sets the element's validation message to message.
     * To set/define custom validity state flags, you need to extend the ValidityState prototype
     * and both the ValidityState and the ValidityStateFlags interface.
     *
     * @example
     *
     *   // The type of the custom validity state does not need to be boolean.
     *   Object.assign(ValidityState.prototype, {
     *     get myError(): boolean {
     *       return false;
     *     },
     *   });
     *
     *   declare global {
     *     interface ValidityState {
     *       myError: boolean;
     *     }
     *     interface ValidityState {
     *       myError?: boolean;
     *     }
     *   }
     */
    public setValidity(flags: ValidityStateFlags = {}, message?: string): void {
      const customFlags = Object.keys(ValidityState.prototype).filter(
        (f) => !(f in validityKeys) && f !== 'valid',
      );
      for (const flag of customFlags) {
        const value = flag in flags ? flags[flag as keyof ValidityStateFlags] : false;
        Object.defineProperty(this.internals.validity, flag, { value, configurable: true });
        if (value) {
          // If any custom errors are provided, we need to set customError to true,
          // as this is the only custom property browsers accept.
          flags.customError = true;
        }
      }
      this.internals.setValidity(flags, message);
    }
  }

  return SbbFormAssociatedCheckboxElement as unknown as Constructor<
    SbbFormAssociatedValidationMixinType<V>
  > &
    T;
};
