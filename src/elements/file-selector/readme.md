### sbb-file-selector-dropzone

The `sbb-file-selector-dropzone` is a component which allows user to select one or more files from storage devices.
When files are selected, they appear as a list below the button/dropzone area.
For each file, the name and the size are displayed and an icon allows for deletion.
The component mimics the native `<input type="file"/>` with an additional "drag & drop" area:
it's possible to customize the area's title via the `titleContent` property.
For the basic variant, see [sbb-file-selector](/docs/elements-sbb-file-selector-sbb-file-selector--docs)

```html
<sbb-file-selector-dropzone></sbb-file-selector-dropzone>
```

## Slots

The `error` named slot can be used to display an error message using the `sbb-error` component.

```html
<sbb-file-selector-dropzone>
  <sbb-error slot="error">An error occurred during file upload.</sbb-error>
</sbb-file-selector-dropzone>
```

## States

User interaction can be disabled using the `disabled` property.

```html
<sbb-file-selector-dropzone disabled></sbb-file-selector-dropzone>
```

### Multiple and multipleMode

A single file can be selected by default; this can be changed setting the `multiple` property to `true`.

```html
<sbb-file-selector-dropzone multiple></sbb-file-selector-dropzone>
```

The value of the `multipleMode` property determines whether added files should overwrite existing files (`default`) or be appended to them (`persistent`).

```html
<sbb-file-selector-dropzone multiple multiple-mode="persistent"></sbb-file-selector-dropzone>
```

### Accept

The `accept` property can be used to force the user to select one or more specific file types;
in the next example, only images are allowed.

```html
<sbb-file-selector-dropzone accept=".png,.jpg,.jpeg"></sbb-file-selector-dropzone>
```

## Style

The component has also two different sizes, `m` (default) and `s`, which can be changed using the `size` property.

```html
<sbb-file-selector-dropzone size="s"></sbb-file-selector-dropzone>
```

### Events

Whenever the selection changes, a `filechanged` event is fired, whose `event.detail` property contains the list
of currently selected files. The list can also be retrieved using the public `files` getter.

## Accessibility

It's possible to improve the component accessibility using the `accessibilityLabel` property; this will be set
as `aria-label` of the inner native input and read together with the visible button text.
It's suggested to have a different value for each variant, e.g.:

```html
<sbb-file-selector-dropzone
  accessibility-label="Select a file from hard disk"
></sbb-file-selector-dropzone>
<sbb-file-selector-dropzone
  multiple
  accessibility-label="Select from hard disk - multiple selection allowed"
></sbb-file-selector-dropzone>
```



### sbb-file-selector

The `sbb-file-selector` is a component which allows user to select one or more files from storage devices.
When files are selected, they appear as a list below the button.
For each file, the name and the size are displayed and an icon allows for deletion.
The component mimics the native `<input type="file"/>`; for the drag-and-drop variant, see
[sbb-file-selector-dropzone](/docs/elements-sbb-file-selector-sbb-file-selector-dropzone--docs)

```html
<sbb-file-selector></sbb-file-selector>
```

## Slots

The `error` named slot can be used to display an error message using the `sbb-error` component.

```html
<sbb-file-selector>
  <sbb-error slot="error">An error occurred during file upload.</sbb-error>
</sbb-file-selector>
```

## States

User interaction can be disabled using the `disabled` property.

```html
<sbb-file-selector disabled></sbb-file-selector>
```

### Multiple and multipleMode

A single file can be selected by default; this can be changed setting the `multiple` property to `true`.

```html
<sbb-file-selector multiple></sbb-file-selector>
```

The value of the `multipleMode` property determines whether added files should overwrite existing files (`default`) or be appended to them (`persistent`).

```html
<sbb-file-selector multiple multiple-mode="persistent"></sbb-file-selector>
```

### Accept

The `accept` property can be used to force the user to select one or more specific file types;
in the next example, only images are allowed.

```html
<sbb-file-selector accept=".png,.jpg,.jpeg"></sbb-file-selector>
```

## Style

The component has also two different sizes, `m` (default) and `s`, which can be changed using the `size` property.

```html
<sbb-file-selector size="s"></sbb-file-selector>
```

### Events

Whenever the selection changes, a `filechanged` event is fired, whose `event.detail` property contains the list
of currently selected files. The list can also be retrieved using the public `files` getter.

## Accessibility

It's possible to improve the component accessibility using the `accessibilityLabel` property; this will be set
as `aria-label` of the inner native input and read together with the visible button text.
It's suggested to have a different value for each variant, e.g.:

```html
<sbb-file-selector accessibility-label="Select a file from hard disk"></sbb-file-selector>
<sbb-file-selector
  multiple
  accessibility-label="Select from hard disk - multiple selection allowed"
></sbb-file-selector>
```

