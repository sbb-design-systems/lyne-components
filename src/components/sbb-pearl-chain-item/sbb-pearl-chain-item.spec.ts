import { newSpecPage } from '@stencil/core/testing';
import { SbbPearlChainItem } from './sbb-pearl-chain-item';

describe('sbb-pearl-chain-item', () => {
  it('renders component with charcoal standard line and dot', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainItem],
      html: `
            <sbb-pearl-chain-item pearlChainItemAttributes=''> 
            </sbb-pearl-chain-item>
      `,
    });

    page.rootInstance.pearlChainItemAttributes = {
      lineType: 'standard',
      lineColor: 'charcoal',
      dotType: 'standard',
      dotColor: 'charcoal',
      minHeight: '100',
      hideLine: false,
      dotSize: 'medium',
      position: 0,
    };
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
    <sbb-pearl-chain-item class="sbb-pearl-chain-item" pearlchainitemattributes="">
    <mock:shadow-root>
      <div class="sbb-pearl-chain-item__column" style="height: 100px;">
        <slot name="left"></slot>
      </div>
      <div class="sbb-pearl-chain-item__column">
        <div class="sbb-color--charcoal sbb-pearl-chain-item__line sbb-pearl-chain-item__line--standard" style="--sbb-leg-status: 0%;"></div>
        <div class="sbb-color--charcoal sbb-pearl-chain-item__dot--standard sbb-pearl-chain-item__dot-size--medium"></div>
      </div>
      <div class="sbb-pearl-chain-item__column">
        <slot name="right"></slot>
      </div>
    </mock:shadow-root>
  </sbb-pearl-chain-item>
    `);
  });

  it('renders component with red line and dot', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainItem],
      html: `
            <sbb-pearl-chain-item pearlChainItemAttributes=''> 
            </sbb-pearl-chain-item>
      `,
    });

    page.rootInstance.pearlChainItemAttributes = {
      lineType: 'standard',
      lineColor: 'red',
      dotType: 'standard',
      dotColor: 'red',
      minHeight: '100',
      hideLine: false,
      dotSize: 'medium',
      position: 0,
    };
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
    <sbb-pearl-chain-item class="sbb-pearl-chain-item" pearlchainitemattributes="">
    <mock:shadow-root>
      <div class="sbb-pearl-chain-item__column" style="height: 100px;">
        <slot name="left"></slot>
      </div>
      <div class="sbb-pearl-chain-item__column">
        <div class="sbb-color--red sbb-pearl-chain-item__line sbb-pearl-chain-item__line--standard" style="--sbb-leg-status: 0%;"></div>
        <div class="sbb-color--red sbb-pearl-chain-item__dot--standard sbb-pearl-chain-item__dot-size--medium"></div>
      </div>
      <div class="sbb-pearl-chain-item__column">
        <slot name="right"></slot>
      </div>
    </mock:shadow-root>
  </sbb-pearl-chain-item>
    `);
  });

  it('renders component with left slot', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainItem],
      html: `
            <sbb-pearl-chain-item pearlChainItemAttributes=''> 
            <div slot="left">content</div>
            </sbb-pearl-chain-item>
      `,
    });

    page.rootInstance.pearlChainItemAttributes = {
      lineType: 'dotted',
      lineColor: 'charcoal',
      dotType: 'standard',
      dotColor: 'metal',
      minHeight: '100',
      dotSize: 'medium',
      hideLine: true,
    };
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
    <sbb-pearl-chain-item class="sbb-pearl-chain-item" pearlchainitemattributes="">
      <mock:shadow-root>
        <div class="sbb-pearl-chain-item__column" style="height: 100px;">
          <slot name="left"></slot>
        </div>
        <div class="sbb-pearl-chain-item__column">
          <div class="sbb-color--metal sbb-pearl-chain-item__dot--standard sbb-pearl-chain-item__dot-size--medium"></div>
        </div>
        <div class="sbb-pearl-chain-item__column">
          <slot name="right"></slot>
        </div>
      </mock:shadow-root>
      <div slot="left">
        content
      </div>
    </sbb-pearl-chain-item>
    `);
  });

  it('renders component with right slot', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainItem],
      html: `
            <sbb-pearl-chain-item pearlChainItemAttributes=''> 
            <div slot="right">right content</div>
            </sbb-pearl-chain-item>
      `,
    });

    page.rootInstance.pearlChainItemAttributes = {
      lineType: 'standard',
      lineColor: 'red',
      dotType: 'thick-bullet',
      dotColor: 'charcoal',
      minHeight: '100',
      dotSize: 'small',
      hideLine: true,
    };
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
    <sbb-pearl-chain-item class="sbb-pearl-chain-item" pearlchainitemattributes="">
      <mock:shadow-root>
        <div class="sbb-pearl-chain-item__column" style="height: 100px;">
          <slot name="left"></slot>
        </div>
        <div class="sbb-pearl-chain-item__column">
          <div class="sbb-color--charcoal sbb-pearl-chain-item__dot--thick-bullet sbb-pearl-chain-item__dot-size--small"></div>
        </div>
        <div class="sbb-pearl-chain-item__column">
          <slot name="right"></slot>
        </div>
      </mock:shadow-root>
      <div slot="right">
        right content
      </div>
    </sbb-pearl-chain-item>
    `);
  });

  it('renders component with both slots', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainItem],
      html: `
            <sbb-pearl-chain-item pearlChainItemAttributes=''> 
            <div slot="right">right content</div>
            <div slot="left">left content</div>
            </sbb-pearl-chain-item>
      `,
    });

    page.rootInstance.pearlChainItemAttributes = {
      lineType: 'standard',
      lineColor: 'red',
      dotType: 'thick-bullet',
      dotColor: 'charcoal',
      minHeight: '100',
      dotSize: 'medium',
      hideLine: true,
    };
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
    <sbb-pearl-chain-item class="sbb-pearl-chain-item" pearlchainitemattributes="">
      <mock:shadow-root>
        <div class="sbb-pearl-chain-item__column" style="height: 100px;">
          <slot name="left"></slot>
        </div>
        <div class="sbb-pearl-chain-item__column">
          <div class="sbb-color--charcoal sbb-pearl-chain-item__dot--thick-bullet sbb-pearl-chain-item__dot-size--medium"></div>
        </div>
        <div class="sbb-pearl-chain-item__column">
          <slot name="right"></slot>
        </div>
      </mock:shadow-root>
      <div slot="right">
        right content
      </div>
      <div slot="left">
        left content
      </div>
    </sbb-pearl-chain-item>

    `);
  });

  it('renders a position', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainItem],
      html: `
            <sbb-pearl-chain-item pearlChainItemAttributes=''> 
            <div slot="right">right content</div>
            <div slot="left">left content</div>
            </sbb-pearl-chain-item>
      `,
    });

    page.rootInstance.pearlChainItemAttributes = {
      lineType: 'standard',
      lineColor: 'red',
      dotType: 'double-bullet',
      dotColor: 'charcoal',
      minHeight: '100',
      hideLine: true,
      dotSize: 'medium',
      position: 50,
    };
    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
    <sbb-pearl-chain-item class="sbb-pearl-chain-item" pearlchainitemattributes="">
    <mock:shadow-root>
      <div class="sbb-pearl-chain-item__column" style="height: 100px;">
        <slot name="left"></slot>
      </div>
      <div class="sbb-pearl-chain-item__column">
        <div class="sbb-color--charcoal sbb-pearl-chain-item__dot--thin-bullet sbb-pearl-chain-item__dot-size--ultra">
          <div class="sbb-color--charcoal sbb-pearl-chain-item__dot--thin-bullet sbb-pearl-chain-item__dot-size--extra-small"></div>
        </div>
        <div class="sbb-position__dot" style="--sbb-position: 50%;"></div>
      </div>
      <div class="sbb-pearl-chain-item__column">
        <slot name="right"></slot>
      </div>
    </mock:shadow-root>
    <div slot="right">
      right content
    </div>
    <div slot="left">
      left content
    </div>
  </sbb-pearl-chain-item>
    `);
  });
});
