import {
  Component,
  h
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable.default.scss',
    shared: 'styles/lyne-timetable.shared.scss'
  },
  tag: 'lyne-timetable'
})

export class LyneTimetable {

  public render(): JSX.Element {

    return (
      <div
        class='timetable'
        role='grid'
      >
        <slot />
      </div>
    );
  }
}
