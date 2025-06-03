import { isServer, type LitElement, type ReactiveController } from 'lit';

import type { AbstractConstructor } from './constructor.js';

// Most of our target browsers support the :state() pseudo class, but not all of them.
// We patch the states property of the element internals to use attributes instead,
// if :state() is not supported.
// Note that for SSR, the states property is a simple Set, implemented in Lit SSR.
// TODO: Remove in 2026.
type CustomStateSetInterface = CustomStateSet;
// eslint-disable-next-line @typescript-eslint/naming-convention
const CustomStateSetPolyfill: (new (host: LitElement) => CustomStateSetInterface) | null =
  !isServer && !CSS.supports('selector(:state(loading))')
    ? class CustomStateSet
        extends Set<string>
        implements CustomStateSetInterface, ReactiveController
      {
        public constructor(private _host: LitElement) {
          super();
          this._host.addController(this);
        }

        public override add(state: string): this {
          if (this._host.isConnected) {
            this._toggleState(state, true);
          }
          return super.add(state);
        }

        public override delete(state: string): boolean {
          this._toggleState(state, false);
          return super.delete(state);
        }

        public override clear(): void {
          this.forEach((state) => this.delete(state));
        }

        public hostConnected(): void {
          this.forEach((state) => this._toggleState(state, true));
        }

        private _toggleState(state: string, enabled: boolean): void {
          this._host.toggleAttribute(`state--${state}`, enabled);
        }
      }
    : null;

export interface SbbElementInternalsConstructor {
  role?: ElementInternals['role'];
}

export declare abstract class SbbElementInternalsMixinType {
  protected readonly internals: ElementInternals;
}

/**
 * The SbbElementInternalsMixin attaches ElementInternals to the element and sets
 * the role, if defined.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbElementInternalsMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbElementInternalsMixinType> & T & SbbElementInternalsConstructor => {
  abstract class SbbElementInternalElement
    extends superClass
    implements Partial<SbbElementInternalsMixinType>
  {
    /** @internal */
    protected readonly internals: ElementInternals = this.attachInternals();

    public constructor(...args: any[]) {
      super(...args);
      if (CustomStateSetPolyfill) {
        Object.defineProperty(this.internals, 'states', {
          value: new CustomStateSetPolyfill(this),
          writable: false,
          configurable: false,
          enumerable: false,
        });
      }
      const role = (this.constructor as SbbElementInternalsConstructor).role;
      if (role) {
        this.internals.role = role;
      }
    }
  }
  return SbbElementInternalElement as unknown as AbstractConstructor<SbbElementInternalsMixinType> &
    T &
    SbbElementInternalsConstructor;
};
