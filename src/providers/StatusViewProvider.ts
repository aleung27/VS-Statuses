import {
  WebviewViewProvider,
  WebviewView,
  WebviewViewResolveContext,
  CancellationToken,
  Uri,
} from "vscode";

import Status from "../interfaces/Status";
import getNonce from "../utilities/nonce";
import { baseUrl } from "../utilities/api";

export default class StatusViewProvider implements WebviewViewProvider {
  public static readonly viewType = "vs-statuses.view";
  private _view?: WebviewView;
  private _statuses: Status[];

  constructor(private readonly _extensionUri: Uri) {
    this._statuses = [];
  }

  public updateStatuses(newStatuses: Status[]) {
    this._statuses = newStatuses;
  }

  public resolveWebviewView(
    webviewView: WebviewView,
    context: WebviewViewResolveContext,
    token: CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    const nonce = getNonce();

    webviewView.webview.html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <!--
        Use a content security policy to only allow loading images from https or from our extension directory,
        and only allow scripts that have a specific nonce.
      -->
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${baseUrl}; script-src 'nonce-${nonce}';">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
      <title>Cat Colors</title>
    </head>
    <body>
      Welcome to the view
      <div class="main"/>
    </body>
    <script nonce="${nonce}">
      console.log("here");
      let parent = document.querySelector(".main");
      let el = document.createElement("div");
      el.innerHTML += "New Div";
      parent.appendChild(el);
    </script>
    </html>`;
  }
}
