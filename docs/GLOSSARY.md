# Glossary
This page defines the terminology — our common vocabulary — which is used throughout *[Lyne Design System](#lyne)*.

## Design System
Check [Lyne](#lyne) what a *Design System* (**DS**) means for us and how we define and describe a *Design System*.

## Lyne
Lyne is the product name of our Design System — *Lyne Design System*.

Read our [VISION.md](./VISION.md) for a more detailed understanding.

## Lyne Components
Lyne Components are the building blocks of the Lyne Design System and are based on standard compliant [Web Components](#web-components) compiled by [StencilJS](#stenciljs) and browsable through [Storybook](#storybook). In code context always referred as `lyne-components`.

## Preview Deployment
... is a deployment which is based on a branch ([see Git Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)) other than `master`. If you work on a `feature-branch`, every push to git will trigger a ci-build. After success, a *Preview Deployment* is made. In contrast to the [Production Deployment](#production-deployment), the *Preview Deployment* only creates a [Storybook](#storybook) build and deploys it on [netlify](#netlify).

## Production Deployment
... is a deployment which is made after a new version number is created, e.g. from 2.1.0 to 2.1.1 or from 2.1.0 to 3.0.0. During a *Production Deployment* deployments are made to different instances:
- npm: all Stencil components
- netlify: Storybook containing all Stencil components

## Single Source of Truth
The *Single Source of Truth* (**SSoT**) ...

## Design Token

## Design (Token) API

## Design System Core Team

## StencilJS

## Storybook

## npm

## netlify

## Web Components
See ... [Web Components](https://www.webcomponents.org/specs)