import { ExtensionContext } from "vscode";

export default class Util {
  static context: ExtensionContext;

  static getAccessToken() {
    return this.context.globalState.get<string>("accessToken", "");
  }

  static getRefreshToken() {
    return this.context.globalState.get<string>("refreshToken", "");
  }

  static isLoggedIn() {
    return (
      !!this.context.globalState.get("accessToken") &&
      !!this.context.globalState.get("refreshToken")
    );
  }
}
