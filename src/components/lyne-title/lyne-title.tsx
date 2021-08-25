import {
  Component,
  h,
  Prop
} from '@stencil/core';
import { InterfaceHeadingAttributes } from './lyne-title.custom.d';

@Component({
  shadow: true,
  styleUrl: 'lyne-title.scss',
  tag: 'lyne-title'
})

export class LyneTitle {

  /** Text for the Title */
  @Prop() public text = 'Default title text';

  /** Title level */
  @Prop() public level: InterfaceHeadingAttributes['level'] = '1';

  /** Visual level for the title */
  @Prop() public visualLevel: InterfaceHeadingAttributes['visualLevel'] = '1';

  /**
   * Sometimes we need an id, especially if we want to associate relationship
   * with aria-labelleyby or aria-describedby */
  // @Prop() public id: 'title-1';

  /**
   * Sometimes we need a title in the markup to present a proper hierarchy to the
   * screenreaders while we do not want to let that title appear visually. In this
   * case we set visuallyHidden to true
   * */
  @Prop() public visuallyHidden: false;


  public render(): JSX.Element {

    console.log(this.visuallyHidden);

    const TAGNAME = `h${this.level}`; // eslint-disable-line @typescript-eslint/no-unused-vars
    const visuallyHidden = this.visuallyHidden ? 'title--hidden' : '';
    const className = `title title--level${this.visualLevel} ${visuallyHidden}`;

    return <TAGNAME class={className}>{this.text}</TAGNAME>;
  }
}
