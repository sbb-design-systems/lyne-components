import type { TestRunnerPlugin } from '@web/test-runner-core';
import type { PlaywrightLauncher } from '@web/test-runner-playwright';

export type A11yTreePayload = { selector?: string };

export function a11yTreePlugin(): TestRunnerPlugin<A11yTreePayload> {
  const toBoolean = (value: any): boolean | null =>
    typeof value === 'boolean' ? value : value === 'true' ? true : value === 'false' ? false : null;
  const toMaybeBoolean = (value: any): boolean | string => toBoolean(value) ?? value;
  const throwTypeError = (): never => {
    throw new TypeError(`Internal Error: Expected a boolean value but received a different type.`);
  };
  const assertBoolean = (value: any): boolean => {
    return toBoolean(value) ?? throwTypeError();
  };
  return {
    name: 'a11y-tree-command',
    async executeCommand({ command, payload, session }): Promise<any> {
      if (command === 'a11y-tree') {
        // handle specific behavior for playwright
        if (session.browser.type === 'playwright') {
          if (session.browser.name === 'Chromium') {
            const page = (session.browser as PlaywrightLauncher).getPage(session.id);
            const client = await page.context().newCDPSession(page);

            await client.send('Accessibility.enable');
            await client.send('DOM.enable');

            // Get the document root first
            const { root } = await client.send('DOM.getDocument', { depth: -1 });

            // Query for the element to get its nodeId
            const { nodeId } = await client.send('DOM.querySelector', {
              nodeId: root.nodeId,
              selector: payload?.selector || 'body',
            });

            const snapshot = await client.send('Accessibility.getPartialAXTree', { nodeId });
            const rootNode = snapshot.nodes.at(0)!;
            if (!rootNode) {
              return null;
            }

            function convertNode(node: typeof rootNode, allNodes: (typeof rootNode)[]): A11yNode {
              const result: Partial<A11yNode> = {};
              if (node.ignored) {
                result.ignored = node.ignored;
              }
              if (node.role) {
                result.role = node.role.value;
              }
              if (node.name) {
                result.name = node.name.value;
              }
              if (node.description) {
                result.description = node.description.value;
              }
              if (node.value) {
                result.value = node.value.value;
              }
              if (node.properties) {
                for (const property of node.properties) {
                  try {
                    if (property.value === undefined) {
                      // Skip undefined values
                    } else if (property.name === 'atomic') {
                      result.atomic = assertBoolean(property.value.value);
                    } else if (property.name === 'autocomplete') {
                      result.autocomplete = property.value.value;
                    } else if (property.name === 'busy') {
                      result.busy = toMaybeBoolean(property.value.value);
                    } else if (property.name === 'checked') {
                      result.checked = toMaybeBoolean(property.value.value);
                    } else if (property.name === 'describedby') {
                      result.describedby = property.value.value;
                    } else if (property.name === 'disabled') {
                      result.disabled = assertBoolean(property.value.value);
                    } else if (property.name === 'editable') {
                      result.editable = toMaybeBoolean(property.value.value);
                    } else if (property.name === 'expanded') {
                      result.expanded = assertBoolean(property.value.value);
                    } else if (property.name === 'focusable') {
                      result.focusable = assertBoolean(property.value.value);
                    } else if (property.name === 'focused') {
                      result.focused = assertBoolean(property.value.value);
                    } else if (property.name === 'hasPopup') {
                      result.hasPopup = property.value.value;
                    } else if (property.name === 'invalid') {
                      result.invalid = toMaybeBoolean(property.value.value);
                    } else if (property.name === 'labelledby') {
                      result.labelledby = property.value.value;
                    } else if (property.name === 'level') {
                      result.level = property.value.value;
                    } else if (property.name === 'live') {
                      result.live = property.value.value;
                    } else if (property.name === 'multiline') {
                      result.multiline = assertBoolean(property.value.value);
                    } else if (property.name === 'multiselectable') {
                      result.multiselectable = assertBoolean(property.value.value);
                    } else if (property.name === 'orientation') {
                      result.orientation = property.value.value;
                    } else if (property.name === 'pressed') {
                      result.pressed = toMaybeBoolean(property.value.value);
                    } else if (property.name === 'readonly') {
                      result.readonly = assertBoolean(property.value.value);
                    } else if (property.name === 'relevant') {
                      result.relevant = property.value.value;
                    } else if (property.name === 'required') {
                      result.required = assertBoolean(property.value.value);
                    } else if (property.name === 'roledescription') {
                      result.roledescription = property.value.value;
                    } else if (property.name === 'selected') {
                      result.selected = assertBoolean(property.value.value);
                    } else if (property.name === 'valuemin') {
                      result.valuemin = property.value.value;
                    } else if (property.name === 'valuemax') {
                      result.valuemax = property.value.value;
                    } else if (property.name === 'valuetext') {
                      result.valuetext = property.value.value;
                    } else if (property.name === 'settable') {
                      result.settable = assertBoolean(property.value.value);
                    } else {
                      throw new Error(
                        `Unsupported property "${property.name}" in accessibility tree snapshot.`,
                      );
                    }
                  } catch {
                    throw new Error(
                      `A11y Tree Plugin: Unexpected value for "${property.name}": ${JSON.stringify(property.value.value)}. ` +
                        'Please update adapter code in tools/web-test-runner/aria-tree-plugin.ts!',
                    );
                  }
                }
              }

              if (node.childIds) {
                const children = node.childIds
                  .map((childId) => {
                    const childNode = allNodes.find((n) => n.nodeId === childId);
                    return childNode ? convertNode(childNode, allNodes) : null;
                  })
                  .filter((n): n is A11yNode => !!n);
                if (children.length) {
                  result.children = children;
                }
              }

              return result as A11yNode;
            }

            return convertNode(rootNode!, snapshot.nodes);
          }

          return null;
        }

        // you might not be able to support all browser launchers
        throw new Error(
          `Acessibility tree is not supported for browser type ${session.browser.type}.`,
        );
      }
    },
  };
}

export interface A11yNode {
  /**
   * Whether this node is ignored for accessibility
   */
  ignored?: boolean;
  /**
   * This `Node`'s role, whether explicit or implicit.
   */
  role?: string;
  /**
   * The accessible name for this `Node`.
   */
  name?: string;
  /**
   * The accessible description for this `Node`.
   */
  description?: string;
  /**
   * The value for this `Node`.
   */
  value?: string;

  atomic?: boolean;
  autocomplete?: string;
  busy?: boolean | string;
  checked?: boolean | string;
  describedby?: string;
  disabled?: boolean;
  editable?: boolean | string;
  expanded?: boolean;
  focusable?: boolean;
  focused?: boolean;
  hasPopup?: string;
  invalid?: boolean | string;
  labelledby?: string;
  level?: string;
  live?: string;
  multiline?: boolean;
  multiselectable?: boolean;
  orientation?: string;
  pressed?: boolean | string;
  readonly?: boolean;
  relevant?: string;
  required?: boolean;
  roledescription?: string;
  selected?: boolean;
  settable?: boolean;
  valuemin?: string;
  valuemax?: string;
  valuetext?: string;
  children?: A11yNode[];
}
