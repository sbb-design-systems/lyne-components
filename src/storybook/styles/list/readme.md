## sbb-list

| css class  | sass mixin |
| ---------- | ---------- |
| `sbb-list` | `list`     |

The list styling can be applied to any ordered or unordered list.
Nesting lists is also supported without redefining the css class.

### Sass usage

The sass mixin can be included at top level or in a rule.
If used at top level it will apply rules to the native `<ul>` and `<ol>` elements.
If used inside a rule it will extend the rule with `<ul>` and `<ol>`
selectors (e.g. `.sbb-list { @include sbb.list; }` > `.sbb-list:where(ol, ul) {...}`).

### Usage

```html
<ul class="sbb-list sbb-text-m">
  <li>Content</li>
</ul>
```

## sbb-step-list

| css class       | sass mixin  |
| --------------- | ----------- |
| `sbb-step-list` | `step-list` |

The step list can only be used as ordered variant.
To achieve a correct styling, it is important to also define the font-size
by using the predefined classes (e.g. `sbb-text-s`).

```html
<ol class="sbb-step-list sbb-text-m">
  <li>Content</li>
</ol>
```

## sbb-description-list

| css class  | sass mixin         |
| ---------- | ------------------ |
| `sbb-list` | `description-list` |

The description list is meant to be used with the native `<dl>`.

### Sass usage

The sass mixin can be included at top level or in a rule.
If used at top level it will apply rules to the native `<dl>` element.
If used inside a rule it will extend the rule with `<dl>`.
selectors (e.g. `.sbb-list { @include sbb.description-list; }` > `.sbb-list:where(dl) {...}`).

```html
<dl class="sbb-list">
  <dt>Label:</dt>
  <dd>Description of the label.</dd>

  <dt>Other Label:</dt>
  <dd>Description of the label which is longer than the other one.</dd>
</dl>
```
