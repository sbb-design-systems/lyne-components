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

declare global {
  interface ARIAMixin {
    ariaActiveDescendantElement: Element | null;
    ariaControlsElements: readonly Element[] | null;
    ariaDescribedByElements: readonly Element[] | null;
    ariaDetailsElements: readonly Element[] | null;
    ariaErrorMessageElements: readonly Element[] | null;
    ariaLabelledByElements: readonly Element[] | null;
    ariaOwnsElements: readonly Element[] | null;
  }
}

if (!isServer) {
  // This is a polyfill for the aria elements properties on ElementInternals and Element.
  let nextId = 0;
  const resolveHost = (origin: ElementInternals | Element): Element =>
    origin.shadowRoot?.host ??
    (origin instanceof Element
      ? origin
      : (() => {
          throw new Error('Unable to resolve related element! This should never happen.');
        })());
  const observerOptions: MutationObserverInit = { attributes: true, attributeFilter: ['id'] };
  const assignElement = (
    host: Element,
    attribute: string,
    elements: Record<string, Element>,
  ): void => {
    // In case both Element and ElementInternals properties are set,
    // the element reference from Element has priority.
    const activeElement = elements[Element.name] ?? elements[ElementInternals.name];
    host.setAttribute(attribute, (activeElement.id ||= `aria-ref-${nextId++}`));
  };
  const assignElements = (
    host: Element,
    attribute: string,
    elements: Record<string, Element[]>,
  ): void => {
    // In case both Element and ElementInternals properties are set,
    // we combine the element references.
    host.setAttribute(
      attribute,
      Object.values(elements)
        .reduce((current, next) => current.concat(next))
        .filter((v, i, a) => a.indexOf(v) === i)
        .map((e) => e.id || (e.id = `aria-ref-${nextId++}`))
        .join(' '),
    );
  };

  for (const type of [ElementInternals, Element]) {
    const prototype = type.prototype;
    if (!('ariaActiveDescendantElement' in prototype)) {
      const attribute = 'aria-activedescendant';
      const storage = new WeakMap<
        Element,
        { elements: Record<string, Element>; observer: MutationObserver }
      >();
      Object.defineProperty(prototype, 'ariaActiveDescendantElement', {
        enumerable: true,
        configurable: true,
        get(this: ElementInternals | Element): Element | null {
          const host = resolveHost(this);
          const id = host.getAttribute(attribute)?.split(/\s+/)[0] ?? null;
          return id
            ? ((host.getRootNode() as Document | ShadowRoot).getElementById?.(id) ?? null)
            : null;
        },
        set(this: ElementInternals | Element, value: Element | null) {
          if (value !== null && !(value instanceof Element)) {
            throw new TypeError(
              `Failed to set the 'ariaActiveDescendantElement' property on '${type.name}': Failed to convert value to 'Element'.`,
            );
          }

          const host = resolveHost(this);
          const entry = storage.get(host);
          entry?.observer?.disconnect();
          if (value === null) {
            if (entry) {
              delete entry.elements[type.name];
              if (!Object.keys(entry).length) {
                storage.delete(host);
                host.removeAttribute(attribute);
              } else {
                entry.observer.observe(Object.values(entry.elements)[0], observerOptions);
              }
            }
          } else if (!entry) {
            const elements: Record<string, Element> = { [type.name]: value };
            assignElement(host, attribute, elements);
            const observer = new MutationObserver(() => assignElement(host, attribute, elements));
            observer.observe(value, observerOptions);
            storage.set(host, { elements, observer });
          } else {
            entry.elements[type.name] = value;
            assignElement(host, attribute, entry.elements);
            Object.values(entry.elements).forEach((e) =>
              entry.observer.observe(e, observerOptions),
            );
          }
        },
      });
    }

    for (const property of [
      'ariaControlsElements',
      'ariaDescribedByElements',
      'ariaDetailsElements',
      'ariaErrorMessageElements',
      'ariaLabelledByElements',
      'ariaOwnsElements',
    ]) {
      if (!(property in prototype)) {
        const storage = new WeakMap<
          Element,
          { elements: Record<string, Element[]>; observer: MutationObserver }
        >();
        const attribute = `aria-${property.slice(4, -8).toLowerCase()}`;
        Object.defineProperty(prototype, property, {
          enumerable: true,
          configurable: true,
          get(this: ElementInternals | Element): readonly Element[] | null {
            const host = resolveHost(this);
            const elements = host
              .getAttribute(attribute)
              ?.split(/\s+/)
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((id) => (host.getRootNode() as Document | ShadowRoot).getElementById?.(id))
              .filter((e) => e instanceof Element);
            return elements?.length ? Object.freeze(elements) : null;
          },
          set(this: ElementInternals | Element, value: Element[]) {
            if (
              value !== null &&
              (!Array.isArray(value) || value.some((element) => !(element instanceof Element)))
            ) {
              throw new TypeError(
                `Failed to set the '${property}' property on '${type.name}': Failed to convert value to 'Element'.`,
              );
            }

            const host = resolveHost(this);
            value = value?.filter((v, i, a) => a.indexOf(v) === i) ?? null;
            const entry = storage.get(host);
            entry?.observer?.disconnect();
            if (value === null) {
              if (entry) {
                delete entry.elements[type.name];
                if (!Object.keys(entry.elements).length) {
                  storage.delete(host);
                } else {
                  Object.values(entry.elements)
                    .reduce((current, next) => current.concat(next))
                    .forEach((e) => entry.observer.observe(e, observerOptions));
                }
              }
            } else if (!entry) {
              const elements: Record<string, Element[]> = { [type.name]: value };
              assignElements(host, attribute, elements);
              const observer = new MutationObserver(() =>
                assignElements(host, attribute, elements),
              );
              value.forEach((element) => observer.observe(element, observerOptions));
              storage.set(host, { elements, observer });
            } else {
              entry.elements[type.name] = value;
              assignElements(host, attribute, entry.elements);
              Object.values(entry.elements)
                .reduce((current, next) => current.concat(next))
                .forEach((e) => entry.observer.observe(e, observerOptions));
            }
          },
        });
      }
    }
  }
}

export interface SbbElementInternalsConstructor {
  role?: ElementInternals['role'];
}

export declare abstract class SbbElementInternalsMixinType {
  protected readonly internals: ElementInternals;
  protected toggleState(state: string, force?: boolean): void;
}

/**
 * Appends the given elements to the given aria value and returns the
 * combined value as a new array or null, if both values were empty.
 */
export const appendAriaElements = (
  ariaValue: readonly Element[] | null,
  ...newElements: (Element | null)[]
): Element[] | null => {
  const elements = newElements.filter((v): v is Element => !!v);
  return ariaValue?.length ? ariaValue.concat(elements) : newElements.length ? elements : null;
};

/**
 * Removes the given elements from the given aria value and returns
 * the remaining elements as a new array or null, if the result is empty.
 */
export const removeAriaElements = (
  ariaValue: readonly Element[] | null,
  ...removableElements: (Element | null)[]
): Element[] | null => {
  removableElements = removableElements.filter((v) => !!v);
  const elements = ariaValue?.filter((v) => !removableElements.includes(v)) ?? null;
  return elements?.length ? elements : null;
};

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

    protected toggleState(state: string, force?: boolean): void {
      if (force || (force !== false && !this.internals.states.has(state))) {
        this.internals.states.add(state);
      } else {
        this.internals.states.delete(state);
      }
    }
  }
  return SbbElementInternalElement as unknown as AbstractConstructor<SbbElementInternalsMixinType> &
    T &
    SbbElementInternalsConstructor;
};
