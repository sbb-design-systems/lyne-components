import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Method,
  Prop,
  State,
} from '@stencil/core';
import { SbbOverlayState } from '../../global/helpers';
import { AriaPoliteness, ToastPosition } from './sbb-toast.custom';

/**
 * @slot unnamed - Use this to document a slot.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-toast.scss',
  tag: 'sbb-toast',
})
export class SbbToast implements ComponentInterface {
  /** TODO */
  @Prop() public timeout = 3000;

  @Prop() public trigger: string | HTMLInputElement;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/.
   */
  @Prop() public iconName?: string;

  @Prop() public position: ToastPosition = 'bottom-center';

  /** Whether the toast has a close button. */
  @Prop() public dismissible = false;

  /**
   * TODO:
   * Check https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#live_regions for further info
   */
  @Prop() public politeness: AriaPoliteness;

  /** Whether the animation is disabled. */
  @Prop({ reflect: true }) public disableAnimation = false;

  /** The state of the autocomplete. */
  @State() private _state: SbbOverlayState = 'closed';

  /**
   * Role of the live region. This is only for Firefox as there is a known issue where Firefox +
   * JAWS does not read out aria-live message.
   */
  @State() private _role?: 'status' | 'alert';

  /** Emits whenever the autocomplete starts the opening transition. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-open',
  })
  public willOpen: EventEmitter<void>;

  /** Emits whenever the autocomplete is opened. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-open',
  })
  public didOpen: EventEmitter<void>;

  /** Emits whenever the autocomplete begins the closing transition. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-close',
  })
  public willClose: EventEmitter<void>;

  /** Emits whenever the autocomplete is closed. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-close',
  })
  public didClose: EventEmitter<void>;

  @Element() private _element: HTMLElement;

  @Method() public async open(): Promise<void> {
    // TODO
    this._state = 'opened';
  }

  @Method() public async close(): Promise<void> {
    // TODO
    this._state = 'closed';
  }

  public render(): JSX.Element {
    return (
      <Host data-state={this._state}>
        <div class="sbb-toast__overlay-container">
          <div class="sbb-toast"></div>
        </div>
      </Host>
    );
  }
}
