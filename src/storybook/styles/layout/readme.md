## Page Spacing

The page spacing ensures inline margins and controls the max-width of the page.
The `wide`-variant has a smaller inline spacing and no max-width.

| css class               | sass mixin          |
| ----------------------- | ------------------- |
| `sbb-page-spacing`      | `page-spacing`      |
| `sbb-page-spacing-wide` | `page-spacing-wide` |

### Usage

```html
<section class="sbb-page-spacing"></section>
```

## Grid

The grid is available as css class or sass mixin.
It provides the grid from the design specifications on which you can place your elements.
The `wide`-variant has a smaller inline spacing and no max-width.
[See css grid docs for full documentation of all the possibilities of placing elements on a grid.](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

| css class       | sass mixin  |
| --------------- | ----------- |
| `sbb-grid`      | `grid`      |
| `sbb-grid-wide` | `grid-wide` |

### Usage

Two items placed on grid using each 2 of 4 columns.

```html
<style>
  .item-1 {
    grid-column: 1 / 2;
  }
  .item-2 {
    grid-column: 3 / 4;
  }
</style>
<div class="sbb-grid">
  <div class="item-1"></div>
  <div class="item-2"></div>
</div>
```

Using columns in the middle of the grid (e.g. alerts in home stories).

```sass
  @use '@sbb-esta/lyne-components' as sbb;

  .grid-reduced-width {
    grid-column: 1/-1;

    @include sbb.mq($from: large) {
      grid-column: 2/-2;
    }
    @include sbb.mq($from: wide) {
      grid-column: 3/-3;
    }
    @include sbb.mq($from: ultra) {
      grid-column: 4/-4;
    }
  }
```

```html
<div class="sbb-grid">
  <div class="grid-reduced-width"></div>
</div>
```
