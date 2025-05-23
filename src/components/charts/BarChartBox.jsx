import React, { useEffect, useRef, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { Box } from "@mui/material";

export const dataset = [
  { london: 59, paris: 57, newYork: 86, seoul: 21, month: 'Jan' },
  { london: 50, paris: 52, newYork: 78, seoul: 28, month: 'Feb' },
  { london: 47, paris: 53, newYork: 106, seoul: 41, month: 'Mar' },
  { london: 54, paris: 56, newYork: 92, seoul: 73, month: 'Apr' },
  { london: 57, paris: 69, newYork: 92, seoul: 99, month: 'May' },
  { london: 60, paris: 63, newYork: 103, seoul: 144, month: 'June' },
  { london: 59, paris: 60, newYork: 105, seoul: 319, month: 'July' },
  { london: 65, paris: 60, newYork: 106, seoul: 249, month: 'Aug' },
  { london: 51, paris: 51, newYork: 95, seoul: 131, month: 'Sept' },
  { london: 60, paris: 65, newYork: 97, seoul: 55, month: 'Oct' },
  { london: 67, paris: 64, newYork: 76, seoul: 48, month: 'Nov' },
  { london: 61, paris: 70, newYork: 103, seoul: 25, month: 'Dec' },
];

export default function ResponsiveBarChartBox() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: { xs: 300, sm: 400, md: 500 },
        overflow: 'hidden',
      }}
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <BarChart
          dataset={dataset}
          width={dimensions.width}
          height={dimensions.height}
          xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          series={[
            { dataKey: 'london', label: 'London' },
            { dataKey: 'paris', label: 'Paris' },
            { dataKey: 'newYork', label: 'New York' },
            { dataKey: 'seoul', label: 'Seoul' },
          ]}
          yAxis={[
            {
              label: 'rainfall (mm)',
            },
          ]}
          sx={{
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translate(-20px, 0)',
            },
          }}
        />
      )}
    </Box>
  );
}