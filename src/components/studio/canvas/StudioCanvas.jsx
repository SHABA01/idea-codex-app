import "../../../styles/StudioCanvas.css";

export default function StudioCanvas({ blocks }) {
  return (
    <section className="studio-canvas">
      {blocks.length === 0 && (
        <div className="canvas-empty">
          Start by launching a tool
        </div>
      )}

      {blocks.map((b) => (
        <article key={b.id} className="canvas-block">
          <h4>{b.title}</h4>
          <pre>{b.content}</pre>
        </article>
      ))}
    </section>
  );
}
