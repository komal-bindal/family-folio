import React, { useRef, useState, useEffect } from "react";
import "./DraggableContainer.css"; // Define your CSS for styling here

const DraggableContainer = ({ children }) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [scale, setScale] = useState(1);
  const [lastScale, setLastScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;

    const handlePinchStart = (event) => {
      setLastScale(scale);
    };

    const handlePinchMove = (event) => {
      const newScale = Math.max(0.1, Math.min(lastScale * event.scale, 2));
      setScale(newScale);
      container.style.transform = `translate(${translateX}px, ${translateY}px) scale(${newScale})`;
    };

    container.addEventListener("touchstart", handlePinchStart);
    container.addEventListener("touchmove", handlePinchMove);

    return () => {
      container.removeEventListener("touchstart", handlePinchStart);
      container.removeEventListener("touchmove", handlePinchMove);
    };
  }, [scale, lastScale, translateX, translateY]);

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
    setStartX(event.pageX);
    setStartY(event.pageY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const deltaX = event.pageX - startX;
    const deltaY = event.pageY - startY;
    setTranslateX((prevTranslateX) => prevTranslateX + deltaX);
    setTranslateY((prevTranslateY) => prevTranslateY + deltaY);
    setStartX(event.pageX);
    setStartY(event.pageY);
    containerRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  };

  return (
    <div
      className="draggable-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        overflow: "hidden", // Ensure no scroll bars are shown
        touchAction: "none", // Disable browser touch gestures
      }}
    >
      {/* Your content goes here */}
      {/* <div className="content"> */}
      {/* Example content to overflow horizontally */}
      {/* <div className="family-tree"> */}
      {/* Your family tree components */}
      {/* <div className="person">Person 1</div>
          <div className="person">Person 2</div>
          <div className="person">Person 3</div> */}
      {/* Add more family members as needed */}
      {/* </div> */}
      {/* </div> */}

      {children}
    </div>
  );
};

export default DraggableContainer;
