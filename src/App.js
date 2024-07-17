import "./App.css";
import DraggableContainer from "./components/DraggableContainer";
import { NaryTree } from "./model/treeNode";
import Canvas from "./pages/canvas";

function App() {
  const tree = NaryTree("1");

  tree.addNode("1", "2");
  tree.addNode("1", "3");
  tree.addNode("1", "4");
  tree.addNode("1", "5");
  tree.addNode("2", "6");
  tree.addNode("2", "7");
  tree.addNode("2", "8");
  tree.addNode("3", "9");
  tree.addNode("3", "10");
  tree.addNode("3", "11");
  tree.addNode("5", "12");
  tree.addNode("5", "13");
  tree.addNode("5", "14");
  tree.addNode("5", "15");
  tree.addNode("5", "16");
  tree.addNode("16", "17");
  tree.addNode("16", "18");
  tree.addNode("16", "19");
  tree.addNode("16", "20");

  // tree.addNode("Enos", "A");
  // tree.addNode("Enos", "B");
  // tree.addNode("Awan", "AwancHILD");
  // tree.addNode("AwancHILD", "AwancHILDChi1");
  // tree.addNode("AwancHILD", "AwancHILDChi2");
  // tree.addNode("AwancHILD", "AwancHILDChi3");
  // tree.addNode("Awan", "AwancHILD1");
  // tree.addNode("Awan", "AwancHILD2");
  // tree.addNode("Seth", "Azura");

  // Breadth-first traversal
  const bfsResult = tree.breadthFirstTraversal();
  console.log("Breadth-first traversal:", bfsResult);

  const data = tree.getParentChildData();
  console.log("Child Parent Data:", data);
  const maxHeight = tree.maxHeight();
  console.log("height:", maxHeight);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative", // Ensure DraggableContainer positions correctly
      }}
    >
      {/* <div
          style={{
            backgroundColor: "red",
            width: "200px",
            height: "100%",
          }}
        ></div> */}
      <div style={{ position: "absolute" }}>
        <DraggableContainer>
          <Canvas data={data} maxHeight={maxHeight} />
        </DraggableContainer>
      </div>
    </div>
  );
}

export default App;
