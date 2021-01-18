import { window, authentication } from "vscode";
import Util from "../utilities/util";
import api from "../utilities/api";

/**
 * Function responsible for the authentication procedure for logging into
 * the extension. Currently uses vscode's internal authentication method for
 * Github. Access token to Github are then POSTed to our API for registration
 */
const auth = async () => {
  try {
    const session = await authentication.getSession("github", ["read:user"], {
      createIfNone: true,
      clearSessionPreference: false,
    });
    const res = (
      await api.post("/auth", {
        accessToken: session.accessToken,
      })
    ).data;

    // Update the global state according to returned data
    await Util.context.globalState.update("accessToken", res.accessToken);
    await Util.context.globalState.update("refreshToken", res.refreshToken);
  } catch (err) {
    console.log(err);
    await Util.context.globalState.update("accessToken", "");
    await Util.context.globalState.update("refreshToken", "");

    window.showInformationMessage(
      "Error occured during authentication. Please try again."
    );
  }
};

export default auth;
