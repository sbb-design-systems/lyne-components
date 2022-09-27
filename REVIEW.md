# Review Guidelines

This document shows what should be done during review process.

A basic review only contains the entries which have an exclamation mark (⚠️).
Depending on circumstances, additional options might be considered.

#### General

- ⚠️ Were changes made that affect existing code (e.g. new dependencies, changed global code sections)?
- ⚠️ Is the build green?
- ⚠️ Are the chromatic tests green or don't affect existing stories in an undesired way?

#### Architecture

- Reusability for internal usages, is the component flexible enough?
- Is the API consistent with existing (finalized) components?
- Is the meaning of newly added properties and public methods understandable?
- Can the main content be slotted (achieve flexibility)?

#### Documentation

- Is the consumer documentation present and comprehensible
  (readme.md, tsdoc for public properties/methods/classes/interfaces/etc.)?
- Are code blocks that are not easily understandable documented with an explanation as to why it is
  necessary?
- Are there small examples of how to use the component in the readme.md file?
- Is the documentation (mostly) free of spelling errors?
- Is the documentation up-to-date with the current implementation?
- Are all texts written in English language?

#### Tests

- Do the tests cover all important logic and variants (e2e or unit)?
- Are the tests readable for developers?

#### Component

- Does the code have good styling in general (appropriate names, small readable blocks, etc.)?
- Does the order of methods and props make sense?
- ⚠️ Is the implementation performant?
- Is everything working, when slot content changes, properties change or the component is moved in
  DOM?
- Do all methods have type declarations?

#### Stories

- Is there a story for each visual representation?
- Are the story templates reused and divided into small vars if necessary?
- Are the controls working and consistent as possible through all stories?
- Are the stories working on chromatic and give a value?
- Are all texts written in English language?

#### Styles

- Does the implementation follow the coding standards (several points)?
- ⚠️ Is every value from a design token and if not, well documented?
- Are modern style properties used (e.g. gap, inset, margin-block, padding-inline, etc.)?
- Are there as little style definitions as possible (e.g. using gap instead of exceptions for last-child, etc.)?
- Do the css class names follow BEM and have sbb prefix?
- Does the visual output match the Figma spec (also confirmed with UX)?

#### Accessibility

- Are the components semantically correct (aria attributes, native elements, etc.)?
- Check if the developer has tested all screen readers?
- Do some smoke tests.
- Is Windows high contrast mode supported well?
- Does keyboard navigation work and is the focused element visible (:focus-visible)?

#### Browsers

- Is browser compatibility given? Do some smoke tests, but developers guarantee browser compatibility.

#### Refactorings

- ⚠️ Is every usage of a component refactored too?
