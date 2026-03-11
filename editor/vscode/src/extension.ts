import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext): void {
  // Schema registration is handled declaratively via `contributes.yamlValidation`
  // in package.json — no runtime code needed for MVP schema support.

  // Register the ACS: Validate Project command (runs `acs validate` in terminal)
  const validateCmd = vscode.commands.registerCommand("acs.validate", () => {
    const terminal = vscode.window.createTerminal("ACS Validate");
    terminal.show();
    terminal.sendText("acs validate");
  });

  context.subscriptions.push(validateCmd);
}

export function deactivate(): void {
  // nothing to clean up
}
