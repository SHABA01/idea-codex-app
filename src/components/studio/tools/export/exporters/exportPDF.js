export function exportToPDF(project) {
  if (!project?.blocks?.length) return;

  const html = `
    <html>
      <head>
        <title>${project.title || "IdeaCodex Export"}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { border-bottom: 2px solid #ccc; }
          h2 { margin-top: 24px; }
          pre { background: #f5f5f5; padding: 12px; }
        </style>
      </head>
      <body>
        <h1>${project.title || "IdeaCodex Project"}</h1>
        ${project.blocks
          .map(
            (b) => `
          <h2>${b.title}</h2>
          <pre>${formatContent(b.content)}</pre>
        `
          )
          .join("")}
      </body>
    </html>
  `;

  const win = window.open("", "_blank");
  win.document.write(html);
  win.document.close();

  win.focus();
  win.print();
}

function formatContent(content) {
  if (typeof content === "string") return content;
  return JSON.stringify(content, null, 2);
}
