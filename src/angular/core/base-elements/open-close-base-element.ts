import { ElementRef, inject, Output } from '@angular/core';
import type { Observable } from 'rxjs';
import { fromEvent } from 'rxjs';

export abstract class SbbOpenCloseBaseElement<T = void> {
  #element = inject(ElementRef<SbbOpenCloseBaseElement<T>>);

  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  @Output() public willOpen: Observable<T> = fromEvent(this.#element.nativeElement, 'willOpen');

  @Output() public didOpen: Observable<T> = fromEvent(this.#element.nativeElement, 'didOpen');

  @Output() public willClose: Observable<T> = fromEvent(this.#element.nativeElement, 'willClose');

  @Output() public didClose: Observable<T> = fromEvent(this.#element.nativeElement, 'didClose');
}
