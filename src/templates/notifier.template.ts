import * as changeCase from "change-case";
// import { BlocType } from "../utils";

export function getNotifierTemplate(notifierName: string): string {
    return getEquatableNotifierTemplate(notifierName);
}

function getEquatableNotifierTemplate(notifierName: string) {
    const pascalCaseNotifierName = changeCase.pascalCase(notifierName);
    const snakeCaseNotifierName = changeCase.snakeCase(notifierName);
    const camelCaseNotifierName = changeCase.camelCase(notifierName);
    const notifierState = `${pascalCaseNotifierName}State`;
    return `import 'package:equatable/equatable.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

part '${snakeCaseNotifierName}_state.dart';

final StateNotifierProvider<${pascalCaseNotifierName}Notifier, ${notifierState}> ${camelCaseNotifierName}Notifier = 
    StateNotifierProvider<${pascalCaseNotifierName}Notifier, ${notifierState}>(
  (Ref ref) {
    return ${pascalCaseNotifierName}Notifier();
  },
);

class ${pascalCaseNotifierName}Notifier extends StateNotifier<${notifierState}> {
  ${pascalCaseNotifierName}Notifier() : super(const ${pascalCaseNotifierName}Initial());
}
`;
}