import { Disposable, window, workspace } from "vscode";
import Activity from "./activity";
import { Status } from "./structures";

export default class ActiveUser implements Disposable {
  private _activity: Activity | null = null;

  public constructor() {
    this._activity = new Activity();
  }

  public get activity() {
    return this._activity;
  }

  public populateActivity() {
    this._activity?.populateActivity();
  }

  public dispose() {
    this._activity = null;
  }
}
