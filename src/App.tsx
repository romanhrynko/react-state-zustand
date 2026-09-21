import { RenderBadge } from "./components/RenderBadge";
import { useRenderCount } from "./hooks/useRenderCount";

function App() {
  const renders = useRenderCount();

  return (
    <div className="app" data-theme="light" data-density="cozy">
      <header style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>Sprint Board</h1>
        <RenderBadge label="App" count={renders} />
      </header>
    </div>
  );
}

export default App;
