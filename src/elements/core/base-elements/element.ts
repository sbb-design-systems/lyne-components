import {
  isServer,
  LitElement,
  type PropertyDeclaration,
  type PropertyValues,
  type ReactiveController,
} from 'lit';

// Most of our target browsers support the :state() pseudo class, but not all of them.
// We patch the states property of the element internals to use attributes instead,
// if :state() is not supported.
// Note that for SSR, the states property is a simple Set, implemented in Lit SSR.
type CustomStateSetInterface = CustomStateSet;
// eslint-disable-next-line @typescript-eslint/naming-convention
const CustomStateSetPolyfill: (new (host: LitElement) => CustomStateSetInterface) | null =
  isServer || !CSS.supports('selector(:state(loading))')
    ? class CustomStateSet
        extends Set<string>
        implements CustomStateSetInterface, ReactiveController
      {
        private _applied = isServer;

        public constructor(private _host: LitElement) {
          super();
          this._host.addController(this);
          if (!isServer) {
            // We want to apply the attributes as early as possible which can
            // either be via this Promise.resolve() or the connectedCallback().
            Promise.resolve().then(() => this._applyStates());
          }
        }

        public override add(state: string): this {
          if (this._applied) {
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
          this._applyStates();
        }

        private _toggleState(state: string, enabled: boolean): void {
          this._host.toggleAttribute(`state--${state}`, enabled);
        }

        private _applyStates(): void {
          if (this._applied) {
            return;
          }
          this._applied = true;
          this.forEach((state) => this._toggleState(state, true));
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

const attachedElementInternals = new WeakMap<Element, ElementInternals>();

export interface SbbStateController {
  add(value: string): this;
  delete(value: string): boolean;
  has(value: string): boolean;
  toggle(value: string, force?: boolean): void;
}

/**
 * Creates a state controller for the given element.
 * NOT INTENDED TO BE USED BY CONSUMERS!
 * @internal
 */
export function ɵstateController(element: Element): SbbStateController;
export function ɵstateController(element: Element | undefined | null): SbbStateController | null;
export function ɵstateController(element: Element | undefined | null): SbbStateController | null {
  if (!element) {
    return null;
  }
  const states = attachedElementInternals.get(element)?.states;
  const toggle: SbbStateController['toggle'] = function (this: SbbStateController, value, force) {
    if (force || (force !== false && !this.has(value))) {
      this.add(value);
    } else {
      this.delete(value);
    }
  };
  if (states) {
    return {
      add(value) {
        states.add(value);
        return this;
      },
      delete: (value) => states.delete(value),
      has: (value) => states.has(value),
      toggle,
    };
  } else {
    // If no ElementInternals is attached, we fall back to using attributes. E.g. for triggers.
    return {
      add(value) {
        element.toggleAttribute(`state--${value}`, true);
        return this;
      },
      delete: (value) => element.toggleAttribute(`state--${value}`, false),
      has: (value) => element.hasAttribute(`state--${value}`),
      toggle,
    };
  }
}

export class SbbSlottedChangeEvent extends Event {
  public constructor(public readonly slot: HTMLSlotElement) {
    super('slottedchange', { composed: true });
  }
}

export interface SbbPropertyValues {
  oldValue?: unknown;
  value?: unknown;
}

export interface SbbReactiveController extends ReactiveController {
  hostPropertyUpdate?(
    name: PropertyKey,
    values?: SbbPropertyValues,
    options?: PropertyDeclaration,
  ): void;
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

export type SbbElementType = typeof SbbElement;

export interface SbbElementConstructor {
  elementDependencies?: SbbElementType[];
  role?: ElementInternals['role'];
}

/**
 * A base class for all SBB elements.
 * Includes attaching ElementInternals, handling hydration, and managing state.
 */
// TODO(breaking-change): Inline and remove SbbElementInternalsMixin and SbbHydrationMixin as a breaking change
export class SbbElement extends LitElement {
  public static ['_$sbbElement$'] = true;
  public static readonly elementName: string;
  public static elementDependencies?: SbbElementType[];
  public static role?: ElementInternals['role'];

  /** @internal */
  protected readonly internals: ElementInternals = this.attachInternals();

  private _controllers?: Set<SbbReactiveController>;
  private _hydrationRequired: boolean;
  private _hydrationComplete = new Promise<boolean>(
    (resolve) => (this._resolveHydration = resolve),
  );
  private _resolveHydration!: (hydrationRequired: boolean) => void;
  private _textObserver?: MutationObserver;

  /**
   * Returns a Promise that resolves when the element has completed hydration.
   * The Promise value is a boolean that is `true` if the element required hydration
   * and `false` if not.
   *
   * @return A promise of a boolean that resolves to true once the hydration completed.
   * @internal
   */
  public get hydrationComplete(): Promise<boolean> {
    return this._hydrationComplete;
  }

  /** Returns whether hydration is required and not completed. */
  protected get hydrationRequired(): boolean {
    return this._hydrationRequired;
  }

  public constructor() {
    super();
    attachedElementInternals.set(this, this.internals);
    if (CustomStateSetPolyfill) {
      Object.defineProperty(this.internals, 'states', {
        value: new CustomStateSetPolyfill(this),
        writable: false,
        configurable: false,
        enumerable: false,
      });
    } else {
      // We use the CustomStateSet polyfill in SSR, which renders the state as attributes
      // which can be transferred to client side, where we can then convert [state--*]
      // attributes to internal state.
      for (const name of this.getAttributeNames().filter((n) => n.startsWith('state--'))) {
        this.internals.states.add(name.slice(7));
        this.removeAttribute(name);
      }
    }
    const role = (this.constructor as SbbElementConstructor).role;
    if (role) {
      this.internals.role = role;
    }

    // Check whether hydration is needed by checking whether the shadow root
    // is available during construction/upgrade phase.
    this._hydrationRequired = !!this.shadowRoot;
    if (!this._hydrationRequired) {
      this._resolveHydration(false);
    } else {
      // During hydration phase, we want to suppress slotchange events as they
      // can cause render differences, which would break hydration. After
      // hydration is complete, we dispatch a manual slotchange event, if there
      // are elements assigned to a slot.
      const suppressSlotchangeEvent = (event: Event): void => {
        if (this._hydrationRequired) {
          event.stopImmediatePropagation();
        }
      };
      const eventOptions: EventListenerOptions = { capture: true };
      const slots = this.shadowRoot?.querySelectorAll('slot');
      if (slots?.length) {
        slots.forEach((slot) =>
          slot.addEventListener('slotchange', suppressSlotchangeEvent, eventOptions),
        );
        this.hydrationComplete.then(() =>
          slots.forEach((slot) => {
            slot.removeEventListener('slotchange', suppressSlotchangeEvent, eventOptions);
            if (slot.assignedNodes().length) {
              /** @internal */
              slot.dispatchEvent(new Event('slotchange', { bubbles: true }));
            }
          }),
        );
      }
    }
  }

  /** Register the custom element in the global CustomElementRegistry. */
  public static define(): void {
    if (!this.elementName) {
      throw new Error(
        `The static property "elementName" is not defined on ${this.name}. Please define it to register the custom element.`,
      );
    }

    const elementClass = customElements.get(this.elementName);
    if (!elementClass) {
      customElements.define(this.elementName, this as unknown as CustomElementConstructor);
      // Next.js re-rendering somehow fails, because the finalization calculation
      // is broken in SSR. We call `finalize()` here explicitly to avoid that.
      this.finalize();
      const elementDependencies: SbbElementType[] = [];
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let ctor: SbbElementType = this;
      while (ctor['_$sbbElement$']) {
        if (Array.isArray(ctor.elementDependencies)) {
          elementDependencies.push(...ctor.elementDependencies);
        }
        ctor = Object.getPrototypeOf(ctor);
      }
      new Set(elementDependencies).forEach((dependency) => dependency.define());
    } else if (import.meta.env.DEV && elementClass !== this) {
      console.warn(
        `The custom element with name "${this.elementName}" is already defined. Skipping.`,
      );
    }
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    const root = super.createRenderRoot();
    this.shadowRoot?.addEventListener('slotchange', (e) =>
      this._slotchangeHandler(e, e.target as HTMLSlotElement),
    );
    this.shadowRoot?.addEventListener('slottedchange', (e) => this._slotchangeHandler(e, e.slot), {
      capture: true,
    });
    this.shadowRoot
      ?.querySelectorAll?.('slot')
      .forEach((slot) => this._handleSlotChangeForSlottedState(slot));

    return root;
  }

  /**
   * Registers a `ReactiveController` to participate in the element's reactive
   * update cycle. The element automatically calls into any registered
   * controllers during its lifecycle callbacks.
   *
   * If the element is connected when `addController()` is called, the
   * controller's `hostConnected()` callback will be immediately called.
   */
  public override addController(controller: SbbReactiveController): void {
    super.addController(controller);
    (this._controllers ??= new Set()).add(controller);
  }

  /**
   * Removes a `ReactiveController` from the element.
   */
  public override removeController(controller: SbbReactiveController): void {
    super.removeController(controller);
    this._controllers?.delete(controller);
  }

  /**
   * Requests an update which is processed asynchronously. This should be called
   * when an element should update based on some state not triggered by setting
   * a reactive property. In this case, pass no arguments. It should also be
   * called when manually implementing a property setter. In this case, pass the
   * property `name` and `oldValue` to ensure that any configured property
   * options are honored.
   *
   * @param name name of requesting property
   * @param oldValue old value of requesting property
   * @param options property options to use instead of the previously
   *     configured options
   * @param useNewValue if true, the newValue argument is used instead of
   *     reading the property value. This is important to use if the reactive
   *     property is a standard private accessor, as opposed to a plain
   *     property, since private members can't be dynamically read by name.
   * @param newValue the new value of the property. This is only used if
   *     `useNewValue` is true.
   */
  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
    useNewValue?: boolean,
    newValue?: unknown,
  ): void {
    super.requestUpdate(name, oldValue, options, useNewValue, newValue);
    if (name) {
      const values: SbbPropertyValues = {
        oldValue,
        value: useNewValue ? newValue : this[name as keyof this],
      };
      this._controllers?.forEach((controller) =>
        controller.hostPropertyUpdate?.(name, values, options),
      );
    }
  }

  protected override update(changedProperties: PropertyValues<this>): void {
    // When hydration is needed, we wait the hydration process to finish, which is patched
    // into the update method of the LitElement base class.
    super.update(changedProperties);

    if (this._hydrationRequired) {
      this._hydrationRequired = false;
      this._resolveHydration(true);
    }
  }

  protected toggleState(value: string, force?: boolean): void {
    if (force || (force !== false && !this.internals.states.has(value))) {
      this.internals.states.add(value);
    } else {
      this.internals.states.delete(value);
    }
  }

  private _slotchangeHandler(event: Event, slot: HTMLSlotElement): void {
    const resolvedSlot = this.shadowRoot!.contains(slot)
      ? slot
      : event
          .composedPath()
          .find(
            (el): el is HTMLSlotElement =>
              el instanceof HTMLSlotElement && this.shadowRoot!.contains(el),
          );
    if (resolvedSlot) {
      this._handleSlotChangeForSlottedState(resolvedSlot);
    }
  }

  private _handleSlotChangeForSlottedState(slot: HTMLSlotElement): void {
    this._updateSlottedState(slot);
    if (!slot.name) {
      this._observeTextNodesInSlot(slot);
    }
  }

  private _updateSlottedState(slot: HTMLSlotElement): void {
    const stateName = slot.name ? `slotted-${slot.name}` : 'slotted';
    const hasSlottedContent = this._hasSlottedContent(slot);
    if (hasSlottedContent && !this.internals.states.has(stateName)) {
      this.internals.states.add(stateName);
      /** @internal */
      this.dispatchEvent(new SbbSlottedChangeEvent(slot));
    } else if (!hasSlottedContent && this.internals.states.has(stateName)) {
      this.internals.states.delete(stateName);
      /** @internal */
      this.dispatchEvent(new SbbSlottedChangeEvent(slot));
    }
  }

  private _observeTextNodesInSlot(slot: HTMLSlotElement): void {
    this._textObserver?.disconnect();
    // Only create the MutationObserver when it is actually needed to optimize performance.
    this._textObserver ??= new MutationObserver(() => {
      const slot = this.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])');
      if (slot) {
        this._updateSlottedState(slot);
      } else {
        this._textObserver!.disconnect();
      }
    });
    // Text nodes can be empty and filled later (or vice versa).
    // Filling an existing node later would not trigger another slotchange event.
    // Therefore, we need to observe text nodes and check if they become filled or empty.
    // This is only needed for the unnamed slot as for every other there would
    // be a tag which triggers the slot change event.
    // The main reason is that Angular creates empty text nodes and fills them later.
    slot
      .assignedNodes()
      .filter((n) => n.nodeType === n.TEXT_NODE)
      .forEach((node) => this._textObserver!.observe(node, { characterData: true }));
  }

  private _hasSlottedContent(slot: HTMLSlotElement): boolean {
    return slot.name
      ? slot
          .assignedElements()
          .some((node) => !(node instanceof HTMLSlotElement) || this._hasSlottedContent(node))
      : slot.assignedNodes().some((node) => {
          return node instanceof HTMLSlotElement
            ? this._hasSlottedContent(node)
            : node.nodeType !== node.TEXT_NODE || !!node.textContent?.trim();
        });
  }
}

declare global {
  interface HTMLElementEventMap {
    slottedchange: SbbSlottedChangeEvent;
  }
  interface ShadowRootEventMap {
    slottedchange: SbbSlottedChangeEvent;
  }
}
