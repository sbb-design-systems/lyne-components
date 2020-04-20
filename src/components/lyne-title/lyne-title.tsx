import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'lyne-title.scss',
  tag: 'lyne-title'
})

export class LyneTitle {

  /** Text for the title */
  @Prop() public text = 'Default title text';

  /** Title level */
  @Prop() public level = '3';

  public render(): JSX.Element {

    const TagName = `h${this.level}`; // eslint-disable-line @typescript-eslint/no-unused-vars

    return <TagName class='title'>{this.text}</TagName>;
  }
}
