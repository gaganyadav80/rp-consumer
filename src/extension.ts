import * as _ from "lodash";

import { commands, ExtensionContext, languages } from "vscode";
import {
  wrapWithConsumer,
  newStatelessFile,
  newNotifier,
  removeConsumer,
} from "./commands";
import { ConsumerCodeActionProvider } from "./code-actions";

const DART_MODE = { language: "dart", scheme: "file" };

export function activate(_context: ExtensionContext) {


  _context.subscriptions.push(
    commands.registerCommand("extension.new-stateless-file", newStatelessFile),
    commands.registerCommand("extension.new-notifier", newNotifier),
    commands.registerCommand("extension.wrap-consumer", wrapWithConsumer),
    commands.registerCommand("extension.remove-consumer", removeConsumer),
    languages.registerCodeActionsProvider(
      DART_MODE,
      new ConsumerCodeActionProvider()
    )
  );
}
