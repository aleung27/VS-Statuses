import { commands, ExtensionContext, window, authentication } from "vscode";

import auth from "./commands/auth";
import update from "./commands/update";
import Util from "./utilities/util";

export function activate(context: ExtensionContext) {
  Util.context = context;
  let interval: NodeJS.Timeout | null = null;
  console.log("Vstatus Activated!");

  let updateDisp = commands.registerCommand("vstatus.update", async () => {
    const wrapper = async () => {
      const data = await update();
      console.log(data);
    };

    wrapper();
    interval = setInterval(wrapper, 60000);
  });

  let stopUpdate = commands.registerCommand("vstatus.stopUpdate", () => {
    if (interval) {
      clearInterval(interval);
    }
  });

  const authDisp = commands.registerCommand(
    "vstatus.auth",
    async () => await auth()
  );

  context.subscriptions.push(updateDisp, stopUpdate, authDisp);
}

// this method is called when your extension is deactivated
export function deactivate() {}
