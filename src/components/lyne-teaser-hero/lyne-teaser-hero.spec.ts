import { LyneTeaserHero } from './lyne-teaser-hero';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-teaser-hero', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneTeaserHero],
      html: '<lyne-teaser-hero></lyne-teaser-hero>'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-teaser-hero>
          <mock:shadow-root>
            <div class="taser-hero">
              <lyne-image class="teaser-hero__image" customfocalpoint="" hidefromscreenreader="" imagesrc="" imagesrcexamples="https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg" loading="eager" lqip="" performancemark="" picturesizesconfig="{&quot;breakpoints&quot;:[{&quot;image&quot;:{&quot;height&quot;:&quot;2579&quot;,&quot;width&quot;:&quot;2579&quot;},&quot;mediaQueries&quot;:[{&quot;conditionFeature&quot;:&quot;min-width&quot;,&quot;conditionFeatureValue&quot;:{&quot;lyneDesignToken&quot;:true,&quot;value&quot;:&quot;BreakpointUltraMin&quot;},&quot;conditionOperator&quot;:false}]},{&quot;image&quot;:{&quot;height&quot;:&quot;1439&quot;,&quot;width&quot;:&quot;1439&quot;},&quot;mediaQueries&quot;:[{&quot;conditionFeature&quot;:&quot;max-width&quot;,&quot;conditionFeatureValue&quot;:{&quot;lyneDesignToken&quot;:true,&quot;value&quot;:&quot;BreakpointWideMax&quot;},&quot;conditionOperator&quot;:false}]},{&quot;image&quot;:{&quot;height&quot;:&quot;1279&quot;,&quot;width&quot;:&quot;1279&quot;},&quot;mediaQueries&quot;:[{&quot;conditionFeature&quot;:&quot;max-width&quot;,&quot;conditionFeatureValue&quot;:{&quot;lyneDesignToken&quot;:true,&quot;value&quot;:&quot;BreakpointLargeMax&quot;},&quot;conditionOperator&quot;:false}]},{&quot;image&quot;:{&quot;height&quot;:&quot;1023&quot;,&quot;width&quot;:&quot;1023&quot;},&quot;mediaQueries&quot;:[{&quot;conditionFeature&quot;:&quot;max-width&quot;,&quot;conditionFeatureValue&quot;:{&quot;lyneDesignToken&quot;:true,&quot;value&quot;:&quot;BreakpointMediumMax&quot;},&quot;conditionOperator&quot;:false}]},{&quot;image&quot;:{&quot;height&quot;:&quot;839&quot;,&quot;width&quot;:&quot;839&quot;},&quot;mediaQueries&quot;:[{&quot;conditionFeature&quot;:&quot;max-width&quot;,&quot;conditionFeatureValue&quot;:{&quot;lyneDesignToken&quot;:true,&quot;value&quot;:&quot;BreakpointSmallMax&quot;},&quot;conditionOperator&quot;:false}]},{&quot;image&quot;:{&quot;height&quot;:&quot;599&quot;,&quot;width&quot;:&quot;599&quot;},&quot;mediaQueries&quot;:[{&quot;conditionFeature&quot;:&quot;max-width&quot;,&quot;conditionFeatureValue&quot;:{&quot;lyneDesignToken&quot;:true,&quot;value&quot;:&quot;BreakpointMicroMax&quot;},&quot;conditionOperator&quot;:false}]},{&quot;image&quot;:{&quot;height&quot;:&quot;359&quot;,&quot;width&quot;:&quot;359&quot;},&quot;mediaQueries&quot;:[{&quot;conditionFeature&quot;:&quot;max-width&quot;,&quot;conditionFeatureValue&quot;:{&quot;lyneDesignToken&quot;:true,&quot;value&quot;:&quot;BreakpointZeroMax&quot;},&quot;conditionOperator&quot;:false}]}]}" variant="teaser-hero"></lyne-image>
              <lyne-panel buttontext="Sample button text" class="teaser-hero__panel" text="Sample panel text"></lyne-panel>
            </div>
          </mock:shadow-root>
        </lyne-teaser-hero>
      `);
  });

});
