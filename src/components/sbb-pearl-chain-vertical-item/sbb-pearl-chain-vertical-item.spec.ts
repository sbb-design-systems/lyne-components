import { newSpecPage } from '@stencil/core/testing';
import { SbbPearlChainVerticalItem } from './sbb-pearl-chain-vertical-item';

describe('sbb-pearl-chain-vertical-item', () => {
  it('renders component with charcoal standard line and dot', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainVerticalItem],
      html: `
            <sbb-pearl-chain-vertical-item pearlChainVerticalItemAttributes=''> 
            </sbb-pearl-chain-vertical-item>
      `,
    });

    page.rootInstance.pearlChainVerticalItemAttributes = {
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
    <sbb-pearl-chain-vertical-item pearlChainVerticalItemAttributes="">
    <mock:shadow-root>
      <div class="sbb-pearl-chain-vertical-item__column" style="height: 100px;">
        <slot name="left"></slot>
      </div>
      <div class="sbb-pearl-chain-vertical-item__column  sbb-pearl-chain-vertical-item__column--middle">
        <div class="sbb-color--charcoal sbb-pearl-chain-vertical-item__line sbb-pearl-chain-vertical-item__line--standard" style="--sbb-pearl-chain-vertical-item-leg-status: 0%;"></div>       
        <div class="sbb-color--charcoal sbb-pearl-chain-vertical-item__dot--standard sbb-pearl-chain-vertical-item__dot-size--medium"></div>
      </div>
      <div class="sbb-pearl-chain-vertical-item__column sbb-pearl-chain-vertical-item__column--right">
        <slot name="right"></slot>
      </div>
    </mock:shadow-root>
  </sbb-pearl-chain-vertical-item>
    `);
  });

  it('renders component with red line and dot', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainVerticalItem],
      html: `
            <sbb-pearl-chain-vertical-item pearlChainVerticalItemAttributes=''> 
            </sbb-pearl-chain-vertical-item>
      `,
    });

    page.rootInstance.pearlChainVerticalItemAttributes = {
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
    <sbb-pearl-chain-vertical-item pearlChainVerticalItemAttributes="">
    <mock:shadow-root>
      <div class="sbb-pearl-chain-vertical-item__column" style="height: 100px;">
        <slot name="left"></slot>
      </div>
      <div class="sbb-pearl-chain-vertical-item__column sbb-pearl-chain-vertical-item__column--middle">
        <div class="sbb-color--red sbb-pearl-chain-vertical-item__line sbb-pearl-chain-vertical-item__line--standard" style="--sbb-pearl-chain-vertical-item-leg-status: 0%;"></div>
        <div class="sbb-color--red sbb-pearl-chain-vertical-item__dot--standard sbb-pearl-chain-vertical-item__dot-size--medium"></div>
      </div>
      <div class="sbb-pearl-chain-vertical-item__column sbb-pearl-chain-vertical-item__column--right">
        <slot name="right"></slot>
      </div>
    </mock:shadow-root>
  </sbb-pearl-chain-vertical-item>
    `);
  });

  it('renders component with left slot', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainVerticalItem],
      html: `
            <sbb-pearl-chain-vertical-item pearlChainVerticalItemAttributes=''> 
            <div slot="left">content</div>
            </sbb-pearl-chain-vertical-item>
      `,
    });

    page.rootInstance.pearlChainVerticalItemAttributes = {
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
    <sbb-pearl-chain-vertical-item pearlChainVerticalItemAttributes="">
    <mock:shadow-root>
      <div class="sbb-pearl-chain-vertical-item__column" style="height: 100px;">
        <slot name="left"></slot>
      </div>
      <div class="sbb-pearl-chain-vertical-item__column sbb-pearl-chain-vertical-item__column--middle">
        <div class="sbb-color--metal sbb-pearl-chain-vertical-item__dot--standard sbb-pearl-chain-vertical-item__dot-size--medium"></div>
      </div>
      <div class="sbb-pearl-chain-vertical-item__column sbb-pearl-chain-vertical-item__column--right">
        <slot name="right"></slot>
      </div>
    </mock:shadow-root>
    <div slot="left">
      content
    </div>
  </sbb-pearl-chain-vertical-item>
    `);
  });

  it('renders component with right slot', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainVerticalItem],
      html: `
            <sbb-pearl-chain-vertical-item pearlChainVerticalItemAttributes=''> 
            <div slot="right">right content</div>
            </sbb-pearl-chain-vertical-item>
      `,
    });

    page.rootInstance.pearlChainVerticalItemAttributes = {
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
    <sbb-pearl-chain-vertical-item pearlChainVerticalItemAttributes="">
    <mock:shadow-root>
      <div class="sbb-pearl-chain-vertical-item__column" style="height: 100px;">
        <slot name="left"></slot>
      </div>
      <div class="sbb-pearl-chain-vertical-item__column sbb-pearl-chain-vertical-item__column--middle">
        <div class="sbb-color--charcoal sbb-pearl-chain-vertical-item__dot--thick-bullet sbb-pearl-chain-vertical-item__dot-size--small"></div>
      </div>
      <div class="sbb-pearl-chain-vertical-item__column sbb-pearl-chain-vertical-item__column--right ">
        <slot name="right"></slot>
      </div>
    </mock:shadow-root>
    <div slot="right">
      right content
    </div>
  </sbb-pearl-chain-vertical-item>
    `);
  });

  it('renders component with both slots', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainVerticalItem],
      html: `
            <sbb-pearl-chain-vertical-item pearlChainVerticalItemAttributes=''> 
            <div slot="right">right content</div>
            <div slot="left">left content</div>
            </sbb-pearl-chain-vertical-item>
      `,
    });

    page.rootInstance.pearlChainVerticalItemAttributes = {
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
    <sbb-pearl-chain-vertical-item pearlChainVerticalItemAttributes="">
    <mock:shadow-root>
      <div class="sbb-pearl-chain-vertical-item__column" style="height: 100px;">
        <slot name="left"></slot>
      </div>
      <div class="sbb-pearl-chain-vertical-item__column sbb-pearl-chain-vertical-item__column--middle">
        <div class="sbb-color--charcoal sbb-pearl-chain-vertical-item__dot--thick-bullet sbb-pearl-chain-vertical-item__dot-size--medium"></div>
      </div>
      <div class="sbb-pearl-chain-vertical-item__column  sbb-pearl-chain-vertical-item__column--right">
        <slot name="right"></slot>
      </div>
    </mock:shadow-root>
    <div slot="right">
      right content
    </div>
    <div slot="left">
      left content
    </div>
  </sbb-pearl-chain-vertical-item>
    `);
  });

  it('renders a position', async () => {
    const page = await newSpecPage({
      components: [SbbPearlChainVerticalItem],
      html: `
            <sbb-pearl-chain-vertical-item pearlChainVerticalItemAttributes=''> 
            <div slot="right">right content</div>
            <div slot="left">left content</div>
            </sbb-pearl-chain-vertical-item>
      `,
    });

    page.rootInstance.pearlChainVerticalItemAttributes = {
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
    <sbb-pearl-chain-vertical-item pearlChainVerticalItemAttributes="">
    <mock:shadow-root>
      <div class="sbb-pearl-chain-vertical-item__column" style="height: 100px;">
        <slot name="left"></slot>
      </div>
      <div class="sbb-pearl-chain-vertical-item__column sbb-pearl-chain-vertical-item__column--middle">
        <div class="sbb-color--charcoal sbb-pearl-chain-vertical-item__dot--thin-bullet sbb-pearl-chain-vertical-item__dot-size--ultra">
          <div class="sbb-color--charcoal sbb-pearl-chain-vertical-item__dot--thin-bullet sbb-pearl-chain-vertical-item__dot-size--extra-small"></div>
        </div>
        <div class="sbb-pearl-chain-vertical-item-position__dot" style="--sbb-pearl-chain-vertical-item-position: 50%;"></div>
      </div>
      <div class="sbb-pearl-chain-vertical-item__column sbb-pearl-chain-vertical-item__column--right">
        <slot name="right"></slot>
      </div>
    </mock:shadow-root>
    <div slot="right">
      right content
    </div>
    <div slot="left">
      left content
    </div>
  </sbb-pearl-chain-vertical-item>
    `);
  });
});
