import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/sbb-timetable-row-header.default.scss',
    shared: 'styles/sbb-timetable-row-header.shared.scss'
  },
  tag: 'sbb-timetable-row-header'
})

export class SbbTimetableRowHeader {

  @Prop() public config!: string;

  public render(): JSX.Element {

    /**
     * Stringified JSON which defines most of the
     * content of the component. Please check the
     * individual stories to get an idea of the
     * structure.
     */
    const config = JSON.parse(this.config);

    return (
      <h3 class='row-header'>
        {config.departure.time} {config.departure.productText} {config.departure.productMarketingName} {config.departure.direction}.
      </h3>
    );
  }
}
