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
        if (message.statuses) {
          // Update the status with the latest one we got
          updateStatuses(message.statuses);
        } else {
          // Use the last stored status that we have
          // TODO: what happens if its null (error out, not logged in etc.)
          console.log("todo...");
        }
        break;
      }
      case "auth": {
        const main = document.querySelector(".main");
        main.textContent = "";

        const authButton = document.createElement("button");
        authButton.onclick = () => auth();
        authButton.className = "auth";
        authButton.innerHTML = "Authenticate with Github";
        main.appendChild(authButton);
        break;
      }
    }
  });

  /**
   * Generates the HTML for each of the statuses associated with the users.
   * Each status contains a profile pic as well as the information on their
   * activity rendered in the webview
   * @param {Array<any>} statuses The array of statuses we want to render
   */
  function updateStatuses(statuses) {
    // Clear the main content
    const div = document.querySelector(".main");
    div.textContent = "";

    // For each element, generate the html divs and then combine them
    // to make the overall entry for each status
    for (const status of statuses) {
      const entryDiv = document.createElement("div");
      entryDiv.className = "entry";

      entryDiv.appendChild(createProfile(status));
      entryDiv.appendChild(statusInfo(status));

      div.appendChild(entryDiv);
    }
  }

  /**
   * Generates the profile pic for the user associated with the status
   * @param {any} status The status of a user we want to render in thwe webview
   * @return {HTMLDivElement} The resultant div element containing the profile
   *
   */
  function createProfile(status) {
    const profileDiv = document.createElement("div");
    profileDiv.className = "profile";

    // Create the image for the profile picture
    const img = document.createElement("img");
    img.className = "profile-img";
    img.src = status.profilePicUrl;
    img.alt = "Profile Picture";

    // Attach the image to the div and return the profile
    profileDiv.appendChild(img);
    return profileDiv;
  }

  /**
   * Generates the div containing all the information for a status.
   * This includes:
   * - Username/Displayname with relative time difference
   * - Custom status message from user
   * - File name along with language id's corresponding symbol
   * - Folder name along with folder codicon
   * @param {*} status The status we want to render a div for
   * @return {HTMLDivElement} The resultant div element containing the info
   */
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
      infoDiv.appendChild(getWorkspace(status.workspaceName));
    }

    return infoDiv;
  }

  /**
   * @param {string} workspace The name of the workspace
   * @return {HTMLDivElement} The resultant div element containing the workspace
   */
  function getWorkspace(workspace) {
    const workspaceDiv = document.createElement("div");
    workspaceDiv.className = "workspace";

    // Folder icon
    const folderImg = document.createElement("i");
    folderImg.className = "codicon codicon-folder";

    // Span with workspace name
    const workspaceSpan = document.createElement("span");
    workspaceSpan.innerHTML = workspace;
    workspaceSpan.setAttribute("title", workspace);

    // Append the <i> and the <span> to the workspace <div> before appending
    // to the info <div> as a whole
    workspaceDiv.appendChild(folderImg);
    workspaceDiv.appendChild(workspaceSpan);

    return workspaceDiv;
  }

  /**
   * Posts a message back to the extension indicating that the user needs
   * authentication before they are able to use the extension
   */
  function auth() {
    vscode.postMessage({ command: "auth" });
  }
})();
