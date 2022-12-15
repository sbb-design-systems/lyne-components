import { newSpecPage } from '@stencil/core/testing';
import { SbbPearlChainVerticalItem } from './sbb-pearl-chain-vertical-item';

describe('sbb-pearl-chain-vertical-item', () => {
  it('renders component with charcoal standard line and bullet', async () => {
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
      bulletType: 'standard',
      bulletColor: 'charcoal',
      minHeight: '100',
      hideLine: false,
      bulletSize: 'm',
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
        <div class="sbb-color--charcoal sbb-pearl-chain-vertical-item__bullet sbb-pearl-chain-vertical-item__bullet--standard sbb-pearl-chain-vertical-item__bullet-size--m"></div>
      </div>
      <div class="sbb-pearl-chain-vertical-item__column sbb-pearl-chain-vertical-item__column--right">
        <slot name="right"></slot>
      </div>
    </mock:shadow-root>
  </sbb-pearl-chain-vertical-item>
    `);
  });

  it('renders component with red line and bullet', async () => {
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
      bulletType: 'standard',
      bulletColor: 'red',
      minHeight: '100',
      hideLine: false,
      bulletSize: 'm',
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
        <div class="sbb-color--red sbb-pearl-chain-vertical-item__bullet sbb-pearl-chain-vertical-item__bullet--standard sbb-pearl-chain-vertical-item__bullet-size--m"></div>
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
      bulletType: 'standard',
      bulletColor: 'metal',
      minHeight: '100',
      bulletSize: 'm',
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
        <div class="sbb-color--metal sbb-pearl-chain-vertical-item__bullet sbb-pearl-chain-vertical-item__bullet--standard sbb-pearl-chain-vertical-item__bullet-size--m"></div>
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
      bulletType: 'thick',
      bulletColor: 'charcoal',
      minHeight: '100',
      bulletSize: 's',
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
        <div class="sbb-color--charcoal sbb-pearl-chain-vertical-item__bullet sbb-pearl-chain-vertical-item__bullet--thick sbb-pearl-chain-vertical-item__bullet-size--s"></div>
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
      bulletType: 'thick',
      bulletColor: 'charcoal',
      minHeight: '100',
      bulletSize: 'm',
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
            <div class="sbb-color--charcoal sbb-pearl-chain-vertical-item__bullet sbb-pearl-chain-vertical-item__bullet--thick sbb-pearl-chain-vertical-item__bullet-size--m"></div>
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
      bulletType: 'double',
      bulletColor: 'charcoal',
      minHeight: '100',
      hideLine: true,
      bulletSize: 'm',
      position: 50,
    };
    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <sbb-pearl-chain-vertical-item pearlchainverticalitemattributes="">
        <mock:shadow-root>
          <div class="sbb-pearl-chain-vertical-item__column" style="height: 100px;">
            <slot name="left"></slot>
          </div>
          <div class="sbb-pearl-chain-vertical-item__column sbb-pearl-chain-vertical-item__column--middle">
            <div class="sbb-color--metal sbb-pearl-chain-vertical-item__bullet sbb-pearl-chain-vertical-item__bullet--double sbb-pearl-chain-vertical-item__bullet-size--m"></div>
            <div class="sbb-pearl-chain-vertical-item-position__bullet" style="--sbb-pearl-chain-vertical-item-position: 50%;"></div>
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

  it('renders a crossed-bullet', async () => {
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
      bulletType: 'crossed',
      bulletColor: 'charcoal',
      minHeight: '100',
      hideLine: true,
      bulletSize: 'm',
      position: 0,
    };
    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <sbb-pearl-chain-vertical-item pearlchainverticalitemattributes="">
        <mock:shadow-root>
          <div class="sbb-pearl-chain-vertical-item__column" style="height: 100px;">
            <slot name="left"></slot>
          </div>
          <div class="sbb-pearl-chain-vertical-item__column sbb-pearl-chain-vertical-item__column--middle">
            <div class="sbb-color--charcoal sbb-pearl-chain-vertical-item__bullet sbb-pearl-chain-vertical-item__bullet--crossed sbb-pearl-chain-vertical-item__bullet-size--m"></div>
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
