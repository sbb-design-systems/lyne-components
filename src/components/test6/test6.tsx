import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'test6.css',
  tag: 'lyne-test6'
})
export class Test6 {

  /** Just a sample text */
  @Prop() public text = 'Sample text';

  public render(): JSX.Element {
    return (
      <p>{this.text}</p>
    );
  }

}
