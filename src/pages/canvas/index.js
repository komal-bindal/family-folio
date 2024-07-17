import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Card from "../../components/Card";
import ReactDOMServer from "react-dom/server";

const Canvas = ({ data, maxHeight }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Calculate dimensions based on tree structure
    const treeHeight = data.length * 200;
    const treeWidth = maxHeight * 300 + 200;

    svg.selectAll("*").remove(); // Clear previous content

    try {
      const stratify = d3
        .stratify()
        .id((d) => d.name)
        .parentId((d) => d.parent);

      const root = stratify(data).sort(
        (a, b) => a.height - b.height || a.id.localeCompare(b.id)
      );

      const xOffset = 200; // Adjust this value to shift the root node horizontally
      root.x0 = treeHeight / 2;
      root.y0 = xOffset;

      const treeLayout = d3.tree().size([treeHeight, treeWidth]);

      const update = (source) => {
        const treeData = treeLayout(root);

        const nodes = treeData.descendants().reverse();
        const links = treeData.links();

        nodes.forEach((d) => {
          d.y = d.depth * 300 + xOffset;
        });

        svg
          .selectAll("path.dashed-line")
          .data(nodes) // Exclude root node
          .enter()
          .append("path")
          .attr("class", "dashed-line")
          .attr("stroke", "grey")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "4 4")
          .attr("d", (d) => {
            return `M${d.y},${source.y0 - 200} V${treeHeight}`; // Horizontal line from root to each node
          });

        const node = svg
          .selectAll("g.node")
          .data(nodes, (d) => d.id || (d.id = ++i));

        const nodeEnter = node
          .enter()
          .append("g")
          .attr("class", "node")
          .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
          .on("click", click);

        nodeEnter
          .append("foreignObject")
          .attr("width", 200)
          .attr("height", 200)
          .attr("x", (d) => (d.children || d._children ? -100 : -100))
          .attr("y", -100)
          .html((d) => {
            const htmlString = ReactDOMServer.renderToString(
              <Card name={d.data.name} />
            );
            return `<div>${htmlString}</div>`;
          });

        const nodeUpdate = nodeEnter.merge(node);

        nodeUpdate
          .transition()
          .duration(200)
          .attr("transform", (d) => `translate(${d.y},${d.x})`);

        const nodeExit = node
          .exit()
          .transition()
          .duration(200)
          .attr("transform", (d) => `translate(${source.y},${source.x})`)
          .remove();

        const link = svg.selectAll("path.link").data(links, (d) => d.target.id);

        const linkEnter = link
          .enter()
          .insert("path", "g")
          .attr("class", "link")
          .style("fill", "none")
          .style("stroke", "red")
          .style("stroke-width", "2px")
          .attr("d", (d) => {
            const o = { x: source.x0, y: source.y0 };
            return diagonal(o, o);
          });

        const linkUpdate = linkEnter.merge(link);

        linkUpdate
          .transition()
          .duration(200)
          .attr("d", (d) => diagonal(d.source, d.target));

        link
          .exit()
          .transition()
          .duration(200)
          .attr("d", (d) => {
            const o = { x: source.x, y: source.y };
            return diagonal(o, o);
          })
          .remove();

        nodes.forEach((d) => {
          d.x0 = d.x;
          d.y0 = d.y;
        });

        function diagonal(s, d) {
          return `M${s.y},${s.x}C${(s.y + d.y) / 2},${s.x} ${(s.y + d.y) / 2},${
            d.x
          } ${d.y},${d.x}`;
        }

        function click(event, d) {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          update(d);
        }
      };

      let i = 0;
      update(root);
    } catch (error) {
      console.error("Error stratifying data:", error);
    }
  }, [data, maxHeight]);

  return (
    <svg
      ref={svgRef}
      width={maxHeight * 300 + 200} // Add extra padding for better visualization
      height={data.length * 200}
      style={{
        scale: "0.5",
        overflow: "hidden",
        transform: "rotate(90deg)",
      }}
    ></svg>
  );
};

export default Canvas;
