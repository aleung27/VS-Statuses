import { commands, ExtensionContext, window, authentication } from "vscode";

import auth from "./commands/auth";
import update from "./commands/update";
import Util from "./utilities/util";
import StatusViewProvider from "./providers/StatusViewProvider";

let interval: NodeJS.Timeout | null = null; // The current update interval sesssion

export async function activate(context: ExtensionContext) {
  Util.context = context; // Set the context the extension operates in
  const provider = new StatusViewProvider(context.extensionUri); // The Provider for the webview

  console.log("VS Statuses Activated!");
  await auth();
  if (Util.isLoggedIn()) {
    commands.executeCommand("vs-statuses.update");
  }

  /**
   * Register the webview view provider in order to display the sidebar
   */
  let viewDisp = window.registerWebviewViewProvider(
    StatusViewProvider.viewType,
    provider
  );

  /**
   * Registers the command for propogating updates to the API and receiving a
   * response consisting of the stauses of all the users followed
   */
  let updateDisp = commands.registerCommand("vs-statuses.update", async () => {
    const wrapper = async () => {
      const data = await update();
      provider.statuses = data; // Update the current statuses in the extension
    };

    // If an interval already exists, something already propogates so we return
    if (interval) {
      return;
    }
    wrapper();
    interval = setInterval(wrapper, 60000); // Have the update func run automatically
  });

  let stopUpdate = commands.registerCommand("vs-statuses.stopUpdate", () => {
    if (interval) {
      clearInterval(interval);
    }
  });

  const authDisp = commands.registerCommand(
    "vs-statuses.auth",
    async () => await auth()
  );

  context.subscriptions.push(updateDisp, stopUpdate, authDisp, viewDisp);
}

// this method is called when your extension is deactivated
export function deactivate() {
  if (interval) {
    clearInterval(interval);
  }
}
