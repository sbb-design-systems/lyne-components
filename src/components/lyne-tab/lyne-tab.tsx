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

  /** Active tab  */
  @Prop() public active = false;

  @State() private _hasLabelElement = false;

  @Event() public tabLabelChanged!: EventEmitter<void>;

  public render(): JSX.Element {
    return (
      <Host slot='lyne-tab'>
        <template class='lyne-tab-label-template'>
          {!this._hasLabelElement && <span>{this.label}</span>}
          <slot name='lyne-tab-label' onSlotchange={this._handleLabelSlotChange} />
        </template>
        {this.active && <slot>Default content</slot>}
      </Host>
    );
  }

  @Watch('label')
  public handleLabelChange(newValue: string, oldValue: string): void {
    // this methos hould be private
    if (!this._hasLabelElement && newValue !== oldValue) {
      setTimeout(() => this.tabLabelChanged.emit());
    }
  }

  @Listen('tabLabelContentChanged')
  public handleTabLabelChanged(): void {
    // this methos hould be private
    this.tabLabelChanged.emit();
  }

  private _handleLabelSlotChange = (event: Event): void => {
    const slot = event.composedPath()[0] as HTMLSlotElement;
    const hasLabelElement = Boolean(slot.assignedNodes().length);

    if (hasLabelElement !== this._hasLabelElement) {
      this._hasLabelElement = hasLabelElement;
    }
  };
}
