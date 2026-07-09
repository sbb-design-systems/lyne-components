The `<sbb-easter-egg>` component is a small hidden [Snake](<https://en.wikipedia.org/wiki/Snake_(video_game_genre)>) game rendered inside an [`<sbb-dialog>`](/docs/elements-dialog--docs) so it can be shown as a modal on top of any page — a lightweight "easter egg" for playful moments.

The component extends `sbb-dialog` and inherits the same lifecycle API:

- `open()` — opens the dialog and starts the game session.
- `close()` — closes the dialog and stops the game timer.
- `isOpen` — reflects whether the dialog is currently open.

While the dialog is open, page scroll below it is blocked automatically.
The game itself is drawn on a `<canvas>` inside the dialog and does not rely on any external image requests: all sprites (grid, food, train segments) are inlined as SVG data URLs at build time. The game should not be used in landscape mode on small screens. A minimum height of 600px is necessary to play the game.

```html
<button id="snake-trigger">Play Snake</button>
<sbb-easter-egg trigger="snake-trigger"></sbb-easter-egg>
```

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

The visible labels — the dialog title (**Swiss Boa Express.**), the score label (**Score**), and the start / restart button — are localized in English, German, French and Italian. They follow the current UI language, read from the `lang` attribute on `<html>`.
The screen-reader announcement (`accessibilityLabel`) is kept in sync automatically.

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbEasterEggElement`, `sbb-easter-egg`

#### Properties

| Name                 | Attribute | Privacy | Type     | Default                                 | Description                                                              |
| -------------------- | --------- | ------- | -------- | --------------------------------------- | ------------------------------------------------------------------------ |
| `accessibilityLabel` | -         |         |          | `i18nSnakeTitle[this.language.current]` |                                                                          |
| `backdropAction`     | -         |         | `string` | `'none'`                                |                                                                          |
| `highScore`          | -         | public  | `number` | `0`                                     | The highest score reached in the current dialog session. Reset on close. |
| `score`              | -         | public  | `number` | `0`                                     | The current game score (number of food items eaten in the current run).  |
