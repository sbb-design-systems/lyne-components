import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-row-column-headers.default.scss',
    shared: 'styles/lyne-timetable-row-column-headers.shared.scss'
  },
  tag: 'lyne-timetable-row-column-headers'
})

export class LyneTimetableRowColumnHeaders {

  @Prop() public config!: string;

  public render(): JSX.Element {

    const columnHeaders = JSON.parse(this.config);

    return (
      <div
        class='column-headers'
        role='none'
      >
        {
          columnHeaders.map((columnHeader) => <div role='columnheader'>{columnHeader}</div>)
        }
      </div>

    );
  }
}
