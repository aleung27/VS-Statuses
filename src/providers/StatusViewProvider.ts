import {
  WebviewViewProvider,
  WebviewView,
  WebviewViewResolveContext,
  CancellationToken,
  Uri,
  Webview,
} from "vscode";

import Status from "../interfaces/Status";
import getNonce from "../utilities/nonce";
import { baseUrl } from "../utilities/api";

export default class StatusViewProvider implements WebviewViewProvider {
  public static readonly viewType = "vs-statuses.view";
  public view?: WebviewView;

  constructor(private readonly _extensionUri: Uri) {}

  public resolveWebviewView(
    webviewView: WebviewView,
    context: WebviewViewResolveContext,
    token: CancellationToken
  ) {
    this.view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this.getWebviewHtml(webviewView.webview);
  }

  private getWebviewHtml(webview: Webview) {
    const scriptUri = webview.asWebviewUri(
      Uri.joinPath(this._extensionUri, "media", "main.js")
    );
    const momentUri = webview.asWebviewUri(
      Uri.joinPath(this._extensionUri, "node_modules", "moment", "moment.js")
    );

    const nonce = getNonce();

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}'; img-src https: *.githubusercontent.com;">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script nonce="${nonce}" src="${momentUri}"></script>
    </head>
    <body>
      <ul class="main"></ul>
      <script nonce="${nonce}" src="${scriptUri}"></script>
    </body>
    </html>`;
  }
}
