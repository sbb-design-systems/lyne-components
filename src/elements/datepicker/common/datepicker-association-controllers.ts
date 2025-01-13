import type { LitElement, ReactiveController } from 'lit';

import type { SbbDatepickerElement } from '../datepicker/datepicker.js';

export interface SbbDatepickerControl<T> extends LitElement {
  datepicker: SbbDatepickerElement<T> | null;
}

class SbbDatepickerAssociationContext<T> {
  private static _registry = new WeakMap<Node, SbbDatepickerAssociationContext<any>>();

  public readonly hosts = new Set<SbbDatepickerElement<T>>();
  public readonly controls = new Set<SbbDatepickerControl<T>>();

  private constructor(private _host: Node) {}

  public static connect<T>(rootNode: Node): SbbDatepickerAssociationContext<T> {
    let context = this._registry.get(rootNode);
    if (!context) {
      context = new SbbDatepickerAssociationContext<T>(rootNode);
      this._registry.set(rootNode, context);
    }

    return context;
  }

  public updateControls(datepicker: SbbDatepickerElement<T>): void {
    Array.from(this.controls)
      .filter((c) => c.datepicker === datepicker)
      .forEach((c) => c.requestUpdate());
  }

  public deleteHost(datepicker: SbbDatepickerElement<T>): undefined {
    this.hosts.delete(datepicker);
    this._deleteIfEmpty();
  }

  public deleteControl(control: SbbDatepickerControl<T>): undefined {
    this.controls.delete(control);
    this._deleteIfEmpty();
  }

  private _deleteIfEmpty(): void {
    if (!this.controls.size && !this.hosts.size) {
      (this.constructor as typeof SbbDatepickerAssociationContext)._registry.delete(this._host);
    }
  }
}

export class SbbDatepickerAssociationHostController<T> implements ReactiveController {
  private _context?: SbbDatepickerAssociationContext<T>;

  public constructor(private _host: SbbDatepickerElement<T>) {
    this._host.addController(this);
  }

  public hostConnected(): void {
    this._context = SbbDatepickerAssociationContext.connect(this._host.getRootNode());
    this._context.hosts.add(this._host);
    const formField = this._host.closest('sbb-form-field');
    for (const control of this._context.controls) {
      // TODO: Remove date-picker once datePicker in the controls has been removed.
      const datepickerAttribute =
        control.getAttribute('datepicker') ?? control.getAttribute('date-picker');
      if (
        datepickerAttribute
          ? datepickerAttribute === this._host.id
          : control.closest('sbb-form-field') === formField
      ) {
        control.datepicker = this._host;
      }
    }
  }

  public hostDisconnected(): void {
    this._context?.deleteHost(this._host);
  }

  public updateControls(): void {
    this._context?.updateControls(this._host);
  }
}

export class SbbDatepickerAssociationControlController<T> implements ReactiveController {
  private _context?: SbbDatepickerAssociationContext<T>;

  public constructor(private _host: SbbDatepickerControl<T>) {
    this._host.addController(this);
  }

  public hostConnected(): void {
    this._context = SbbDatepickerAssociationContext.connect(this._host.getRootNode());
    this._context.controls.add(this._host);
    const formField = this._host.closest('sbb-form-field');
    let datepicker: SbbDatepickerElement<T> | null = null;
    // TODO: Remove date-picker once datePicker in the controls has been removed.
    const datepickerId =
      this._host.getAttribute('datepicker') ?? this._host.getAttribute('date-picker');
    if (datepickerId) {
      datepicker = Array.from(this._context.hosts).find((d) => d.id === datepickerId) ?? null;
    } else {
      datepicker =
        Array.from(this._context.hosts).find((d) => d.closest('sbb-form-field') === formField) ??
        null;
    }

    if (datepicker) {
      this._host.datepicker = datepicker;
    }
  }

  public hostDisconnected(): void {
    this._context?.deleteControl(this._host);
  }
}
