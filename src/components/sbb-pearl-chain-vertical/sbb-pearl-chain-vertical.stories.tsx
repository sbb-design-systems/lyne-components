/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const lineType: InputType = {
  options: ['dotted', 'standard', 'thin'],
  control: { type: 'select' },
};
const lineColor: InputType = {
  options: ['default', 'disruption', 'past', 'walk'],
  control: { type: 'select' },
};
const bulletType: InputType = {
  options: ['default', 'disruption', 'past', 'irrelevant', 'skipped'],
  control: { type: 'select' },
};
const bulletSize: InputType = {
  options: ['start-end', 'stop'],
  control: { type: 'select' },
};

const hideLine: InputType = {
  control: {
    type: 'boolean',
  },
};

const minHeight: InputType = {
  control: { type: 'number' },
};

const position: InputType = {
  control: { type: 'number' },
};

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'PearlChainVerticalItem',
  },
};

const defaultArgTypes: ArgTypes = {
  lineType,
  lineColor,
  bulletType,
  bulletSize,
  hideLine,
  minHeight,
  position,
  disableAnimation,
};

const defaultArgs: Args = {
  lineType: lineType.options[1],
  lineColor: lineColor.options[0],
  bulletType: bulletType.options[0],
  minHeight: '100',
  hideLine: false,
  bulletSize: bulletSize.options[0],
  position: 0,
  disableAnimation: isChromatic(),
};

const Template = ({ disableAnimation, ...args }) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-vertical-item
        pearlChainVerticalItemAttributes={args}
        disable-animation={disableAnimation}
      >
        <div
          slot="right"
          style={{'--sbb-pearl-chain-vertical-right-item-block-start': '-10px', '--sbb-pearl-chain-vertical-right-item-inline-start': '10px'}}
        >
          slot for content
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
        </div>
      </sbb-pearl-chain-vertical-item>
    </sbb-pearl-chain-vertical>
  );
};

const TemplateWithoutContent = ({ disableAnimation, ...args }) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-vertical-item
        pearlChainVerticalItemAttributes={args}
        disable-animation={disableAnimation}
      ></sbb-pearl-chain-vertical-item>
    </sbb-pearl-chain-vertical>
  );
};

const TemplateLeftSlot = ({ disableAnimation, ...args }) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-vertical-item
        pearlChainVerticalItemAttributes={args}
        disable-animation={disableAnimation}
      >
        <div slot="left" style={{'--sbb-pearl-chain-vertical-left-item-inline-end': '10px'}}>
          slot for content
        </div>
      </sbb-pearl-chain-vertical-item>
    </sbb-pearl-chain-vertical>
  );
};

const TemplateTwoDots = ({ disableAnimation, ...args }) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-vertical-item
        pearlChainVerticalItemAttributes={args}
        disable-animation={disableAnimation}
      >
        <div
          slot="right"
          style={{'--sbb-pearl-chain-vertical-right-item-block-start': '-10px', '--sbb-pearl-chain-vertical-right-item-inline-start': '10px'}}
        >
          slot for content
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
        </div>
      </sbb-pearl-chain-vertical-item>
      <sbb-pearl-chain-vertical-item
        disable-animation={disableAnimation}
        pearlChainVerticalItemAttributes={{
          lineType: 'standard',
          lineColor: 'disruption',
          bulletType: 'disruption',
          minHeight: '100px',
          hideLine: true,
          bulletSize: 'start-end',
          position: 0,
        }}
      ></sbb-pearl-chain-vertical-item>
    </sbb-pearl-chain-vertical>
  );
};

const TemplateLeftSecondSlot = ({ disableAnimation, ...args }) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-vertical-item
        pearlChainVerticalItemAttributes={args}
        disable-animation={disableAnimation}
      >
        <div
          slot="right"
          style={{'--sbb-pearl-chain-vertical-right-item-block-start': '-8px', '--sbb-pearl-chain-vertical-right-item-inline-start': '10px'}}
        >
          slot for content
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
        </div>
        <div
          slot="left"
          style={{'--sbb-pearl-chain-vertical-left-item-block-start': '-8px', '--sbb-pearl-chain-vertical-left-item-inline-end': '10px'}}
        >
          19:00
        </div>
      </sbb-pearl-chain-vertical-item>
      <sbb-pearl-chain-vertical-item
        disable-animation={disableAnimation}
        pearlChainVerticalItemAttributes={{
          lineType: 'standard',
          lineColor: 'disruption',
          bulletType: 'disruption',
          minHeight: '100px',
          hideLine: true,
          bulletSize: 'start-end',
          position: 0,
        }}
      >
        <div
          slot="left"
          style={{'--sbb-pearl-chain-vertical-left-item-block-start': '-8px', '--sbb-pearl-chain-vertical-left-item-inline-end': '10px'}}
        >
          20:00
        </div>
      </sbb-pearl-chain-vertical-item>
    </sbb-pearl-chain-vertical>
  );
};

const connectionDetailTemplate = ({ disableAnimation, ...args }) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-vertical-item
        pearlChainVerticalItemAttributes={args}
        disable-animation={disableAnimation}
      >
        <div
          slot="right"
          style={{'--sbb-pearl-chain-vertical-right-item-block-start': '-8px', '--sbb-pearl-chain-vertical-right-item-inline-start': '10px'}}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <div>Station</div>
            <div> Pl. 12</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <sbb-icon
                role="img"
                class="sbb-icon train-small hydrated"
                name="train-small"
                aria-hidden="true"
              ></sbb-icon>

              <sbb-icon role="img" name="ir-27" aria-hidden="true"></sbb-icon>
              <div>Direction Station</div>
            </div>
            <span>
              1.<sbb-icon name="utilization-high"></sbb-icon> 2.
              <sbb-icon name="utilization-high"></sbb-icon>
            </span>
          </div>
        </div>
        <div
          slot="left"
          style={{'--sbb-pearl-chain-vertical-left-item-block-start': '-8px', '--sbb-pearl-chain-vertical-left-item-inline-end': '10px'}}
        >
          19:00
        </div>
      </sbb-pearl-chain-vertical-item>
      <sbb-pearl-chain-vertical-item
        disable-animation={disableAnimation}
        pearlChainVerticalItemAttributes={{
          lineType: 'standard',
          lineColor: 'disruption',
          minHeight: '100px',
          hideLine: true,
          bulletSize: 'stop',
          position: 0,
        }}
      >
        <div
          slot="right"
          style={{'--sbb-pearl-chain-vertical-right-item-block-start': '-20px', '--sbb-pearl-chain-vertical-right-item-inline-start': '10px', display: 'flex', 'flex-direction': 'row', 'justify-content': 'space-between'}}
        >
          <div> Station</div>
          <div> Pl. 12</div>
        </div>
        <div
          slot="left"
          style={{'--sbb-pearl-chain-vertical-left-item-block-start': '-20px', '--sbb-pearl-chain-vertical-left-item-inline-end': '10px'}}
        >
          20:00
        </div>
      </sbb-pearl-chain-vertical-item>
    </sbb-pearl-chain-vertical>
  );
};

const thirdLevelTemplate = ({ disableAnimation, ...args }) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-vertical-item
        disable-animation={disableAnimation}
        pearlChainVerticalItemAttributes={{
          lineType: 'thin',
          lineColor: 'past',
          minHeight: '39',
          hideLine: false,
          bulletSize: 'stop',
        }}
      >
        <div
          slot="left"
          style={{'--sbb-pearl-chain-vertical-left-item-block-start': '15px', '--sbb-pearl-chain-vertical-left-item-inline-end': '10px'}}
        >
          10:31
        </div>
      </sbb-pearl-chain-vertical-item>
      <sbb-pearl-chain-vertical-item
        pearlChainVerticalItemAttributes={args}
        disable-animation={disableAnimation}
      >
        <div
          slot="right"
          style={{'--sbb-pearl-chain-vertical-right-item-block-start': '-10px', '--sbb-pearl-chain-vertical-right-item-inline-start': '10px'}}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '100px',
            }}
          >
            <div> Station</div>
            <div> Pl. 12</div>
          </div>
          <div style={{ paddingBottom: '5px', paddingTop: '5px' }}>
            <span>
              1.<sbb-icon name="utilization-high"></sbb-icon> 2.
              <sbb-icon name="utilization-high"></sbb-icon>
            </span>
          </div>
        </div>
        <div
          slot="left"
          style={{'--sbb-pearl-chain-vertical-left-item-block-start': '-10px', '--sbb-pearl-chain-vertical-left-item-inline-end': '10px'}}
        >
          <div style={{ fontWeight: 'bold' }}>19:00</div>
          <div style={{ marginTop: '40px' }}>10:31</div>
        </div>
      </sbb-pearl-chain-vertical-item>
      <sbb-pearl-chain-vertical-item
        disable-animation={disableAnimation}
        pearlChainVerticalItemAttributes={{
          lineType: 'standard',
          lineColor: 'default',
          minHeight: '89',
          hideLine: false,
          bulletType: 'default',
          bulletSize: 'stop',
        }}
      >
        <div
          slot="right"
          style={{'--sbb-pearl-chain-vertical-right-item-block-start': '-10px', '--sbb-pearl-chain-vertical-right-item-inline-start': '10px'}}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '100px',
            }}
          >
            <div> Station</div>
            <div> Pl. 12</div>
          </div>
          <div style={{ paddingBottom: '5px', paddingTop: '5px' }}>
            <span>
              1.<sbb-icon name="utilization-high"></sbb-icon> 2.
              <sbb-icon name="utilization-high"></sbb-icon>
            </span>
          </div>
        </div>

        <div
          slot="left"
          style={{'--sbb-pearl-chain-vertical-left-item-block-start': '-10px', '--sbb-pearl-chain-vertical-left-item-inline-end': '10px'}}
        >
          <div style={{ fontWeight: 'bold' }}>19:00</div>
          <div style={{ marginTop: '40px' }}>10:31</div>
        </div>
      </sbb-pearl-chain-vertical-item>
      <sbb-pearl-chain-vertical-item
        disable-animation={disableAnimation}
        pearlChainVerticalItemAttributes={{
          lineType: 'thin',
          lineColor: 'past',
          minHeight: '89',
          hideLine: false,
          bulletType: 'default',
          bulletSize: 'start-end',
        }}
      >
        <div
          slot="right"
          style={{'--sbb-pearl-chain-vertical-right-item-block-start': '-10px', '--sbb-pearl-chain-vertical-right-item-inline-start': '10px'}}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '100px',
            }}
          >
            <div> Station</div>
            <div> Pl. 12</div>
          </div>
        </div>

        <div
          slot="left"
          style={{'--sbb-pearl-chain-vertical-left-item-block-start': '-10px', '--sbb-pearl-chain-vertical-left-item-inline-end': '10px'}}
        >
          <div style={{ fontWeight: 'bold' }}>19:00</div>
          <div style={{ marginTop: '40px' }}>10:31</div>
        </div>
      </sbb-pearl-chain-vertical-item>
      <sbb-pearl-chain-vertical-item
        disable-animation={disableAnimation}
        pearlChainVerticalItemAttributes={{
          lineType: 'thin',
          lineColor: 'past',
          minHeight: '39',
          hideLine: false,
          bulletSize: 'stop',
          bulletType: 'irrelevant',
        }}
      >
        <div
          slot="right"
          style={{'--sbb-pearl-chain-vertical-right-item-block-start': '-10px', '--sbb-pearl-chain-vertical-right-item-inline-start': '10px'}}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '100px',
            }}
          >
            <div> Station</div>
            <div> Pl. 12</div>
          </div>
        </div>
        <div
          slot="left"
          style={{'--sbb-pearl-chain-vertical-left-item-block-start': '-10px', '--sbb-pearl-chain-vertical-left-item-inline-end': '10px'}}
        >
          <div style={{ fontWeight: 'bold' }}>19:00</div>
        </div>
      </sbb-pearl-chain-vertical-item>
    </sbb-pearl-chain-vertical>
  );
};

const TimetableChange = () => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-vertical-item
        disable-animation={disableAnimation}
        pearlChainVerticalItemAttributes={{
          lineType: 'dotted',
          lineColor: 'walk',
          bulletType: 'thick',
          minHeight: '122',
          false: true,
          bulletSize: 'stop',
          position: 0,
        }}
      >
        <div
          slot="right"
          style={{'--sbb-pearl-chain-vertical-right-item-block-start': '-10px', '--sbb-pearl-chain-vertical-right-item-inline-start': '10px'}}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '100px',
            }}
          >
            <div>09:45</div>
            <div> Pl. 12</div>
          </div>
          <div style={{ paddingBottom: '5px' }}>
            <span style={{ fontSize: '12px' }}>Footpath</span>
          </div>
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '130px',
                fontSize: '12px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <div>
                  <sbb-icon role="img" name="walk-small" aria-hidden="true"></sbb-icon>
                </div>
                <div> 5'</div>
              </div>
              <div style={{ fontSize: '12px' }}>150 m</div>
            </div>
          </div>
          <span style={{ fontSize: '12px' }}>Departure</span>
        </div>
      </sbb-pearl-chain-vertical-item>
      <sbb-pearl-chain-vertical-item
        disable-animation={disableAnimation}
        pearlChainVerticalItemAttributes={{
          lineType: 'dotted',
          lineColor: 'walk',
          bulletType: 'standard',
          minHeight: '100px',
          hideLine: true,
          bulletSize: 'start-end',
          position: 0,
        }}
      >
        <div
          slot="right"
          style={{'--sbb-pearl-chain-vertical-right-item-block-start': '-10px', '--sbb-pearl-chain-vertical-right-item-inline-start': '10px'}}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '100px',
              fontWeight: 'bold',
            }}
          >
            <div>09:45</div>
            <div>Pl. 12</div>
          </div>
        </div>
      </sbb-pearl-chain-vertical-item>
    </sbb-pearl-chain-vertical>
  );
};

export const defaultPearlChainRightSlot: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
},
};
export const defaultPearlChainWithoutContent: StoryObj = {
  render: TemplateWithoutContent,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
},
};

export const defaultPearlChainLeftSlot: StoryObj = {
  render: TemplateLeftSlot,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  lineColor: 'disruption',
  bulletType: 'disruption',
  minHeight: '100',
},
};
export const defaultPearlChainTwoDots: StoryObj = {
  render: TemplateTwoDots,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  lineColor: 'disruption',
  bulletType: 'disruption',
},
};
export const defaultPearlChainLeftSecondSlot: StoryObj = {
  render: TemplateLeftSecondSlot,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
},
};
export const charcoalPearlChain: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  bulletType: 'thick',
},
};
export const dottedPearlChain: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  lineType: 'dotted',
  lineColor: 'disruption',
  bulletType: 'disruption',
  bulletSize: 'start-end',
},
};
export const thinPearlChain: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  lineType: 'thin',
  lineColor: 'disruption',
  bulletType: 'disruption',
  bulletSize: 'stop',
},
};
export const thickBulletPearlChain: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  bulletSize: 'stop',
},
};
export const thinBulletPearlChain: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  bulletType: 'irrelevant',
  bulletSize: 'stop',
},
};
export const crossedBulletPearlChain: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  bulletType: 'skipped',
  lineType: 'dotted',
  lineColor: 'disruption',
},
};

export const positionPearlChain: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  position: 75,
},
};

export const connectionDetail: StoryObj = {
  render: connectionDetailTemplate,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
},
};

export const timetableConnection: StoryObj = {
  render: thirdLevelTemplate,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  minHeight: '89',
},
};

export const timetableChange: StoryObj = {
  render: TimetableChange,
};

/** All kinds oft possible slot and bullet combinations */

















/** additional bullet types */






/** additional dot types */









/** position */








const meta: Meta =  {
  decorators: [(Story) => <Story />],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/sbb-pearl-chain-vertical',
};

export default meta;
