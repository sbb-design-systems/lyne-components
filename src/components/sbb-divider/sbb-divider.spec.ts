import { SbbDivider } from './sbb-divider';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-divider (default)', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDivider],
      html: '<sbb-divider />',
    });

    expect(root).toEqualHtml(`
      <sbb-divider orientation="horizontal" aria-orientation="horizontal" role="separator">
        <mock:shadow-root></mock:shadow-root>
      </sbb-divider>
    `);
  });
});

describe('sbb-divider (horizontal)', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDivider],
      html: '<sbb-divider orientation="horizontal" />',
    });

    expect(root).toEqualHtml(`
      <sbb-divider orientation="horizontal" aria-orientation="horizontal" role="separator">
        <mock:shadow-root></mock:shadow-root>
      </sbb-divider>
    `);
  });
});

describe('sbb-divider (vertical)', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDivider],
      html: '<sbb-divider orientation="vertical" />',
    });

    expect(root).toEqualHtml(`
      <sbb-divider orientation="vertical" aria-orientation="vertical" role="separator">
        <mock:shadow-root></mock:shadow-root>
      </sbb-divider>
    `);
  });
});

describe('sbb-divider (horizontal, negative)', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDivider],
      html: '<sbb-divider orientation="horizontal" negative />',
    });

    expect(root).toEqualHtml(`
      <sbb-divider orientation="horizontal" negative aria-orientation="horizontal" role="separator">
        <mock:shadow-root></mock:shadow-root>
      </sbb-divider>
    `);
  });
});

describe('sbb-divider (vertical, negative)', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbDivider],
      html: '<sbb-divider orientation="vertical" negative />',
    });

    expect(root).toEqualHtml(`
      <sbb-divider orientation="vertical" negative aria-orientation="vertical" role="separator">
        <mock:shadow-root></mock:shadow-root>
      </sbb-divider>
    `);
  });
});
