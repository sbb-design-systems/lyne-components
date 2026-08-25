The `<sbb-easter-egg>` component is a small hidden [Snake](<https://en.wikipedia.org/wiki/Snake_(video_game_genre)>) game rendered inside an [`<sbb-dialog>`](/docs/elements-dialog--docs) so it can be shown as a modal on top of any page — a lightweight "easter egg" for playful moments.

The component extends `sbb-dialog` and inherits the same lifecycle API:

- `open()` — opens the dialog and starts the game session.
- `close()` — closes the dialog and stops the game timer.
- `isOpen` — reflects whether the dialog is currently open.

While the dialog is open, page scroll below it is blocked automatically.
The game itself is drawn on a `<canvas>` inside the dialog and does not rely on any external image requests: all sprites (grid, food, train segments) are inlined as SVG data URLs at build time. The game should not be used in landscape mode on small screens. A minimum height of 600px is necessary to play the game.

<!-- #region trigger -->

```html
<sbb-button id="snake-trigger">Play Snake</sbb-button>
<sbb-easter-egg trigger="snake-trigger"></sbb-easter-egg>
```

<!-- #endregion -->

Or programmatically:

```js
const egg = document.querySelector('sbb-easter-egg');
egg.open();
// … later …
egg.close();
console.log(egg.score); // current score of the finished/running game
```

## Gameplay

- Use the arrow keys or `W` / `A` / `S` / `D` to move.
- On touch devices, swipe on the game field.
- The snake speeds up every three points collected.
- Colliding with a wall or with itself ends the run — the final score is shown above a **Restart** button in the middle of the game field.

## Internationalization

The visible labels — the dialog title (**SBB Boa Express.**), the score label (**Score**), and the start / restart button — are localized in English, German, French and Italian. They follow the current UI language, read from the `lang` attribute on `<html>`.
The screen-reader announcement (`accessibilityLabel`) is kept in sync automatically.

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbEasterEggElement`, `sbb-easter-egg`

#### Properties

| Name                   | Attribute              | Privacy | Type                        | Default                                 | Description                                                                                                                                                                                                                                                |
| ---------------------- | ---------------------- | ------- | --------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityLabel`   | `accessibility-label`  | public  | `string`                    | `i18nSnakeTitle[this.language.current]` | This will be forwarded as aria-label to the relevant nested element to describe the purpose of the overlay.                                                                                                                                                |
| `backdrop`             | `backdrop`             | public  | `'opaque' \| 'translucent'` | `'opaque'`                              | Backdrop density.                                                                                                                                                                                                                                          |
| `backdropAction`       | `backdrop-action`      | public  | `string`                    | `'none'`                                | Backdrop click action.                                                                                                                                                                                                                                     |
| `highScore`            | -                      | public  | `number`                    | `0`                                     | The highest score reached in the current dialog session. Reset on close.                                                                                                                                                                                   |
| `isOpen`               | -                      | public  | `boolean`                   |                                         | Whether the element is open.                                                                                                                                                                                                                               |
| `negative`             | `negative`             | public  | `boolean`                   | `false`                                 | Negative coloring variant flag.                                                                                                                                                                                                                            |
| `score`                | -                      | public  | `number`                    | `0`                                     | The current game score (number of food items eaten in the current run).                                                                                                                                                                                    |
| `skipFocusRestoration` | `skipFocusRestoration` | public  | `boolean`                   | `false`                                 | Whether to skip restoring focus to the previously-focused element when the overlay is closed. Note that automatic focus restoration is an accessibility feature, and it is recommended that you provide your own equivalent, if you decide to turn it off. |
| `trigger`              | `trigger`              | public  | `HTMLElement \| null`       | `null`                                  | The element that will trigger the menu overlay. For attribute usage, provide an id reference.                                                                                                                                                              |

#### Methods

| Name             | Privacy | Description                                                                 | Parameters    | Return | Inherited From          |
| ---------------- | ------- | --------------------------------------------------------------------------- | ------------- | ------ | ----------------------- |
| `announceTitle`  | public  | Announce the accessibility label or dialog title for screen readers.        |               | `void` | SbbDialogElement        |
| `close`          | public  | Closes the component.                                                       | `result: any` | `void` | SbbOpenCloseBaseElement |
| `escapeStrategy` | public  | The method which is called on escape key press. Defaults to calling close() |               | `void` | SbbOpenCloseBaseElement |
| `open`           | public  | Opens the component.                                                        |               | `void` | SbbOpenCloseBaseElement |

#### Events

| Name          | Type                  | Description                                                                  | Inherited From          |
| ------------- | --------------------- | ---------------------------------------------------------------------------- | ----------------------- |
| `beforeclose` | `SbbDialogCloseEvent` | Emits whenever the component begins the closing transition. Can be canceled. | SbbOpenCloseBaseElement |
| `beforeopen`  | `Event`               | Emits whenever the component starts the opening transition. Can be canceled. | SbbOpenCloseBaseElement |
| `close`       | `SbbDialogCloseEvent` | Emits whenever the component is closed.                                      | SbbOpenCloseBaseElement |
| `open`        | `Event`               | Emits whenever the component is opened.                                      | SbbOpenCloseBaseElement |

#### CSS Properties

| Name                   | Default                              | Description                                                                                                                                                                                                   |
| ---------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--sbb-dialog-z-index` | `var(--sbb-overlay-default-z-index)` | To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`. |

#### Slots

| Name | Description                                                                                                      |
| ---- | ---------------------------------------------------------------------------------------------------------------- |
|      | Use the unnamed slot to provide a `sbb-dialog-title`, `sbb-dialog-content` and an optional `sbb-dialog-actions`. |
