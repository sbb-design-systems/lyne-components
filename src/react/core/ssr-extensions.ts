import { isServer } from 'lit';
import type { ComponentType, JSXElementConstructor, ReactNode } from 'react';
import react, { Children, isValidElement } from 'react';

type WithChildren<T> = T & { children: ReactNode[] };

/**
 * Wraps a React wrapped Lit component with additional logic, to detect
 * whether a component has children when rendered via SSR.
 * If children are available, the attribute `data-named-slots` will be
 * set with the detected slot names.
 *
 * @param component The React wrapped Lit component.
 * @returns The React wrapped Lit component with SSR logic if rendered on server.
 */
export const withSsrDataSlotNames = <P extends object>(
  component: ComponentType<P>,
): ComponentType<P> => {
  return !isServer
    ? component
    : (originalProps) => {
        const props = originalProps as WithChildren<P>;
        if (!props.children) {
          return react.createElement(component, props);
        }

        const slots = new Set<string>();
        Children.forEach(props.children, (child) =>
          slots.add(
            (typeof child === 'object' &&
              !!child &&
              'props' in child &&
              'slot' in child.props &&
              child.props.slot) ||
              'unnamed',
          ),
        );
        if (!slots.size) {
          return react.createElement(component, props);
        }

        const innerProps = {
          ...props,
          'data-named-slots': [...slots].sort().join(' '),
        };
        return react.createElement(component, innerProps);
      };
};

/** Checks whether a ReactNode type has a displayName property. */
function hasDisplayName(
  type: string | JSXElementConstructor<any>,
): type is JSXElementConstructor<unknown> & { displayName: string } {
  return typeof (type as any).displayName === 'string';
}

/**
 * Wraps a React wrapped Lit component with additional logic, to detect
 * whether a component has children when rendered via SSR.
 * If children are available, the attribute `data-ssr-child-count` will be
 * set with the detected amount of named children.
 *
 * @param component The React wrapped Lit component.
 * @param childNames The child names to check against.
 * @returns The React wrapped Lit component with SSR logic if rendered on server.
 */
export const withSsrDataChildCount = <P extends object>(
  childNames: string[],
  component: ComponentType<P>,
): ComponentType<P> => {
  return !isServer
    ? component
    : (originalProps) => {
        const props = originalProps as WithChildren<P>;
        if (!props.children) {
          return react.createElement(component, props);
        }

        let counter = 0;
        Children.forEach(props.children, (child) => {
          if (
            isValidElement(child) &&
            hasDisplayName(child.type) &&
            childNames.includes(child.type.displayName)
          ) {
            counter += 1;
          }
        });
        if (!counter) {
          return react.createElement(component, props);
        }

        const innerProps = {
          ...props,
          'data-ssr-child-count': counter,
        };
        return react.createElement(component, innerProps);
      };
};
