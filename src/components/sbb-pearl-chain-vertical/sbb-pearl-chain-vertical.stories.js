import { h } from 'jsx-dom';
import readme from './readme.md';

const lineType = {
  options: ['dotted', 'standard', 'thin'],
  control: { type: 'radio' },
};
const lineColor = {
  options: ['charcoal', 'red', 'metal', 'sky'],
  control: { type: 'radio' },
};
const dotType = {
  options: ['standard', 'thin-bullet', 'thick-bullet', 'double-bullet'],
  control: { type: 'radio' },
};
const dotColor = {
  options: ['charcoal', 'red', 'metal', 'sky'],
  control: { type: 'radio' },
};
const dotSize = {
  options: ['small', 'medium', 'large'],
  control: { type: 'radio' },
};

const hideLine = {
  control: {
    type: 'boolean',
  },
};

const minHeight = {
  control: { type: 'number' },
};

const position = {
  control: { type: 'number' },
};
const defaultArgTypes = {
  lineType,
  lineColor,
  dotType,
  dotColor,
  dotSize,
  hideLine,
  minHeight,
  position,
};

const defaultArgs = {
  lineType: lineType.options[1],
  lineColor: lineColor.options[0],
  dotType: dotType.options[0],
  dotColor: dotColor.options[0],
  minHeight: '100',
  hideLine: false,
  dotSize: dotSize.options[1],
  position: 0,
};

const Template = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item pearlChainItemAttributes={args}>
        <div slot="right" style={{ marginTop: '-10px', marginInlineStart: '10px' }}>
          slot for content
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
        </div>
      </sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};

const TemplateWithoutContent = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={args}
        disable-animation={false}
      ></sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};

const TemplateLeftSlot = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item pearlChainItemAttributes={args}>
        <div slot="left" style={{ marginInlineStart: '10px' }}>
          slot for content
        </div>
      </sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};

const TemplateTwoDots = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item pearlChainItemAttributes={args}>
        <div slot="right" style={{ marginTop: '-10px', marginInlineStart: '10px' }}>
          slot for content
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
        </div>
      </sbb-pearl-chain-item>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'standard',
          lineColor: 'red',
          dotType: 'standard',
          dotColor: 'red',
          minHeight: '100px',
          hideLine: true,
          dotSize: 'medium',
          position: 0,
        }}
      ></sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};

const TemplateLeftSecondSlot = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item pearlChainItemAttributes={args}>
        <div slot="right" style={{ marginTop: '-8px', marginInlineStart: '10px' }}>
          slot for content
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
          <div>more</div>
        </div>
        <div slot="left" style={{ marginTop: '-8px' }}>
          19:00
        </div>
      </sbb-pearl-chain-item>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'standard',
          lineColor: 'red',
          dotType: 'standard',
          dotColor: 'red',
          minHeight: '100px',
          hideLine: true,
          dotSize: 'medium',
          position: 0,
        }}
      >
        <div slot="left" style={{ marginTop: '-10px' }}>
          20:00
        </div>
      </sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};

const connectionDetailTemplate = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item pearlChainItemAttributes={args}>
        <div
          slot="right"
          style={{
            marginTop: '-8px',
            marginInlineStart: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '100px',
            }}
          >
            <div> Haltestelle</div>
            <div>Gleis 12</div>
          </div>
          <div style={{ paddingBottom: '5px', paddingTop: '5px' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <sbb-icon
                role="img"
                class="sbb-icon train-small hydrated"
                name="train-small"
                aria-hidden="true"
              ></sbb-icon>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '95px',
                }}
              >
                <sbb-icon role="img" name="ir-27" aria-hidden="true"></sbb-icon>
                <span>
                  1.<sbb-icon name="utilization-high"></sbb-icon> 2.
                  <sbb-icon name="utilization-high"></sbb-icon>
                </span>
              </div>
            </div>
            <span>Direction Station</span>
          </div>
        </div>
        <div slot="left" style={{ marginTop: '-8px', marginInlineEnd: '10px' }}>
          19:00
        </div>
      </sbb-pearl-chain-item>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'standard',
          lineColor: 'red',
          minHeight: '100px',
          hideLine: true,
          dotSize: 'medium',
          position: 0,
        }}
      >
        <div
          slot="right"
          style={{
            marginTop: '-20px',
            display: 'flex',
            flexDirection: 'row',
            gap: '100px',
            marginInlineStart: '10px',
          }}
        >
          <div> Haltestelle</div>
          <div>Gleis 12</div>
        </div>
        <div slot="left" style={{ marginTop: '-20px', marginInlineEnd: '10px' }}>
          20:00
        </div>
      </sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};

const thirdLevelTemplate = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'thin',
          lineColor: 'metal',
          dotColor: 'metal',
          minHeight: '39',
          hideLine: false,
          dotSize: 'small',
        }}
      >
        <div slot="left" style={{ paddingTop: '15px', marginInlineEnd: '10px' }}>
          10:31
        </div>
      </sbb-pearl-chain-item>
      <sbb-pearl-chain-item pearlChainItemAttributes={args}>
        <div
          slot="right"
          style={{
            marginTop: '-10px',
            marginInlineStart: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '100px',
            }}
          >
            <div> Haltestelle</div>
            <div>Gleis 12</div>
          </div>
          <div style={{ paddingBottom: '5px', paddingTop: '5px' }}>
            <span>
              1.<sbb-icon name="utilization-high"></sbb-icon> 2.
              <sbb-icon name="utilization-high"></sbb-icon>
            </span>
          </div>
        </div>
        <div slot="left" style={{ marginTop: '-10px', marginInlineEnd: '10px' }}>
          <div style={{ fontWeight: 'bold' }}>19:00</div>
          <div style={{ marginTop: '40px' }}>10:31</div>
        </div>
      </sbb-pearl-chain-item>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'standard',
          lineColor: 'charcoal',
          dotColor: 'charcoal',
          minHeight: '89',
          hideLine: false,
          dotType: 'thick-bullet',
          dotSize: 'small',
        }}
      >
        <div
          slot="right"
          style={{
            marginTop: '-10px',
            marginInlineStart: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '100px',
            }}
          >
            <div> Haltestelle</div>
            <div>Gleis 12</div>
          </div>
          <div style={{ paddingBottom: '5px', paddingTop: '5px' }}>
            <span>
              1.<sbb-icon name="utilization-high"></sbb-icon> 2.
              <sbb-icon name="utilization-high"></sbb-icon>
            </span>
          </div>
        </div>

        <div slot="left" style={{ marginTop: '-10px', marginInlineEnd: '10px' }}>
          <div style={{ fontWeight: 'bold' }}>19:00</div>
          <div style={{ marginTop: '40px' }}>10:31</div>
        </div>
      </sbb-pearl-chain-item>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'thin',
          lineColor: 'metal',
          dotColor: 'charcoal',
          minHeight: '89',
          hideLine: false,
          dotType: 'standard',
          dotSize: 'medium',
        }}
      >
        <div
          slot="right"
          style={{
            marginTop: '-10px',
            marginInlineStart: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '100px',
            }}
          >
            <div> Haltestelle</div>
            <div>Gleis 12</div>
          </div>
        </div>

        <div slot="left" style={{ marginTop: '-10px', marginInlineEnd: '10px' }}>
          <div style={{ fontWeight: 'bold' }}>19:00</div>
          <div style={{ marginTop: '40px' }}>10:31</div>
        </div>
      </sbb-pearl-chain-item>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'thin',
          lineColor: 'metal',
          dotColor: 'metal',
          minHeight: '39',
          hideLine: false,
          dotSize: 'small',
          dotType: 'thin-bullet',
        }}
      >
        <div
          slot="right"
          style={{
            marginTop: '-10px',
            marginInlineStart: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '100px',
            }}
          >
            <div> Haltestelle</div>
            <div>Gleis 12</div>
          </div>
        </div>
        <div slot="left" style={{ marginTop: '-10px', marginInlineEnd: '10px' }}>
          <div style={{ fontWeight: 'bold' }}>19:00</div>
        </div>
      </sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};

const TimetableInputTemplate = () => {
  return (
    <div>
      <sbb-pearl-chain-vertical>
        <sbb-pearl-chain-item
          pearlChainItemAttributes={{
            lineType: 'thin',
            lineColor: 'metal',
            dotColor: 'metal',
            minHeight: '40',
            hideLine: false,
            dotType: 'double-bullet',
          }}
        >
          <div slot="right" style={{ marginTop: '-10px', marginInlineStart: '10px' }}>
            <input></input>
          </div>
        </sbb-pearl-chain-item>
      </sbb-pearl-chain-vertical>
      <div style={{ marginTop: '2px' }}>
        <sbb-pearl-chain-vertical>
          <sbb-pearl-chain-item
            style={{ top: '2px' }}
            pearlChainItemAttributes={{
              lineType: 'thin',
              lineColor: 'metal',
              dotColor: 'metal',
              minHeight: '40',
              hideLine: false,
              dotType: 'thin-bullet',
              dotSize: 'small',
            }}
          >
            <div slot="right" style={{ marginTop: '-10px', marginInlineStart: '10px' }}>
              <input></input>
            </div>
          </sbb-pearl-chain-item>
          <sbb-pearl-chain-item
            pearlChainItemAttributes={{
              dotColor: 'metal',
              minHeight: '40',
              hideLine: true,
              dotType: 'double-bullet',
            }}
          >
            <div slot="right" style={{ marginTop: '-10px', marginInlineStart: '10px' }}>
              <input></input>
            </div>
          </sbb-pearl-chain-item>
        </sbb-pearl-chain-vertical>
      </div>
    </div>
  );
};

const TimetableChange = () => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'dotted',
          lineColor: 'sky',
          dotType: 'thick-bullet',
          dotColor: 'charcoal',
          minHeight: '122',
          false: true,
          dotSize: 'medium',
          position: 0,
        }}
      >
        <div
          slot="right"
          style={{
            marginTop: '-10px',
            marginInlineStart: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '100px',
            }}
          >
            <div>09:45</div>
            <div>Gleis 12</div>
          </div>
          <div style={{ paddingBottom: '5px' }}>
            <span style={{ fontSize: '12px' }}>Fußweg</span>
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
          <span style={{ fontSize: '12px' }}>Abfahrt</span>
        </div>
      </sbb-pearl-chain-item>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'dotted',
          lineColor: 'sky',
          dotType: 'standard',
          dotColor: 'charcoal',
          minHeight: '100px',
          hideLine: true,
          dotSize: 'medium',
          position: 0,
        }}
      >
        <div
          slot="right"
          style={{
            marginTop: '-10px',
            marginInlineStart: '10px',
          }}
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
            <div>Gleis 12</div>
          </div>
        </div>
      </sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};

export const defaultPearlChainRightSlot = Template.bind({});
export const defaultPearlChainWithoutContent = TemplateWithoutContent.bind({});

export const defaultPearlChainLeftSlot = TemplateLeftSlot.bind({});
export const defaultPearlChainTwoDots = TemplateTwoDots.bind({});
export const defaultPearlChainLeftSecondSlot = TemplateLeftSecondSlot.bind({});
export const charcoalPearlChain = Template.bind({});
export const dottedPearlChain = Template.bind({});
export const thinPearlChain = Template.bind({});
export const thickBulletPearlChain = Template.bind({});
export const thinBulletPearlChain = Template.bind({});
export const doubleBulletPearlChain = Template.bind({});
export const positionPearlChain = Template.bind({});

export const connectionDetail = connectionDetailTemplate.bind({});

export const timetableConnection = thirdLevelTemplate.bind({});

export const inputForm = TimetableInputTemplate.bind({});

export const timetableChange = TimetableChange.bind({});

/** All kinds oft possible slot and dot combinations */
defaultPearlChainRightSlot.argTypes = defaultArgTypes;
defaultPearlChainRightSlot.args = {
  ...defaultArgs,
};
defaultPearlChainWithoutContent.argTypes = defaultArgTypes;
defaultPearlChainWithoutContent.args = {
  ...defaultArgs,
};

defaultPearlChainLeftSlot.argTypes = defaultArgTypes;
defaultPearlChainLeftSlot.args = {
  ...defaultArgs,
  lineColor: 'red',
  dotColor: 'red',
  minHeight: '100',
};

defaultPearlChainLeftSecondSlot.argTypes = defaultArgTypes;
defaultPearlChainLeftSecondSlot.args = {
  ...defaultArgs,
};

charcoalPearlChain.argTypes = defaultArgTypes;
charcoalPearlChain.args = {
  ...defaultArgs,
  dotType: 'thick-bullet',
};

defaultPearlChainTwoDots.argTypes = defaultArgTypes;
defaultPearlChainTwoDots.args = {
  ...defaultArgs,
  lineColor: 'red',
  dotColor: 'red',
};

/** additional dot types */
dottedPearlChain.argTypes = defaultArgTypes;
dottedPearlChain.args = {
  ...defaultArgs,
  lineType: 'dotted',
  dotColor: 'red',
  lineColor: 'red',
  dotSize: 'small',
};

thinPearlChain.argTypes = defaultArgTypes;
thinPearlChain.args = {
  ...defaultArgs,
  lineType: 'thin',
  dotColor: 'red',
  lineColor: 'red',
  dotSize: 'small',
};

/** additional dot types */
thickBulletPearlChain.argTypes = defaultArgTypes;
thickBulletPearlChain.args = {
  ...defaultArgs,
  dotType: 'thick-bullet',
};

thinBulletPearlChain.argTypes = defaultArgTypes;
thinBulletPearlChain.args = {
  ...defaultArgs,
  dotType: 'thin-bullet',
};

doubleBulletPearlChain.argTypes = defaultArgTypes;
doubleBulletPearlChain.args = {
  ...defaultArgs,
  dotType: 'double-bullet',
};

/** position */
positionPearlChain.argTypes = defaultArgTypes;
positionPearlChain.args = {
  ...defaultArgs,
  position: 75,
  'disable-animation': false,
};

connectionDetail.argTypes = defaultArgTypes;
connectionDetail.args = {
  ...defaultArgs,
};

timetableConnection.argTypes = defaultArgTypes;
timetableConnection.args = {
  ...defaultArgs,
  minHeight: '89',
};
export default {
  decorators: [(Story) => <Story />],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/pearl-chains/sbb-pearl-chain-vertical',
};
