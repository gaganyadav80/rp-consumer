import * as _ from "lodash";

import { commands, ExtensionContext, languages } from "vscode";
import {
  wrapWithConsumer,
} from "./commands";
import { ConsumerCodeActionProvider } from "./code-actions";

const DART_MODE = { language: "dart", scheme: "file" };

export function activate(_context: ExtensionContext) {
  

  _context.subscriptions.push(
    commands.registerCommand("extension.wrap-consumer", wrapWithConsumer),
    languages.registerCodeActionsProvider(
      DART_MODE,
      new ConsumerCodeActionProvider()
    )
  );
}
