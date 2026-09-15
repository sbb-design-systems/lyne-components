The `<sbb-pearl-chain>` component visualizes a journey as a chain of points connected by lines, typically used to
display the stops of a public-transport connection along with its progress.

## Positioning nodes

Place a `<sbb-pearl-chain-node>` for every stop of the journey inside the `<sbb-pearl-chain>`, in the order they
occur. `<sbb-pearl-chain>` connects them with lines automatically, following the DOM order.

Consumers can slot the nodes alongside any other content (times, station names, icons, ...) and lay everything out
however they prefer (e.g. table, flexbox, css-grid). The `<sbb-pearl-chain>` will draw the lines that connect the nodes.

```html
<!-- Example of a horizontal layout using a flex container-->
<sbb-pearl-chain>
  <div style="display: flex;">
    <sbb-pearl-chain-node type="start"></sbb-pearl-chain-node>
    <span style="flex: 1;"></span>
    <sbb-pearl-chain-node type="stop"></sbb-pearl-chain-node>
    <span style="flex: 1;"></span>
    <sbb-pearl-chain-node type="end"></sbb-pearl-chain-node>
  </div>
</sbb-pearl-chain>
```

```html
<!-- Example of a vertical layout using a table -->
<sbb-pearl-chain>
  <table>
    <tr>
      <td>10:00</td>
      <td>
        <sbb-pearl-chain-node type="start" ...></sbb-pearl-chain-node>
      </td>
      <td>Bern</td>
    </tr>
    <tr>
      <td>12:00</td>
      <td>
        <sbb-pearl-chain-node type="stop" ...></sbb-pearl-chain-node>
      </td>
      <td>Olten</td>
    </tr>
    <tr>
      <td>15:00</td>
      <td>
        <sbb-pearl-chain-node type="end" ...></sbb-pearl-chain-node>
      </td>
      <td>Zürich HB</td>
    </tr>
  </table>
</sbb-pearl-chain>
```

## Now / progress

Setting `arrival`/`departure` on the `<sbb-pearl-chain-node>` elements allows the `<sbb-pearl-chain>` to display the current
progress of the journey with a pulsing dot marking the current position.
For testing or demo purposes, the current time can be overridden using the `now` property of `<sbb-pearl-chain>`.

```html
<sbb-pearl-chain>
  <sbb-pearl-chain-node type="start" departure="10-04-26T10:30:00"></sbb-pearl-chain-node>
  <sbb-pearl-chain-node
    type="stop"
    arrival="10-04-26T10:50:00"
    departure="10-04-26T10:55:00"
  ></sbb-pearl-chain-node>
  <sbb-pearl-chain-node type="end" arrival="10-04-26T11:30:00"></sbb-pearl-chain-node>
</sbb-pearl-chain>
```

## Orientation

`<sbb-pearl-chain>` adapts its bullets depending on whether the nodes are laid out horizontally or vertically, so it looks correct in both horizontal and vertical layouts without any explicit configuration.

## Accessibility

`<sbb-pearl-chain>` and `<sbb-pearl-chain-node>` have **no built-in accessibility**: the rendered lines and bullets
are purely decorative and not exposed to assistive technology. If the information conveyed by the pearl chain
(e.g. progress, disruptions) needs to be accessible, it must be provided separately, e.g. via `aria-label` or
`aria-describedby` on the `<sbb-pearl-chain>` element, or through accessible surrounding markup.

<!-- Auto Generated Below -->

## API Documentation

### class: `SbbPearlChainElement`, `sbb-pearl-chain`

#### Properties

| Name  | Attribute | Privacy | Type   | Default | Description                                                                                                               |
| ----- | --------- | ------- | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `now` | `now`     | public  | `Date` |         | A configured date which acts as the current date instead of the real current date. Only recommended for testing purposes. |

### class: `SbbPearlChainNodeElement`, `sbb-pearl-chain-node`

#### Properties

| Name         | Attribute    | Privacy | Type                                                                                                                                                                            | Default | Description                                                                                   |
| ------------ | ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `arrival`    | `arrival`    | public  | `Date \| null`                                                                                                                                                                  | `null`  | The arrival date/time at this node. Accepts ISO 8601 datetime strings.                        |
| `departure`  | `departure`  | public  | `Date \| null`                                                                                                                                                                  | `null`  | The departure date/time at this node. Accepts ISO 8601 datetime strings.                      |
| `disrupted`  | `disrupted`  | public  | `'arrival' \| 'departure' \| true \| null`                                                                                                                                      | `null`  | Marks the node as disrupted, coloring the bullet red (if rendered).                           |
| `irrelevant` | `irrelevant` | public  | `'arrival' \| 'departure' \| true \| null`                                                                                                                                      | `null`  | Marks the node as irrelevant, coloring the bullet gray (if rendered); supersedes `disrupted`. |
| `type`       | `type`       | public  | `'start' \| 'end' \| 'stop' \| 'skip' \| 'commercial' \| 'boarding' \| 'alighting' \| 'stop-duty' \| 'stop-on-demand' \| 'boarding-on-demand' \| 'alighting-on-demand' \| null` | `null`  | Decides how the bullet is rendered. Defaults to \_empty\_ (no bullet).                        |
| `unsure`     | `unsure`     | public  | `'arrival' \| 'departure' \| true \| null`                                                                                                                                      | `null`  | Marks the connection as unsure, rendering the line dashed. Does not affect the bullet.        |
| `walk`       | `walk`       | public  | `'arrival' \| 'departure' \| true \| null`                                                                                                                                      | `null`  | Marks the node as a walk connection. Does not affect the bullet color.                        |
