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
      lineColor: 'default',
      bulletType: 'default',
      minHeight: '100',
      hideLine: false,
      bulletSize: 'start-end',
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
        <div class="sbb-pearl-chain-vertical-item__line sbb-pearl-chain-vertical-item__line--default sbb-pearl-chain-vertical-item__line--standard" style="--sbb-pearl-chain-vertical-item-leg-status: 0%;"></div>       
        <div class="sbb-pearl-chain-vertical-item__bullet sbb-pearl-chain-vertical-item__bullet--default sbb-pearl-chain-vertical-item__bullet--start-end"></div>
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
      lineColor: 'disruption',
      bulletType: 'default',
      minHeight: '100',
      hideLine: false,
      bulletSize: 'start-end',
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
        <div class="sbb-pearl-chain-vertical-item__line sbb-pearl-chain-vertical-item__line--disruption sbb-pearl-chain-vertical-item__line--standard" style="--sbb-pearl-chain-vertical-item-leg-status: 0%;"></div>
        <div class="sbb-pearl-chain-vertical-item__bullet sbb-pearl-chain-vertical-item__bullet--default sbb-pearl-chain-vertical-item__bullet--start-end"></div>
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
      bulletType: 'default',
      minHeight: '100',
      bulletSize: 'start-end',
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
        <div class="sbb-pearl-chain-vertical-item__bullet sbb-pearl-chain-vertical-item__bullet--default sbb-pearl-chain-vertical-item__bullet--start-end"></div>
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
      lineColor: 'disruption',
      bulletType: 'past',
      minHeight: '100',
      bulletSize: 'start-end',
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
        <div class="sbb-pearl-chain-vertical-item__bullet sbb-pearl-chain-vertical-item__bullet--past sbb-pearl-chain-vertical-item__bullet--start-end"></div>
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
      lineColor: 'disruption',
      bulletType: 'past',
      minHeight: '100',
      bulletSize: 'start-end',
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
            <div class="sbb-pearl-chain-vertical-item__bullet sbb-pearl-chain-vertical-item__bullet--past sbb-pearl-chain-vertical-item__bullet--start-end"></div>
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
      lineColor: 'disruption',
      bulletType: 'default',
      minHeight: '100',
      hideLine: true,
      bulletSize: 'start-end',
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
          <div class="sbb-pearl-chain-vertical-item__bullet sbb-pearl-chain-vertical-item__bullet--past sbb-pearl-chain-vertical-item__bullet--start-end"></div>
            <div class="sbb-pearl-chain-vertical-item__bullet--position" style="--sbb-pearl-chain-vertical-item-position: 50%;"></div>
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
      lineColor: 'disruption',
      bulletType: 'skipped',
      minHeight: '100',
      hideLine: true,
      bulletSize: 'start-end',
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
            <div class="sbb-pearl-chain-vertical-item__bullet sbb-pearl-chain-vertical-item__bullet--skipped sbb-pearl-chain-vertical-item__bullet--start-end"></div>
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
