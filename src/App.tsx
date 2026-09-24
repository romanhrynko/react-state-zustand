import { AddTaskForm } from "./components/AddTaskForm";
import { AppearanceEffect } from "./components/AppearanceEffect";
import { RenderBadge } from "./components/RenderBadge";
import { SettingsBar } from "./components/SettingsBar";
import { StatsPanel } from "./components/StatsPanel";
import { TaskList } from "./components/TaskList";
import { Toolbar } from "./components/Toolbar";
import { useRenderCount } from "./hooks/useRenderCount";

function App() {
  const renders = useRenderCount();

  return (
    <div className="app">
      <AppearanceEffect />

      <div className="shell">
        <header className="app-header">
          <h1>Sprint Board</h1>
          <RenderBadge label="App" count={renders} />
        </header>

        <SettingsBar />
        <AddTaskForm />
        <Toolbar />
        <StatsPanel />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
