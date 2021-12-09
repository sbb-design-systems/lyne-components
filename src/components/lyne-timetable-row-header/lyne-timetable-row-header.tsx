import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-timetable-row-header.default.scss',
    shared: 'styles/lyne-timetable-row-header.shared.scss'
  },
  tag: 'lyne-timetable-row-header'
})

export class LyneTimetableRowHeader {

  @Prop() public config!: string;

  public render(): JSX.Element {

    const config = JSON.parse(this.config);

    return (
      <h3 class='row-header'>
        {config.departure.time} {config.departure.productText} {config.departure.productMarketingName} {config.departure.direction}.
      </h3>
    );
  }
}
