import { workspace } from "vscode";

/**
 * Enum for the possible setting options
 */
enum Setting {
  workspace = "hideWorkspaceName",
  filename = "hideFileAndLanguageName",
  ghost = "ghostMode",
}

/**
 * Toggles a setting in the **global** scope for the vscode extension
 * @param choice The setting to toggle as defined in the enum
 * @param toOn Whether we are toggling to On or not
 */
//TODO: precedence and heirarchy for workspaceFodler > workspace > global
const toggleSetting = async (choice: string, toOn: boolean) => {
  const configOptions = workspace.getConfiguration("vs-statuses");
  const currVal = configOptions.get<boolean>(choice);

  // Check that it actually needs toggling
  if (currVal === toOn) {
    return;
  }

  try {
    await configOptions.update(choice, toOn, true);
  } catch (err) {
    console.log(err);
  }
};

export { Setting, toggleSetting };
