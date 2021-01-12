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
    const ul = document.querySelector(".main");
    ul.textContent = "";

    for (const status of statuses) {
      // List element for each status we want to create
      const li = document.createElement("li");
      li.className = "entry";

      // Main div for the li containing the staus info
      const div = document.createElement("div");
      div.className = "status";

      div.appendChild(createProfile(status));
      div.appendChild(statusInfo(status));

      // Append the div to the li and then the li to the ul
      li.appendChild(div);
      ul.appendChild(li);
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

    // The name and time stamp
    const nameDiv = document.createElement("div");
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
      customStatusDiv.innerHTML = status.customMessage;

      infoDiv.appendChild(customStatusDiv);
    }

    // The file name and langugage icon
    if (status.filename) {
      const fileDiv = document.createElement("div");
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
      const folderImg = document.createElement("img");
      const workspaceSpan = document.createElement("span");

      // TODO: add real folder icon
      workspaceSpan.innerHTML = status.workspaceName;
      folderImg.src = status.profilePicUrl;

      workspaceDiv.appendChild(folderImg);
      workspaceDiv.appendChild(workspaceSpan);
      infoDiv.appendChild(workspaceDiv);
    }

    return infoDiv;
  }
})();
