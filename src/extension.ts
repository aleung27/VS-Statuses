import { commands, ExtensionContext, window } from "vscode";
import ActiveUser from "./ActiveUser";

const user = new ActiveUser();
let interval: NodeJS.Timeout | null = null;

export function activate(context: ExtensionContext) {
  console.log("Vstatus Activated!");

  let update = commands.registerCommand("vstatus.update", () => {
    interval = setInterval(() => {
      user.populateActivity();
      console.log(user);
    }, 10000);
  });

  let stopUpdate = commands.registerCommand("vstatus.stopUpdate", () => {
    if (interval) {
      clearInterval(interval);
    }
  });

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = commands.registerCommand("vstatus.helloWorld", () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    window.showInformationMessage("Hello VS Code!");
  });

  context.subscriptions.push(update, disposable, stopUpdate);
}

// this method is called when your extension is deactivated
export function deactivate() {}
