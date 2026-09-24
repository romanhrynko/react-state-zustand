import { RenderBadge } from "./components/RenderBadge";
import { TaskList } from "./components/TaskList";
import { useRenderCount } from "./hooks/useRenderCount";

function App() {
  const renders = useRenderCount();

  return (
    <div className="app" data-theme="light" data-density="cozy">
      <div className="shell">
        <header className="app-header">
          <h1>Sprint Board</h1>
          <RenderBadge label="App" count={renders} />
        </header>

        <TaskList />
      </div>
    </div>
  );
}

export default App;
