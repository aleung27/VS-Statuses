import { commands, ExtensionContext, window, authentication } from "vscode";
import ActiveUser from "./ActiveUser";
import axios from "axios";
import https from "https";

const user = new ActiveUser();

// Remove this later, for local dev
const api = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
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
  let disposable = commands.registerCommand("vstatus.helloWorld", async () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    window.showInformationMessage("Hello VS Code!");
  });

  let authenticate = commands.registerCommand("vstatus.auth", async () => {
    try {
      const session = await authentication.getSession("github", ["read:user"], {
        createIfNone: true,
        clearSessionPreference: false,
      });
      console.log("Authenticated, posting to api");
      const res = (
        await api.post("https://localhost:8000/auth", {
          accessToken: session.accessToken,
        })
      ).data;
      console.log(res.accessToken);
      console.log(res.refreshToken);
    } catch (err) {
      console.log(err);
      window.showInformationMessage(
        "Error occured during authentication. Please try again"
      );
    }
  });

  context.subscriptions.push(update, disposable, stopUpdate, authenticate);
}

// this method is called when your extension is deactivated
export function deactivate() {}
