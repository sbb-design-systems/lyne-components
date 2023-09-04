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
  i18nFileSelectorDeleteFile,
  i18nFileSelectorSubtitleLabel,
} from '../../global/i18n';
import { toggleDatasetEntry } from '../../global/dom';
import { sbbInputModalityDetector } from '../../global/a11y';

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
  @Prop() public disabled: boolean;

  /** The list of selected files. */
  @State() private _files: File[];

  /** Current document language used for translations. */
  @State() private _currentLanguage = documentLanguage();

  /**
   * State of listed named slots, by indicating whether any element for a named slot is defined.
   */
  @State() private _namedSlots = createNamedSlotState('error');

  /** An event which is emitted each time the file list changes. */
  @Event({
    eventName: 'file-changed',
  })
  public fileChangedEvent: EventEmitter<File[]>;

  /** An event emitted on error. */
  @Event({ bubbles: true }) public error: EventEmitter;

  @Element() private _element!: HTMLElement;

  private _loadButton: HTMLElement;
  private _dragTarget: HTMLElement;
  private _suffixes: string[] = ['B', 'kB', 'MB', 'GB', 'TB'];

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

  private _onDragEnter(event): void {
    if (!this.disabled) {
      this._setDragState(event.target, true);
      this._blockEvent(event);
    }
  }

  private _onDragLeave(event): void {
    if (!this.disabled && event.target === this._dragTarget) {
      this._setDragState();
      this._blockEvent(event);
    }
  }

  private _onFileDrop(event): void {
    if (!this.disabled) {
      this._setDragState();
      this._blockEvent(event);
      try {
        const files = this.multiple ? event.dataTransfer.files : [event.dataTransfer.files[0]];
        this._createFilesList(files);
      } catch (e) {
        this.error.emit(e);
      }
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

  private _setDragState(dragTarget = undefined, isDragEnter = false): void {
    if (this.variant === 'dropzone') {
      this._dragTarget = dragTarget;
      toggleDatasetEntry(this._element, 'active', isDragEnter);
      // FIXME the next line causes button flickering; same if directly setting the button background-color variable
      toggleDatasetEntry(this._loadButton, 'active', isDragEnter);
    }
  }

  private _readFiles(event): void {
    try {
      if (event.target.files) {
        this._createFilesList(event.target.files);
      }
    } catch (e) {
      this.error.emit(e);
    }
  }

  private _createFilesList(files: File[]): void {
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
          (newFile: File) =>
            this._files.findIndex((oldFile: File) => this._checkFileEquality(newFile, oldFile)) ===
            -1,
        )
        .concat(this._files);
    }
    this.fileChangedEvent.emit(this._files);
  }

  private _removeFile(file: File): void {
    this._files = this._files.filter((f: File) => !this._checkFileEquality(file, f));
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
    return (
      <ul class="sbb-file-selector__file-list">
        {this._files.map((file: File) => (
          <li class="sbb-file-selector__file">
            <span class="sbb-file-selector__file-details">
              <span class="sbb-file-selector__file-name">{file.name}</span>
              <span class="sbb-file-selector__file-size">{this._formatFileSize(file.size)}</span>
            </span>
            <sbb-button
              variant="secondary"
              size="m"
              icon-name="trash-small"
              onClick={() => this._removeFile(file)}
              aria-label={i18nFileSelectorDeleteFile[this._currentLanguage]}
            ></sbb-button>
          </li>
        ))}
      </ul>
    );
  }

  public render(): JSX.Element {
    return (
      <div class="sbb-file-selector">
        <div
          class="sbb-file-selector__input-container"
          onDragEnter={(e) => this._onDragEnter(e)}
          onDragOver={(e) => this._blockEvent(e)}
          onDragLeave={(e) => this._onDragLeave(e)}
          onDrop={(e) => this._onFileDrop(e)}
        >
          <label>
            {this.variant === 'default' ? this._renderDefaultMode() : this._renderDropzoneArea()}
            <input
              class="sbb-file-selector__input"
              type="file"
              disabled={this.disabled}
              multiple={this.multiple}
              accept={this.accept}
              onChange={(event) => this._readFiles(event)}
              onFocus={() => this._onFocus()}
              onBlur={() => this._onBlur()}
            />
          </label>
        </div>
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
