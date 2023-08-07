# Connection between lyne-components and lyne-documentation

## Workflow

To automate the documentation process, we use the information that we provide in the `.stories.js` files render the components and their variants on the documentation platform automatically.

Therefore, we have some extra information that we provide inside the `.stories.js` files.

## Stories Example

Let's look at a simple story:

```javascript
export const SimpleStory = (args) => <lyne-sample-component {...args} />;
```

You can define properties like title and specific container styling for a story like this:

```javascript
SimpleStory.documentation = {
  container: {
    styles: {
      'background-color': '#eb0000',
    },
  },
  title: 'Title for the story',
};
```

## Global properties

Sometimes, we need to use args on component to render a story which would not be necessary to render the component. We just might have to use it for the story to work properly.

Look at the `sbb-button.stories.js` stories for example: there we use the property `iconslot` to define which icon should be rendered for the button. But in a real world application, developers would define the icon via a slot directly.

In this case it is important that we `hide` this property from the documentation. To do so, you can define such properties in the default export of the stories file:

```javascript
export default {
  documentation: {
    disableArgs: ['iconslot'],
  },
  title: 'Sample Lyne Component',
};
```
