import * as changeCase from "change-case";

export function getNotifierStateTemplate(
  notifierName: string
): string {
    return getEquatableNotifierStateTemplate(notifierName);
}

function getEquatableNotifierStateTemplate(notifierName: string): string {
  const pascalCaseNotifierName = changeCase.pascalCase(notifierName);
  const snakeCaseNotifierName = changeCase.snakeCase(notifierName);
  return `part of '${snakeCaseNotifierName}_notifier.dart';

abstract class ${pascalCaseNotifierName}State extends Equatable {
  const ${pascalCaseNotifierName}State();

  @override
  List<Object?> get props => <Object>[];
}

class ${pascalCaseNotifierName}InitialState extends ${pascalCaseNotifierName}State {
  const ${pascalCaseNotifierName}InitialState();
}
`;
}
