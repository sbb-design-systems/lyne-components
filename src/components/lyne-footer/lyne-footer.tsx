import {
  Component,
  h,
  Prop
} from '@stencil/core';
import getDocumentWritingMode from '../../global/helpers/get-document-writing-mode';
import { InterfaceFooterAttributes } from './lyne-footer.custom';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/lyne-footer.default.scss',
    shared: 'styles/lyne-footer.shared.scss'
  },
  tag: 'lyne-footer'
})

export class LyneFooter {

  /** Footer appearance */
  @Prop() public appearance?: InterfaceFooterAttributes['appearance'] = 'primary';

  public render(): JSX.Element {

    const className = `footer footer--${this.appearance}`;

    const currentWritingMode = getDocumentWritingMode();

    const attrs = {
      class: className
    };

    return (
      <footer {...attrs}
        dir={currentWritingMode}
      >
        <div class='columns'>
          <slot name='1'/>
          <slot name='2'/>
          <slot name='3'/>
          <slot name='4'/>
        </div>
        <div class='bottom'>
          <slot name='bottom' />
        </div>
      </footer>
    );
  }
}
