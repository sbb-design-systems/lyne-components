import {
  Component,
  h,
  Prop
} from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'test3.css',
  tag: 'lyne-test3'
})
export class Test3 {

  /** Just a sample text */
  @Prop() public text = 'Sample text';

  public render(): JSX.Element {
    return (
      <p>{this.text}</p>
    );
  }

}
