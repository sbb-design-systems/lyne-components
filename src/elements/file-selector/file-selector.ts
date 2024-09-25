import { type CSSResultGroup, LitElement, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import type { SbbSecondaryButtonStaticElement } from '../button.js';
import { sbbInputModalityDetector } from '../core/a11y.js';
import { SbbLanguageController } from '../core/controllers.js';
import { slotState } from '../core/decorators.js';
import { EventEmitter, forwardEventToHost } from '../core/eventing.js';
import {
  i18nFileSelectorButtonLabel,
  i18nFileSelectorCurrentlySelected,
  i18nFileSelectorDeleteFile,
  i18nFileSelectorSubtitleLabel,
} from '../core/i18n.js';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbDisabledMixin,
  SbbFormAssociatedMixin,
} from '../core/mixins.js';

import style from './file-selector.scss?lit&inline';

import '../button/secondary-button.js';
import '../button/secondary-button-static.js';
import '../icon.js';

export type DOMEvent = globalThis.Event;

/**
 * It allows to select one or more file from storage devices and display them.
 *
 * @slot error - Use this to provide a `sbb-form-error` to show an error message.
 * @event {CustomEvent<File[]>} fileChanged - An event which is emitted each time the file list changes.
 * @event change - An event which is emitted each time the user modifies the value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value
 * @event input - An event which is emitted each time the value changes as a direct result of a user action.
 */
@customElement('sbb-file-selector')
@slotState()
export class SbbFileSelectorElement extends SbbDisabledMixin(
  SbbFormAssociatedMixin<typeof LitElement, File[]>(LitElement),
) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    fileChangedEvent: 'fileChanged',
  } as const;

  /** Whether the component has a dropzone area or not. */
  @property() public variant: 'default' | 'dropzone' = 'default';

  /** Size variant, either s or m. */
  @property({ reflect: true }) public size: 's' | 'm' = 'm';

  /** Whether more than one file can be selected. */
  @property({ type: Boolean }) public multiple: boolean = false;

  /** Whether the newly added files should override the previously added ones. */
  @property({ attribute: 'multiple-mode' })
  public multipleMode: 'default' | 'persistent' = 'default';

  /** A comma-separated list of allowed unique file type specifiers. */
  @property() public accept?: string;

  /** The title displayed in `dropzone` variant. */
  @property({ attribute: 'title-content' }) public titleContent?: string;

  /** This will be forwarded as aria-label to the native input element. */
  @property({ attribute: 'accessibility-label' }) public accessibilityLabel: string | undefined;

  /**
   * The list of selected files.
   */
  public get files(): File[] {
    return this.value || [];
  }
  private set _files(value: File[]) {
    this.value = value;
  }

  /** An event which is emitted each time the file list changes. */
  private _fileChangedEvent: EventEmitter<File[]> = new EventEmitter(
    this,
    SbbFileSelectorElement.events.fileChangedEvent,
  );

  // Safari has a peculiar behavior when dragging files on the inner button in 'dropzone' variant;
  // this will require a counter to correctly handle the dragEnter/dragLeave.
  private _counter: number = 0;

  private _loadButton!: SbbSecondaryButtonStaticElement;
  private _dragTarget?: HTMLElement;
  private _hiddenInput!: HTMLInputElement;
  private _suffixes: string[] = ['B', 'kB', 'MB', 'GB', 'TB'];
  private _liveRegion!: HTMLParagraphElement;

  private _language = new SbbLanguageController(this);

  /**
   * @deprecated use 'files' property instead
   */
  public getFiles(): File[] {
    return this.files;
  }

  public override formResetCallback(): void {
    this._files = [];
    this._hiddenInput.files = new DataTransfer().files;
  }

  public override formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason?: FormRestoreReason,
  ): void {
    if (!state) {
      return;
    }
    this._files = (state as [string, FormDataEntryValue][]).map(([_, value]) => value as File);

    // Manually add files in the native input
    const dataTransfer = new DataTransfer();
    this.files.forEach((f) => dataTransfer.items.add(f));
    this._hiddenInput.files = dataTransfer.files;
  }

  protected override updateFormValue(): void {
    const formValue = new FormData();
    this.files.forEach((file) => formValue.append(this.name, file));
    this.internals.setFormValue(formValue);
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
    if (!this.disabled && !this.formDisabled) {
      this._setDragState(event.target as HTMLElement, true);
      this._blockEvent(event);
    }
  }

  private _onDragLeave(event: DragEvent): void {
    this._counter--;
    if (
      !this.disabled &&
      !this.formDisabled &&
      event.target === this._dragTarget &&
      this._counter === 0
    ) {
      this._setDragState();
      this._blockEvent(event);
    }
  }

  private _onFileDrop(event: DragEvent): void {
    this._counter = 0;
    if (!this.disabled && !this.formDisabled) {
      this._setDragState();
      this._blockEvent(event);
      this._createFileList(event.dataTransfer!.files);
    }
  }

  private _onFocus(): void {
    if (sbbInputModalityDetector.mostRecentModality === 'keyboard') {
      this._loadButton.toggleAttribute('data-focus-visible', true);
    }
  }

  private _onBlur(): void {
    if (sbbInputModalityDetector.mostRecentModality === 'keyboard') {
      this._loadButton.removeAttribute('data-focus-visible');
    }
  }

  private _setDragState(
    dragTarget: HTMLElement | undefined = undefined,
    isDragEnter: boolean = false,
  ): void {
    this._dragTarget = dragTarget;
    this.toggleAttribute('data-active', isDragEnter);
    this._loadButton.toggleAttribute('data-active', isDragEnter);
  }

  private _readFiles(event: DOMEvent): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      this._createFileList(fileInput.files);
    }
    forwardEventToHost(event, this);
  }

  private _createFileList(files: FileList): void {
    if (!this.multiple || this.multipleMode !== 'persistent' || this.files.length === 0) {
      this._files = Array.from(files);
    } else {
      this._files = Array.from(files)
        .filter(
          (newFile: File): boolean =>
            this.files!.findIndex((oldFile: File) => this._checkFileEquality(newFile, oldFile)) ===
            -1,
        )
        .concat(this.files);
    }
    this._liveRegion.innerText = i18nFileSelectorCurrentlySelected(this.files.map((e) => e.name))[
      this._language.current
    ];
    this._fileChangedEvent.emit(this.files);
  }

  private _removeFile(file: File): void {
    this._files = this.files.filter((f: File) => !this._checkFileEquality(file, f));
    // The item must be removed from the hidden file input too; the FileList API is flawed, so the DataTransfer object is used.
    const dt: DataTransfer = new DataTransfer();
    this.files.forEach((e: File) => dt.items.add(e));
    this._hiddenInput.files = dt.files;
    this._liveRegion.innerText = i18nFileSelectorCurrentlySelected(this.files.map((e) => e.name))[
      this._language.current
    ];
    // Dispatch native events as if the reset is done via the file selection window.
    this.dispatchEvent(new Event('input', { composed: true, bubbles: true }));
    this.dispatchEvent(new Event('change', { bubbles: true }));
    this._fileChangedEvent.emit(this.files);
  }

  /** Calculates the correct unit for the file's size. */
  private _formatFileSize(size: number): string {
    const i: number = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / Math.pow(1024, i)).toFixed(0)} ${this._suffixes[i]}`;
  }

  private _renderDefaultMode(): TemplateResult {
    return html`
      <sbb-secondary-button-static
        size=${this.size}
        icon-name="folder-open-small"
        ?disabled=${this.disabled || this.formDisabled}
        ${ref((el?: Element): void => {
          this._loadButton = el as SbbSecondaryButtonStaticElement;
        })}
      >
        ${i18nFileSelectorButtonLabel[this._language.current]}
      </sbb-secondary-button-static>
    `;
  }

  private _renderDropzoneArea(): TemplateResult {
    return html`
      <span class="sbb-file-selector__dropzone-area">
        <span class="sbb-file-selector__dropzone-area--icon">
          <sbb-icon
            name=${this.size === 'm' ? 'folder-open-medium' : 'folder-open-small'}
          ></sbb-icon>
        </span>
        <span class="sbb-file-selector__dropzone-area--title">${this.titleContent}</span>
        <span class="sbb-file-selector__dropzone-area--subtitle">
          ${i18nFileSelectorSubtitleLabel[this._language.current]}
        </span>
        <span class="sbb-file-selector__dropzone-area--button">
          <sbb-secondary-button-static
            size=${this.size}
            ?disabled=${this.disabled || this.formDisabled}
            ${ref((el?: Element): void => {
              this._loadButton = el as SbbSecondaryButtonStaticElement;
            })}
          >
            ${i18nFileSelectorButtonLabel[this._language.current]}
          </sbb-secondary-button-static>
        </span>
      </span>
    `;
  }

  private _renderFileList(): TemplateResult {
    const TAG_NAME: Record<string, string> =
      this.files.length > 1
        ? { WRAPPER: 'ul', ELEMENT: 'li' }
        : { WRAPPER: 'div', ELEMENT: 'span' };

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAG_NAME.WRAPPER)} class="sbb-file-selector__file-list">
        ${this.files.map(
          (file: File) => html`
          <${unsafeStatic(TAG_NAME.ELEMENT)} class="sbb-file-selector__file">
            <span class="sbb-file-selector__file-details">
              <span class="sbb-file-selector__file-name">${file.name}</span>
              <span class="sbb-file-selector__file-size">${this._formatFileSize(file.size)}</span>
            </span>
            <sbb-secondary-button
              size=${this.size}
              icon-name="trash-small"
              @click=${() => this._removeFile(file)}
              aria-label=${`${i18nFileSelectorDeleteFile[this._language.current]} - ${file.name}`}
            ></sbb-secondary-button>
          </${unsafeStatic(TAG_NAME.ELEMENT)}>`,
        )}
      </${unsafeStatic(TAG_NAME.WRAPPER)}>
    `;
  }

  protected override render(): TemplateResult {
    const ariaLabel = this.accessibilityLabel
      ? `${i18nFileSelectorButtonLabel[this._language.current]} - ${this.accessibilityLabel}`
      : undefined;
    return html`
      <div class="sbb-file-selector">
        <div
          class="sbb-file-selector__input-container"
          @dragenter=${this._onDragEnter}
          @dragover=${this._blockEvent}
          @dragleave=${this._onDragLeave}
          @drop=${this._onFileDrop}
        >
          <label>
            ${this.variant === 'default' ? this._renderDefaultMode() : this._renderDropzoneArea()}
            <input
              class="sbb-file-selector__visually-hidden"
              type="file"
              ?disabled=${this.disabled || this.formDisabled}
              ?multiple=${this.multiple}
              accept=${this.accept || nothing}
              aria-label=${ariaLabel || nothing}
              @change=${this._readFiles}
              @focus=${this._onFocus}
              @blur=${this._onBlur}
              ${ref((el?: Element): void => {
                this._hiddenInput = el as HTMLInputElement;
              })}
            />
          </label>
        </div>
        <p
          role="status"
          class="sbb-file-selector__visually-hidden"
          ${ref((p?: Element) => (this._liveRegion = p as HTMLParagraphElement))}
        ></p>
        ${this.files.length > 0 ? this._renderFileList() : nothing}
        <div class="sbb-file-selector__error">
          <slot name="error"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-file-selector': SbbFileSelectorElement;
  }
}
