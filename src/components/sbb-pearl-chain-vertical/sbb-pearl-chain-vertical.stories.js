import { h } from 'jsx-dom';

const Template = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item pearlChainItemAttributes={args} disable-animation={true}>
        <div slot="right" style={{ marginTop: '-10px' }}>
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
        <div slot="left">slot for content</div>
      </sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};

const TemplateTwoDots = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item pearlChainItemAttributes={args}>
        <div slot="right" style={{ marginTop: '-10px' }}>
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
      >
        <div slot="right" style={{ marginTop: '-10px' }}>
          Test
        </div>
      </sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};

const TemplateLeftSecondSlot = (args) => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item pearlChainItemAttributes={args}>
        <div slot="right" style={{ marginTop: '-8px' }}>
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

const connectionDetailTemplate = () => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'standard',
          lineColor: 'black',
          dotType: 'standard',
          dotColor: 'black',
          minHeight: '100',
          hideLine: false,
          dotSize: 'medium',
        }}
      >
        <div
          slot="right"
          style={{
            marginTop: '-8px',
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
        <div slot="left" style={{ marginTop: '-8px' }}>
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
          }}
        >
          <div> Haltestelle</div>
          <div>Gleis 12</div>
        </div>
        <div slot="left" style={{ marginTop: '-20px' }}>
          20:00
        </div>
      </sbb-pearl-chain-item>
    </sbb-pearl-chain-vertical>
  );
};

const thirdLevelTemplate = () => {
  return (
    <sbb-pearl-chain-vertical>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'thin',
          lineColor: 'gray',
          dotColor: 'gray',
          minHeight: '39',
          hideLine: false,
          dotSize: 'small',
        }}
      >
        <div slot="left" style={{ paddingTop: '15px' }}>
          10:31
        </div>
      </sbb-pearl-chain-item>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'standard',
          lineColor: 'black',
          dotColor: 'black',
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
        <div slot="left" style={{ marginTop: '-10px' }}>
          <div style={{ fontWeight: 'bold' }}>19:00</div>
          <div style={{ marginTop: '40px' }}>10:31</div>
        </div>
      </sbb-pearl-chain-item>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'standard',
          lineColor: 'black',
          dotColor: 'black',
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

        <div slot="left" style={{ marginTop: '-10px' }}>
          <div style={{ fontWeight: 'bold' }}>19:00</div>
          <div style={{ marginTop: '40px' }}>10:31</div>
        </div>
      </sbb-pearl-chain-item>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'thin',
          lineColor: 'gray',
          dotColor: 'black',
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

        <div slot="left" style={{ marginTop: '-10px' }}>
          <div style={{ fontWeight: 'bold' }}>19:00</div>
          <div style={{ marginTop: '40px' }}>10:31</div>
        </div>
      </sbb-pearl-chain-item>
      <sbb-pearl-chain-item
        pearlChainItemAttributes={{
          lineType: 'thin',
          lineColor: 'gray',
          dotColor: 'gray',
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
        <div slot="left" style={{ marginTop: '-10px' }}>
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
            lineColor: 'gray',
            dotColor: 'gray',
            minHeight: '40',
            hideLine: false,
            dotType: 'double-bullet',
          }}
        >
          <div slot="right" style={{ paddingTop: '15px' }}>
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
              lineColor: 'gray',
              dotColor: 'gray',
              minHeight: '40',
              hideLine: false,
              dotType: 'thin-bullet',
              dotSize: 'small',
            }}
          >
            <div slot="right" style={{ paddingLeft: '3px' }}>
              <input></input>
            </div>
          </sbb-pearl-chain-item>
          <sbb-pearl-chain-item
            pearlChainItemAttributes={{
              dotColor: 'gray',
              minHeight: '40',
              hideLine: true,
              dotType: 'double-bullet',
            }}
          ></sbb-pearl-chain-item>
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
          dotColor: 'black',
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
          dotColor: 'black',
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
export const defaultPearlChainWithoutContent = TemplateWithoutContent.bind({});
export const defaultPearlChainRightSlot = Template.bind({});
export const defaultPearlChainLeftSlot = TemplateLeftSlot.bind({});
export const defaultPearlChainTwoDots = TemplateTwoDots.bind({});
export const defaultPearlChainLeftSecondSlot = TemplateLeftSecondSlot.bind({});
export const blackPearlChain = Template.bind({});
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

defaultPearlChainWithoutContent.args = {
  lineType: 'standard',
  lineColor: 'black',
  dotType: 'standard',
  dotColor: 'black',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
};

defaultPearlChainRightSlot.args = {
  lineType: 'standard',
  lineColor: 'black',
  dotType: 'standard',
  dotColor: 'black',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
  position: 0,
};

defaultPearlChainLeftSlot.args = {
  lineType: 'standard',
  lineColor: 'red',
  dotType: 'standard',
  dotColor: 'red',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
  position: 0,
};

defaultPearlChainLeftSecondSlot.args = {
  lineType: 'standard',
  lineColor: 'black',
  dotType: 'standard',
  dotColor: 'black',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
  position: 0,
};

blackPearlChain.args = {
  lineType: 'standard',
  dotType: 'thick-bullet',
  dotColor: 'black',
  lineColor: 'black',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
  position: 0,
};

defaultPearlChainTwoDots.args = {
  lineType: 'standard',
  lineColor: 'red',
  dotType: 'standard',
  dotColor: 'red',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
  position: 0,
};

/** additional dot types */

dottedPearlChain.args = {
  lineType: 'dotted',
  dotType: 'standard',
  dotColor: 'red',
  minHeight: '100',
  hideLine: false,
  lineColor: 'red',
  dotSize: 'small',
  position: 0,
};

thinPearlChain.args = {
  lineType: 'thin',
  dotType: 'standard',
  dotColor: 'red',
  minHeight: '100',
  hideLine: false,
  lineColor: 'red',
  dotSize: 'small',
  position: 0,
};

/** additional dot types */

thickBulletPearlChain.args = {
  lineType: 'standard',
  lineColor: 'black',
  dotType: 'thick-bullet',
  dotColor: 'black',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
};

thinBulletPearlChain.args = {
  lineType: 'standard',
  lineColor: 'black',
  dotType: 'thin-bullet',
  dotColor: 'black',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
};

doubleBulletPearlChain.args = {
  lineType: 'standard',
  lineColor: 'black',
  dotType: 'double-bullet',
  dotColor: 'black',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
};

/** position */

positionPearlChain.args = {
  lineType: 'standard',
  lineColor: 'black',
  dotType: 'standard',
  dotColor: 'black',
  minHeight: '100',
  hideLine: false,
  dotSize: 'medium',
  position: 75,
};
export default {
  decorators: [(Story) => <Story />],
  parameters: {},
  argTypes: {
    lineType: {
      options: ['dotted', 'standard', 'thin'],
      control: { type: 'radio' },
    },
    lineColor: {
      options: ['black', 'red', 'gray', 'sky'],
      control: { type: 'radio' },
    },
    dotType: {
      options: ['standard', 'thin-bullet', 'thick-bullet', 'double-bullet'],
      control: { type: 'radio' },
    },
    dotColor: {
      options: ['black', 'red', 'gray', 'sky'],
      control: { type: 'radio' },
    },
    dotSize: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
  },
  title: 'components/sbb-pearl-chain-vertical (Unfinished)',
};
