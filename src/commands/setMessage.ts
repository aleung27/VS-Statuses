import { window } from "vscode";
import Util from "../utilities/util";

const setMessage = async () => {
  const input = await window.showInputBox({
    placeHolder: "Type a message here for it to show in your status.",
    prompt: "Enter your new status message.",
    value: Util.getCustomMessage() ?? undefined,
    validateInput: (s: string) =>
      s.length < Math.pow(2, 16) - 1 ? null : "Please enter a shorter message",
  });

  if (input) {
    Util.context.globalState.update("customMessage", input);
    await window.showInformationMessage("Status message set!");
  }
};

export default setMessage;
