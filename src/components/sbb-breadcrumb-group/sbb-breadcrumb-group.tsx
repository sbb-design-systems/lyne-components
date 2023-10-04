import { Component, ComponentInterface, Element, h, Host, JSX, Listen, State } from '@stencil/core';
import { i18nBreadcrumbEllipsisButtonLabel } from '../../global/i18n';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import {
  getNextElementIndex,
  isArrowKeyPressed,
  sbbInputModalityDetector,
} from '../../global/a11y';
import { AgnosticResizeObserver } from '../../global/observers';

/**
 * @slot unnamed - Use this to slot the sbb-breadcrumb elements.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-breadcrumb-group.scss',
  tag: 'sbb-breadcrumb-group',
})
export class SbbBreadcrumbGroup implements ComponentInterface {
  /** Local instance of slotted sbb-breadcrumb elements */
  @State() private _breadcrumbs: HTMLSbbBreadcrumbElement[];

  @State() private _state?: 'collapsed' | 'manually-expanded';

  @State() private _loaded = false;

  /** Current document language used for translation of the button label. */
  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  private _resizeObserver = new AgnosticResizeObserver(() => this._evaluateCollapsedState());

  private _markForFocus = false;

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
      if (this._state === 'collapsed') {
        return this._focusNextCollapsed(evt);
      }
      this._focusNext(evt);
    }
  }

  public connectedCallback(): void {
    this._readBreadcrumb();
    this._handlerRepository.connect();
  }

  public componentDidLoad(): void {
    this._resizeObserver.observe(this._element);
    this._loaded = true;
  }

  public componentDidRender(): void {
    if (this._markForFocus && sbbInputModalityDetector.mostRecentModality === 'keyboard') {
      this._breadcrumbs[1]?.focus();

      // Reset mark for focus
      this._markForFocus = false;
    }
  }

  public disconnectedCallback(): void {
    this._resizeObserver.disconnect();
    this._handlerRepository.disconnect();
  }

  /** Creates and sets an array with only the sbb-breadcrumb children. */
  private _readBreadcrumb(): void {
    this._evaluateCollapsedState();

    const breadcrumbs = Array.from(this._element.children).filter(
      (e): e is HTMLSbbBreadcrumbElement => e.tagName === 'SBB-BREADCRUMB',
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
    this._breadcrumbs = breadcrumbs;
    this._syncBreadcrumbs();
  }

  /** Apply the aria-current attribute to the last sbb-breadcrumb element. */
  private _syncBreadcrumbs(): void {
    this._breadcrumbs.forEach((breadcrumb, index) => {
      breadcrumb.removeAttribute('aria-current');
      if (!breadcrumb.id) {
        breadcrumb.id = `sbb-breadcrumb-${index}`;
      }
    });
    this._breadcrumbs[this._breadcrumbs.length - 1]?.setAttribute('aria-current', 'page');

    // If it is not expandable, reset state
    if (this._breadcrumbs.length < 3) {
      this._state = undefined;
    }
  }

  /**
   * Sets the focus on the correct element when the ellipsis breadcrumb is displayed and the user is navigating with keyboard's arrows.
   */
  private _focusNextCollapsed(evt: KeyboardEvent): void {
    const arrayCollapsed: HTMLSbbBreadcrumbElement[] = [
      this._breadcrumbs[0],
      this._element.shadowRoot.querySelector(
        '#sbb-breadcrumb-ellipsis',
      ) as HTMLSbbBreadcrumbElement,
      this._breadcrumbs[this._breadcrumbs.length - 1],
    ];
    this._focusNext(evt, arrayCollapsed);
  }

  private _focusNext(
    evt: KeyboardEvent,
    breadcrumbs: HTMLSbbBreadcrumbElement[] = this._breadcrumbs,
  ): void {
    const current: number = breadcrumbs.findIndex(
      (e) => e === document.activeElement || e === this._element.shadowRoot.activeElement,
    );
    const nextIndex: number = getNextElementIndex(evt, current, breadcrumbs.length);
    breadcrumbs[nextIndex]?.focus();
    evt.preventDefault();
  }

  /**
   * Note: due to @State annotation on _state, this method triggers a new render; as a consequence, the focus is moved
   * to the `body`, so if the ellipsis element has focus, it's asynchronously forced to the first element.
   */
  private _expandBreadcrumbs(): void {
    this._state = 'manually-expanded';
    this._markForFocus = true;
  }

  /** Evaluate if the expanded breadcrumb element fits in page width, otherwise it needs ellipsis */
  private _evaluateCollapsedState(): void {
    if (this._element && !this._state && this._element.scrollWidth > this._element.offsetWidth) {
      this._state = 'collapsed';
      this._resizeObserver.disconnect();
    }
  }

  private _renderCollapsed(): JSX.Element {
    for (let i = 0; i < this._breadcrumbs.length; i++) {
      if (i === 0 || i === this._breadcrumbs.length - 1) {
        this._breadcrumbs[i].setAttribute('slot', `breadcrumb-${i}`);
      } else {
        this._breadcrumbs[i].removeAttribute('slot');
      }
    }
    const idFirstElement = this._breadcrumbs[0].id ?? `sbb-breadcrumb-0`;
    const idLastElement =
      this._breadcrumbs[this._breadcrumbs.length - 1].id ??
      `sbb-breadcrumb-${this._breadcrumbs.length - 1}`;

    return [
      <li class="sbb-breadcrumb-group__item">
        <slot
          name="breadcrumb-0"
          key={idFirstElement}
          onSlotchange={(): void => this._readBreadcrumb()}
        />
      </li>,
      <li class="sbb-breadcrumb-group__item" id="sbb-breadcrumb-group-ellipsis">
        <sbb-icon
          name="chevron-small-right-small"
          class="sbb-breadcrumb-group__divider-icon"
        ></sbb-icon>
        <button
          type="button"
          id="sbb-breadcrumb-ellipsis"
          aria-label={i18nBreadcrumbEllipsisButtonLabel[this._currentLanguage]}
          aria-expanded="false"
          onClick={() => this._expandBreadcrumbs()}
        >
          ...
        </button>
      </li>,
      <li class="sbb-breadcrumb-group__item">
        <sbb-icon
          name="chevron-small-right-small"
          class="sbb-breadcrumb-group__divider-icon"
        ></sbb-icon>
        <slot
          name={`breadcrumb-${this._breadcrumbs.length - 1}`}
          key={idLastElement}
          onSlotchange={(): void => this._readBreadcrumb()}
        />
      </li>,
    ];
  }

  private _renderExpanded(): JSX.Element {
    const slotName = (index: number): string => `breadcrumb-${index}`;

    return this._breadcrumbs.map((element: HTMLSbbBreadcrumbElement, index: number) => {
      element.setAttribute('slot', slotName(index));
      return (
        <li class="sbb-breadcrumb-group__item" key={element.id}>
          <slot name={slotName(index)} onSlotchange={(): void => this._readBreadcrumb()} />
          {index !== this._breadcrumbs.length - 1 && (
            <sbb-icon
              name="chevron-small-right-small"
              class="sbb-breadcrumb-group__divider-icon"
            ></sbb-icon>
          )}
        </li>
      );
    });
  }

  public render(): JSX.Element {
    return (
      <Host role="navigation" data-loaded={this._loaded} data-state={this._state}>
        <ol class="sbb-breadcrumb-group">
          {this._state === 'collapsed' ? this._renderCollapsed() : this._renderExpanded()}
        </ol>
        <span hidden>
          <slot onSlotchange={(): void => this._readBreadcrumb()} />
        </span>
      </Host>
    );
  }
}
