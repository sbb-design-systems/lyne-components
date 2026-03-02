import type { LitElement, TemplateResult } from 'lit';
import { nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import type { SbbSecondaryButtonStaticElement } from '../../button.ts';
import { sbbInputModalityDetector } from '../../core/a11y.ts';
import { SbbLanguageController } from '../../core/controllers.ts';
import { forceType } from '../../core/decorators.ts';
import { isLean } from '../../core/dom.ts';
import { forwardEvent } from '../../core/eventing.ts';
import {
  i18nFileSelectorButtonLabel,
  i18nFileSelectorButtonLabelMultiple,
  i18nFileSelectorCurrentlySelected,
  i18nFileSelectorDeleteFile,
} from '../../core/i18n.ts';
import {
  type Constructor,
  type FormRestoreReason,
  type FormRestoreState,
  SbbDisabledMixin,
  SbbElementInternalsMixin,
  SbbFormAssociatedMixin,
  ɵstateController,
} from '../../core/mixins.ts';

import '../../button/secondary-button.ts';

export declare abstract class SbbFileSelectorCommonElementMixinType extends SbbDisabledMixin(
  SbbFormAssociatedMixin(SbbElementInternalsMixin(LitElement)),
) {
  public accessor size: 's' | 'm';
  public accessor multiple: boolean;
  public accessor multipleMode: 'default' | 'persistent';
  public accessor accept: string;
  public accessor accessibilityLabel: string;
  public accessor files: Readonly<File>[];
  public override get value(): string | null;
  public override set value(value: string | null);
  protected loadButton: SbbSecondaryButtonStaticElement;
  protected language: SbbLanguageController;
  protected abstract renderTemplate(input: TemplateResult): TemplateResult;
  protected createFileList(files: FileList): void;
  protected getButtonLabel(): string;
  public formResetCallback(): void;
  public formStateRestoreCallback(state: FormRestoreState | null, reason: FormRestoreReason): void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbFileSelectorCommonElementMixin = <T extends Constructor<LitElement>>(
  superclass: T,
): Constructor<SbbFileSelectorCommonElementMixinType> & T => {
  abstract class SbbFileSelectorCommonElement
    extends SbbDisabledMixin(SbbFormAssociatedMixin(SbbElementInternalsMixin(superclass)))
    implements Partial<SbbFileSelectorCommonElementMixinType>
  {
    public static readonly events = {
      filechanged: 'filechanged',
    } as const;

    /**
     * Size variant, either s or m.
     * @default 'm' / 's' (lean)
     */
    @property({ reflect: true }) public accessor size: 's' | 'm' = isLean() ? 's' : 'm';

    /** Whether more than one file can be selected. */
    @forceType()
    @property({ type: Boolean })
    public accessor multiple: boolean = false;

    /** Whether the newly added files should override the previously added ones. */
    @property({ attribute: 'multiple-mode' })
    public accessor multipleMode: 'default' | 'persistent' = 'default';

    /** A comma-separated list of allowed unique file type specifiers. */
    @forceType()
    @property()
    public accessor accept: string = '';

    /** This will be forwarded as aria-label to the native input element. */
    @forceType()
    @property({ attribute: 'accessibility-label' })
    public accessor accessibilityLabel: string = '';

    /** The path of the first selected file. Empty string ('') if no file is selected */
    @property({ attribute: false })
    public set value(value: string | null) {
      this._hiddenInput.value = value ?? '';

      if (!value) {
        this.files = [];
      }
    }
    public get value(): string | null {
      return this._hiddenInput?.value;
    }

    /** The list of selected files. */
    @property({ attribute: false })
    public set files(value: Readonly<File>[]) {
      this._files = value ?? [];

      // update the inner input
      const dt: DataTransfer = new DataTransfer();
      this.files.forEach((e: Readonly<File>) => dt.items.add(e));
      this._hiddenInput.files = dt.files;

      this.updateFormValue();
    }
    public get files(): Readonly<File>[] {
      return this._files;
    }
    private _files: Readonly<File>[] = [];

    /**
     * Form type of element.
     * @default 'file'
     */
    public override get type(): string {
      return 'file';
    }

    private _hiddenInput!: HTMLInputElement;
    private _suffixes: string[] = ['B', 'kB', 'MB', 'GB', 'TB'];
    private _liveRegion!: HTMLParagraphElement;
    protected loadButton!: SbbSecondaryButtonStaticElement;
    protected language = new SbbLanguageController(this);

    // Safari has a peculiar behavior when dragging files on the inner button in 'dropzone' variant;
    // this will require a counter to correctly handle the dragEnter/dragLeave.
    private _counter: number = 0;
    private _dragTarget?: HTMLElement;

    protected abstract renderTemplate(input: TemplateResult): TemplateResult;

    public override formResetCallback(): void {
      this.files = [];
    }

    public override formStateRestoreCallback(
      state: FormRestoreState | null,
      _reason?: FormRestoreReason,
    ): void {
      if (!state) {
        return;
      }
      this.files = (state as FormData).getAll(this.name) as Readonly<File>[];
    }

    protected override updateFormValue(): void {
      const formValue = new FormData();
      this.files.forEach((file) => formValue.append(this.name, file));
      this.internals.setFormValue(formValue);
    }

    private _checkFileEquality(file1: Readonly<File>, file2: Readonly<File>): boolean {
      return (
        file1.name === file2.name &&
        file1.size === file2.size &&
        file1.lastModified === file2.lastModified
      );
    }

    private _onFocus(): void {
      if (sbbInputModalityDetector.mostRecentModality === 'keyboard') {
        ɵstateController(this.loadButton).add('focus-visible');
      }
    }

    private _onBlur(): void {
      ɵstateController(this.loadButton).delete('focus-visible');
    }

    private _readFiles(event: Event): void {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files) {
        this.createFileList(fileInput.files);
      }
      forwardEvent(event, this);
    }

    protected createFileList(files: FileList): void {
      const fileArray = Array.from(files);
      if (
        (!this.multiple && files.length > 1) ||
        (this.accept &&
          fileArray.some(
            (file) => !this.accept.split(',').some((a) => file.name.endsWith(a.trim())),
          ))
      ) {
        // If multiple files are selected but the selector is not in multiple mode,
        // ignore the selection (like native behavior).
        // If the accept attribute is set, check if the selected files match the allowed types.
        return;
      }

      if (!this.multiple || this.multipleMode !== 'persistent' || this.files.length === 0) {
        this.files = fileArray;
      } else {
        this.files = fileArray
          .filter(
            // Remove duplicates
            (newFile: Readonly<File>): boolean =>
              this.files!.findIndex((oldFile: Readonly<File>) =>
                this._checkFileEquality(newFile, oldFile),
              ) === -1,
          )
          .concat(this.files);
      }
      this._updateA11yLiveRegion();
      this._dispatchFileChangedEvent();
    }

    protected getButtonLabel(): string {
      return this.multiple
        ? i18nFileSelectorButtonLabelMultiple[this.language.current]
        : i18nFileSelectorButtonLabel[this.language.current];
    }

    private _removeFile(file: Readonly<File>): void {
      this.files = this.files.filter((f: Readonly<File>) => !this._checkFileEquality(file, f));
      this._updateA11yLiveRegion();

      // Dispatch native events as if the reset is done via the file selection window.
      /** The input event fires when the value has been changed as a direct result of a user action. */
      this.dispatchEvent(
        new InputEvent('input', {
          bubbles: true,
          composed: true,
        }),
      );

      /**
       * The change event is fired when the user modifies the element's value.
       * Unlike the input event, the change event is not necessarily fired
       * for each alteration to an element's value.
       */
      this.dispatchEvent(new Event('change', { bubbles: true }));
      this._dispatchFileChangedEvent();
    }

    private _dispatchFileChangedEvent(): void {
      /**
       * @type {CustomEvent<Readonly<File>[]>}
       * An event which is emitted each time the file list changes.
       */
      this.dispatchEvent(
        new CustomEvent<Readonly<File>[]>('filechanged', {
          bubbles: true,
          composed: true,
          detail: this.files,
        }),
      );
    }

    /** Calculates the correct unit for the file's size. */
    private _formatFileSize(size: number): string {
      const i: number = Math.floor(Math.log(size) / Math.log(1024));
      return `${(size / Math.pow(1024, i)).toFixed(0)} ${this._suffixes[i]}`;
    }

    private _updateA11yLiveRegion(): void {
      this._liveRegion.innerText = i18nFileSelectorCurrentlySelected(this.files.map((e) => e.name))[
        this.language.current
      ];
    }

    private _renderFileList(): TemplateResult {
      const TAG_NAME: Record<string, string> =
        this.files.length > 1
          ? { WRAPPER: 'ul', ELEMENT: 'li' }
          : { WRAPPER: 'div', ELEMENT: 'span' };

      /* eslint-disable lit/binding-positions */
      return html`
      <${unsafeStatic(TAG_NAME.WRAPPER)} class='sbb-file-selector__file-list'>
        ${this.files.map(
          (file: Readonly<File>) => html`
            <${unsafeStatic(TAG_NAME.ELEMENT)} class='sbb-file-selector__file'>
                <span class='sbb-file-selector__file-details'>
                  <span class='sbb-file-selector__file-name'>${file.name}</span>
                  <span class='sbb-file-selector__file-size'>${this._formatFileSize(file.size)}</span>
                </span>
              <sbb-secondary-button
                size='${this.size}'
                icon-name='trash-small'
                @click='${() => this._removeFile(file)}'
                aria-label='${`${i18nFileSelectorDeleteFile[this.language.current]} - ${file.name}`}'
              ></sbb-secondary-button>
            </${unsafeStatic(TAG_NAME.ELEMENT)}>`,
        )}
      </${unsafeStatic(TAG_NAME.WRAPPER)}>
    `;
      /* eslint-enable lit/binding-positions */
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
        this.createFileList(event.dataTransfer!.files);
      }
    }

    private _blockEvent(event: DragEvent): void {
      event.stopPropagation();
      event.preventDefault();
    }

    private _setDragState(
      dragTarget: HTMLElement | undefined = undefined,
      isDragEnter: boolean = false,
    ): void {
      this._dragTarget = dragTarget;
      this.toggleState('active', isDragEnter);
      ɵstateController(this.loadButton).toggle('active', isDragEnter);
    }

    protected override render(): TemplateResult {
      const ariaLabel = this.accessibilityLabel
        ? `${this.getButtonLabel()} - ${this.accessibilityLabel}`
        : undefined;
      return html`
        <div
          class="sbb-file-selector__input-container"
          @dragenter=${this._onDragEnter}
          @dragover=${this._blockEvent}
          @dragleave=${this._onDragLeave}
          @drop=${this._onFileDrop}
        >
          ${this.renderTemplate(
            html`<input
              class="sbb-file-selector__visually-hidden"
              type="file"
              ?disabled="${this.disabled || this.formDisabled}"
              ?multiple="${this.multiple}"
              accept="${this.accept || nothing}"
              aria-label="${ariaLabel || nothing}"
              @change="${this._readFiles}"
              @focus="${this._onFocus}"
              @blur="${this._onBlur}"
              ${ref((el?: Element): void => {
                this._hiddenInput = el as HTMLInputElement;
              })}
            />`,
          )}
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
      `;
    }
  }
  return SbbFileSelectorCommonElement as unknown as Constructor<SbbFileSelectorCommonElementMixinType> &
    T;
};
