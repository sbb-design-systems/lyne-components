The `sbb-header-environment` component displays a ribbon inside the header to indicate the current environment.

**Note**: For the production environment, the sbb-header-environment is expected to be hidden.

```html
<sbb-header>
  ...
  <sbb-header-environment>dev</sbb-header-environment>
</sbb-header>
```

## Style

We provide default colors for `dev`, `edu`, `int`, `loc` and `test`. Any other environment is by default of color granite.

It is possible to override the ribbon background color by overriding the `--sbb-header-environment-background-color` css var.
Furthermore, the `--sbb-header-environment-color` var can be used change the text color.

```scss
sbb-header-environment {
  --sbb-header-environment-background-color: custom-color;
}
```

<!-- Auto Generated Below -->

## CSS Properties

| Name                                        | Default                  | Description                          |
| ------------------------------------------- | ------------------------ | ------------------------------------ |
| `--sbb-header-environment-background-color` | `var(sbb-color-granite)` | Can be used change the ribbon color. |
| `--sbb-header-environment-color`            | `var(sbb-color-white)`   | Can be used change the text color.   |

## Slots

| Name | Description                                  |
| ---- | -------------------------------------------- |
|      | Use the unnamed slot to add the environment. |
