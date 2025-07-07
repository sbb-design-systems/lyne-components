The `sbb-header-environment` component displays a ribbon inside the header to indicate the current environment.

**Note**: For the production environment, the sbb-header-environment is expected to be hidden.

```html
<sbb-header>
  ...
  <sbb-header-environment>dev</sbb-header-environment>
</sbb-header>
```

## Style

We provide default colors for `dev`, `edu`, `int`, `loc` and `test`. Any other environment is by default red.

It is possible to override the ribbon background color by overriding the `--sbb-header-environment-color` css var.

```scss
sbb-header-environment {
  --sbb-header-environment-color: custom-color;
}

// Or you can override a specific environment color
sbb-header-environment[data-env='dev'] {
  --sbb-header-environment-color: custom-color;
}
```

<!-- Auto Generated Below -->

## CSS Properties

| Name                             | Default              | Description                          |
| -------------------------------- | -------------------- | ------------------------------------ |
| `--sbb-header-environment-color` | `var(sbb-color-red)` | Can be used change the ribbon color. |

## Slots

| Name | Description                                  |
| ---- | -------------------------------------------- |
|      | Use the unnamed slot to add the environment. |
