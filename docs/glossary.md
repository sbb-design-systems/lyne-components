# Glossary
This page defines some terminology that is commonly used throughout the Lyne Design System.

## DS
DS stands for Design System ...

## Preview Deployment

... is a deployment which is based on a branch other than master. If you work on a feature-branch, every push to git will trigger a ci-build. After success, a preview deployment is made. In contrast to the production deployment, this deployment only creates a storybook build and deploys it on netlify.

## Production Deployment

... is a deployment which is made after a new version number is created, e.g. from 2.1.0 to 2.1.1 or from 2.1.0 to 3.0.0. Deployments are made to different instances:
- npm: all stencil components
- netlify: storybook containing all stencil components
