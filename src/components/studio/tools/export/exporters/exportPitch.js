export function exportToPitch(project) {
  if (!project?.blocks?.length) return;

  const pitch = {
    title: project.title || "Pitch Deck",
    slides: []
  };

  project.blocks.forEach((block) => {
    pitch.slides.push({
      slideTitle: block.title,
      content:
        typeof block.content === "string"
          ? block.content
          : JSON.stringify(block.content, null, 2)
    });
  });

  downloadFile(
    JSON.stringify(pitch, null, 2),
    `${project.title || "pitch"}.json`,
    "application/json"
  );
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
