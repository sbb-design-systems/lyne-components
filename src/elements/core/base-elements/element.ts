import { LitElement, type PropertyDeclaration, type ReactiveController } from 'lit';

import { SbbElementInternalsMixin } from '../mixins/element-internals-mixin.ts';
import { SbbHydrationMixin } from '../mixins/hydration-mixin.ts';

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
 * A base class for all SBB elements.
 */
// TODO(breaking-change): Inline and remove SbbElementInternalsMixin and SbbHydrationMixin as a breaking change
export class SbbElement extends SbbHydrationMixin(SbbElementInternalsMixin(LitElement)) {
  public static ['_$sbbElement$'] = true;
  public static readonly elementName: string;

  private _controllers?: Set<SbbReactiveController>;

  /**
   * Register the custom element to the specified CustomElementRegistry.
   * If none is provided, defaults to the global `customElements` registry.
   * @param customElementRegistry Optional CustomElementRegistry to register this element to.
   *   Defaults to the global `customElements` instance.
   */
  public static define(customElementRegistry: CustomElementRegistry = customElements): void {
    if (!this.elementName) {
      throw new Error(
        `The static property "elementName" is not defined on ${this.name}. Please define it to register the custom element.`,
      );
    }

    const elementClass = customElementRegistry.get(this.elementName);
    if (!elementClass) {
      customElementRegistry.define(this.elementName, this as unknown as CustomElementConstructor);
      // Next.js re-rendering somehow fails, because the finalization calculation
      // is broken in SSR. We call `finalize()` here explicitly to avoid that.
      this.finalize();
    } else if (import.meta.env.DEV && elementClass !== this) {
      console.warn(
        `The custom element with name "${this.elementName}" is already defined. Skipping.`,
      );
    }
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
}
