import { window, authentication } from "vscode";
import Util from "../utilities/util";
import api from "../utilities/api";

const auth = async () => {
  try {
    const session = await authentication.getSession("github", ["read:user"], {
      createIfNone: true,
      clearSessionPreference: false,
    });
    const res = (
      await api.post("https://localhost:8000/auth", {
        accessToken: session.accessToken,
      })
    ).data;

    await Util.context.globalState.update("accessToken", res.accessToken);
    await Util.context.globalState.update("refreshToken", res.refreshToken);
  } catch (err) {
    window.showInformationMessage(
      "Error occured during authentication. Please try again."
    );
  }
};

export default auth;
