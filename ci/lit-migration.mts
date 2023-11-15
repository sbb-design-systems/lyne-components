import { basename, dirname, parse } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { createInterface } from 'readline/promises';
import ts from 'typescript';
import MagicString from 'magic-string';
import * as prettier from 'prettier';
import * as glob from 'glob';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const voidHtmlElements = ['input', 'br', 'img'];

const join = (base: URL, path: string) => new URL(path, base);

// eslint-disable-next-line no-unused-vars
function iterate(node: ts.Node, callback: (_node: ts.Node) => void) {
  ts.forEachChild(node, (n) => {
    callback(n);
    iterate(n, callback);
  });
}

// eslint-disable-next-line no-unused-vars
function deepFind(node: ts.Node, predicate: (_node: ts.Node) => boolean): ts.Node | undefined {
  if (predicate(node)) {
    return node;
  }
  return ts.forEachChild(node, (n) => {
    return deepFind(n, predicate);
  });
}

class MyMagicString extends MagicString {
  insertAt(positionOrNode: number | ts.Node, text: string) {
    const position =
      typeof positionOrNode === 'number' ? positionOrNode : positionOrNode.getStart();
    this.appendRight(position, text);
  }

  insertAtEnd(node: ts.Node, text: string) {
    this.insertAt(node.getFullStart() + node.getFullWidth(), text);
  }

  remove(...nodes: ts.Node[] | number[]): MagicString {
    if ([...nodes].every((n) => Number.isInteger(n))) {
      super.remove(nodes[0] as number, nodes[1] as number);
    } else {
      for (const node of nodes as ts.Node[]) {
        this.remove(node.getStart(), node.getStart() + node.getWidth());
      }
    }

    return this;
  }

  // eslint-disable-next-line no-unused-vars
  replace(
    regex: RegExp | string | ts.Node,
    // eslint-disable-next-line no-unused-vars
    replacement: string | ((substring: string, ...args: any[]) => string),
  ): MagicString {
    if (regex instanceof RegExp || typeof regex === 'string') {
      return super.replace(regex, replacement);
    } else {
      this.remove(regex);
      this.insertAt(regex, replacement as string);
    }

    return this;
  }
}

async function migrate(component: string, debug = false, storiesOnly = false) {
  if (!component) {
    console.error('Please add a component to the command');
    return;
  }

  // Enable the use of vs code to launch the script
  if (component.startsWith('src/components/')) {
    component = component.replace('src/components/', '');
  }

  const projectRoot = new URL('..', import.meta.url);
  const source = parse(glob.sync(`./**/${component}.ts`)[0]).dir;
  const target = debug ? source.replace('components', 'migrated') : source;

  console.log(`Migrating ${source}`);

  if (!existsSync(target)) {
    mkdirSync(target, { recursive: true });
  }

  type MigrationResult = void | Promise<void>;
  const migrations = new Map<
    string,
    // eslint-disable-next-line no-unused-vars
    (_sourceFile: ts.SourceFile, _mutator: MyMagicString, args: any) => MigrationResult
  >();

  migrations.set(`/${component}.stories.tsx`, migrateStories);
  if (!storiesOnly) {
    migrations
      .set(`/${component}.tsx`, migrateComponent)
      .set(`/${component}.spec.ts`, migrateSpec)
      .set(`/${component}.e2e.ts`, migrateE2E);
  }

  for (const [file, migration] of Array.from(migrations)) {
    const path = join(projectRoot, `${source}${file}`);

    if (!existsSync(path)) {
      console.warn(`WARN: file ${file} not found`);
      continue;
    }

    const sourceFile = ts.createSourceFile(
      path.pathname,
      readFileSync(path, 'utf8'),
      ts.ScriptTarget.ES2021,
      true,
    );
    const mutator = new MyMagicString(sourceFile.getFullText());
    const args = { component };
    try {
      await migration(sourceFile, mutator, args);
    } catch (e) {
      console.error(e);
    }

    let result = mutator.toString();
    try {
      const prettierConfig = await prettier.resolveConfig(path.pathname);
      result = await prettier.format(mutator.toString(), {
        ...prettierConfig!,
        filepath: path.pathname,
      });
    } catch {
      // Do nothing
    }

    writeFileSync(join(projectRoot, `${target}${file}`), result, 'utf8');
    console.log(`Migrated ${file}`);
  }

  console.log('Finished migration');

  async function migrateComponent(
    sourceFile: ts.SourceFile,
    mutator: MyMagicString,
  ): Promise<void> {
    let lastImport: ts.ImportDeclaration | undefined = undefined;
    let eventingImport: ts.ImportDeclaration | undefined = undefined;
    const globalImports: ts.ImportDeclaration[] = [];
    const properties: ts.PropertyDeclaration[] = [];
    const states: ts.PropertyDeclaration[] = [];
    const events: ts.PropertyDeclaration[] = [];
    const listeners: ts.MethodDeclaration[] = [];
    const watchers: ts.MethodDeclaration[] = [];
    const methods: ts.MethodDeclaration[] = [];
    const elementIdentifiers: ts.Identifier[] = [];
    const propertyRenames = new Map<string, string>();
    let clazz: ts.ClassDeclaration = undefined!;
    let constructor: ts.ConstructorDeclaration = undefined!;
    let element: ts.PropertyDeclaration = undefined!;
    let connectedCallback: ts.MethodDeclaration = undefined!;
    let disconnectedCallback: ts.MethodDeclaration = undefined!;
    let componentWillLoad: ts.MethodDeclaration = undefined!;
    let componentDidRender: ts.MethodDeclaration = undefined!;
    let componentDidUpdate: ts.MethodDeclaration = undefined!;
    let componentDidLoad: ts.MethodDeclaration = undefined!;
    let componentDecorator: ts.Decorator = undefined!;
    let renderMethod: ts.MethodDeclaration = undefined!;
    let jsxTemplates: ts.JsxElement[] = [];
    const newImports = new Map<string, string[]>()
      .set('lit', ['CSSResultGroup', 'html', 'LitElement', 'nothing', 'TemplateResult'])
      .set('lit/decorators.js', ['customElement']);

    iterate(sourceFile, (node) => {
      if (ts.isConstructorDeclaration(node)) {
        constructor = node;
      } else if (ts.isImportDeclaration(node)) {
        lastImport = node;
        if (node.moduleSpecifier.getText() === `'@stencil/core'`) {
          mutator.remove(node);
        } else if (node.moduleSpecifier.getText().includes('../global/')) {
          globalImports.push(node);
          if (node.moduleSpecifier.getText().includes('../global/eventing')) {
            eventingImport = node;
          }
        }
      } else if (ts.isPropertyDeclaration(node)) {
        const decorator = node.modifiers?.find(ts.isDecorator);
        if (decorator?.expression.getText().startsWith('Prop')) {
          properties.push(node);
        } else if (decorator?.expression.getText().startsWith('State')) {
          states.push(node);
        } else if (decorator?.expression.getText().startsWith('Element')) {
          element = node;
          propertyRenames.set(`this.${element.name.getText()}`, 'this');
        } else if (decorator?.expression.getText().startsWith('Event')) {
          events.push(node);
        }
      } else if (ts.isMethodDeclaration(node)) {
        const decorator = node.modifiers?.filter(ts.isDecorator) ?? [];
        if (decorator.some((d) => d.expression.getText().startsWith('Listen'))) {
          listeners.push(node);
        } else if (decorator.some((d) => d.expression.getText().startsWith('Watch'))) {
          watchers.push(node);
        } else if (decorator.some((d) => d.expression.getText().startsWith('Method'))) {
          methods.push(node);
        } else if (node.name.getText() === 'connectedCallback') {
          connectedCallback = node;
        } else if (node.name.getText() === 'disconnectedCallback') {
          disconnectedCallback = node;
        } else if (node.name.getText() === 'render') {
          renderMethod = node;
        } else if (node.name.getText() === 'componentWillLoad') {
          componentWillLoad = node;
        } else if (node.name.getText() === 'componentDidRender') {
          componentDidRender = node;
        } else if (node.name.getText() === 'componentDidUpdate') {
          componentDidUpdate = node;
        } else if (node.name.getText() === 'componentDidLoad') {
          componentDidLoad = node;
        }
      } else if (ts.isDecorator(node) && node.expression.getText().startsWith('Component(')) {
        componentDecorator = node;
        clazz = node.parent as ts.ClassDeclaration;
      } else if (
        ts.isJsxElement(node) &&
        (ts.isParenthesizedExpression(node.parent) || ts.isArrayLiteralExpression(node.parent)) &&
        !ts.findAncestor(node.parent, (n) => ts.isJsxElement(n))
      ) {
        jsxTemplates.push(node);
      } else if (ts.isTypeReferenceNode(node) && node.getText() === 'JSX.Element') {
        mutator.replace(node, 'TemplateResult');
      } else if (ts.isIdentifier(node) && node.getText().match(/^HTMLSbb\w+Element$/)) {
        elementIdentifiers.push(node);
      }
    });

    const propertyWatchers: { name: string; argAmount: number; props: string[] }[] = [];
    for (const node of watchers) {
      const decorators = node
        .modifiers!.filter(ts.isDecorator)
        .filter((n) => n.getText().startsWith('@Watch'));
      decorators.forEach((d) => mutator.remove(d));
      const newWatcherName = makePrivate(node);
      if (decorators.length === 1) {
        const propertyName = (decorators[0].expression as ts.CallExpression).arguments[0]
          .getText()
          .replace(/['"]/g, '');
        const result = await readline.question(
          `Should ${propertyName}/${node.name.getText()} be converted to getter/setter? (y/N)`,
        );
        if (result.trim().toLocaleLowerCase() === 'y') {
          const property =
            properties.find((p) => p.name.getText() === propertyName)! ??
            states.find((p) => p.name.getText() === propertyName)!;

          const type = resolvePropertyType(property);
          const argAmount = node.parameters.length;
          mutator.replace(
            property
              .getText()
              .substring(property.modifiers!.filter(ts.isDecorator)[0].getWidth() + 1),
            `
  public get ${propertyName}(): ${type} {
    return this._${propertyName};
  }
  public set ${propertyName}(value: ${type}) {
    // TODO: Validate logic
    this._${propertyName} = value;
    this.${newWatcherName}(${
      argAmount === 0 ? '' : `this._${propertyName}${argAmount === 1 ? '' : ', oldValue'}`
    });
  }
  private _${propertyName}: ${type} = ${property.initializer?.getText() ?? 'null'};`,
          );

          continue;
        }
      }

      propertyWatchers.push({
        name: newWatcherName,
        argAmount: node.parameters.length,
        props: decorators.map((d) =>
          (d.expression as ts.CallExpression).arguments[0]!.getText().replace(/'/g, ''),
        ),
      });
    }

    function resolvePropertyType(property: ts.PropertyDeclaration) {
      let type = property.type?.getText();
      if (!type) {
        if (
          [ts.SyntaxKind.TrueKeyword, ts.SyntaxKind.FalseKeyword].includes(
            property.initializer!.kind,
          )
        ) {
          type = 'boolean';
        } else if (property.initializer!.getText().match(/^['"`]/)) {
          type = 'string';
        }
      }
      if (property.questionToken) {
        type += ' | null';
      }
      return type;
    }

    if (propertyWatchers.length) {
      const pivot: ts.Node = connectedCallback! ?? constructor ?? findLastProperty();
      newImports.get('lit')!.push('PropertyValues');
      mutator.insertAtEnd(
        pivot,
        `

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    // TODO: Verify parity${propertyWatchers
      .map(
        (pw) => `
    if (${pw.props.map((p) => `changedProperties.has('${p}')`).join(' || ')}) {
      this.${pw.name}(${
        !pw.argAmount
          ? ''
          : pw.argAmount === 1
            ? `this.${pw.props[0]}`
            : `this.${pw.props[0]}, changedProperties.get('${pw.props[0]}')`
      });
    }`,
      )
      .join('')}
  }    `,
      );
    }

    if (properties.length) {
      newImports.get('lit/decorators.js')!.push('property');
      for (const node of properties) {
        const decorator = node.modifiers?.find(ts.isDecorator)!;
        mutator.replace(decorator, `@property(${resolvePropertyDecoratorArguments(node)})`);
      }
    }

    if (properties.length) {
      newImports.get('lit/decorators.js')!.push('state');
      for (const node of states) {
        const decorator = node.modifiers?.find(ts.isDecorator)!;
        mutator.replace(decorator, `@state()`);
      }
    }

    function resolvePropertyDecoratorArguments(node: ts.PropertyDeclaration) {
      const decorator = node.modifiers?.find(ts.isDecorator)!;
      const decoratorArgs: {
        attribute?: string | null;
        reflect?: boolean;
      } = Function(
        `return ${(decorator.expression as ts.CallExpression).arguments[0]?.getText() ?? '{}'}`,
      )();
      let args: string[] = [];
      if (decoratorArgs.attribute || node.name.getText().match(/[A-Z]/)) {
        args.push(`attribute: '${decoratorArgs.attribute ?? toKebabCase(node.name.getText())}'`);
      }
      if (decoratorArgs.reflect) {
        args.push('reflect: true');
      }
      if (
        node.type?.kind === ts.SyntaxKind.BooleanKeyword ||
        [ts.SyntaxKind.FalseKeyword, ts.SyntaxKind.TrueKeyword].includes(
          node.initializer?.kind ?? ts.SyntaxKind.AbstractKeyword,
        )
      ) {
        args.push('type: Boolean');
      }
      return args.length ? `{ ${args.join(', ')} }` : '';
    }

    if (events.length) {
      const eventNames = new Map<string, string>();
      if (eventingImport) {
        const lastImportSymbol = (
          (eventingImport as ts.ImportDeclaration).importClause!.namedBindings as ts.NamedImports
        ).elements.at(-1)!;
        mutator.insertAtEnd(lastImportSymbol, ', EventEmitter');
      } else {
        newImports.set('../global/eventing', ['EventEmitter']);
      }

      for (const node of events) {
        const decorator = node.modifiers!.find(ts.isDecorator)!;
        mutator.remove(decorator);
        const eventArguments: {
          eventName?: string;
          bubbles?: boolean;
          cancelable?: boolean;
          composed?: boolean;
        } = Function(
          `return ${(decorator.expression as ts.CallExpression).arguments[0]?.getText() ?? '{}'}`,
        )();
        const eventName = eventArguments.eventName ?? toKebabCase(node.name.getText());
        eventNames.set(node.name.getText(), eventName);
        makePrivate(node);

        const eventConfig = Object.keys(eventArguments)
          .filter((k) => k !== 'eventName' && eventArguments[k])
          .map((k) => `${k}: true`);
        const eventConfigStr = eventConfig.length > 0 ? `, { ${eventConfig.join(', ')} }` : '';

        mutator.insertAtEnd(
          node.type!,
          ` = new EventEmitter(this, events.${node.name.getText()}${eventConfigStr})`,
        );
      }

      mutator.insertAt(
        componentDecorator!.parent.getStart() - 1,
        `\nexport const events = {
  ${Array.from(eventNames)
    .map(([key, value]) => `${key}: '${value}',`)
    .join('\n  ')}
};\n`,
      );
    }

    for (const method of methods) {
      method.modifiers
        ?.filter(
          (node) =>
            (ts.isDecorator(node) && node.getText().startsWith('@Method')) ||
            node.kind === ts.SyntaxKind.AsyncKeyword,
        )
        .forEach((node) => {
          mutator.remove(node);
        });
      mutator.replace(
        method.type!,
        method
          .type!.getText()
          .replace(/^Promise</, '')
          .replace(/>$/, ''),
      );
    }

    let eventHandlers = '';
    if (listeners.length) {
      if (eventingImport) {
        const lastImportSymbol = (
          (eventingImport as ts.ImportDeclaration).importClause!.namedBindings as ts.NamedImports
        ).elements.at(-1)!;
        mutator.insertAtEnd(lastImportSymbol, ', ConnectedAbortController');
      } else {
        newImports.set(
          '../global/eventing',
          (newImports.get('../global/eventing') ?? []).concat('ConnectedAbortController'),
        );
      }

      mutator.insertAtEnd(
        findLastProperty(),
        `\n  private _abort = new ConnectedAbortController(this);`,
      );
      eventHandlers += '\n    const signal = this._abort.signal;';

      for (const node of listeners) {
        let methodName = node.name.getText();
        if (node.modifiers?.some((n) => n.kind === ts.SyntaxKind.PublicKeyword)) {
          methodName = makePrivate(node);
        }
        const decorators = node.modifiers!.filter(
          (n): n is ts.Decorator => ts.isDecorator(n) && n.getText().startsWith('@Listen'),
        );
        for (const decorator of decorators) {
          mutator.remove(decorator);
          const args = (decorator.expression as ts.CallExpression).arguments;
          const eventName = args[0].getText().replace(/'/g, '');
          const options: { passive?: boolean } = Function(`return ${args[1]?.getText() ?? '{}'}`)();
          const param = node.parameters.length === 0 ? '' : 'e';
          eventHandlers += `\n    this.addEventListener('${eventName}', (${param}) => this.${methodName}(${param}), { signal${
            options.passive ? ', passive: true' : ''
          } });`;
        }
      }
    }

    if (constructor) {
      const body = constructor.body!;
      mutator.insertAt(body.getStart() + body.getText().indexOf('{') + 1, `\n    super();`);
    }

    if (connectedCallback) {
      mutator.insertAt(connectedCallback.name, 'override ');
      const body = connectedCallback.body!;
      mutator.insertAt(
        body.getStart() + body.getText().indexOf('{') + 1,
        `\n    super.connectedCallback();${eventHandlers}`,
      );
    } else if (eventHandlers) {
      const pivot = constructor ?? findLastProperty();
      mutator.insertAtEnd(
        pivot,
        `

  public override connectedCallback(): void {
    super.connectedCallback();${eventHandlers}
  }
`,
      );
    }

    if (disconnectedCallback!) {
      mutator.insertAt(disconnectedCallback.name, 'override ');
      const body = disconnectedCallback.body!;
      mutator.insertAt(
        body.getStart() + body.getText().indexOf('{') + 1,
        '\n    super.disconnectedCallback();',
      );
    }

    function findLastProperty(): ts.Node {
      let pi = 0;
      let mi = 0;
      clazz.members.forEach((n, i) => {
        if (ts.isPropertyDeclaration(n)) {
          pi = i;
        } else if (ts.isMethodDeclaration(n) && mi < pi) {
          mi = i;
        }
      });
      return clazz.members[mi];
    }

    if (componentDecorator!) {
      mutator.replace(componentDecorator, `@customElement('${getTag()}')`);
      const classDeclaration = componentDecorator.parent as ts.ClassDeclaration;
      if (classDeclaration.heritageClauses) {
        mutator.remove(...classDeclaration.heritageClauses);
      }
      mutator.insertAtEnd(classDeclaration.name!, ` extends LitElement`);
      mutator.insertAt(
        classDeclaration.members[0].getFullStart(),
        `\n  public static override styles: CSSResultGroup = style;\n`,
      );
    }

    for (let identifier of elementIdentifiers) {
      const newIdentifier = identifier.getText().replace(/(^HTML|Element$)/g, '');
      mutator.replace(identifier, newIdentifier);
      newImports.set(`../${toKebabCase(newIdentifier)}/index`, [newIdentifier]);
    }

    if (componentWillLoad) {
      const body = componentWillLoad.body!;
      mutator.insertAt(
        body.getStart() + body.getText().indexOf('{') + 1,
        `\n    // TODO: Migrate to connectedCallback or firstUpdated`,
      );
    }

    if (componentDidRender) {
      newImports.get('lit')!.push('PropertyValues');
      mutator.replace(
        'public componentDidRender()',
        'protected override updated(changedProperties: PropertyValues<this>)',
      );
    }

    if (componentDidUpdate) {
      newImports.get('lit')!.push('PropertyValues');
      mutator.replace(
        'public componentDidUpdate()',
        'protected override updated(changedProperties: PropertyValues<this>)',
      );
    }

    if (componentDidLoad) {
      newImports.get('lit')!.push('PropertyValues');
      mutator.replace(
        'public componentDidLoad()',
        'protected override firstUpdated(changedProperties: PropertyValues<this>)',
      );
    }

    if (element!) {
      mutator.remove(element);
    }

    if (renderMethod && renderMethod.modifiers!.length > 0) {
      mutator.replace(renderMethod.modifiers![0], 'protected override');
    }

    for (const template of jsxTemplates) {
      migrateJsxTemplate(template, mutator, newImports);
    }

    const newImport: string[] = [];
    newImports.forEach((symbols, importName) => {
      newImport.push(
        `import { ${symbols
          .filter((v, i, a) => a.indexOf(v) === i)
          .join(', ')} } from '${importName}';`,
      );
    });
    newImport.push(`import style from './${component}.scss?lit&inline';`);
    mutator.insertAtEnd(lastImport!, `\n${newImport.join('\n')}`);

    mutator.insertAtEnd(
      clazz,
      `

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '${getTag()}': ${clazz.name!.getText()}
  }
}
`,
    );

    if (propertyRenames.size) {
      iterate(sourceFile, (innerNode) => {
        if (ts.isPropertyAccessExpression(innerNode) && propertyRenames.has(innerNode.getText())) {
          mutator.remove(innerNode);
          mutator.insertAt(innerNode, propertyRenames.get(innerNode.getText())!);
        }
      });
    }

    function makePrivate(node: ts.PropertyDeclaration | ts.MethodDeclaration) {
      const publicKeyword = node.modifiers?.find((n) => n.kind === ts.SyntaxKind.PublicKeyword)!;

      // Then is already private
      if (!publicKeyword) {
        return node.name.getText();
      }

      mutator.replace(publicKeyword, 'private');
      const newName = `_${node.name.getText()}`;
      propertyRenames.set(`this.${node.name.getText()}`, `this.${newName}`);
      mutator.replace(node.name, newName);
      return newName;
    }

    function getTag(): string {
      const args = (componentDecorator.expression as ts.CallExpression).arguments[0];
      const eventArguments: { tag: string } = Function(`return ${args.getText()}`)();
      return eventArguments.tag;
    }
  }

  function migrateJsxTemplate(
    root: ts.JsxElement,
    mutator: MyMagicString,
    newImports: Map<string, string[]>,
  ) {
    // Surround the template with html``
    mutator.appendRight(root.parent.getStart() + 1, `html\``);
    mutator.appendLeft(root.parent.getEnd() - 1, `\``);

    if (ts.isParenthesizedExpression(root.parent)) {
      mutator.remove(root.parent.getStart(), root.parent.getStart() + 1);
      mutator.remove(root.parent.getEnd() - 1, root.parent.getEnd());
    }

    iterate(root, (n) => {
      if (ts.isJsxOpeningElement(n) || ts.isJsxSelfClosingElement(n)) {
        if (n.getText().startsWith('<Host')) {
          migrateJsxHost(n as ts.JsxOpeningElement, mutator, newImports);
        } else {
          migrateJsxAttributes(n, mutator, newImports);
        }
      }

      if (ts.isJsxElement(n) || ts.isJsxSelfClosingElement(n)) {
        // Migrate {{ condition ?? templateA }}
        if (
          ts.isBinaryExpression(n.parent) ||
          (ts.isParenthesizedExpression(n.parent) && ts.isBinaryExpression(n.parent?.parent))
        ) {
          const jsxExp = ts.findAncestor(n, (m) => ts.isJsxExpression(m))!;
          const binaryExp = ts.isBinaryExpression(n.parent)
            ? n.parent
            : (n.parent.parent as ts.BinaryExpression);
          const template = ts.isParenthesizedExpression(binaryExp.right)
            ? binaryExp.right.expression
            : binaryExp.right;

          mutator.insertAt(jsxExp, '$');
          mutator.replace(
            binaryExp,
            `${binaryExp.left.getText()} ? html\`${template.getText()}\` : nothing`,
          );
        }

        // Migrate {{ condition ? templateA : templateB}}
        if (
          ts.isConditionalExpression(n.parent) ||
          (ts.isParenthesizedExpression(n.parent) && ts.isConditionalExpression(n.parent?.parent))
        ) {
          const jsxExp = ts.findAncestor(n, (m) => ts.isJsxExpression(m))!;
          const conditionalExp = ts.isConditionalExpression(n.parent)
            ? n.parent
            : (n.parent.parent as ts.ConditionalExpression);
          const trueTemplate = ts.isParenthesizedExpression(conditionalExp.whenTrue)
            ? conditionalExp.whenTrue.expression
            : conditionalExp.whenTrue;
          const falseTemplate = ts.isParenthesizedExpression(conditionalExp.whenFalse)
            ? conditionalExp.whenFalse.expression
            : conditionalExp.whenFalse;

          // If this is the false template, the migration has already been done (skip this)
          if (n === falseTemplate) {
            return;
          }

          mutator.insertAt(jsxExp, '$');

          mutator.appendRight(trueTemplate.getStart(), `html\``);
          mutator.appendLeft(trueTemplate.getEnd(), `\``);

          mutator.appendRight(falseTemplate.getStart(), `html\``);
          mutator.appendLeft(falseTemplate.getEnd(), `\``);
        }
      }

      // Convert self-closing elements
      if (
        ts.isJsxSelfClosingElement(n) &&
        !voidHtmlElements.some((e) => e === n.tagName.getText())
      ) {
        mutator.remove(n.getEnd() - 2, n.getEnd() - 1);
        mutator.appendRight(n.getEnd(), `</${n.tagName.getText()}>`);
      }

      if (ts.isJsxExpression(n) && !ts.isJsxAttribute(n.parent)) {
        mutator.replace(n, `$${n.getText()}`);
      }
    });
  }

  function migrateJsxAttributes(
    node: ts.JsxOpeningElement | ts.JsxSelfClosingElement,
    mutator: MyMagicString,
    newImports: Map<string, string[]>,
  ) {
    iterate(node, (n) => {
      if (ts.isJsxAttribute(n)) {
        // migrate 'ref={...}'
        if (n.getText().startsWith('ref=')) {
          let refContent = n.initializer!.getText();
          refContent = refContent.substring(1, refContent.length - 1); // Strip the parenthesis
          mutator.replace(n, `\${ref( ${refContent} )}`);

          newImports.set('lit/directives/ref.js', ['ref']);
        }
        // migrate 'style={...}'
        else if (n.getText().startsWith('style={')) {
          let refContent = n.initializer!.getText();
          refContent = refContent.substring(1, refContent.length - 1); // Strip the parenthesis
          mutator.replace(n.initializer!, `\${styleMap( ${refContent} )}`);

          newImports.set('lit/directives/style-map.js', ['styleMap']);
        }
        // migrate events
        else if (n.getText().match(/^on[A-Z]\w+/)) {
          const eventName = n.name.getText().substring(2).toLowerCase();
          mutator.replace(n.name, `@${eventName}`);
          mutator.insertAt(n.initializer!, '$');
        }
        // attribute migration
        else if (n.initializer && ts.isJsxExpression(n.initializer)) {
          mutator.replace(n.initializer, `$${n.initializer.getText()}`);
        }
      }
      // migrate spread attributes
      else if (ts.isJsxSpreadAttribute(n)) {
        let spreadContent = n.getText();
        mutator.replace(n, `\${sbbSpread(${spreadContent})}`);
        newImports.set('../core/dom', ['sbbSpread']);
      }
    });
  }

  function migrateJsxHost(
    host: ts.JsxOpeningElement,
    mutator: MyMagicString,
    newImports: Map<string, string[]>,
  ) {
    const codeToAdd: string[] = [];
    newImports.set('../core/dom', ['setAttribute, setAttributes']);

    // Remove the <Host> tag
    mutator.remove(host);
    mutator.remove(host.parent.closingElement);

    for (let attr of host.attributes.properties) {
      if (ts.isJsxAttribute(attr)) {
        // static boolean attributes
        if (!attr.initializer) {
          codeToAdd.push(`setAttribute(this, '${attr.name.getText()}', true);`);
          continue;
        }

        // 'ref={expression}' => 'expression(this)'
        if (attr.name.getText() === 'ref') {
          codeToAdd.push(`${(attr.initializer as ts.JsxExpression).expression?.getText()}(this);`);
          continue;
        }

        // it's an event
        if (attr.name.getText().match(/on[A-Z]\w+/)) {
          codeToAdd.push(
            `// NOTE: Cannot automatically migrate "<Host ${attr.getText()}" >. \n// Add a 'this.addEventListener' in the constructor to preserve the same behavior`,
          );
          continue;
        }

        // Strip the parenthesis
        let attrValue = attr.initializer?.getText();
        if (attrValue.startsWith('{')) {
          attrValue = attrValue.substring(1, attrValue.length - 1);
        }
        codeToAdd.push(`setAttribute(this, '${attr.name.getText()}', ${attrValue});`);
      }

      if (ts.isJsxSpreadAttribute(attr)) {
        codeToAdd.push(`setAttributes(this, ${attr.expression.getText()});`);
      }
    }

    const node = ts.findAncestor(
      host,
      (n) => ts.isReturnStatement(n) || ts.isVariableStatement(n),
    )!;
    if (codeToAdd.length > 0) {
      codeToAdd.unshift('// ## Migr: Host attributes ##');
      codeToAdd.push('// ####');
    }
    mutator.insertAt(node, codeToAdd.join('\n') + '\n\n');
  }

  function migrateStories(sourceFile: ts.SourceFile, mutator: MyMagicString, args: any) {
    let lastImport: ts.ImportDeclaration | undefined = undefined;
    const componentName = toPascalCase(args.component);
    const jsxTemplates: ts.JsxElement[] = [];
    const newImports = new Map<string, string[]>()
      .set('lit', ['html', 'TemplateResult'])
      .set('lit/directives/style-map.js', ['styleMap']);

    iterate(sourceFile, (node) => {
      if (ts.isImportDeclaration(node)) {
        lastImport = node;

        // Replace '@storybook/html' => '@storybook/web-components'
        if (node.moduleSpecifier.getText().match('@storybook/html')) {
          mutator.replace(node.moduleSpecifier, "'@storybook/web-components'");
        }

        // Remove 'jsx-dom' imports
        if (node.moduleSpecifier.getText().match('jsx-dom')) {
          mutator.remove(node);
        }
      } else if (
        ts.isJsxElement(node) &&
        (ts.isParenthesizedExpression(node.parent) || ts.isArrayLiteralExpression(node.parent)) &&
        !ts.findAncestor(node.parent, (n) => ts.isJsxElement(n))
      ) {
        jsxTemplates.push(node);
      }
    });

    for (const template of jsxTemplates) {
      migrateJsxTemplate(template, mutator, newImports);
    }

    mutator.replaceAll('JSX.Element', 'TemplateResult');
    mutator.replaceAll('<Story></Story>', '${story()}');
    mutator.replaceAll('(Story', '(story');
    mutator.replace('/** @jsx h */', '');

    const newImport: string[] = [];
    newImports.forEach((symbols, importName) => {
      newImport.push(
        `import { ${symbols
          .filter((v, i, a) => a.indexOf(v) === i)
          .join(', ')} } from '${importName}';`,
      );
    });
    mutator.insertAtEnd(lastImport!, `\n${newImport.join('\n')}`);
  }

  // prettier-ignore
  function migrateSpec(sourceFile: ts.SourceFile, mutator: MyMagicString, args: any) {
    let lastImport: ts.ImportDeclaration | undefined = undefined;
    const componentName = toPascalCase(args.component);
    const unitTests: ts.CallExpression[] = [];

    iterate(sourceFile, (node) => {
      if (ts.isImportDeclaration(node)) {
        lastImport = node;

        // remove @stencil imports
        if (node.moduleSpecifier.getText().match('@stencil')) {
          mutator.remove(node);
        }
      }

      if (ts.isCallExpression(node) && node.expression.getText() === 'it') {
        unitTests.push(node);
      }
    });

    // New static imports
    const newImports: String[] = [];
    newImports.push(`import { expect, fixture } from '@open-wc/testing';`);
    newImports.push(`import { html } from 'lit/static-html.js';`);
    mutator.insertAtEnd(lastImport!, `\n${newImports.join('\n')}`);

    // Migrate each 'it(...)'
    unitTests.forEach((node) => {
      const testName = node.arguments[0].getText();

      // migrate test setup
      try {
        migrateSpecSetup(node);
      } catch (error) {
        console.error(`Failed to migrate setup for the test named ${testName}`, `Error: ${error}`);
      }

      // migrate assertion
      try {
        migrateSpecAssertion(node);
      } catch (error) {
        console.error(
          `Failed to migrate assertion for the test named ${testName}`,
          `Error: ${error}`,
        );
      }
    });

    function migrateSpecSetup(node: ts.CallExpression) {
      const setupStatement = deepFind(
        node,
        (n) =>
          ts.isVariableStatement(n) &&
          !!deepFind(n, (m) => ts.isCallExpression(m) && m.expression.getText() === 'newSpecPage'),
      );
      if (!setupStatement) throw new Error('Cannot find setup statement');

      // variable declaration (es. 'const { root }' => 'const root')
      const varDeclaration = deepFind(setupStatement, (n) =>
        ts.isObjectBindingPattern(n),
      ) as ts.ObjectBindingPattern;
      mutator.replace(varDeclaration!, varDeclaration.elements[0].getText());

      // newSpecPage => fixture
      const templateSetup = deepFind(
        setupStatement,
        (n) => ts.isCallExpression(n) && n.expression.getText() === 'newSpecPage',
      );
      const templateAssignment = deepFind(
        templateSetup!,
        (n) => ts.isPropertyAssignment(n) && n.name.getText() === 'html',
      ) as ts.PropertyAssignment;
      let template = templateAssignment.initializer.getText();

      // Surrond the template with `
      if (template.charAt(0) !== '`') {
        template = `\`${template.substring(1, template.length - 1)}\``;
      }

      mutator.replace(templateSetup!, `fixture(html${template});`);
    }

    function migrateSpecAssertion(node: ts.CallExpression) {
      const assertionsList: ts.CallExpression[] = [];

      iterate(node, n => {
        if (ts.isCallExpression(n) && !!n.getText().match(/^expect\(\w*\).toEqualHtml/)) {
          assertionsList.push(n);
        }
      })

      if (assertionsList.length === 0) {
        return;
      }

      for (const assertion of assertionsList) {
        const expectNode = (assertion.expression as ts.PropertyAccessExpression).expression; // e.g. 'expect(root)'
        const fullTemplate = assertion.arguments[0].getText();

        if (fullTemplate.match(/<mock:shadow-root>/g)!.length > 1) {
          mutator.insertAt(assertion, '/** NOTE: this test has multiple shadow DOMs. You need to manually migrate it, sorry :/ \n'
          + '  * You could extract 3 different assertions. One for the light DOM,'
          + '  * one for the shadow DOM of the first component and one for the sh. Dom of the second */ \n')
          continue;
        }

        // Split the html template into shadow and light DOMs
        const shadowStart = fullTemplate.match(/<mock:shadow-root>/)!;
        const shadowEnd = fullTemplate.match(/<\/mock:shadow-root>/)!;
        const shadowStartIndex = shadowStart.index! + shadowStart?.[0].length!;
        const shadowEndIndex = shadowEnd.index!;
        const lightDomTemplate =
          fullTemplate.substring(0, shadowStart.index!) +
          fullTemplate.substring(shadowEnd.index! + shadowEnd[0].length!);
        const shadowDomTemplate = fullTemplate.substring(shadowStartIndex, shadowEndIndex);

        mutator.remove(assertion);
        mutator.insertAt(
          assertion,
          `${expectNode.getText()}.dom.to.be.equal(\n${lightDomTemplate}\n);\n`,
        );
        mutator.insertAt(
          assertion,
          `${expectNode.getText()}.shadowDom.to.be.equal(\n\`${shadowDomTemplate}\`);`,
        );
      }
    }
  }

  // prettier-ignore
  function migrateE2E(sourceFile: ts.SourceFile, mutator: MyMagicString, args: any) {
    let lastImport: ts.ImportDeclaration | undefined = undefined;
    const componentName = toPascalCase(args.component);
    const unitTests: ts.CallExpression[] = [];

    const newImports = new Map<string, string[]>()
      .set('@open-wc/testing', ['assert', 'expect', 'fixture', 'oneEvent', 'waitUntil'])
      .set('lit/static-html.js', ['html'])
      .set('@web/test-runner-commands', ['sendKeys', 'setViewport'])
      .set('../core/testing', ['EventSpy, waitForLitRender']);

    const assertionConversionMap = [
      { from: 'toEqual', to: 'to.be.equal' },
      { from: 'toBe', to: 'to.be.equal' },
      { from: 'toBeNull', to: 'to.be.null' },
      { from: 'toHaveClass', to: 'to.have.class' },
      { from: 'toHaveAttribute', to: 'to.have.attribute' },
      { from: 'toEqualAttribute', to: 'to.have.attribute' },
      { from: 'toMatch', to: 'to.match' },
      { from: 'toEqualHtml', to: 'dom.to.be.equal' },
      { from: 'toEqualText', to: 'dom.text' },
    ];
    const eventAssertionConversionMap = [
      { from: 'toHaveReceivedEvent', to: 'to.be.greaterThan'},
      { from: 'toHaveReceivedEventTimes', to: 'to.be.equal'},
    ];

    iterate(sourceFile, (node) => {
      if (ts.isImportDeclaration(node)) {
        lastImport = node;

        // remove @stencil imports
        if (node.moduleSpecifier.getText().match('@stencil')) {
          mutator.remove(node);
        }
      }

      if (ts.isVariableStatement(node) && node.getText().match(/(element: E2EElement|page: E2EPage)/)) {
        mutator.insertAt(node, '/** NOTE: These are too hard to migrate and are prone to errors :/ \n'
        + '  * consider that the E2EPage is now the \'document\' (you should just delete it) \n'
        + '  * and that the E2EElement equivalent is directly the SbbComponent (e.g. SbbTimeInput) */ \n');
      }

      if (ts.isCallExpression(node) && (node.expression.getText() === 'it' || node.expression.getText() === 'beforeEach')) {
        unitTests.push(node);
      }
    });

    // Migrate each E2E test
    unitTests.forEach((test) => {
      const testName = test.expression.getText().startsWith('beforeEach')
        ? 'beforeEach'
        : test.arguments[0].getText();

      try {
        migrateUnitTest(test);
      } catch (error) {
        console.error(`Failed to migrate E2E test named ${testName}`, `Error: ${error}`);
      }
    });

    // Insert imports
    const newImport: string[] = [];
    newImports.forEach((symbols, importName) => {
      newImport.push(`import { ${symbols.join(', ')} } from '${importName}';`);
    });
    newImport.push(`import { ${componentName} } from './${args.component}';`);
    mutator.insertAtEnd(lastImport!, `\n${newImport.join('\n')}`);

    function migrateUnitTest(test: ts.CallExpression) {

      iterate(test, (node) => {
        if (ts.isExpressionStatement(node) || ts.isVariableStatement(node)) {

          if (node.getText().match(/await newE2EPage\(/)) {
            const call = deepFind(node, (n) => ts.isCallExpression(n) && n.getText().startsWith('newE2EPage')) as ts.CallExpression;

            // if it's' 'newE2EPage()', just remove it
            if (call.arguments.length === 0) {
              mutator.remove(node);
            } else {
              // we extract the template from 'newE2EPage({html: ...})'
              let template = (deepFind(call, n => ts.isPropertyAssignment(n) && n.name.getText() === 'html') as ts.PropertyAssignment).initializer.getText();

              // Surrond the template with `
              if (template.charAt(0) !== '`') {
                template = `\`${template.substring(1, template.length - 1)}\``;
              }

              mutator.replace(node, `await fixture(html${template})`);
            }
          }

          if (node.getText().match(/\.setContent\(/)) {
            const awaitNode = deepFind(
              node,
              (n) => ts.isAwaitExpression(n) && !!n.getText().match(/^await .+\.setContent/),
            ) as ts.AwaitExpression;
            const call = deepFind(awaitNode, (n) => ts.isCallExpression(n)) as ts.CallExpression;
            let template = call.arguments[0].getText();

            // Surrond the template with `
            if (template.charAt(0) !== '`') {
              template = `\`${template.substring(1, template.length - 1)}\``;
            }

            mutator.replace(call, `fixture(html${template})`);
          }

          if (node.getText().match(/\.setProperty\(/)) {
            const call = deepFind(node, (n) => ts.isCallExpression(n)) as ts.CallExpression;
            const element = (call.expression as ts.PropertyAccessExpression).expression.getText();
            const property = call.arguments[0].getText().replace(/'/g, '');
            const value = call.arguments[1].getText();

            mutator.replace(node, `${element}.${property} = ${value};`);
          }

          if (node.getText().match(/\.getProperty\(/)) {
            const awaitNode = deepFind(
              node,
              (n) => ts.isAwaitExpression(n) && !!n.getText().match(/^await .+\.getProperty/),
            ) as ts.AwaitExpression;
            const call = deepFind(awaitNode, (n) => ts.isCallExpression(n)) as ts.CallExpression;
            const element = (call.expression as ts.PropertyAccessExpression).expression.getText();
            const property = call.arguments[0].getText().replace(/'/g, '');

            mutator.replace(awaitNode, `${element}.${property}`);
          }

          if (node.getText().match(/page\.find\(/)) {
            const awaitNode = deepFind(
              node,
              (n) => ts.isAwaitExpression(n) && !!n.getText().match(/^await page\.find/),
            ) as ts.AwaitExpression;
            const call = deepFind(awaitNode, (n) => ts.isCallExpression(n)) as ts.CallExpression;
            const querySelector = call.arguments[0].getText();
            let warning = '';

            if (querySelector.match('>>>')) {
              warning = '// NOTE: the ">>>" operator is not supported outside stencil. (convert it to something like "element.shadowRoot.querySelector(...)") \n';
              mutator.insertAt(node, warning);
            }

            mutator.replace(awaitNode, `document.querySelector(${querySelector})`);
          }

          if (node.getText().match(/\.waitForChanges\(/)) {
            mutator.replace(node, 'await waitForLitRender(element);'); // TODO it's not always called 'element'
          }

          if (node.getText().match(/\.press\(/)) {
            const call = deepFind(node, (n) => ts.isCallExpression(n)) as ts.CallExpression;
            const element = (call.expression as ts.PropertyAccessExpression).expression.getText();
            const keyToPress = call.arguments[0].getText();

            mutator.replace(node, `${element}.focus(); \n await sendKeys({press: ${keyToPress}});`);
          }

          if (node.getText().match(/\.type\(/)) {
            const call = deepFind(node, (n) => ts.isCallExpression(n)) as ts.CallExpression;
            const element = (call.expression as ts.PropertyAccessExpression).expression.getText();
            const keyToType = call.arguments[0].getText();

            mutator.replace(node, `${element}.focus(); \n await sendKeys({type: ${keyToType}});`);
          }

          if (node.getText().match(/\.keyboard.down\(/)) {
            const call = deepFind(node, (n) => ts.isCallExpression(n)) as ts.CallExpression;
            const keyToPress = call.arguments[0].getText();
            mutator.replace(node, `await sendKeys({down: ${keyToPress}});`);
          }

          if (node.getText().match(/\.setViewport\(/)) {
            const call = deepFind(node, (n) => ts.isCallExpression(n)) as ts.CallExpression;
            const settings = call.arguments[0].getText();
            mutator.replace(node, `await setViewport(${settings});`);
          }

          if (node.getText().match(/\.evaluate\(/)) {
            const awaitNode = deepFind(
              node,
              (n) => ts.isAwaitExpression(n) && !!n.getText().match(/^await .+\.evaluate/),
            ) as ts.AwaitExpression;
            const call = deepFind(awaitNode, (n) => ts.isCallExpression(n)) as ts.CallExpression;
            let innerCode = (
              deepFind(call, (n) => ts.isArrowFunction(n)) as ts.ArrowFunction
            ).body.getText();

            // Remove the brackets
            if (innerCode.startsWith('{')) {
              innerCode = innerCode.substring(1, innerCode.length - 1);
            }

            mutator.replace(awaitNode, innerCode);
          }

          if (node.getText().match(/\.spyOnEvent\(/)) {
            const awaitNode = deepFind(node, (n) => ts.isAwaitExpression(n) && !!n.getText().match(/^await .+\.spyOnEvent/)) as ts.AwaitExpression;
            const call = deepFind(awaitNode, (n) => ts.isCallExpression(n)) as ts.CallExpression;
            const eventName = call.arguments[0].getText();
            const target = (call.expression as ts.PropertyAccessExpression).expression.getText();

            mutator.replace(awaitNode, `new EventSpy(${eventName}, ${target})`)
          }

          // element.triggerEvent('event', data) => element.dispatchEvent(new CustomEvent('event', data)
          if (node.getText().match(/\.triggerEvent\(/)) {
            const call = deepFind(node, (n) => ts.isCallExpression(n)) as ts.CallExpression;
            const element = (call.expression as ts.PropertyAccessExpression).expression;
            const parameters = call.arguments;

            mutator.replace(node, `${element.getText()}.dispatchEvent(new CustomEvent(${parameters.map(p => p.getText()).join(', ')}));`)
          }

          if (node.getText().match(/\.callMethod\(/)) {
            const awaitNode = deepFind(node, (n) => ts.isAwaitExpression(n)) as ts.CallExpression;
            const call = deepFind(node, (n) => ts.isCallExpression(n)) as ts.CallExpression;
            const element = (call.expression as ts.PropertyAccessExpression).expression;
            const methodName = call.arguments[0].getText().replace(/'/g, '');
            const parameters = call.arguments.slice(1);

            mutator.replace(awaitNode, `${element.getText()}.${methodName}(${parameters.map(p => p.getText()).join(', ')})`)
          }

          // Hydrated check migration
          if (node.getText().match(/\.toHaveClass\('hydrated'\)/)) {
            const call = deepFind(node, (n) => ts.isCallExpression(n) && !!n.getText().match(/^expect\(\w+\)$/)) as ts.CallExpression;
            const element = call.arguments[0];
            mutator.replace(node, `assert.instanceOf(${element.getText()}, ${componentName});`)
            return;
          }

          // Plain assertion migration
          if (node.getText().match(new RegExp(assertionConversionMap.map((a) => `\\.${a.from}\\(`).join('|')))) {
            const assertion = deepFind(node, (n) =>
              assertionConversionMap.some((a) => a.from === n.getText()),
            )!;

            mutator.replace(assertion, assertionConversionMap.find((a) => a.from === assertion.getText())!.to);
          }

          // Events assertion migration
          if (node.getText().match(new RegExp(eventAssertionConversionMap.map(a => `\\.${a.from}\\(`).join('|')))) {
            const assertion = deepFind(node, (n) => eventAssertionConversionMap.some(a => a.from === n.getText()))!;
            const expectNode = deepFind(node, (n) => ts.isCallExpression(n) && !!n.getText().match(/^expect\(\w+\)$/))! as ts.CallExpression;
            const eventSpy = expectNode.arguments[0];
            const migratedAssertion = eventAssertionConversionMap.find(a => a.from === assertion.getText())!.to;
            let negation = deepFind(node, (n) => ts.isIdentifier(n) && n.getText() === 'not') ? '.not' : '';
            let args = ((node as ts.ExpressionStatement).expression as ts.CallExpression).arguments.map(a => a.getText()).join(', ');

            if (assertion.getText() === 'toHaveReceivedEvent') {
              args = '0';
            }

            mutator.replace(node, `expect(${eventSpy.getText()}.count)${negation}.${migratedAssertion}(${args});`);
          }
        }
      });
    }
  }

  /** Helper functions */

  function toKebabCase(value: string) {
    return value.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
  }

  function toPascalCase(value: string) {
    return value
      .replace(/\w+/g, function (w) {
        return w[0].toUpperCase() + w.slice(1).toLowerCase();
      })
      .replace(/-/g, '');
  }
}

if (!process.argv.includes('--all')) {
  migrate(process.argv[2], process.argv.includes('--debug'), process.argv.includes('--stories'));
} else {
  const allComponents = glob
    .sync(`./src/components/**/readme.md`)
    .map((p) => basename(dirname(p)))
    .sort();
  for (let comp of allComponents) {
    await migrate(comp, process.argv.includes('--debug'), process.argv.includes('--stories'));
  }
}
