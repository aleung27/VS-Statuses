import { Disposable, window, workspace } from "vscode";
import { Status } from "./structures";

export default class ActiveUser implements Disposable {
  private _status: Status | null = null;

  public get status() {
    return this._status;
  }

  public getLanguage() {
    if (window.activeTextEditor) {
      return window.activeTextEditor.document.languageId;
    }

    return null;
  }

  public dispose() {
    this._status = null;
  }
}
