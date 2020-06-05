import {
  Component,
  h,
  Prop
} from '@stencil/core';
import { InterfaceHeadingAttributes } from './lyne-heading.d';

@Component({
  shadow: true,
  styleUrl: 'lyne-heading.scss',
  tag: 'lyne-heading'
})

export class LyneHeading {

  /** Text for the Heading */
  @Prop() public text = 'Default title text';

  /** Heading level */
  @Prop() public level: InterfaceHeadingAttributes['level'] = '1';

  /** Visual level for the heading */
  @Prop() public visualLevel: InterfaceHeadingAttributes['visualLevel'] = '1';

  private testFunc = (): number => {
    const foo = 1;

    return foo * 10;
  };

  public render(): JSX.Element {

    const testVal = this.testFunc();

    console.log(testVal);

    const TagName = `h${this.level}`; // eslint-disable-line @typescript-eslint/no-unused-vars
    const className = `title title--level${this.visualLevel}`;

    return <TagName class={className}>{this.text}</TagName>;
  }
}
