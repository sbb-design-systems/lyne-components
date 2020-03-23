# Design System API

* [https://matthewstrom.com/writing/design-apis/](https://matthewstrom.com/writing/design-apis/)

… maybe build the API as GraphQL API so the consumer can get what they want instead of a classical REST API


## Design Tokens

design tokens are design primitives  

global design tokens vs. component design tokens  

* https://twitter.com/sarah_federman/status/1164166321069645825  

* [https://badootech.badoo.com/design-tokens-beyond-colors-typography-and-spacing-ad7c98f4f228](https://badootech.badoo.com/design-tokens-beyond-colors-typography-and-spacing-ad7c98f4f228)

technically speaking: design tokens are organised lists of key-value pairs that describe design decisions  

https://github.com/sturobson/Awesome-Design-Tokens

### Design Token

* [https://github.com/design-tokens/community-group](https://github.com/design-tokens/community-group)
* https://github.com/universal-design-tokens/udt

- Sense

	- Sight

		- Color

			- Gamut

				The gamut, or color gamut is a certain complete subset of colors.  
				
				* https://en.wikipedia.org/wiki/Gamut

				- sRGB

					* https://developer.mozilla.org/en-US/docs/Web/CSS/color_value 

					- HSLa

					- RGBa

				- CMYK

					- Euroscala

				- Pantone

				- RAL / NCS

					NCS (Natural Color System) color schema is based on the human perception of colors. In Germany also called RAL. Often used for signage / buildings of tinplates.

		- Visibility

			- Opacity

			- Contrast mode / Display capabilities

				e.g. for touch displays or track displays (sunlight exposure) …

				- Low

		- Space

			- Spacing

			- Ratio

			- Spatial

				- AR

				- VR

				- MR

			- Elevation

				- z-Index

			- Media Query / Breakpoint

			- Grid

			- Layout

			- Size

		- Icon

			* https://iconset.io/

			- Icons

				Resources & examples  
				
				Clarity  
				* [https://clarity.design/icons/get-started](https://clarity.design/icons/get-started)
				* https://clarity.design/icons/api  
				
				Github / Figma  
				* [https://github.blog/2018-04-12-driving-changes-from-designs/](https://github.blog/2018-04-12-driving-changes-from-designs/)
				* [https://github.com/primer/octicons](https://github.com/primer/octicons)
				* https://github.com/primer/octicons/blob/master/lib/octicons_node/README.md  
				
				AXA  
				* [https://design.axa.com/web-guidelines/icons](https://design.axa.com/web-guidelines/icons)
				
				IBM / Carbon  
				
				* [https://github.com/carbon-design-system/carbon/tree/master/packages/icons](https://github.com/carbon-design-system/carbon/tree/master/packages/icons)
				* [https://github.com/storybookjs/storybook/blob/next/CHANGELOG.md](https://github.com/storybookjs/storybook/blob/next/CHANGELOG.md)
				
				Google Material  
				* https://material.io/design/iconography  
				* [https://material.io/design/iconography/system-icons.html#design-principles](https://material.io/design/iconography/system-icons.html#design-principles)
				* [https://google.github.io/material-design-icons/](https://google.github.io/material-design-icons/)
				
				Badoo  
				* [https://badootech.badoo.com/generating-multi-brand-multi-platform-icons-with-sketch-and-a-node-js-script-part1-82f438c7e16c](https://badootech.badoo.com/generating-multi-brand-multi-platform-icons-with-sketch-and-a-node-js-script-part1-82f438c7e16c)
				* [https://badootech.badoo.com/generating-multi-brand-multi-platform-icons-with-sketch-and-a-node-js-script-part2-8d02e8bb915a](https://badootech.badoo.com/generating-multi-brand-multi-platform-icons-with-sketch-and-a-node-js-script-part2-8d02e8bb915a)

				- Functional Icons > 48px ?

				- Product Icons ? 

				- Content Icons ?

			- Timetable Icons

			- Pictos

		- Typography

			- Size

			- Line Height

			- Font

				- Cut

				- Weight

		- Shadow

			- Box-Shadow

		- Border Radius

		- Image

			Mood / image assets

			- Duration of usage / validity

		- Film

		- Illustration

			- Infographic

		- Map

		- Motion

			- Transition

			- Animation

	- Hearing

		- Sound

	- Time

		- Duration

	- Taste

	- Touch

		- Braille

	- Smell

	- other

		* https://en.wikipedia.org/wiki/Sense#Other_senses

- Sense agnostic

	- Language

		- Voice and tone

### Tool

- Theo

	Theo (from salesforce-ux) is a an abstraction for transforming and formatting Design Tokens  
	
	* https://github.com/salesforce-ux/theo

- Style Dictionary

	Style Dictionary (amzn) is a build system that allows you to define styles once, in a way for any platform or language to consume.  
	
	* [https://amzn.github.io/style-dictionary](https://amzn.github.io/style-dictionary)
	* https://medium.com/@didoo/how-to-manage-your-design-tokens-with-style-dictionary-98c795b938aa

- Storybook Design Token Addon

	* https://github.com/UX-and-I/storybook-design-token

- designtokens.dev

	Design Token service / API which does pretty much what we want but does not have the flexibility level which we need. We need to be able to define a more complex structure / other formats.  
	
	* https://www.designtokens.dev/

- Specify

	The new continuous delivery system  
	
	Discover the first automated delivery system for all your core styles. Specify generates design tokens and link them to your codebase.  
	
	* https://specifyapp.com/feature/continuous-delivery-system/

- Superposition

	* https://superposition.design/addons/

- Relay

	Relay allows you to push graphics in Figma straight to your GitHub Repo.  
	
	* https://relay.graphics/

- Interplay

	Connect design and engineering, with Interplay.   
	
	Maximise your design system's impact by aligning everyone around a single source of truth.  
	
	* https://interplayapp.com/

- Lona

	* https://github.com/airbnb/Lona

- Herman

	Sass   
	
	* [https://www.oddbird.net/2018/01/03/introducing-herman/](https://www.oddbird.net/2018/01/03/introducing-herman/)
	* [https://www.oddbird.net/herman/docs/](https://www.oddbird.net/herman/docs/)
	* https://www.oddbird.net/herman/  
	* [https://github.com/oddbird/sassdoc-theme-herman](https://github.com/oddbird/sassdoc-theme-herman)
	* https://github.com/oddbird/sassdoc-theme-herman

- lucid

	Design Token creation tool  
	
	Looks a bit dead see https://lucid.style/upcoming-features  
	
	* https://lucid.style

### Example implementations

- Polaris Tokens (Shopify)

	* [https://github.com/Shopify/polaris-tokens](https://github.com/Shopify/polaris-tokens)
	* https://polaris-tokens.herokuapp.com/

## Language based Design Tokens

## Theming

### default

- Darkmode

### Greenclass

## Framer

## Figma

* [https://www.figma.com/developers/api](https://www.figma.com/developers/api)
* [https://github.com/primer/figma-action](https://github.com/primer/figma-action)
* https://github.blog/2018-04-12-driving-changes-from-designs/

## Sketch

* [https://developer.sketch.com/reference/api/](https://developer.sketch.com/reference/api/)
* https://www.sketch.com/docs/libraries/

### Sketch Constructor

* https://github.com/amzn/sketch-constructor

### HTML Sketchapp

* https://github.com/html-sketchapp/html-sketchapp

### React Sketchapp

* https://github.com/airbnb/react-sketchapp

## Design Language

### Diez

Design language framework  

Adopt a unified design language across platforms, codebases, and teams  

* https://diez.org/  
* https://github.com/diez/diez

## Inventory (of current setup)

### CSSstats

* https://cssstats.com/stats?url=sbb.ch

### SuperPosition

* https://superposition.design/

