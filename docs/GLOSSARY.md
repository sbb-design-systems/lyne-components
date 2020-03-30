# Glossary
This page defines some terminology that is commonly used throughout the Lyne Design System.

## DS
DS stands for **D**esign **S**ystem.

## Lyne
Is the product name of our Design System.

## Lyne Components
Lyne Components are the building blocks of the Lyne Design System and are based on standard compliant [Web Components](https://www.webcomponents.org/specs) compiled by StencilJS and browsable through Storybook. In code context always referred as `lyne-components`.

## Preview Deployment
... is a deployment which is based on a branch ([see Git Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)) other than `master`. If you work on a `feature-branch`, every push to git will trigger a ci-build. After success, a Preview Deployment is made. In contrast to the Production Deployment, the preview deployment only creates a Storybook build and deploys it on netlify.

## Production Deployment
... is a deployment which is made after a new version number is created, e.g. from 2.1.0 to 2.1.1 or from 2.1.0 to 3.0.0. Deployments are made to different instances:
- npm: all Stencil components
- netlify: Storybook containing all Stencil components
