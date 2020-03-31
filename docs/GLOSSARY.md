# Glossary
This page defines the terminology — our common vocabulary — which is used throughout [Lyne Design System](#lyne).

## Design System

### tl;dr
- Systemic thinking about design
- A shared language
- A flexible, modular and adjustable system without vendor lock-in

Check [Lyne](#lyne) what a *Design System* (**DS**) means for us specificly and how we define and describe a *Design System*.

## Lyne
*Lyne* is the product name of our Design System — *Lyne Design System*.

Read our [VISION.md](./VISION.md) for a more detailed, **non-technical** understanding.

For a more in depth and **technical** understanding of *Lyne* check out our [repo](/README.md) and our [documentation](./README.md).

## Lyne Components
*Lyne Components* are the building blocks of the [Lyne Design System](#lyne) and are based on standard compliant [Web Components](#web-components) compiled by [StencilJS](#stenciljs) and browsable through [Storybook](#storybook). In code context *Lyne Components* are always referred as `lyne-components`.

## Preview Deployment
A *Preview Deployment* is a deployment which is based on a branch ([see Git Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)) other than `master`. If you work on a `feature-branch`, every push to git will trigger a ci-build. After success, a *Preview Deployment* is made. In contrast to the [Production Deployment](#production-deployment), the *Preview Deployment* only creates a [Storybook](#storybook) build and deploys it on [netlify](#netlify).

## Production Deployment
A *Production Deployment* is a deployment which is made after a new version number got created, e.g. increasing from 2.1.0 to 2.1.1 or from 2.1.0 to 3.0.0. During a *Production Deployment* different deployments are made to different instances:
- npm: all Stencil components
- netlify: Storybook containing all Stencil components

## Single Source of Truth
Definitions should only live at one place to ensure their accuracy. We define as our *Single Source of Truth* (**SSoT**) the [Design (Token) API](#design-token-api) which delivers always valid, unique [Design Tokens](#design-token).

## Design Token
*Design Tokens* are design primitives.

> Technically speaking: design tokens are organised lists of key-value pairs that describe design decisions, Cristiano Rastelli

This could be a color value, e.g. the `brand-color` within a certain format like `hex`. For more insights what a *Design Token* all could be for us checkout the [Design (Token) API knowlege section](/docs/knowhow/design-token-api/design-token-api.md#design-token). 

## Design (Token) API
TBD/WIP

## StencilJS
TBD/WIP

## Storybook
TBD/WIP

## npm
TBD/WIP

## netlify
TBD/WIP

## Web Components
TBD/WIP ... [Web Components](https://www.webcomponents.org/specs)

## Design System Core Team
TBD/WIP

## Component Library
TBD/WIP

## Component Browser
TBD/WIP

## Design System Utilities / Helper
TBD/WIP

## Visual Regression Testing
TBD/WIP
