import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";

/**
 * VirtualList Component
 * @param {Array} items - Full list of data items
 * @param {number} itemHeight - Fixed height of each row in pixels
 * @param {number} containerHeight - Visible container height in pixels
 * @param {number} overscan - Extra items to render above/below the visible viewport to prevent flickering
 * @param {function} renderItem - Render function for individual list items: (item, index) => ReactNode
 * @param {function} onLoadMore - Optional callback triggered when scrolling near the bottom (for infinite scrolling)
 * @param {boolean} hasMore - Whether there is more data to fetch for infinite scroll
 * @param {boolean} isLoading - Loading state indicator
 */
const VirtualList = ({
  items = [],
  itemHeight = 50,
  containerHeight = 500,
  overscan = 5,
  renderItem,
  onLoadMore,
  hasMore = false,
  isLoading = false,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  // Total height of the scroll container to preserve native scrollbar size
  const totalHeight = items.length * itemHeight;

  // Calculate visible range based on scroll position
  const { startIndex, endIndex } = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);

    return {
      startIndex: Math.max(0, start - overscan),
      endIndex: Math.min(items.length - 1, start + visibleCount + overscan),
    };
  }, [scrollTop, itemHeight, containerHeight, overscan, items.length]);

  // Handle scrolling and trigger infinite load near bottom
  const handleScroll = useCallback(
    (e) => {
      const currentScrollTop = e.currentTarget.scrollTop;
      setScrollTop(currentScrollTop);

      // Infinite Scroll trigger: load when within 200px of the bottom
      if (
        onLoadMore &&
        hasMore &&
        !isLoading &&
        containerRef.current
      ) {
        const { scrollHeight, clientHeight } = containerRef.current;
        if (scrollHeight - (currentScrollTop + clientHeight) < 200) {
          onLoadMore();
        }
      }
    },
    [onLoadMore, hasMore, isLoading]
  );

  // Slice visible items and attach absolute positioning coordinates
  const visibleItems = useMemo(() => {
    const list = [];
    for (let i = startIndex; i <= endIndex; i++) {
      if (items[i] !== undefined) {
        list.push({
          index: i,
          item: items[i],
          offsetTop: i * itemHeight,
        });
      }
    }
    return list;
  }, [startIndex, endIndex, items, itemHeight]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: `${containerHeight}px`,
        overflowY: "auto",
        position: "relative",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        background: "#ffffff",
      }}
    >
      {/* Spacer div to establish correct scrollable height */}
      <div style={{ height: `${totalHeight}px`, position: "relative", width: "100%" }}>
        {visibleItems.map(({ index, item, offsetTop }) => (
          <div
            key={item.id ?? index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${itemHeight}px`,
              transform: `translateY(${offsetTop}px)`,
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Loading Indicator for Infinite Scroll */}
      {isLoading && (
        <div style={{ textAlign: "center", padding: "12px 0", color: "#666" }}>
          Loading more items...
        </div>
      )}
    </div>
  );
};

export default VirtualList;