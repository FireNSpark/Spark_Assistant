// 8 - GitHub File Selector // Adds a UI input to select and fetch any file from GitHub repo

const githubSelector = { initUI() { const container = document.getElementById("selector-container") || this.createSelectorContainer(); container.innerHTML = <input id="filePath" type="text" placeholder="Enter path like index.html or memery/memery.js" style="width:300px;padding:5px;"> <button onclick="githubSelector.loadFile()">Load File</button>; },

loadFile() { const path = document.getElementById("filePath").value.trim(); if (!path) return alert("Enter a file path."); const url = https://raw.githubusercontent.com/FireNSpark/Spark_Assistant/main/${path}; githubEditor.fetchFile(url); },

createSelectorContainer() { const container = document.createElement("div"); container.id = "selector-container"; container.style.marginBottom = "20px"; document.body.insertBefore(container, document.body.firstChild); return container; } };

githubSelector.initUI();

