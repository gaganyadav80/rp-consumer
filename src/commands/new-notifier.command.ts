import * as _ from "lodash";
import * as changeCase from "change-case";
import * as mkdirp from "mkdirp";

import {
  InputBoxOptions,
  OpenDialogOptions,
  Uri,
  window,
  workspace,
} from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";
import { getNotifierStateTemplate, getNotifierTemplate } from "../templates";

export const newNotifier = async (uri: Uri) => {
  const notifierName = await promptForNotifierName();
  if (_.isNil(notifierName) || notifierName.trim() === "") {
    window.showErrorMessage("The notifier name must not be empty");
    return;
  }

  let targetDirectory;
  if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
    targetDirectory = await promptForTargetDirectory();
    if (_.isNil(targetDirectory)) {
      window.showErrorMessage("Please select a valid directory");
      return;
    }
  } else {
    targetDirectory = uri.fsPath;
  }

  const pascalCaseNotifierName = changeCase.pascalCase(notifierName);
  try {
    await generateNotifierCode(notifierName, targetDirectory);
    window.showInformationMessage(
      `Successfully Generated ${pascalCaseNotifierName} Notifier`
    );
  } catch (error) {
    window.showErrorMessage(
      `Error:
        ${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
  }
};

function promptForNotifierName(): Thenable<string | undefined> {
  const notifierNamePromptOptions: InputBoxOptions = {
    prompt: "Notifier Name",
    placeHolder: "counter",
  };
  return window.showInputBox(notifierNamePromptOptions);
}

async function promptForTargetDirectory(): Promise<string | undefined> {
  const options: OpenDialogOptions = {
    canSelectMany: false,
    openLabel: "Select a folder to create the notifier in",
    canSelectFolders: true,
  };

  return window.showOpenDialog(options).then((uri) => {
    if (_.isNil(uri) || _.isEmpty(uri)) {
      return undefined;
    }
    return uri[0].fsPath;
  });
}

// TODO: gives error when `notifier` directory does not exist
// It creates the directory but then throws error
// If we run this command again, it works fine
async function generateNotifierCode(
  notifierName: string,
  targetDirectory: string,
) {
  const shouldCreateDirectory = workspace
    .getConfiguration("rp-consumer")
    .get<boolean>("newNotifierTemplate.createDirectory");
  const notifierDirectoryPath = shouldCreateDirectory
    ? `${targetDirectory}/notifier`
    : targetDirectory;
  if (!existsSync(notifierDirectoryPath)) {
    await createDirectory(notifierDirectoryPath);
  }

  await Promise.all([
    createNotifierStateTemplate(notifierName, notifierDirectoryPath),
    createNotifierTemplate(notifierName, notifierDirectoryPath),
  ]);
}

function createDirectory(targetDirectory: string): Promise<void> {
  return new Promise((resolve, reject) => {
    mkdirp(targetDirectory).then((error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}

function createNotifierStateTemplate(
  notifierName: string,
  targetDirectory: string,
) {
  const snakeCaseNotifierName = changeCase.snakeCase(notifierName);
  const targetPath = `${targetDirectory}/${snakeCaseNotifierName}_state.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseNotifierName}_state.dart already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      targetPath,
      getNotifierStateTemplate(notifierName),
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      }
    );
  });
}

function createNotifierTemplate(
  notifierName: string,
  targetDirectory: string,
) {
  const snakeCaseNotifierName = changeCase.snakeCase(notifierName);
  const targetPath = `${targetDirectory}/${snakeCaseNotifierName}_notifier.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseNotifierName}_notifier.dart already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      targetPath,
      getNotifierTemplate(notifierName),
      "utf8",
      (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      }
    );
  });
}
