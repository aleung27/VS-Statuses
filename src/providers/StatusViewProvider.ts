import {
  WebviewViewProvider,
  WebviewView,
  WebviewViewResolveContext,
  CancellationToken,
  Uri,
  Webview,
  commands,
} from "vscode";

import Status from "../interfaces/Status";
import getNonce from "../utilities/nonce";
import { baseUrl } from "../utilities/api";
import Util from "../utilities/util";

export default class StatusViewProvider implements WebviewViewProvider {
  public static readonly viewType = "vs-statuses.view";
  public view?: WebviewView; // The viewtype associated with our provider
  private _statuses: Status[] | null; // The latest statuses we have

  constructor(private readonly _extensionUri: Uri) {
    this._statuses = null;
  }

  /**
   * Getter function to retreive the current statuses stored in the Provider
   */
  public get statuses() {
    return this._statuses;
  }

  /**
   * Setter function to set the statuses stored in the Provider. If the webview
   * is also open, we send a message to the webview with the new statuses
   */
  public set statuses(statuses: Status[] | null) {
    this._statuses = statuses;
    this.view?.webview.postMessage({
      command: "update",
      statuses: this._statuses,
    });
  }

  public resolveWebviewView(
    webviewView: WebviewView,
    context: WebviewViewResolveContext,
    token: CancellationToken
  ) {
    // Set the view in the provider to the given WebviewView
    this.view = webviewView;

    // Allow scripts and set local resources to be from the extension root
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    /**
     * Set a listener function such that whenever the visibility of the
     * extension changes we send a message to the webviewView with the
     * current statuses we have stored. Allows the extension to continually
     * update statuses in the background even when the webview is not open
     * so that the latest statuses are propogated as soon as the webview opens
     */
    webviewView.onDidChangeVisibility(
      () => {
        webviewView.webview.postMessage({
          command: "update",
          statuses: this._statuses,
        });
      },
      undefined,
      Util.context.subscriptions
    );

    // this.view.webview.onDidReceiveMessage(
    //   (message) => {
    //     switch (message.command) {
    //       case "auth":
    //         console.log("Trying to authenticate...");
    //         if (!Util.isLoggedIn()) {
    //           commands.executeCommand("vs-statuses.auth");
    //         }
    //         return;
    //     }
    //   },
    //   undefined,
    //   Util.context.subscriptions
    // );

    // Propogate the webview content and post it the statuses we have held right now
    webviewView.webview.html = this.getWebviewHtml(webviewView.webview);
    webviewView.webview.postMessage({
      command: "update",
      statuses: this._statuses,
    });

    // if (!Util.isLoggedIn()) {
    //   webviewView.webview.postMessage({ command: "auth" });
    // }
  }

  /**
   * Returns the template string for our webview
   * @param webview The webview we are getting the html content for
   */
  private getWebviewHtml(webview: Webview) {
    const scriptUri = webview.asWebviewUri(
      Uri.joinPath(this._extensionUri, "media", "main.js")
    );
    const iconsUri = webview.asWebviewUri(
      Uri.joinPath(this._extensionUri, "media", "icons.js")
    );
    const iconsImagesUri = webview.asWebviewUri(
      Uri.joinPath(this._extensionUri, "icons/")
    );

    const mainCssUri = webview.asWebviewUri(
      Uri.joinPath(this._extensionUri, "media", "main.css")
    );

    const codiconsUri = webview.asWebviewUri(
      Uri.joinPath(
        this._extensionUri,
        "node_modules",
        "vscode-codicons",
        "dist",
        "codicon.css"
      )
    );
    const codiconsFontUri = webview.asWebviewUri(
      Uri.joinPath(
        this._extensionUri,
        "node_modules",
        "vscode-codicons",
        "dist",
        "codicon.ttf"
      )
    );

    const momentUri = webview.asWebviewUri(
      Uri.joinPath(this._extensionUri, "node_modules", "moment", "moment.js")
    );

    const nonce = getNonce();

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="icons-uri" content="${iconsImagesUri}">
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} ${codiconsUri}; script-src 'nonce-${nonce}'; img-src https://*.githubusercontent.com ${iconsImagesUri}; font-src ${codiconsFontUri};">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
      <link href="${mainCssUri}" rel="stylesheet" />
      <link href="${codiconsUri}" rel="stylesheet" />

      <script nonce="${nonce}" src="${momentUri}"></script>
      <script nonce="${nonce}" src="${iconsUri}"></script>
    </head>
    <body>
      <div class="main"></div>
      <script nonce="${nonce}" src="${scriptUri}"></script>
    </body>
    </html>`;
  }
}
