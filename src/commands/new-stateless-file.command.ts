import * as _ from "lodash";
import * as changeCase from "change-case";
import * as mkdirp from "mkdirp";

import {
  InputBoxOptions,
  OpenDialogOptions,
  Uri,
  window,
} from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";
import { getStatelessFileTemplate } from "../templates";

export const newStatelessFile = async (uri: Uri) => {
  const statelessFileName = await promptForStatelessFileName();
  if (_.isNil(statelessFileName) || statelessFileName.trim() === "") {
    window.showErrorMessage("The stateless file name must not be empty");
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

  const pascalCaseStatelessFileName = changeCase.pascalCase(statelessFileName);
  try {
    await generateStatelessFileCode(statelessFileName, targetDirectory);
    window.showInformationMessage(
      `Successfully Generated ${pascalCaseStatelessFileName} Stateless File`
    );
  } catch (error) {
    window.showErrorMessage(
      `Error:
        ${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
  }
};

function promptForStatelessFileName(): Thenable<string | undefined> {
  const statelessFileNamePromptOptions: InputBoxOptions = {
    prompt: "Stateless File Name",
    placeHolder: "counter",
  };
  return window.showInputBox(statelessFileNamePromptOptions);
}

async function promptForTargetDirectory(): Promise<string | undefined> {
  const options: OpenDialogOptions = {
    canSelectMany: false,
    openLabel: "Select a folder to create the stateless file in",
    canSelectFolders: true,
  };

  return window.showOpenDialog(options).then((uri) => {
    if (_.isNil(uri) || _.isEmpty(uri)) {
      return undefined;
    }
    return uri[0].fsPath;
  });
}

async function generateStatelessFileCode(
  statelessFileName: string,
  targetDirectory: string,
) {
  const statelessFileDirectoryPath = targetDirectory;
  if (!existsSync(statelessFileDirectoryPath)) {
    await createDirectory(statelessFileDirectoryPath);
  }

  await Promise.all([
    createStatelessFileTemplate(statelessFileName, statelessFileDirectoryPath),
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

function createStatelessFileTemplate(
  statelessFileName: string,
  targetDirectory: string,
) {
  const snakeCaseStatelessFileName = changeCase.snakeCase(statelessFileName);
  const targetPath = `${targetDirectory}/${snakeCaseStatelessFileName}.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseStatelessFileName}.dart already exists`);
  }
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      targetPath,
      getStatelessFileTemplate(statelessFileName),
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
