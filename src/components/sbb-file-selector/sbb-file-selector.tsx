import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Method,
  Prop,
  State,
} from '@stencil/core';
import { InterfaceSbbFileSelectorAttributes } from './sbb-file-selector.custom';
import {
  createNamedSlotState,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
  namedSlotChangeHandlerAspect,
} from '../../global/eventing';
import {
  i18nFileSelectorButtonLabel,
  i18nFileSelectorCurrentlySelected,
  i18nFileSelectorDeleteFile,
  i18nFileSelectorSubtitleLabel,
} from '../../global/i18n';
import { toggleDatasetEntry } from '../../global/dom';
import { sbbInputModalityDetector } from '../../global/a11y';

export type DOMEvent = globalThis.Event;

/**
 * @slot error - Use this to provide a `sbb-form-error` to show an error message.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-file-selector.scss',
  tag: 'sbb-file-selector',
})
export class SbbFileSelector implements ComponentInterface {
  /** Whether the component has a dropzone area or not. */
  @Prop() public variant: InterfaceSbbFileSelectorAttributes['variant'] = 'default';

  /** Whether more than one file can be selected. */
  @Prop() public multiple: boolean;

  /** Whether the newly added files should override the previously added ones. */
  @Prop() public multipleMode: InterfaceSbbFileSelectorAttributes['multipleMode'];

  /** A comma-separated list of allowed unique file type specifiers. */
  @Prop() public accept: string;

  /** The title displayed in `dropzone` variant. */
  @Prop() public titleContent?: string;

  /** Whether the component is disabled. */
  @Prop({ reflect: true }) public disabled: boolean;

  /** This will be forwarded as aria-label to the native input element. */
  @Prop() public accessibilityLabel: string | undefined;

  /** The list of selected files. */
  @State() private _files: File[];

  /** Current document language used for translations. */
  @State() private _currentLanguage = documentLanguage();

  /** State of listed named slots, by indicating whether any element for a named slot is defined. */
  @State() private _namedSlots = createNamedSlotState('error');

  /** An event which is emitted each time the file list changes. */
  @Event({
    eventName: 'file-changed',
  })
  public fileChangedEvent: EventEmitter<File[]>;

  @Element() private _element!: HTMLElement;

  // TODO: during Lit migration, convert this method in a getter
  /** Gets the currently selected files. */
  @Method()
  public async getFiles(): Promise<File[]> {
    return this._files || [];
  }

  // Safari has a peculiar behavior when dragging files on the inner button in 'dropzone' variant;
  // this will require a counter to correctly handle the dragEnter/dragLeave.
  private _counter: number = 0;

  private _loadButton: HTMLElement;
  private _dragTarget: HTMLElement;
  private _hiddenInput: HTMLInputElement;
  private _suffixes: string[] = ['B', 'kB', 'MB', 'GB', 'TB'];
  private _liveRegion: HTMLElement;

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

  private _blockEvent(event: DragEvent): void {
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

  private _onDragEnter(event: DragEvent): void {
    this._counter++;
    if (!this.disabled) {
      this._setDragState(event.target as HTMLElement, true);
      this._blockEvent(event);
    }
  }

  private _onDragLeave(event: DragEvent): void {
    this._counter--;
    if (!this.disabled && event.target === this._dragTarget && this._counter === 0) {
      this._setDragState();
      this._blockEvent(event);
    }
  }

  private _onFileDrop(event: DragEvent): void {
    this._counter = 0;
    if (!this.disabled) {
      this._setDragState();
      this._blockEvent(event);
      this._createFileList(event.dataTransfer.files);
    }
  }

  private _onFocus(): void {
    if (sbbInputModalityDetector.mostRecentModality === 'keyboard') {
      toggleDatasetEntry(this._loadButton, 'focusVisible', true);
    }
  }

  private _onBlur(): void {
    if (sbbInputModalityDetector.mostRecentModality === 'keyboard') {
      toggleDatasetEntry(this._loadButton, 'focusVisible', false);
    }
  }

  private _setDragState(dragTarget: HTMLElement = undefined, isDragEnter: boolean = false): void {
    this._dragTarget = dragTarget;
    toggleDatasetEntry(this._element, 'active', isDragEnter);
    toggleDatasetEntry(this._loadButton, 'active', isDragEnter);
  }

  private _readFiles(event: DOMEvent): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      this._createFileList(fileInput.files);
    }
  }

  private _createFileList(files: FileList): void {
    if (
      !this.multiple ||
      this.multipleMode !== 'persistent' ||
      !this._files ||
      this._files.length === 0
    ) {
      this._files = Array.from(files);
    } else {
      this._files = Array.from(files)
        .filter(
          (newFile: File): boolean =>
            this._files.findIndex((oldFile: File) => this._checkFileEquality(newFile, oldFile)) ===
            -1,
        )
        .concat(this._files);
    }
    this._liveRegion.innerText = i18nFileSelectorCurrentlySelected(this._files.map((e) => e.name))[
      this._currentLanguage
    ];
    this.fileChangedEvent.emit(this._files);
  }

  private _removeFile(file: File): void {
    this._files = this._files.filter((f: File) => !this._checkFileEquality(file, f));
    // The item must be removed from the hidden file input too; the FileList API is flawed, so the DataTransfer object is used.
    const dt: DataTransfer = new DataTransfer();
    this._files.forEach((e: File) => dt.items.add(e));
    this._hiddenInput.files = dt.files;
    this._liveRegion.innerText = i18nFileSelectorCurrentlySelected(this._files.map((e) => e.name))[
      this._currentLanguage
    ];
    this.fileChangedEvent.emit(this._files);
  }

  /** Calculates the correct unit for the file's size. */
  private _formatFileSize(size: number): string {
    const i: number = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / Math.pow(1024, i)).toFixed(0)} ${this._suffixes[i]}`;
  }

  private _renderDefaultMode(): JSX.Element {
    return (
      <sbb-button
        variant="secondary"
        size="m"
        is-static={true}
        icon-name="folder-open-small"
        disabled={this.disabled}
        ref={(el): void => {
          this._loadButton = el;
        }}
      >
        {i18nFileSelectorButtonLabel[this._currentLanguage]}
      </sbb-button>
    );
  }

  private _renderDropzoneArea(): JSX.Element {
    return (
      <span class="sbb-file-selector__dropzone-area">
        <span class="sbb-file-selector__dropzone-area--icon">
          <sbb-icon name="folder-open-medium"></sbb-icon>
        </span>
        <span class="sbb-file-selector__dropzone-area--title">{this.titleContent}</span>
        <span class="sbb-file-selector__dropzone-area--subtitle">
          {i18nFileSelectorSubtitleLabel[this._currentLanguage]}
        </span>
        <span class="sbb-file-selector__dropzone-area--button">
          <sbb-button
            variant="secondary"
            size="m"
            disabled={this.disabled}
            is-static={true}
            ref={(el): void => {
              this._loadButton = el;
            }}
          >
            {i18nFileSelectorButtonLabel[this._currentLanguage]}
          </sbb-button>
        </span>
      </span>
    );
  }

  private _renderFileList(): JSX.Element {
    const TAG_NAME: Record<string, string> =
      this._files.length > 1
        ? { WRAPPER: 'ul', ELEMENT: 'li' }
        : { WRAPPER: 'div', ELEMENT: 'span' };
    return (
      <TAG_NAME.WRAPPER class="sbb-file-selector__file-list">
        {this._files.map((file: File) => (
          <TAG_NAME.ELEMENT class="sbb-file-selector__file">
            <span class="sbb-file-selector__file-details">
              <span class="sbb-file-selector__file-name">{file.name}</span>
              <span class="sbb-file-selector__file-size">{this._formatFileSize(file.size)}</span>
            </span>
            <sbb-button
              variant="secondary"
              size="m"
              icon-name="trash-small"
              onClick={() => this._removeFile(file)}
              aria-label={`${i18nFileSelectorDeleteFile[this._currentLanguage]} - ${file.name}`}
            ></sbb-button>
          </TAG_NAME.ELEMENT>
        ))}
      </TAG_NAME.WRAPPER>
    );
  }

  public render(): JSX.Element {
    const ariaLabel = this.accessibilityLabel
      ? `${i18nFileSelectorButtonLabel[this._currentLanguage]} - ${this.accessibilityLabel}`
      : undefined;
    return (
      <div class="sbb-file-selector">
        <div
          class="sbb-file-selector__input-container"
          onDragEnter={(e: DragEvent) => this._onDragEnter(e)}
          onDragOver={(e: DragEvent) => this._blockEvent(e)}
          onDragLeave={(e: DragEvent) => this._onDragLeave(e)}
          onDrop={(e: DragEvent) => this._onFileDrop(e)}
        >
          <label>
            {this.variant === 'default' ? this._renderDefaultMode() : this._renderDropzoneArea()}
            <input
              class="sbb-file-selector__visually-hidden"
              type="file"
              disabled={this.disabled}
              multiple={this.multiple}
              accept={this.accept}
              onChange={(event) => this._readFiles(event)}
              onFocus={() => this._onFocus()}
              onBlur={() => this._onBlur()}
              aria-label={ariaLabel}
              ref={(el): void => {
                this._hiddenInput = el;
              }}
            />
          </label>
        </div>
        <p
          role="status"
          class="sbb-file-selector__visually-hidden"
          ref={(p) => (this._liveRegion = p)}
        ></p>
        {this._files && this._files.length > 0 && this._renderFileList()}
        {this._namedSlots.error && (
          <div class="sbb-file-selector__error">
            <slot name="error" />
          </div>
        )}
      </div>
    );
  }
}
