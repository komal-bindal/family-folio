import "./App.css";
import DraggableContainer from "./components/DraggableContainer";
import Canvas from "./pages/canvas";

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative", // Ensure DraggableContainer positions correctly
      }}
    >
      <div style={{ position: "absolute" }}>
        <DraggableContainer>
          <Canvas />
        </DraggableContainer>
      </div>
    </div>
  );
}

export default App;
