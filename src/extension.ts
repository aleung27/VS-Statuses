import { commands, ExtensionContext, window, authentication } from "vscode";

import auth from "./commands/auth";
import update from "./commands/update";
import Util from "./utilities/util";
import StatusViewProvider from "./providers/StatusViewProvider";

export function activate(context: ExtensionContext) {
  Util.context = context;
  let interval: NodeJS.Timeout | null = null;
  const provider = new StatusViewProvider(context.extensionUri);

  console.log("VS Statuses Activated!");

  let viewDisp = window.registerWebviewViewProvider(
    StatusViewProvider.viewType,
    provider
  );

  let updateDisp = commands.registerCommand("vs-statuses.update", async () => {
    const wrapper = async () => {
      const data = await update();
      provider.view?.webview.postMessage({ command: "update", statuses: data });
    };

    wrapper();
    interval = setInterval(wrapper, 60000);
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
export function deactivate() {}
