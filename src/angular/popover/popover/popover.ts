import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  Output,
  inject,
  numberAttribute,
} from '@angular/core';
import type { SbbPopoverElement } from '@sbb-esta/lyne-elements/popover/popover.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/popover/popover.js';

import { booleanAttribute, SbbOpenCloseBaseElement } from '@sbb-esta/lyne-angular/core';

@Directive({
  selector: 'sbb-popover',
  standalone: true,
})
export class SbbPopover extends SbbOpenCloseBaseElement<{ closeTarget?: HTMLElement }> {
  #element = inject(ElementRef<SbbPopoverElement>);
  #ngZone = inject(NgZone);

  @Input()
  public set trigger(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trigger = value));
  }
  public get trigger(): string | HTMLElement | null {
    return this.#element.nativeElement.trigger;
  }

  @Input({ alias: 'hide-close-button', transform: booleanAttribute })
  public set hideCloseButton(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hideCloseButton = value));
  }
  public get hideCloseButton(): boolean {
    return this.#element.nativeElement.hideCloseButton;
  }

  @Input({ alias: 'hover-trigger', transform: booleanAttribute })
  public set hoverTrigger(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hoverTrigger = value));
  }
  public get hoverTrigger(): boolean {
    return this.#element.nativeElement.hoverTrigger;
  }

  @Input({ alias: 'open-delay', transform: numberAttribute })
  public set openDelay(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.openDelay = value));
  }
  public get openDelay(): number {
    return this.#element.nativeElement.openDelay;
  }

  @Input({ alias: 'close-delay', transform: numberAttribute })
  public set closeDelay(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.closeDelay = value));
  }
  public get closeDelay(): number {
    return this.#element.nativeElement.closeDelay;
  }

  @Input({ alias: 'accessibility-close-label' })
  public set accessibilityCloseLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityCloseLabel = value),
    );
  }
  public get accessibilityCloseLabel(): string {
    return this.#element.nativeElement.accessibilityCloseLabel;
  }

  @Output() public override willClose: Observable<{ closeTarget?: HTMLElement }> = fromEvent(
    this.#element.nativeElement,
    'willClose',
  );

  @Output() public override didClose: Observable<{ closeTarget?: HTMLElement }> = fromEvent(
    this.#element.nativeElement,
    'didClose',
  );

  public open(): void {
    return this.#element.nativeElement.open();
  }

  public close(target?: HTMLElement): void {
    return this.#element.nativeElement.close(target);
  }
}
