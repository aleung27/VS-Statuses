// @ts-check
// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
  console.log("running...");
  const vscode = acquireVsCodeApi();

  moment.updateLocale("en", {
    relativeTime: {
      s: "%ss",
      ss: "%ss",
      m: "%dm",
      mm: "%dm",
      h: "%dh",
      hh: "%dh",
      d: "%dd",
      dd: "%dd",
      w: "%dw",
      ww: "%dw",
      M: "%dmo",
      MM: "%dmo",
      y: "%dy",
      yy: "%dy",
    },
  });

  const oldState = vscode.getState() || { statuses: [] };

  /** @type {Array<{ value: string }>} */
  let statuses = oldState.statuses;

  updateStatuses(statuses);

  // Handle messages sent from the extension to the webview
  window.addEventListener("message", (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.command) {
      case "update": {
        console.log("updating...");
        updateStatuses(message.statuses);
        break;
      }
    }
  });

  /**
   * @param {Array<{ value: string }>} statuses
   */
  function updateStatuses(statuses) {
    const div = document.querySelector(".main");
    div.textContent = "";

    for (const status of statuses) {
      // List element for each status we want to create
      const entryDiv = document.createElement("div");
      entryDiv.className = "entry";

      entryDiv.appendChild(createProfile(status));
      entryDiv.appendChild(statusInfo(status));

      // Append the div to the main div
      div.appendChild(entryDiv);
    }

    // Update the saved state
    vscode.setState({ statuses: statuses });
  }

  function createProfile(status) {
    const profileDiv = document.createElement("div");
    const img = document.createElement("img");

    profileDiv.className = "profile";
    img.className = "profile-img";
    img.src = status.profilePicUrl;
    img.alt = "Profile Picture";

    profileDiv.appendChild(img);
    return profileDiv;
  }

  function statusInfo(status) {
    const infoDiv = document.createElement("div");
    infoDiv.className = "info";

    // The name and time stamp
    const nameDiv = document.createElement("div");
    nameDiv.className = "name";
    const nameSpan = document.createElement("span");
    const timestamp = document.createElement("span");

    if (status.displayName) {
      nameSpan.innerHTML = status.displayName;
    } else {
      nameSpan.innerHTML = status.username;
    }

    timestamp.innerHTML = moment(moment.unix(status.timestamp)).fromNow(true);
    nameDiv.appendChild(nameSpan);
    nameDiv.appendChild(timestamp);
    infoDiv.appendChild(nameDiv);

    // Custom message
    if (status.customMessage) {
      const customStatusDiv = document.createElement("div");
      customStatusDiv.className = "custom-status";
      customStatusDiv.innerHTML = status.customMessage;

      infoDiv.appendChild(customStatusDiv);
    }

    // The file name and langugage icon
    if (status.filename) {
      const fileDiv = document.createElement("div");
      fileDiv.className = "file";
      const languageImg = document.createElement("img");
      const fileSpan = document.createElement("span");

      if (status.language) {
        // Fallback pic should eb code-runner-output
        // TODO: link icons to language identifiers
        languageImg.src = status.profilePicUrl;
      } else {
        languageImg.src = status.profilePicUrl;
      }

      fileSpan.innerHTML = status.filename;
      fileDiv.appendChild(languageImg);
      fileDiv.appendChild(fileSpan);

      infoDiv.appendChild(fileDiv);
    }

    // The workspace folder and icon
    if (status.workspaceName) {
      const workspaceDiv = document.createElement("div");
      workspaceDiv.className = "workspace";
      const folderImg = document.createElement("i");
      folderImg.className = "codicon codicon-folder";
      const workspaceSpan = document.createElement("span");
      workspaceSpan.innerHTML = status.workspaceName;

      workspaceDiv.appendChild(folderImg);
      workspaceDiv.appendChild(workspaceSpan);
      infoDiv.appendChild(workspaceDiv);
    }

    return infoDiv;
  }
})();
