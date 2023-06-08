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
import {
  createNamedSlotState,
  HandlerRepository,
  namedSlotChangeHandlerAspect,
  SbbOverlayState,
} from '../../global/helpers';
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

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://lyne.sbb.ch/tokens/icons/.
   */
  @Prop() public iconName?: string;

  @Prop({ reflect: true }) public position: ToastPosition = 'bottom-center';

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
  // @State() private _role?: 'status' | 'alert';

  @State() private _namedSlots = createNamedSlotState('icon');

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

  @Element() private _element!: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots)))
  );

  private _closeTimeout: ReturnType<typeof setTimeout>;

  @Method() public async open(): Promise<void> {
    if (this._state !== 'closed') {
      return;
    }

    this._state = 'opening';
    this.willOpen.emit();
  }

  @Method() public async close(): Promise<void> {
    if (this._state !== 'opened') {
      return;
    }

    clearTimeout(this._closeTimeout);

    this._state = 'closing';
    this.willClose.emit();
  }

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    clearTimeout(this._closeTimeout);
    this._handlerRepository.disconnect();
  }

  private _onActionSlotChange(event: Event): void {
    const slotNodes = (event.target as HTMLSlotElement).assignedNodes();

    // Force the state on the slotted buttons
    slotNodes
      .filter((el) => el.nodeName === 'SBB-BUTTON')
      .forEach((btn: HTMLSbbButtonElement) => {
        btn.variant = 'transparent';
        btn.negative = true;
        btn.size = 'm';
      });

    // Force the state on the slotted links
    slotNodes
      .filter((el) => el.nodeName === 'SBB-LINK')
      .forEach((link: HTMLSbbLinkElement) => {
        link.variant = 'inline';
        link.negative = true;
      });
  }

  private _onToastAnimationEnd(event: AnimationEvent): void {
    // On toast opened
    if (event.animationName === 'open') {
      this._state = 'opened';
      this.didOpen.emit();

      // Start the countdown to close it
      if (this.timeout) {
        this._closeTimeout = setTimeout(() => this.close(), this.timeout);
      }
    }

    // On toast closed
    if (event.animationName === 'close') {
      this._state = 'closed';
      this.didClose.emit();
    }
  }

  public render(): JSX.Element {
    return (
      <Host data-state={this._state} data-has-icon={this._namedSlots.icon || !!this.iconName}>
        <div class="sbb-toast__overlay-container">
          <div
            class="sbb-toast"
            onAnimationEnd={(event: AnimationEvent) => this._onToastAnimationEnd(event)}
          >
            <div class="sbb-toast__icon">
              <slot name="icon">{this.iconName && <sbb-icon name={this.iconName} />}</slot>
            </div>

            <div class="sbb-toast__content">
              <slot />
            </div>

            <slot name="action" onSlotchange={(event) => this._onActionSlotChange(event)}>
              {this.dismissible && (
                <sbb-button
                  iconName="cross-small"
                  variant="transparent"
                  negative={true}
                  size="m"
                  onClick={() => this.close()}
                ></sbb-button>
              )}
            </slot>
          </div>
        </div>
      </Host>
    );
  }
}
