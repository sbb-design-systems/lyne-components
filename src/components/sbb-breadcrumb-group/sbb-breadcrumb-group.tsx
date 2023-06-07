import { Component, ComponentInterface, Element, h, Host, JSX, Listen, State } from '@stencil/core';
import {
  getNextElementIndex,
  isArrowKeyPressed,
  isNextArrowKeyPressed,
  isPreviousArrowKeyPressed,
} from '../../global/helpers/arrow-navigation';

/**
 * @slot unnamed - Use this to slot the sbb-breadcrumb.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-breadcrumb-group.scss',
  tag: 'sbb-breadcrumb-group',
})
export class SbbBreadcrumbGroup implements ComponentInterface {
  /** Local instance of slotted sbb-breadcrumb elements */
  @State() private _breadcrumbs: HTMLSbbBreadcrumbElement[];

  /** Check if the list needs to be shortened with the ellipsis breadcrumb. */
  @State() private _hasEllipsis: boolean;

  @Element() private _element!: HTMLElement;

  private _bcWidth: number;

  private _breadcrumbGroupController: AbortController;

  @Listen('keydown')
  public handleKeyDown(evt: KeyboardEvent): void {
    if (
      !this._breadcrumbs ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this._element &&
        (evt.target as HTMLElement).parentElement !== this._element)
    ) {
      return;
    }

    if (isArrowKeyPressed(evt)) {
      if (this._hasEllipsis) {
        return this._focusNextEllipsis(evt);
      }
      this._focusNextNoEllipsis(evt);
    }
  }

  public connectedCallback(): void {
    this._readBreadcrumb();
    this._breadcrumbGroupController = new AbortController();
    window.addEventListener(
      'resize',
      () => {
        this._hasEllipsis = false;
        this._evaluateEllipsis();
      },
      {
        passive: true,
        signal: this._breadcrumbGroupController.signal,
      }
    );
  }

  public componentDidLoad(): void {
    this._measureBreadcrumbs();
    this._evaluateEllipsis();
  }

  public componentDidUpdate(): void {
    this._element.setAttribute('loaded', 'true');
  }

  public disconnectedCallback(): void {
    this._breadcrumbGroupController.abort();
  }

  /** Creates and sets an array with only the sbb-breadcrumb children. */
  private _readBreadcrumb(): void {
    const breadcrumbs = Array.from(this._element.children).filter(
      (e): e is HTMLSbbBreadcrumbElement => e.tagName === 'SBB-BREADCRUMB'
    );
    // If the slotted sbb-breadcrumb instances have not changed,
    // we can skip syncing and updating the breadcrumbs reference list.
    if (
      this._breadcrumbs &&
      breadcrumbs.length === this._breadcrumbs.length &&
      this._breadcrumbs.every((e, i) => breadcrumbs[i] === e)
    ) {
      return;
    }
    this._syncBreadcrumbs();
    this._breadcrumbs = breadcrumbs;
  }

  /** Apply the aria-current attribute to the last sbb-breadcrumb element. */
  private _syncBreadcrumbs(): void {
    const breadcrumbs = this._element.querySelectorAll('sbb-breadcrumb');
    const length = breadcrumbs.length - 1;
    breadcrumbs.forEach((breadcrumb, index) => {
      breadcrumb.ariaCurrent = index === length ? 'page' : undefined;
      if (!breadcrumb.id) {
        breadcrumb.id = `sbb-breadcrumb-${index}`;
      }
    });
  }

  private _measureBreadcrumbs(): void {
    const li = this._element.shadowRoot.querySelectorAll('li:not(#sbb-breadcrumb-group-ellipsis)');

    if (li && li.length > 0) {
      // Get gap value between breadcrumb elements
      const breadcrumbGap = parseInt(
        getComputedStyle(
          this._element.shadowRoot.querySelector('.sbb-breadcrumb-group')
        ).getPropertyValue('gap'),
        10
      );

      // Calculate total width of the breadcrumb elements
      this._bcWidth =
        Array.from(li)
          .map((e) => e.clientWidth)
          .reduce((a: number, b: number) => a + (b || 0), 0) +
        breadcrumbGap * li.length;
    }
  }

  /**
   * Sets the focus on the correct element when the ellipsis breadcrumb is displayed
   * and the user is navigating with keyboard's arrows.
   */
  private _focusNextEllipsis(evt: KeyboardEvent): void {
    const current: number = this._breadcrumbs.findIndex((e) => e === document.activeElement);
    let elementToFocus: HTMLSbbBreadcrumbElement;
    if (
      (current === 0 && isNextArrowKeyPressed(evt)) ||
      (current === this._breadcrumbs.length - 1 && isPreviousArrowKeyPressed(evt))
    ) {
      elementToFocus = this._element.shadowRoot.querySelector(
        '#sbb-breadcrumb-ellipsis'
      ) as HTMLSbbBreadcrumbElement;
    } else if (
      (current === 0 && isPreviousArrowKeyPressed(evt)) ||
      (current === this._breadcrumbs.length - 1 && isNextArrowKeyPressed(evt))
    ) {
      const nextIndex: number = getNextElementIndex(evt, current, this._breadcrumbs.length);
      elementToFocus = this._breadcrumbs[nextIndex];
    } else {
      elementToFocus = isPreviousArrowKeyPressed(evt)
        ? this._breadcrumbs[0]
        : this._breadcrumbs[this._breadcrumbs.length - 1];
    }
    elementToFocus?.focus();
    evt.preventDefault();
  }

  private _focusNextNoEllipsis(evt: KeyboardEvent): void {
    const current: number = this._breadcrumbs.findIndex((e) => e === document.activeElement);
    const nextIndex: number = getNextElementIndex(evt, current, this._breadcrumbs.length);
    this._breadcrumbs[nextIndex]?.focus();
    evt.preventDefault();
  }

  /** Displays the full breadcrumb list by resetting the _hasEllipsis value. */
  private _expandBreadcrumbs(): void {
    this._hasEllipsis = false;
  }

  /** Evaluate if the expanded breadcrumb element fits in page width, otherwise it needs ellipsis */
  private _evaluateEllipsis(): void {
    this._hasEllipsis =
      this._breadcrumbs &&
      this._breadcrumbs.length > 2 &&
      this._element.clientWidth < this._bcWidth;
  }

  private _renderEllipsis(): JSX.Element {
    for (let i = 0; i < this._breadcrumbs.length; i++) {
      if (i === 0 || i === this._breadcrumbs.length - 1) {
        this._breadcrumbs[i].setAttribute('slot', `breadcrumb-${i}`);
      } else {
        this._breadcrumbs[i].removeAttribute('slot');
      }
    }

    return (
      <Host role="navigation">
        <ol class="sbb-breadcrumb-group">
          <li class="sbb-breadcrumb-group__item">
            <slot name="breadcrumb-0" onSlotchange={(): void => this._readBreadcrumb()} />
          </li>
          <li class="sbb-breadcrumb-group__item" id="sbb-breadcrumb-group-ellipsis">
            <sbb-icon name="chevron-small-right-small"></sbb-icon>
            <sbb-breadcrumb
              id="sbb-breadcrumb-ellipsis"
              role="link"
              tabindex="0"
              onClick={() => this._expandBreadcrumbs()}
            >
              &hellip;
            </sbb-breadcrumb>
          </li>
          <li class="sbb-breadcrumb-group__item">
            <sbb-icon name="chevron-small-right-small"></sbb-icon>
            <slot
              name={`breadcrumb-${this._breadcrumbs.length - 1}`}
              onSlotchange={(): void => this._readBreadcrumb()}
            />
          </li>
        </ol>
        <span hidden>
          <slot onSlotchange={(): void => this._readBreadcrumb()} />
        </span>
      </Host>
    );
  }

  private _renderNoEllipsis(): JSX.Element {
    const slotName = (index): string => `breadcrumb-${index}`;
    this._breadcrumbs.forEach((breadcrumb, index) =>
      breadcrumb.setAttribute('slot', slotName(index))
    );

    return (
      <Host role="navigation">
        <ol class="sbb-breadcrumb-group">
          {this._breadcrumbs.map((element: HTMLSbbBreadcrumbElement, index: number) => (
            <li class="sbb-breadcrumb-group__item" key={element.id}>
              <slot name={slotName(index)} onSlotchange={(): void => this._readBreadcrumb()} />
              {index !== this._breadcrumbs.length - 1 && (
                <sbb-icon name="chevron-small-right-small"></sbb-icon>
              )}
            </li>
          ))}
        </ol>
        <span hidden>
          <slot onSlotchange={(): void => this._readBreadcrumb()} />
        </span>
      </Host>
    );
  }

  public render(): JSX.Element {
    if (this._hasEllipsis) {
      return this._renderEllipsis();
    } else {
      return this._renderNoEllipsis();
    }
  }
}
