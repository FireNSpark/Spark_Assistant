import base64
import requests

# Spark GitHub push details
token = "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"
owner = "FireNSpark"
repo = "Spark_Assistant"
branch = "main"
path = "spark-core/githubCore.js"
message = "Add Spark GitHub Core Structure"

# The content from the canvas
file_content = """
// Spark GitHub Core Structure
// Defines how Spark manages and edits its own GitHub file system

const sparkHub = {
  token: "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",
  owner: "FireNSpark",
  repo: "Spark_Assistant",
  branch: "main",

  async listFiles(path = "") {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`;
    const res = await fetch(url, {
      headers: { Authorization: `token ${this.token}` }
    });
    return res.ok ? await res.json() : [];
  },

  async getFile(path) {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`;
    const res = await fetch(url, {
      headers: { Authorization: `token ${this.token}` }
    });
    const data = await res.json();
    return {
      content: atob(data.content || ""),
      sha: data.sha || null
    };
  },

  async updateFile(path, newContent, message = "Spark auto-update") {
    const current = await this.getFile(path);
    const payload = {
      message,
      content: btoa(unescape(encodeURIComponent(newContent))),
      branch: this.branch,
      sha: current.sha
    };
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `token ${this.token}`,
        Accept: "application/vnd.github.v3+json"
      },
      body: JSON.stringify(payload)
    });
    return res.ok;
  },

  async createOrUpdate(path, content, message = "Spark write") {
    try {
      return await this.updateFile(path, content, message);
    } catch (err) {
      console.error("GitHub update error:", err);
      return false;
    }
  }
};
"""

# Encode file for GitHub
encoded_content = base64.b64encode(file_content.encode("utf-8")).decode("utf-8")

# Check if file already exists to fetch SHA
get_url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"
headers = {
    "Authorization": f"token {token}",
    "Accept": "application/vnd.github.v3+json"
}
get_res = requests.get(get_url, headers=headers)
sha = get_res.json().get("sha") if get_res.ok else None

# Prepare payload
put_url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"
payload = {
    "message": message,
    "content": encoded_content,
    "branch": branch
}
if sha:
    payload["sha"] = sha

# Upload file
put_res = requests.put(put_url, headers=headers, json=payload)
put_res.ok, put_res.status_code, put_res.json() if not put_res.ok else "✅ File pushed to GitHub"
