The `sbb-clock` component displays an analog clock face in the style of the classic SBB station clock.

It mimics its behavior too, completing a rotation in approximately 58.5 seconds,
then it briefly pauses at the clock top before starting a new rotation.

```html
<sbb-clock></sbb-clock>
```

To specify a specific date for the current datetime, you can use the `now` property (timestamp in milliseconds).
This is helpful if you need a specific state of the component.

```html
<sbb-clock now="1715843833451"></sbb-clock>
```

<!-- Auto Generated Below -->

## Properties

| Name      | Attribute | Privacy | Type                  | Default | Description                                                           |
| --------- | --------- | ------- | --------------------- | ------- | --------------------------------------------------------------------- |
| `dataNow` | `now`     | public  | `number \| undefined` |         | A specific date for the current datetime (timestamp in milliseconds). |
