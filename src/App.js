import React, { useState, useEffect } from "react";
import "./App.css";

const GRID_ROWS = 20;
const GRID_COLUMNS = 15;
const COLORS = ["magenta", "cyan", "lime", "yellow", "orange", "blue"]; // Color options

const App = () => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    // Initialize the grid with null (no color)
    const initialGrid = Array(GRID_ROWS)
      .fill(0)
      .map(() => Array(GRID_COLUMNS).fill(null));
    setGrid(initialGrid);

    // Function to handle updates for a specific column range
    const updateColumns = (startCol, endCol, delay) => {
      setTimeout(() => {
        const interval = setInterval(() => {
          setGrid((prevGrid) => {
            const newGrid = Array(GRID_ROWS)
              .fill(0)
              .map(() => Array(GRID_COLUMNS).fill(null));

            // Iterate through rows and columns
            for (let row = GRID_ROWS - 1; row >= 0; row--) {
              for (let col = 0; col < GRID_COLUMNS; col++) {
                // Process only columns in the specified range
                if (col >= startCol && col < endCol) {
                  if (prevGrid[row][col]) {
                    // Move color downward
                    if (row < GRID_ROWS - 1) {
                      newGrid[row + 1][col] = prevGrid[row][col];
                    }
                  } else if (Math.random() < 0.03) {
                    // Randomly generate a new color
                    newGrid[row][col] = COLORS[Math.floor(Math.random() * COLORS.length)];
                  }
                } else {
                  // Retain the previous state for columns outside the range
                  newGrid[row][col] = prevGrid[row][col];
                }
              }
            }

            return newGrid;
          });
        }, 150);

        return () => clearInterval(interval); // Clear interval on unmount
      }, delay);
    };

    // Update different portions of the grid with different delays
    updateColumns(0, 2, 0); // First 2 columns immediately
    updateColumns(6, 8, 2000); // Middle 2 columns after 2 seconds
    updateColumns(13, 15, 4000); // Last 2 columns after 4 seconds
  }, []);

  return (
    <div className="app">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="grid-cell"
                style={{
                  backgroundColor: cell || "black", // Use cell's color or black
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
