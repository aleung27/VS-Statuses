import { ExtensionContext } from "vscode";

/**
 * Utility class storing the global state for our extension.
 */
export default class Util {
  static context: ExtensionContext;

  /**
   * Gets the access token stored in the global state or an empty string
   */
  static getAccessToken() {
    return this.context.globalState.get<string>("accessToken", "");
  }

  /**
   * Gets the refresh token stored in the global state or an empty string
   */
  static getRefreshToken() {
    return this.context.globalState.get<string>("refreshToken", "");
  }

  /**
   * If the user has tokens registered in the global state they are logged in
   */
  static isLoggedIn() {
    return (
      !!this.context.globalState.get("accessToken") &&
      !!this.context.globalState.get("refreshToken")
    );
  }
}
