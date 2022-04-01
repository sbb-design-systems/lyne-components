import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch
} from '@stencil/core';

/**
 * @slot unnamed - Use this to document a slot.
 */

const contentObserverConfig: MutationObserverInit = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
};

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-tab.default.scss',
    shared: 'styles/lyne-tab.shared.scss'
  },
  tag: 'lyne-tab'
})

export class LyneTab {

  /** Tab labels  */
  @Prop() public label?: string;

  /** Tab amount  */
  @Prop() public amount?: string;

  /** Active tab  */
  @Prop() public active = false;

  /** Disabled tab  */
  @Prop() public disabled = false;

  @State() private _hasLabelElement = false;
  @State() private _hasAmountElement = false;

  @Event() public tabLabelChanged!: EventEmitter<void>;
  @Event() public tabDisabledChanged!: EventEmitter<void>;
  @Event() public tabLabelContentChanged!: EventEmitter<void>;

  private _labelAttributeElement: HTMLElement;
  private _amountAttributeElement: HTMLElement;
  private _observer = new MutationObserver(() => this.tabLabelContentChanged.emit());

  public render(): JSX.Element {
    return (
      <Host slot='lyne-tab'>
        <template class='lyne-tab-label-template'>
          {!this._hasLabelElement && <div ref={(el) => this._labelAttributeElement = el as HTMLElement} class='lyne-tab-label'>{this.label}</div>}
          <slot name='lyne-tab-label' onSlotchange={this._handleLabelSlotChange} />
          {!this._hasAmountElement && <div ref={(el) => this._amountAttributeElement = el as HTMLElement} class='lyne-tab-amount'>{this.amount}</div>}
          <slot name='lyne-tab-amount' onSlotchange={this._handleAmountSlotChange} />
        </template>
        <div class={`tab-content ${(this.active && !this.disabled) ? 'active' : ''}`}><slot /></div>
      </Host>
    );
  }

  @Watch('disabled')
  public handleDisabledChange(newValue: boolean, oldValue: boolean): void {
    if (newValue !== oldValue) {
      this.tabDisabledChanged.emit();
    }
  }

  @Listen('tabLabelContentChanged')
  public handleTabLabelChanged(): void {
    this.tabLabelChanged.emit();
  }

  private _handleLabelSlotChange = (event: Event): void => {
    const slot = event.composedPath()[0] as HTMLSlotElement;
    const hasLabelElement = Boolean(slot.assignedNodes().length);

    if (hasLabelElement !== this._hasLabelElement) {
      this._hasLabelElement = hasLabelElement;
    }
  };

  private _handleAmountSlotChange = (event: Event): void => {
    const slot = event.composedPath()[0] as HTMLSlotElement;
    const hasAmountElement = Boolean(slot.assignedNodes().length);

    if (hasAmountElement !== this._hasAmountElement) {
      this._hasAmountElement = hasAmountElement;
    }
  };

  public componentDidLoad(): void {
    this._observer.observe(this._labelAttributeElement, contentObserverConfig);
    this._observer.observe(this._amountAttributeElement, contentObserverConfig);
  }

  public disconnectedCallback(): void {
    this._observer.disconnect();
  }
}
