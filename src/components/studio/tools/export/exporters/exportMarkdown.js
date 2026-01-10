export function exportToMarkdown(project) {
  if (!project?.blocks?.length) return;

  let md = `# ${project.title || "IdeaCodex Project"}\n\n`;

  project.blocks.forEach((block) => {
    md += `## ${block.title}\n\n`;

    if (typeof block.content === "string") {
      md += `${block.content}\n\n`;
    } else {
      md += "```\n";
      md += JSON.stringify(block.content, null, 2);
      md += "\n```\n\n";
    }
  });

  downloadFile(md, `${project.title || "project"}.md`, "text/markdown");
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
