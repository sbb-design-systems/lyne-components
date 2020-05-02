import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'test8.css',
  tag: 'lyne-test8'
})
export class Test8 {

  /** Just a sample text */
  @Prop() public text = 'Sample text';

  public render(): JSX.Element {
    return (
      <p>{this.text}</p>
    );
  }

}
