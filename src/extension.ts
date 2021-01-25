import { commands, ExtensionContext, window, authentication } from "vscode";

import auth from "./commands/auth";
import update from "./commands/update";
import Util from "./utilities/util";
import StatusViewProvider from "./providers/StatusViewProvider";
import { Setting, toggleSetting } from "./utilities/settings";

let interval: NodeJS.Timeout | null = null; // The current update interval sesssion
//TODO: authentication.ondidchangesession -> login/logout button?
//TODO: overlap between time and username
//TODO: custom status message
//TODO: theming for colors
//TODO: new icon for extension
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

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~Setting Commands~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  const configWorkspaceOnDisp = commands.registerCommand(
    "vs-statuses.configWorkspaceOn",
    async () => await toggleSetting(Setting.workspace, true)
  );

  const configWorkspaceOffDisp = commands.registerCommand(
    "vs-statuses.configWorkspaceOff",
    async () => await toggleSetting(Setting.workspace, false)
  );

  const configFilenameOnDisp = commands.registerCommand(
    "vs-statuses.configFilenameOn",
    async () => await toggleSetting(Setting.filename, true)
  );

  const configFilenameOffDisp = commands.registerCommand(
    "vs-statuses.configFilenameOff",
    async () => await toggleSetting(Setting.filename, false)
  );

  const configGhostOnDisp = commands.registerCommand(
    "vs-statuses.configGhostOn",
    async () => await toggleSetting(Setting.ghost, true)
  );

  const configGhostOffDisp = commands.registerCommand(
    "vs-statuses.configGhostOff",
    async () => await toggleSetting(Setting.ghost, false)
  );

  context.subscriptions.push(
    updateDisp,
    stopUpdate,
    authDisp,
    viewDisp,
    configWorkspaceOnDisp,
    configWorkspaceOffDisp,
    configFilenameOnDisp,
    configFilenameOffDisp,
    configGhostOnDisp,
    configGhostOffDisp
  );
}

// this method is called when your extension is deactivated
export function deactivate() {
  if (interval) {
    clearInterval(interval);
  }
}
