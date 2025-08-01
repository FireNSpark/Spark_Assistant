// 7 - GitHub Fetch + Edit // Fetches GitHub files by URL or path and allows live editing in Spark

const githubEditor = { loadedFiles: {},

async fetchFile(rawUrl) { try { const res = await fetch(rawUrl); if (!res.ok) throw new Error(HTTP ${res.status}); const text = await res.text(); const filename = rawUrl.split("/").pop(); this.loadedFiles[filename] = text; this.renderEditor(filename); } catch (err) { console.error("Fetch failed:", err); alert("Failed to fetch GitHub file: " + err.message); } },

renderEditor(filename) { const container = document.getElementById("editor-container") || this.createEditorContainer(); container.innerHTML = <h3>${filename}</h3> <textarea id="editor" style="width:100%;height:400px;">${this.escapeHTML(this.loadedFiles[filename])}</textarea> <button onclick="githubEditor.saveEdits('${filename}')">Save</button>; },

saveEdits(filename) { const editedText = document.getElementById("editor").value; this.loadedFiles[filename] = editedText; alert(Saved changes to ${filename} locally. Push to GitHub manually if needed.); },

escapeHTML(str) { return str.replace(/&/g, "&") .replace(/</g, "<") .replace(/>/g, ">"); },

createEditorContainer() { const container = document.createElement("div"); container.id = "editor-container"; document.body.appendChild(container); return container; } };

// Example usage (manually call): // githubEditor.fetchFile("https://raw.githubusercontent.com/YourUser/YourRepo/main/index.html");

