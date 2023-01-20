import * as changeCase from "change-case";

export function getStatelessFileTemplate(fileName: string): string {
    return getDefaultStateslessFileTemplate(fileName);
}

function getDefaultStateslessFileTemplate(fileName: string) {
  const pascalCaseFileName = changeCase.pascalCase(fileName);
  return `import 'package:flutter/material.dart';

class ${pascalCaseFileName} extends StatelessWidget {
  const ${pascalCaseFileName}({super.key});  
  
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
`;
}
