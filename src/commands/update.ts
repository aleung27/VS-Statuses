import { window, workspace } from "vscode";
import { basename } from "path";
import moment from "moment";

import api from "../utilities/api";
import ActivityInterface from "../interfaces/ActivityInterface";
import Util from "../utilities/util";
import auth from "./auth";
import Status from "../interfaces/Status";
/**
 * Function responsible for POSTing the current activity of the user as well
 * as receiving back an array of objects representing the activity of
 * all friends of the user who have an account. This is returned by the func
 */
const update = async (): Promise<Status[] | null> => {
  console.log("updating");
  // Pull all the data for the current activity
  const activity: ActivityInterface = {
    timestamp: moment().unix(),
    language: window.activeTextEditor
      ? window.activeTextEditor.document.languageId
      : null,
    filename: window.activeTextEditor
      ? basename(window.activeTextEditor.document.fileName)
      : null,
    workspaceName: workspace.workspaceFolders
      ? workspace.workspaceFolders[0].name
      : null,
    customMessage: null, // TODO later
  };

  // If not logged in, return an empty list
  if (!Util.isLoggedIn()) {
    return null;
  }

  try {
    // Send the activity to the API, attaching tokens to the header
    const res = await api.post("/update", activity, {
      headers: {
        "access-token": Util.getAccessToken(),
        "refresh-token": Util.getRefreshToken(),
      },
    });

    // Update tokens if they have been replaced
    if (res.headers["access-token"] && res.headers["refresh-token"]) {
      await Util.context.globalState.update(
        "accessToken",
        res.headers["access-token"]
      );
      await Util.context.globalState.update(
        "refreshToken",
        res.headers["refresh-token"]
      );
    }

    return res.data;
  } catch (err) {
    console.log(err);
  }

  return null;
};

export default update;
