function openGitEditor() {
  const repo = prompt("GitHub repo:", "FireNSpark/Spark_Assistant");
  const path = prompt("File path:", "memery/memery.js");
  const token = prompt("Paste GitHub token:");

  fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    headers: { Authorization: `token ${token}` }
  })
    .then(r => r.json())
    .then(data => {
      const original = atob(data.content);
      const updated = prompt("Edit file:", original);
      if (updated === null) return;
      return fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: "Commit from Spark",
          content: btoa(updated),
          sha: data.sha
        })
      });
    })
    .then(res => {
      if (res?.ok) alert("✅ Commit successful!");
      else alert("❌ Commit failed.");
    });
}
