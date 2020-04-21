# Terminology

To fulfill our [Vision](./VISION.md), we are building and maintaining [Lyne](#lyne), our [Design System](#design-system), which is and acts as our common language —  our [Single Source of Truth](#single-source-of-truth). For this purpose we use [Design Tokens](#design-token) as our design abstractions. Those Design Tokens are consumed by [Lyne Components](#lyne-components) via our [Design (Token) API](#design-token-api) and are integrated within our documentation.

Lyne Design Tokens and Lyne Components are available for developer and designer.

## A-Z
This page defines the terminology — our common vocabulary — which is used throughout [Lyne Design System](#lyne). We try to list just the necessary terms to get you started and to help you to have better understanding of [Lyne](#lyne). If you miss something important please let us know and open a new [documentation issue](https://github.com/lyne-design-system/lyne-components/issues/new?template=00-documentation-issue.md).

### Component
We define a *Component* as the smallest possible functional building block. *Components* are reusable and can be composed to [Composed Components](#composed-components). A *Component* is not a [Design Token](#design-token) but a *Component* can be built based on one or multiple Design Tokens. Within the [Lyne](#lyne) Design System a component is  always represented [Lyne Component](#lyne-component) — a [Web Component](#web-component) technically speaking. An example of a *Component* is a button which uses different Design Tokens for it's visual representation. 

### Component Browser
A *Component Browser* is used to develop and preview components in isolation. Throughout the [Lyne](#lyne) Design System we use [Storybook](#storybook) for either developing the component or reviewing the component afterwards.

### Composed Component
A *Composed Component* is an aggregation of multiple [Components](#component), either of the same Component or of different Components. 

#### To be defined
Can a *Composed Component* be composed out of *Composed Components*(inception)?

### Component Library
Throughout the [Lyne](#lyne) Design System we use the term *Component Library* as a set of [Web Components](#web-components) represented as [Lyne Components](#lyne-components).

### Design System

☝🏾First of all the definitions for *Design System*(**DS**) vary. A *Design System* can be or include many things but the listed statements below define it most accurate for **us**: 

- Systemic thinking about design (Miriam Suzanne)
- A common, shared language
- A flexible, modular and adjustable system without vendor lock-in
- The Single Source of Truth

Check [Lyne](#lyne) what a *Design System* means for us specifically and how we define and describe a *Design System* in more depth.

### Design System Core Team
The *[Lyne](#lyne) Design System Core Team* is a multidisciplinary (so far UX, Frontend) team consisting of: [Marius Bleuer](https://github.com/mbleuer), [Sabrina Heid](https://github.com/sabrinaheid), [Daniel Schindler](https://github.com/DanTheMen), [Florian Stuerzinger](https://github.com/florianstuerzinger), [Yves Tscherry](https://github.com/feerglas), [Michael Zumstein](https://github.com/4aficiona2)

### Design Token
*Design Tokens* are design primitives. They contain actual values — design decisions — but can also be accompanied by metadata. *Design Tokens* are delivered through the [Design (Token) API](#design-token-api).

> Technically speaking: Design Tokens are organized lists of key-value pairs that describe design decisions, Cristiano Rastelli

This could be a color value, e.g. the `brand-color` within a certain format like `hex`. For more insights what a *Design Token* all could be checkout the [Design (Token) API knowledge section](/docs/knowhow/design-token-api/design-token-api.md#design-token).

### Design (Token) API
The *Design Token API* — might also be called *Design API* — is the mechanism/interface to deliver all [Design Tokens](#design-token). The *Design Tokens* can have different formats and get delivered within the requested format depending on the consuming application

This could be:
- Icons
- Colors
  - sRGB
  - P3
- ...
  
Check the [Design (Token) API knowledge section](/docs/knowhow/design-token-api/design-token-api.md) for more inputs or how this could look like. A visual representation/structure of the potential *Design Token API* can be found [here](/docs/knowhow/design-token-api/design-token-api.png).

### GitHub
*GitHub* is world's leading software development platform. A code hosting platform for collaboration and version control. *GitHub* lets you (and others) work together on projects like the [Lyne](#lyne) Design System.

### Lyne
*Lyne* is the product name of our [Design System](#design-system) — *Lyne Design System*.

Read our [VISION.md](./VISION.md) for a more detailed, **non-technical** understanding.

For a more in depth and **technical** understanding of *Lyne* check out our [repository](/README.md) and our [documentation](./README.md).

### Lyne Components
*Lyne* are the building blocks of the [Lyne Design System](#lyne) and are based on standard compliant [Web Components](#web-components) compiled by [StencilJS](#stenciljs) and browsable through [Storybook](#storybook). In code context *Lyne Components* are always referred as `lyne-components`.

### Netlify
*[Netlify](https://www.netlify.com/)* is an all-in-one platform for automating modern web projects. We use it as a static hosting platform and deploy our [Storybook](#storybook) build of [Lyne Components](#lyne-components) and our [deployments page](https://lyne-components-deployments.netlify.com)(list of all deployments) to *Netlify*. Since Lyne Components are an open source project Netlify services are free of charge.

### npm
*[npm](https://www.npmjs.com/)* stands for node package manager and is the world's largest software registry. The registry consists of shared code packages. [Lyne Components](#lyne-components) are published through and shared on *npm*. The latest build of Lyne Components can be found on *npm* as the [lyne-test](https://www.npmjs.com/package/lyne-test) package. For further instructions how to consume Lyne Components via *npm* read [DEVELOP.md](./DEVELOP.md). 

### Preview Deployment
A *Preview Deployment* is a deployment which is based on a branch ([see Git Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)) other than `master`. If you work on a `feature-branch`, every push to git will trigger a ci-build. After success, a *Preview Deployment* is made. In contrast to the [Production Deployment](#production-deployment), the *Preview Deployment* only creates a [Storybook](#storybook) build and deploys it on [Netlify](#netlify).

### Production Deployment
A *Production Deployment* is a deployment which is made after a new version number got created, e.g. increasing from 2.1.0 to 2.1.1 or from 2.1.0 to 3.0.0. During a *Production Deployment* different deployments are made to different instances:
- npm: all Stencil components
- Netlify: Storybook containing all Stencil components

### Single Source of Truth
Definitions should only live in one place to ensure their accuracy. We define as our *Single Source of Truth* (**SSoT**) the [Design (Token) API](#design-token-api) which delivers always valid, unique [Design Tokens](#design-token).

### StencilJS
*[Stencil](https://stenciljs.com/)* is an open source tool chain for building small, fast and standard compliant [Web Components](#web-components) — our [Lyne Components](#lyne-components) — which then power the [Lyne Design System](#lyne). *Stencil* is an integral part of Lyne. But *Stencil* is not a framework, it's a tool — a compiler — which generates plain, reusable Web Components. Since it is a compiler it can also generate framework specific wrappers and their corresponding bindings — called  [output targets](https://stenciljs.com/docs/output-targets). Output targets exist for [various frameworks](https://github.com/ionic-team/stencil-ds-plugins) — also called plugins — and are also used to generate the component documentation.

#### TODO
Output targets need a better, more generic description since they are the base for dist too ...

### Storybook
*[Storybook](https://storybook.js.org)* is an open source tool for developing UI components in isolation. Besides being valuable during the development phase it is also used as a [Component Browser](#component-browser) for a wider, less technical audience. All our [Lyne Components](#lyne-components) are browsable through through *Storybook*. The latest *Storybook* release of Lyne Components can be found on [Netlify](https://lyne-components-storybook.netlify.com).

### Web Components
*[Web Components](https://www.webcomponents.org/specs)* are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps. *Web components* are based on existing web standards and are framework agnostic hence they do not have any dependency on a JavaScript framework and therefore will never be outdated. [Lyne Components](#lyne-components) are based on standard compliant *Web Components*.

## TBD

### Visual Regression Testing

### Lyne Documentation

### Documentation CMS

### Dato CMS

### Static Site Generator

### Gridsome
