import { LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { hostPropertiesStatic } from '../../core/common-behaviors';
import { setAttributes } from '../../core/dom';
import { HandlerRepository, linkHandlerAspect } from '../../core/eventing';
import '../../icon';
import { SbbLinkCommonElementMixin } from '../common/link-common';

/**
 * It displays a static link enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-link-static`.
 * @slot icon - Slot used to display the icon, if one is set.
 */
@customElement('sbb-link-static')
export class SbbLinkStaticElement extends SbbLinkCommonElementMixin(LitElement) {
  private _handlerRepository = new HandlerRepository(this, linkHandlerAspect);

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  protected override render(): TemplateResult {
    setAttributes(this, hostPropertiesStatic(this.disabled));
    return this.renderLinkCommonTemplate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-link-static': SbbLinkStaticElement;
  }
}
