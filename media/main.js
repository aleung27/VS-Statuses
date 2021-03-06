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
          // If status hasn't changed since the constructor e.g. startup on ghost mode
          document.querySelector(".main").innerHTML =
            "Nothing to show here (are you on ghost mode?)";
        }
        break;
      }
      case "auth": {
        const main = document.querySelector(".main");
        main.textContent = "";

        main.appendChild(authTemplate());
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

    if (statuses.length) {
      // For each element, generate the html divs and then combine them
      // to make the overall entry for each status
      statuses.sort((a, b) => b.timestamp - a.timestamp);

      for (const status of statuses) {
        const entryDiv = document.createElement("div");
        entryDiv.className = "entry";

        entryDiv.appendChild(createProfile(status));
        entryDiv.appendChild(statusInfo(status));

        div.appendChild(entryDiv);
      }

      // Find the last entry in our list and give it some extra padding
      let children = document.getElementById("main").childNodes;
      let lastNode = children[children.length - 1];

      if (lastNode && lastNode.className === "entry") {
        lastNode.className += " last-entry";
      }
    } else {
      // When the user isn't following anyone
      div.appendChild(noStatusesTemplate());
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
    infoDiv.appendChild(
      usernameTemplate(status.displayName, status.username, status.timestamp)
    );

    // Custom message
    if (status.customMessage) {
      infoDiv.appendChild(customMessageTemplate(status.customMessage));
    }

    // The file name and langugage icon
    if (status.filename) {
      infoDiv.appendChild(
        fileTemplate(status.language, status.filename, iconMap)
      );
    }

    // The workspace folder and icon
    if (status.workspaceName) {
      infoDiv.appendChild(workspaceTemplate(status.workspaceName));
    }

    return infoDiv;
  }

  /**
   * Generates the html elements for the username/displayname and relative time
   * @param {string | null} displayName The display name for the user
   * @param {string} username The Github username for the user
   * @param {number} timestamp The timestamp for the last status
   * @returns {HTMLDivElement} The resultant div element containing the username + timestamp
   */
  function usernameTemplate(displayName, username, timestamp) {
    const nameDiv = document.createElement("div");
    nameDiv.className = "name";
    const nameSpan = document.createElement("span");
    nameSpan.className = "username";

    // Either show the display name and the username if both exist
    // or just show the username
    if (displayName) {
      nameSpan.innerHTML = `${displayName} (@${username})`;
    } else {
      nameSpan.innerHTML = `@${username}`;
    }

    // Set the title and append to div
    nameSpan.setAttribute("title", nameSpan.innerHTML);
    nameDiv.appendChild(nameSpan);

    if (moment().unix() - timestamp <= 90) {
      // We consider under around ~90secs to be still active and typing
      // Render the keyboard symbol instead of a time

      const typingDot = document.createElement("div");
      typingDot.className = "dot-typing";
      nameDiv.appendChild(typingDot);
      nameSpan.style.setProperty("padding-right", "1.5rem");
    } else {
      const timestampSpan = document.createElement("span");
      timestampSpan.className = "timestamp";
      timestampSpan.innerHTML = moment(moment.unix(timestamp)).fromNow(true);
      timestampSpan.setAttribute("title", timestampSpan.innerHTML);
      nameDiv.appendChild(timestampSpan);
    }

    return nameDiv;
  }

  /**
   * Generates the html elements for the custom message section of info
   * @param {string} message The custom status message for a user
   * @returns {HTMLDivElement} The resultant div element containing the custom status message
   */
  function customMessageTemplate(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "custom-status";
    messageDiv.innerHTML = message;
    messageDiv.setAttribute("title", message);

    return messageDiv;
  }

  /**
   * Generates the html elements for the filename + langauge section of info
   * @param {string | null} language The language id associated with the file
   * @param {string} filename The filename associated with the status
   * @param {object} iconMap Object mapping language ids to static language icons
   * @returns {HTMLDivElement} The resultant div element containing the filename + language
   */
  function fileTemplate(language, filename, iconMap) {
    const fileDiv = document.createElement("div");
    fileDiv.className = "file";

    const languageImg = document.createElement("img");
    const fileSpan = document.createElement("span");

    // If a language was detected, display the icon for that
    // otherwise we use a default fallback unknown language image
    if (language && language in iconMap) {
      languageImg.src =
        document.getElementsByName("icons-uri")[0].getAttribute("content") +
        iconMap[language];
      languageImg.setAttribute("title", language);
    } else {
      languageImg.src =
        document.getElementsByName("icons-uri")[0].getAttribute("content") +
        "default_file.svg";
      languageImg.setAttribute("title", language ?? "text");
    }

    // Set the filespan to contain to contain the filename
    fileSpan.innerHTML = filename;
    fileSpan.setAttribute("title", filename);

    // Append the language and file to the overarching div
    fileDiv.appendChild(languageImg);
    fileDiv.appendChild(fileSpan);

    return fileDiv;
  }

  /**
   * Generates the html elements for the workspace portion of the info
   * @param {string} workspace The name of the workspace
   * @returns {HTMLDivElement} The resultant div element containing the workspace
   */
  function workspaceTemplate(workspace) {
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
   * Generates the html elements for the auth button and text
   * @returns {HTMLDivElement} The resultant div element containing the auth button
   */
  function authTemplate() {
    const div = document.createElement("div");
    div.className = "auth";

    const explanationText = document.createElement("div");
    explanationText.className = "auth-text";
    explanationText.innerHTML =
      "This extension requires access to Github to work. Please authenticate to continue.";

    const authButton = document.createElement("button");
    authButton.onclick = () => auth();
    authButton.innerHTML = "Authenticate with Github";

    div.appendChild(explanationText);
    div.appendChild(authButton);

    return div;
  }

  /**
   * Generates the html template for the no statuses message
   * @returns {HTMLDivElement} The resultant div element containing the no statuses infor
   */
  function noStatusesTemplate() {
    const div = document.createElement("div");
    div.className = "no-statuses";

    const p1 = document.createElement("p");
    p1.innerHTML =
      "No statuses to show. Invite your friends to download VS Statuses to see each others activity!";

    const p2 = document.createElement("p");
    p2.innerHTML = "Follow me on Github to see what statuses look like.";

    const a = document.createElement("a");
    a.href = "https://github.com/aleung27";
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = "Follow on Github";
    a.appendChild(button);

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(a);

    return div;
  }

  /**
   * Posts a message back to the extension indicating that the user needs
   * authentication before they are able to use the extension
   */
  function auth() {
    vscode.postMessage({ command: "auth" });
  }
})();
