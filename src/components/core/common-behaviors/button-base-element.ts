import { property } from 'lit/decorators.js';

import { SbbActionBaseElement } from './action-base-element';
import { dispatchClickEvent, dispatchClickEventWhenEnterKeypress } from './action-dispatch-click';

/** Enumeration for type attribute in <button> HTML tag. */
export type ButtonType = 'button' | 'reset' | 'submit';

/** The interface contains attributes that can be set on a <button> tag.  */
export interface ButtonProperties {
  type?: ButtonType;
  name?: string;
  value?: string;
  form?: string;
  disabled?: boolean;
}

/** Button base class. */
export abstract class SbbButtonBaseElement
  extends SbbActionBaseElement
  implements ButtonProperties
{
  /** The type attribute to use for the button. */
  @property() public type?: ButtonType;

  /** The name attribute to use for the button. */
  @property({ reflect: true }) public name?: string;

  /** The value attribute to use for the button. */
  @property() public value?: string;

  /** The <form> element to associate the button with. */
  @property() public form?: string;

  private _handleButtonClick = (event: MouseEvent): void => {
    if (this.getAttribute('aria-disabled') === 'true') {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    } else if (!this.type || this.type === 'button') {
      return;
    }

    // Use querySelector with form and id selector, as the form property must
    // reference a valid <form> element
    const form = this.form
      ? (this.ownerDocument.querySelector(`form#${this.form}`) as HTMLFormElement)
      : this.closest('form');
    if (!form) {
      return;
    } else if (this.type === 'submit') {
      if (form.requestSubmit) {
        // `form.requestSubmit(element);` seems not to work for CustomElements, so the `element` parameter has been removed;
        // TODO: Check if solved in any way, see https://github.com/WICG/webcomponents/issues/814#issuecomment-1218452137
        form.requestSubmit();
      } else {
        form.submit();
      }
    } else if (this.type === 'reset') {
      form.reset();
    }
  };

  /**
   * Prevents scrolling from pressing Space, when the event target is an action element.
   * Also sets data-active attribute.
   * @param event The origin event.
   */
  private _preventScrollOnSpaceKeydown = (event: KeyboardEvent): void => {
    if (event.key === ' ') {
      event.preventDefault();
      (event.target as HTMLElement).dataset.active = '';
    }
  };

  private _removeActiveMarker = (event: Event): void => {
    delete (event.target as HTMLElement).dataset.active;
  };

  /**
   * Dispatches a 'click' PointerEvent if the original keyboard event is a 'Space' press.
   * As verified with the native button, when 'Space' is pressed, a 'click' event is dispatched
   * after the 'keyup' event.
   * @param event The origin event.
   */
  private _dispatchClickEventOnSpaceKeyup = (event: KeyboardEvent): void => {
    if (event.key === ' ') {
      this._removeActiveMarker(event);
      dispatchClickEvent(event);
    }
  };

  public constructor() {
    super();
    const passiveOptions = { passive: true };
    // capture is necessary here, as this event handler needs to be executed before any other
    // in order to stop immediate propagation in the disabled case.
    this.addEventListener('click', this._handleButtonClick, { capture: true });
    this.addEventListener('keydown', this._preventScrollOnSpaceKeydown);
    this.addEventListener('keypress', dispatchClickEventWhenEnterKeypress, passiveOptions);
    this.addEventListener('keyup', this._dispatchClickEventOnSpaceKeyup, passiveOptions);
    this.addEventListener('blur', this._removeActiveMarker, passiveOptions);
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    return super.createRenderRoot();
  }
}
