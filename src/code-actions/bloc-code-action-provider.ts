import { window, CodeAction, CodeActionProvider, CodeActionKind } from "vscode";
import { getSelectedText } from "../utils";

// const blocProviderRegExp = new RegExp(
//   "^BlocProvider(\\<.*\\>)*(\\.value)*\\(.*\\)",
//   "ms"
// );

export class BlocCodeActionProvider implements CodeActionProvider {
  public provideCodeActions(): CodeAction[] {
    const editor = window.activeTextEditor;
    if (!editor) return [];

    const selectedText = editor.document.getText(getSelectedText(editor));
    if (selectedText === "") return [];

    // const isBlocProvider = blocProviderRegExp.test(selectedText);

    return [
      // ...(isBlocProvider
      //   ? [
      //       {
      //         command: "extension.convert-multiblocprovider",
      //         title: "Convert to MultiBlocProvider",
      //       },
      //     ]
      //   : []),
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
