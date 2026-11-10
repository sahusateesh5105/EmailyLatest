import React, { useState } from "react";
import VirtualList from "./virtualList";

// Generate initial batch of mock data (e.g., 100,000 items)
const INITIAL_DATA = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  title: `Item #${i + 1}`,
  description: `This is the detailed description for item number ${i + 1}.`,
}));

export default function App() {
  const [items, setItems] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Simulated infinite scroll fetch function
  const handleLoadMore = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const currentLength = items.length;
      
      // Stop adding after reaching 200,000 items as an example
      if (currentLength >= 200000) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const newBatch = Array.from({ length: 1000 }, (_, i) => ({
        id: currentLength + i,
        title: `Item #${currentLength + i + 1}`,
        description: `This is the detailed description for item number ${currentLength + i + 1}.`,
      }));

      setItems((prev) => [...prev, ...newBatch]);
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Virtualized List (100,000 Items)</h2>
      <p style={{ color: "#666" }}>
        Currently rendering <strong>{items.length.toLocaleString()}</strong> items smoothly.
      </p>

      <VirtualList
        items={items}
        itemHeight={64}
        containerHeight={480}
        overscan={4}
        isLoading={loading}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        renderItem={(item, index) => (
          <div
            style={{
              padding: "10px 16px",
              boxSizing: "border-box",
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "14px" }}>{item.title}</div>
              <div style={{ fontSize: "12px", color: "#888" }}>{item.description}</div>
            </div>
            <span style={{ fontSize: "12px", color: "#999" }}>#{index + 1}</span>
          </div>
        )}
      />
    </div>
  );
}