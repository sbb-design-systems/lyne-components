import { newSpecPage } from '@stencil/core/testing';
import { SbbPearlChainItem } from './sbb-pearl-chain-item';

describe('sbb-pearl-chain-item', () => {
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
      minHeight: '100px',
      hideLine: false,
      dotSize: 'medium',
      position: 0,
    };
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
    <sbb-pearl-chain-item class="sbb-pearl-chain-item" pearlchainitemattributes="" style="display: table-row;">
    <mock:shadow-root>
      <div class="sbb-pearl-chain-item__row--left" style="display: table-cell; height: 100pxpx;">
        <div class="sbb-pearl-chain-item__left-slot">
          <slot name="left"></slot>
        </div>
      </div>
      <div class="sbb-pearl-chain-item__row--middle" style="display: table-cell;">
        <div class="sbb-color__red sbb-pearl-chain-item__line sbb-pearl-chain-item__line--standard" style="--leg-status: 0%;"></div>
        <div class="sbb-color__red sbb-pearl-chain-item__dot--standard sbb-pearl-chain-item__dot-size--medium"></div>
      </div>
      <div class="sbb-pearl-chain-item__row--right" style="display: table-cell;">
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
      lineColor: 'black',
      dotType: 'standard',
      dotColor: 'gray',
      minHeight: '100',
      dotSize: 'medium',
      hideLine: true,
    };
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
    <sbb-pearl-chain-item class="sbb-pearl-chain-item" pearlchainitemattributes="" style="display: table-row;">
      <mock:shadow-root>
        <div class="sbb-pearl-chain-item__row--left" style="display: table-cell; height: 100px;">
          <div class="sbb-pearl-chain-item__left-slot">
            <slot name="left"></slot>
          </div>
        </div>
        <div class="sbb-pearl-chain-item__row--middle" style="display: table-cell;">
          <div class="sbb-color__gray sbb-pearl-chain-item__dot--standard sbb-pearl-chain-item__dot-size--medium"></div>
        </div>
        <div class="sbb-pearl-chain-item__row--right" style="display: table-cell;">
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
      dotColor: 'black',
      minHeight: '100',
      dotSize: 'small',
      hideLine: true,
    };
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
    <sbb-pearl-chain-item class="sbb-pearl-chain-item" pearlchainitemattributes="" style="display: table-row;">
      <mock:shadow-root>
        <div class="sbb-pearl-chain-item__row--left" style="display: table-cell; height: 100px;">
          <div class="sbb-pearl-chain-item__left-slot">
            <slot name="left"></slot>
          </div>
        </div>
        <div class="sbb-pearl-chain-item__row--middle" style="display: table-cell;">
          <div class="sbb-color__black sbb-pearl-chain-item__dot--thick-bullet sbb-pearl-chain-item__dot-size--small"></div>
        </div>
        <div class="sbb-pearl-chain-item__row--right" style="display: table-cell;">
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
      dotColor: 'black',
      minHeight: '100',
      dotSize: 'medium',
      hideLine: true,
    };
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
    <sbb-pearl-chain-item class="sbb-pearl-chain-item" pearlchainitemattributes="" style="display: table-row;">
      <mock:shadow-root>
        <div class="sbb-pearl-chain-item__row--left" style="display: table-cell; height: 100px;">
          <div class="sbb-pearl-chain-item__left-slot">
            <slot name="left"></slot>
          </div>
        </div>
        <div class="sbb-pearl-chain-item__row--middle" style="display: table-cell;">
          <div class="sbb-color__black sbb-pearl-chain-item__dot--thick-bullet sbb-pearl-chain-item__dot-size--medium"></div>
        </div>
        <div class="sbb-pearl-chain-item__row--right" style="display: table-cell;">
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
      dotColor: 'black',
      minHeight: '100',
      hideLine: true,
      dotSize: 'medium',
      position: 50,
    };
    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <sbb-pearl-chain-item class="sbb-pearl-chain-item" pearlchainitemattributes="" style="display: table-row;">
      <mock:shadow-root>
        <div class="sbb-pearl-chain-item__row--left" style="display: table-cell; height: 100px;">
          <div class="sbb-pearl-chain-item__left-slot">
            <slot name="left"></slot>
          </div>
        </div>
        <div class="sbb-pearl-chain-item__row--middle" style="display: table-cell;">
          <div class="sbb-color__black sbb-pearl-chain-item__dot--thin-bullet sbb-pearl-chain-item__dot-size--ultra">
            <div class="sbb-color__black sbb-pearl-chain-item__dot--thin-bullet sbb-pearl-chain-item__dot-size--extra-small"></div>
          </div>
          <div class="position__dot" style="top: calc(50%;"></div>
        </div>
        <div class="sbb-pearl-chain-item__row--right" style="display: table-cell;">
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
