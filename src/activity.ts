import { Disposable, window, workspace } from "vscode";
import { basename } from "path";
import { Status } from "./structures";

/**
 * Class representing the activity for a user
 */
export default class Activity implements Disposable {
  // Status for the activity
  private _status: Status | null = null;

  public constructor() {
    this._status = null;
  }

  public get status() {
    return this._status;
  }

  /**
   * Populates the status for the Activity based upon the current
   * open instance of vscode
   */
  public populateActivity() {
    let timestamp: number = Date.now();
    let language: string | null = null;
    let fileName: string | null = null;
    let workspaceName: string | null = null;
    let customStatus: string | null = null;

    if (window.activeTextEditor) {
      language = window.activeTextEditor.document.languageId;
      fileName = basename(window.activeTextEditor.document.fileName);
    }

    if (workspace.workspaceFolders) {
      workspaceName = workspace.workspaceFolders[0].name;
    }

    // TODO: Implement custom status messages later...
    customStatus = "Put your own custom status here!";

    this._status = {
      timestamp,
      language,
      fileName,
      workspaceName,
      customStatus,
    };
  }

  public dispose() {
    this._status = null;
  }
}
