import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { LinkProperties, LinkTargetType } from '../../interfaces';

export class SbbLinkBaseElement extends LitElement implements LinkProperties {
  /** The href value you want to link to (if it is not present sbb-header-action becomes a button). */
  @property() public href: string | undefined;

  /** Where to display the linked URL. */
  @property() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @property() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @property({ type: Boolean }) public download?: boolean;

  /** Whether the link is disabled. */
  @property({ reflect: true, type: Boolean }) public disabled?: boolean = false;
}
