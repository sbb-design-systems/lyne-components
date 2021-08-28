/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { InterfaceAccordionItemAttributes } from "./components/lyne-accordion-item/lyne-accordion-item.custom.d";
import { InterfaceButtonAttributes } from "./components/lyne-button/lyne-button.custom.d";
import { Time } from "./components/lyne-clock/lyne-clock.custom.d";
import { InterfaceHeadingAttributes } from "./components/lyne-heading/lyne-heading.custom.d";
import { InterfacePanelAttributes } from "./components/lyne-panel/lyne-panel.custom.d";
import { InterfacePearlChainAttributes } from "./components/lyne-pearl-chain/lyne-pearl-chain.custom.d";
export namespace Components {
    interface LyneAccordion {
        /**
          * Set this if you want to use the accordion on a non-white background.
         */
        "nonWhiteBackground"?: boolean;
    }
    interface LyneAccordionItem {
        /**
          * If set, an accordion can not be toggled
         */
        "disabled"?: boolean;
        /**
          * Id which is sent in the event after opening/closing accordion
         */
        "eventId"?: string;
        /**
          * Text to show as title for the accordion.
         */
        "heading": string;
        /**
          * Heading level.
         */
        "headingLevel"?: InterfaceAccordionItemAttributes['level'];
        /**
          * Set to true to open the accordion item. Set to false to close it.
         */
        "open"?: boolean;
    }
    interface LyneButton {
        /**
          * If you use the button to trigger another widget which itself is covering the page, you must provide an according attribute for aria-haspopup.
         */
        "ariaHaspopup"?: InterfaceButtonAttributes['popup'];
        /**
          * Set to true to get a disabled button
         */
        "disabled"?: boolean;
        /**
          * Id which is sent in the click event payload
         */
        "eventId"?: string;
        /**
          * Define if icon should be shown or not
         */
        "icon"?: boolean;
        /**
          * If you use an icon without a label, you must provide an iconDescription
         */
        "iconDescription"?: string;
        /**
          * Label text to show on the button
         */
        "label"?: string;
        /**
          * The name attribute to use for the button
         */
        "name"?: string;
        /**
          * Size variant, either large or small.
         */
        "size"?: InterfaceButtonAttributes['size'];
        /**
          * The type attribute to use for the button
         */
        "type"?: InterfaceButtonAttributes['type'];
        /**
          * The value attribute to use for the button
         */
        "value"?: string;
        /**
          * Variant of the button, like primary, secondary etc.
         */
        "variant"?: InterfaceButtonAttributes['variant'];
        /**
          * Set this property to true if you want only a visual represenation of a button, but no interaction (a div instead of a button will be rendered).
         */
        "visualButtonOnly"?: boolean;
    }
    interface LyneClock {
        /**
          * initialTime accepts a string following a ${number}:${number}:${number} pattern. If left empty or the string 'now' is used we will set the current time the client has on its device.
         */
        "initialTime"?: Time;
        /**
          * If set to true, the clock will be paused.
         */
        "paused"?: boolean;
    }
    interface LyneHeading {
        /**
          * Heading level
         */
        "level": InterfaceHeadingAttributes['level'];
        /**
          * Text for the Heading
         */
        "text": string;
        /**
          * Visual level for the heading
         */
        "visualLevel": InterfaceHeadingAttributes['visualLevel'];
    }
    interface LyneLink {
        /**
          * Link to use as href
         */
        "link": string;
        /**
          * If true, target=_blank will be set on the link
         */
        "openInNewWindow": boolean;
        /**
          * Text to show for the link
         */
        "text": string;
    }
    interface LynePanel {
        /**
          * The text to use as button text
         */
        "buttonText": string;
        /**
          * Id which is sent in the click event payload for the button
         */
        "eventId"?: string;
        /**
          * The tag to use for the text element
         */
        "tag"?: InterfacePanelAttributes['tag'];
        /**
          * The text to show in the panel
         */
        "text": string;
    }
    interface LynePearlChain {
        /**
          * Per default, the current location has a pulsating animation. You can disable the animation with this property.
         */
        "disableAnimation"?: boolean;
        /**
          * Stringified JSON to define the legs of the pearl-chain. Format: `{"legs": [{"cancellation": true, "duration": 25}, ...]}` `duration`: number between 0 and 100. Duration of the leg is relative to the total travel time. Example: departure 16:30, change at 16:40, arrival at 17:00. So the change should have a duration of 33.33%. `cancellation`: if set, the leg will be marked as canceled.
         */
        "legs": string;
        /**
          * Define, if the pearl-chain represents a connection in the past, in the future or if it is a currently running connection. If it is currently running, provide a number between 0 and 100, which will represent the current location on the pearl-chain.
         */
        "status"?: InterfacePearlChainAttributes['status'];
    }
}
declare global {
    interface HTMLLyneAccordionElement extends Components.LyneAccordion, HTMLStencilElement {
    }
    var HTMLLyneAccordionElement: {
        prototype: HTMLLyneAccordionElement;
        new (): HTMLLyneAccordionElement;
    };
    interface HTMLLyneAccordionItemElement extends Components.LyneAccordionItem, HTMLStencilElement {
    }
    var HTMLLyneAccordionItemElement: {
        prototype: HTMLLyneAccordionItemElement;
        new (): HTMLLyneAccordionItemElement;
    };
    interface HTMLLyneButtonElement extends Components.LyneButton, HTMLStencilElement {
    }
    var HTMLLyneButtonElement: {
        prototype: HTMLLyneButtonElement;
        new (): HTMLLyneButtonElement;
    };
    interface HTMLLyneClockElement extends Components.LyneClock, HTMLStencilElement {
    }
    var HTMLLyneClockElement: {
        prototype: HTMLLyneClockElement;
        new (): HTMLLyneClockElement;
    };
    interface HTMLLyneHeadingElement extends Components.LyneHeading, HTMLStencilElement {
    }
    var HTMLLyneHeadingElement: {
        prototype: HTMLLyneHeadingElement;
        new (): HTMLLyneHeadingElement;
    };
    interface HTMLLyneLinkElement extends Components.LyneLink, HTMLStencilElement {
    }
    var HTMLLyneLinkElement: {
        prototype: HTMLLyneLinkElement;
        new (): HTMLLyneLinkElement;
    };
    interface HTMLLynePanelElement extends Components.LynePanel, HTMLStencilElement {
    }
    var HTMLLynePanelElement: {
        prototype: HTMLLynePanelElement;
        new (): HTMLLynePanelElement;
    };
    interface HTMLLynePearlChainElement extends Components.LynePearlChain, HTMLStencilElement {
    }
    var HTMLLynePearlChainElement: {
        prototype: HTMLLynePearlChainElement;
        new (): HTMLLynePearlChainElement;
    };
    interface HTMLElementTagNameMap {
        "lyne-accordion": HTMLLyneAccordionElement;
        "lyne-accordion-item": HTMLLyneAccordionItemElement;
        "lyne-button": HTMLLyneButtonElement;
        "lyne-clock": HTMLLyneClockElement;
        "lyne-heading": HTMLLyneHeadingElement;
        "lyne-link": HTMLLyneLinkElement;
        "lyne-panel": HTMLLynePanelElement;
        "lyne-pearl-chain": HTMLLynePearlChainElement;
    }
}
declare namespace LocalJSX {
    interface LyneAccordion {
        /**
          * Set this if you want to use the accordion on a non-white background.
         */
        "nonWhiteBackground"?: boolean;
    }
    interface LyneAccordionItem {
        /**
          * If set, an accordion can not be toggled
         */
        "disabled"?: boolean;
        /**
          * Id which is sent in the event after opening/closing accordion
         */
        "eventId"?: string;
        /**
          * Text to show as title for the accordion.
         */
        "heading": string;
        /**
          * Heading level.
         */
        "headingLevel"?: InterfaceAccordionItemAttributes['level'];
        /**
          * Set to true to open the accordion item. Set to false to close it.
         */
        "open"?: boolean;
    }
    interface LyneButton {
        /**
          * If you use the button to trigger another widget which itself is covering the page, you must provide an according attribute for aria-haspopup.
         */
        "ariaHaspopup"?: InterfaceButtonAttributes['popup'];
        /**
          * Set to true to get a disabled button
         */
        "disabled"?: boolean;
        /**
          * Id which is sent in the click event payload
         */
        "eventId"?: string;
        /**
          * Define if icon should be shown or not
         */
        "icon"?: boolean;
        /**
          * If you use an icon without a label, you must provide an iconDescription
         */
        "iconDescription"?: string;
        /**
          * Label text to show on the button
         */
        "label"?: string;
        /**
          * The name attribute to use for the button
         */
        "name"?: string;
        /**
          * Size variant, either large or small.
         */
        "size"?: InterfaceButtonAttributes['size'];
        /**
          * The type attribute to use for the button
         */
        "type"?: InterfaceButtonAttributes['type'];
        /**
          * The value attribute to use for the button
         */
        "value"?: string;
        /**
          * Variant of the button, like primary, secondary etc.
         */
        "variant"?: InterfaceButtonAttributes['variant'];
        /**
          * Set this property to true if you want only a visual represenation of a button, but no interaction (a div instead of a button will be rendered).
         */
        "visualButtonOnly"?: boolean;
    }
    interface LyneClock {
        /**
          * initialTime accepts a string following a ${number}:${number}:${number} pattern. If left empty or the string 'now' is used we will set the current time the client has on its device.
         */
        "initialTime"?: Time;
        /**
          * If set to true, the clock will be paused.
         */
        "paused"?: boolean;
    }
    interface LyneHeading {
        /**
          * Heading level
         */
        "level"?: InterfaceHeadingAttributes['level'];
        /**
          * Text for the Heading
         */
        "text"?: string;
        /**
          * Visual level for the heading
         */
        "visualLevel"?: InterfaceHeadingAttributes['visualLevel'];
    }
    interface LyneLink {
        /**
          * Link to use as href
         */
        "link": string;
        /**
          * If true, target=_blank will be set on the link
         */
        "openInNewWindow"?: boolean;
        /**
          * Text to show for the link
         */
        "text": string;
    }
    interface LynePanel {
        /**
          * The text to use as button text
         */
        "buttonText": string;
        /**
          * Id which is sent in the click event payload for the button
         */
        "eventId"?: string;
        /**
          * The tag to use for the text element
         */
        "tag"?: InterfacePanelAttributes['tag'];
        /**
          * The text to show in the panel
         */
        "text": string;
    }
    interface LynePearlChain {
        /**
          * Per default, the current location has a pulsating animation. You can disable the animation with this property.
         */
        "disableAnimation"?: boolean;
        /**
          * Stringified JSON to define the legs of the pearl-chain. Format: `{"legs": [{"cancellation": true, "duration": 25}, ...]}` `duration`: number between 0 and 100. Duration of the leg is relative to the total travel time. Example: departure 16:30, change at 16:40, arrival at 17:00. So the change should have a duration of 33.33%. `cancellation`: if set, the leg will be marked as canceled.
         */
        "legs": string;
        /**
          * Define, if the pearl-chain represents a connection in the past, in the future or if it is a currently running connection. If it is currently running, provide a number between 0 and 100, which will represent the current location on the pearl-chain.
         */
        "status"?: InterfacePearlChainAttributes['status'];
    }
    interface IntrinsicElements {
        "lyne-accordion": LyneAccordion;
        "lyne-accordion-item": LyneAccordionItem;
        "lyne-button": LyneButton;
        "lyne-clock": LyneClock;
        "lyne-heading": LyneHeading;
        "lyne-link": LyneLink;
        "lyne-panel": LynePanel;
        "lyne-pearl-chain": LynePearlChain;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "lyne-accordion": LocalJSX.LyneAccordion & JSXBase.HTMLAttributes<HTMLLyneAccordionElement>;
            "lyne-accordion-item": LocalJSX.LyneAccordionItem & JSXBase.HTMLAttributes<HTMLLyneAccordionItemElement>;
            "lyne-button": LocalJSX.LyneButton & JSXBase.HTMLAttributes<HTMLLyneButtonElement>;
            "lyne-clock": LocalJSX.LyneClock & JSXBase.HTMLAttributes<HTMLLyneClockElement>;
            "lyne-heading": LocalJSX.LyneHeading & JSXBase.HTMLAttributes<HTMLLyneHeadingElement>;
            "lyne-link": LocalJSX.LyneLink & JSXBase.HTMLAttributes<HTMLLyneLinkElement>;
            "lyne-panel": LocalJSX.LynePanel & JSXBase.HTMLAttributes<HTMLLynePanelElement>;
            "lyne-pearl-chain": LocalJSX.LynePearlChain & JSXBase.HTMLAttributes<HTMLLynePearlChainElement>;
        }
    }
}
