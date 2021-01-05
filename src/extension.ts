import { commands, ExtensionContext, window, authentication } from "vscode";

import auth from "./commands/auth";
import ActiveUser from "./ActiveUser";
import Util from "./utilities/util";

const user = new ActiveUser();
let interval: NodeJS.Timeout | null = null;

export function activate(context: ExtensionContext) {
  Util.context = context;
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

  const authenticateDisp = commands.registerCommand(
    "vstatus.auth",
    async () => await auth()
  );

  context.subscriptions.push(update, stopUpdate, authenticateDisp);
}

// this method is called when your extension is deactivated
export function deactivate() {}
