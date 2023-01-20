import { window, CodeAction, CodeActionProvider, CodeActionKind } from "vscode";
import { getSelectedText } from "../utils";

const consumerRegExp = new RegExp("^Consumer\\(.*\\)", "ms");

export class ConsumerCodeActionProvider implements CodeActionProvider {
  public provideCodeActions(): CodeAction[] {
    const editor = window.activeTextEditor;
    if (!editor) return [];

    const selectedText = editor.document.getText(getSelectedText(editor));
    if (selectedText === "") return [];

    const isConsumer = consumerRegExp.test(selectedText);

    return [
      ...(isConsumer
        ? [
          {
            command: "extension.remove-consumer",
            title: "Remove Consumer",
          },
        ]
        : []),
      {
        command: "extension.wrap-consumer",
        title: "Wrap with Consumer",
      },
    ].map((c) => {
      let action = new CodeAction(c.title, CodeActionKind.Refactor);
      action.command = {
        command: c.command,
        title: c.title,
      };
      return action;
    });
  }
}
