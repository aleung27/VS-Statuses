import { ConfigurationTarget, workspace } from "vscode";

/**
 * Enum for the possible setting options
 */
enum Setting {
  workspace = "hideWorkspaceName",
  filename = "hideFileAndLanguageName",
  ghost = "ghostMode",
}

/**
 * Toggles a setting in the highest changed scope for the vscode extension.
 * This is language choice independent and will not alter the settings for
 * specific language ids.
 * Heirarchy: WorkspaceFolder > Workspace > Global
 * @param choice The setting to toggle as defined in the enum
 * @param toOn Whether we are toggling to On or not
 */
const toggleSetting = async (choice: string, toOn: boolean) => {
  const configOptions = workspace.getConfiguration("vs-statuses");
  const currVal = configOptions.get<boolean>(choice);
  const configList = configOptions.inspect<boolean>(choice);
  let target: ConfigurationTarget;

  // Check that it actually needs toggling
  if (configList === undefined || currVal === undefined || currVal === toOn) {
    return;
  }

  // Decide the target we need to change. The highest priority
  // target that has been modified before is the one that is changed
  if (configList.workspaceFolderValue === !toOn) {
    target = ConfigurationTarget.WorkspaceFolder;
  } else if (configList.workspaceValue === !toOn) {
    target = ConfigurationTarget.Workspace;
  } else {
    target = ConfigurationTarget.Global;
  }

  try {
    await configOptions.update(choice, toOn, target);
  } catch (err) {
    console.log(err);
  }
};

export { Setting, toggleSetting };
