var vscode = require('vscode');

function activate(context) {
    var disposable = vscode.commands.registerCommand('cfml-syntax-updates.cfmlCopyDottedPath', async function (uri) {
        if (typeof uri === 'undefined') {
            if (vscode.window.activeTextEditor) {
                uri = vscode.window.activeTextEditor.document.uri;
            }
        }

        if (!uri) {
            vscode.window.showErrorMessage('Cannot copy relative path, as there appears no file is opened (or it is very large');
            return;
        }
        
        var path = vscode.workspace.asRelativePath(uri);
        path = path.replace(/[\\\/]/g, '.').replace(/\.cfc$/, '');
        await vscode.env.clipboard.writeText(path);
    });
    context.subscriptions.push(disposable);
}

exports.activate = activate;

function deactivate() {

}

exports.deactivate = deactivate;