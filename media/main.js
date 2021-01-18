// @ts-check
// This script will be run within the webview itself

// It cannot access the main VS Code APIs directly.
(function () {
  console.log("running...");
  const vscode = acquireVsCodeApi();

  // Update the locale for custom display of relative time
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

  // Get the last stauses we had stored in memory
  const oldState = vscode.getState() || { statuses: [] };
  let statuses = oldState.statuses;

  // Handle messages sent from the extension to the webview
  window.addEventListener("message", (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.command) {
      case "update": {
        /**
         * The update command represents when the webview receives a message
         * from the extension containing a list of new statuss (or nothing
         * if getting the new statuses failed)
         */
        if (message.statuses.length) {
          // Update the status with the latest one we got
          updateStatuses(message.statuses);
        } else {
          // Use the last stored status that we have
          updateStatuses(statuses);
        }
        break;
      }
      // case "auth": {
      //   const main = document.querySelector(".main");
      //   main.textContent = "";

      //   const authButton = document.createElement("button");
      //   authButton.onclick = () => auth();
      //   authButton.className = "auth";
      //   authButton.innerHTML = "Authenticate with Github";
      //   main.appendChild(authButton);
      //   break;
      // }
    }
  });

  // When first opening the webview we want to propogate it
  if (statuses.length) {
    updateStatuses(statuses);
  }

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
    nameSpan.className = "username";

    if (status.displayName) {
      nameSpan.innerHTML = `${status.displayName}(${status.username})`;
    } else {
      nameSpan.innerHTML = `@${status.username}`;
    }

    nameSpan.setAttribute("title", nameSpan.innerHTML);
    nameDiv.appendChild(nameSpan);

    if (moment().unix() - status.timestamp <= 90) {
      // We consider under around ~90secs to be still active and typing
      // Render the keyboard symbol instead of a time

      const typingDot = document.createElement("div");
      typingDot.className = "dot-typing";
      nameDiv.appendChild(typingDot);
    } else {
      const timestamp = document.createElement("span");
      timestamp.className = "timestamp";
      timestamp.innerHTML = moment(moment.unix(status.timestamp)).fromNow(true);
      nameDiv.appendChild(timestamp);
    }

    infoDiv.appendChild(nameDiv);

    // Custom message
    if (status.customMessage) {
      const customStatusDiv = document.createElement("div");
      customStatusDiv.className = "custom-status";
      customStatusDiv.innerHTML = status.customMessage;
      customStatusDiv.setAttribute("title", status.customMessage);

      infoDiv.appendChild(customStatusDiv);
    }

    // The file name and langugage icon
    if (status.filename) {
      const fileDiv = document.createElement("div");
      fileDiv.className = "file";

      const languageImg = document.createElement("img");
      const fileSpan = document.createElement("span");

      // If a language was detected, display the icon for that
      // otherwise we use a default fallback unknown language image
      // TODO: link icons to language identifiers
      if (status.language && status.language in iconMap) {
        languageImg.src =
          document.getElementsByName("icons-uri")[0].getAttribute("content") +
          iconMap[status.language];
        languageImg.setAttribute("title", status.language);
      } else {
        languageImg.src =
          document.getElementsByName("icons-uri")[0].getAttribute("content") +
          "default_file.svg";
        languageImg.setAttribute("title", status.language ?? "text");
      }

      fileSpan.innerHTML = status.filename;
      fileSpan.setAttribute("title", status.filename);
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
      workspaceSpan.setAttribute("title", status.workspaceName);

      // Append the <i> and the <span> to the workspace <div> before appending
      // to the info <div> as a whole
      workspaceDiv.appendChild(folderImg);
      workspaceDiv.appendChild(workspaceSpan);
      infoDiv.appendChild(workspaceDiv);
    }

    return infoDiv;
  }

  function auth() {
    vscode.postMessage({ command: "auth" });
  }
})();
