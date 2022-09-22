# Review Guidelines

This document shows what should be done during review process.

A basic review only contains the entries which have an exclamation mark (⚠).
If there is time or wished, some other items may be considered.

#### General

- ⚠ Does the code touch anything existent (e.g. new libraries, changed code)?
- ⚠ Is the build running?
- ⚠ Are the chromatic tests green or don't affect existing stories in an undesired way?

#### Architecture

- Reusability for internal usages, is the component flexible enough?
- Do the chosen properties and public methods make sense?
- Can the main content be slotted (achieve flexibility)?

#### Documentation

- Is the consumer documentation present and comprehensible (readme.md, including public property descriptions)?
- Are there some small examples of how to use the component in the readme.md file?
- Is the documentation (mostly) free of spelling errors?
- Is the documentation up-to-date with the current implementation?
- Are all texts written in English language?

#### Tests

- Do the tests cover all important logic (e2e or unit)?
- Are the tests readable for developers?

#### Component

- Does the code have good styling in general (appropriate names, small readable blocks, ...)?
- Does the order of methods and props make sense?
- Is the implementation performant?
- Is everything working, when slot content changes, properties change or the component is moved in DOM?
- Does every method has type declarations?

#### Stories

- Is there a story for each visual representation?
- Are the story templates reused and divided into small vars if necessary?
- Are the controls working and consistent as possible through all stories?
- Are the stories working on chromatic and give a value?
- Are all texts written in English language?

#### Styles

- Does the implementation following the coding standards (several points)?
- ⚠ Is every value from a design token and if not, well documented?
- Are modern style properties used (e.g. gap, inset, margin-block, padding-inline,...)?
- Are there as less style definitions as possible (e.g. using gap instead of exceptions for last-child...)?
- Do the css class names are consistent to BEM and have sbb prefix?
- Does the visual output looks good comparing with Figma specs (also in responsibility of UX)?

#### Accessibility

- Are the components looking statically correct (aria attributes, native elements...)?
- Check if the developer has tested all screen readers?
- Do some smoke tests.
- Is Windows high contrast mode supported well?
- Does keyboard navigation work and is the focused element visible (:focus-visible)?

#### Browsers

- Is browser compatibility given? Do some smoke tests, but developers guarantee browser compatibility.

#### Refactorings

- ⚠ Is every usage of a component refactored too?
