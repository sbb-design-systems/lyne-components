import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
  State,
} from '@stencil/core';
import { InterfaceSbbFileSelectorAttributes } from './sbb-file-selector.custom.d';
import {
  createNamedSlotState,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
  namedSlotChangeHandlerAspect,
} from '../../global/helpers';
import { i18nFileSelectorButtonLabel, i18nFileSelectorSubtitleLabel } from '../../global/i18n';

/**
 * @slot unnamed - Use this to document a slot.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-file-selector.scss',
  tag: 'sbb-file-selector',
})
export class SbbFileSelector implements ComponentInterface {
  /**  */
  @Prop() public variant: InterfaceSbbFileSelectorAttributes['variant'] = 'default';

  /** */
  @Prop() public multiple: boolean;

  /** */
  @Prop() public multipleMode: InterfaceSbbFileSelectorAttributes['multipleMode'];

  /** */
  @Prop() public accept: string;

  /** */
  @State() public files: File[];

  /** */
  @Prop() public titleContent?: string;

  /** Current document language used for translation of the button label. */
  @State() private _currentLanguage = documentLanguage();

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('error');

  /**  */
  @Event({
    eventName: 'file-changed',
  })
  public fileChangedEvent: EventEmitter<File[]>;

  /**  */
  @Event({ bubbles: true }) public error: EventEmitter;

  @Element() private _element!: HTMLElement;

  private _hiddenInput: HTMLElement;

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
    namedSlotChangeHandlerAspect((m) => (this._namedSlots = m(this._namedSlots))),
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
  }

  public disconnectedCallback(): void {
    this._handlerRepository.disconnect();
  }

  private _blockEvent(event): void {
    event.stopPropagation();
    event.preventDefault();
  }

  private _checkFileEquality(file1: File, file2: File): boolean {
    return (
      file1.name === file2.name &&
      file1.size === file2.size &&
      file1.lastModified === file2.lastModified
    );
  }

  private _openFileWindow(): void {
    return this._hiddenInput.click();
  }

  private _onFileDrop(event): void {
    this._blockEvent(event);
    this._createFilesList(event.dataTransfer.files);
  }

  private _readFiles(event): void {
    if (event.target.files) {
      this._createFilesList(event.target.files);
    }
  }

  private _createFilesList(files: File[]): void {
    if (
      !this.multiple ||
      this.multipleMode !== 'persistent' ||
      !this.files ||
      this.files.length === 0
    ) {
      this.files = Array.from(files);
    } else {
      this.files = Array.from(files)
        .filter(
          (newFile: File) =>
            this.files.findIndex((oldFile: File) => this._checkFileEquality(newFile, oldFile)) ===
            -1,
        )
        .concat(this.files);
    }
    this.fileChangedEvent.emit(this.files);
  }

  private _removeFile(file: File): void {
    this.files = this.files.filter((f: File) => !this._checkFileEquality(file, f));
    this.fileChangedEvent.emit(this.files);
  }

  private _formatFileSize(size: number): string {
    const suffixes = ['B', 'kB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / Math.pow(1024, i)).toFixed(0)} ${suffixes[i]}`;
  }

  private _renderLoadButton(): JSX.Element {
    return (
      <sbb-button
        variant="secondary"
        size="m"
        icon-name="folder-open-small"
        onClick={() => this._openFileWindow()}
      >
        {i18nFileSelectorButtonLabel[this._currentLanguage]}
      </sbb-button>
    );
  }

  private _renderDropzoneArea(): JSX.Element {
    return (
      <div
        class="sbb-file-selector__dropzone-area"
        onDragEnter={(e) => this._blockEvent(e)}
        onDragOver={(e) => this._blockEvent(e)}
        onDragLeave={(e) => this._blockEvent(e)}
        onDrop={(e) => this._onFileDrop(e)}
      >
        <div class="sbb-file-selector__dropzone-area--icon">
          <sbb-icon name="folder-open-medium"></sbb-icon>
        </div>
        <div class="sbb-file-selector__dropzone-area--title">{this.titleContent}</div>
        <div class="sbb-file-selector__dropzone-area--subtitle">
          {i18nFileSelectorSubtitleLabel[this._currentLanguage]}
        </div>
        <div class="sbb-file-selector__dropzone-area--button">
          <sbb-button variant="secondary" size="m" onClick={() => this._openFileWindow()}>
            {i18nFileSelectorButtonLabel[this._currentLanguage]}
          </sbb-button>
        </div>
      </div>
    );
  }

  private _renderFileList(): JSX.Element {
    return (
      <div class="sbb-file-selector__file-list">
        {this.files.map((file: File) => (
          <div class="sbb-file-selector__file">
            <span class="sbb-file-selector__file-details">
              <span class="sbb-file-selector__file-name">{file.name}</span>
              <span class="sbb-file-selector__file-size">{this._formatFileSize(file.size)}</span>
            </span>
            <sbb-button
              variant="secondary"
              size="m"
              icon-name="trash-small"
              onClick={() => this._removeFile(file)}
            ></sbb-button>
          </div>
        ))}
      </div>
    );
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-file-selector">
        <div class="sbb-file-selector__load-area">
          {this.variant === 'default' ? this._renderLoadButton() : this._renderDropzoneArea()}
          <label hidden htmlFor="upload">
            {/* TODO add label here ?*/}
            <input
              id="upload"
              type="file"
              multiple={this.multiple}
              accept={this.accept}
              onChange={(event) => this._readFiles(event)}
              ref={(el): void => {
                this._hiddenInput = el;
              }}
            />
          </label>
        </div>
        {this.files && this.files.length > 0 && this._renderFileList()}
        {this._namedSlots.error && (
          <div class="sbb-file-selector__error">
            <slot name="error" />
          </div>
        )}
      </div>
    );
  }
}
