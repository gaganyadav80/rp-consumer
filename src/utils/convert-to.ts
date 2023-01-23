import { window, commands, SnippetString } from "vscode";
import { getSelectedText } from "../utils";

// TODO(gagan): how to make this more robust?
// Need to get only one return widget from multiple return widgets.
const childRegExp = new RegExp("[^S\r\n]*return .*;s*", "ms");

export const convertTo = async (
  snippet: (child: string) => string
) => {
  let editor = window.activeTextEditor;
  if (!editor) return;
  const selection = getSelectedText(editor);
  const rawWidget = editor.document.getText(selection).replace("$", "//$");
  const match = rawWidget.match(childRegExp);
  if (!match || !match.length) return;
  let child = match[0];
  if (!child) return;
  child = child.replace("return", "");
  child = child.replace(RegExp(";(?!.*;)", "ms"), "");
  // const widget = rawWidget.replace(childRegExp, "");
  editor.insertSnippet(new SnippetString(snippet(child)), selection);
  await commands.executeCommand("editor.action.formatDocument");
};