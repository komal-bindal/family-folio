import React from "react";

function Card() {
  return (
    <div
      class="card"
      style={{
        height: "200px",
        width: "200px",
        backgroundColor: "green",
        transform: "rotate(270deg)",
      }}
    >
      <div class="card-body">
        <div class="card-title">Node Text</div>
        <p class="card-text" id="nodeText"></p>
      </div>
    </div>
  );
}

export default Card;
