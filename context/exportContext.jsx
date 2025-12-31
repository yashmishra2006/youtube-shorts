"use client";
import { createContext, useContext,useState } from "react";

export const ExportContext = createContext(null);

export function ExportProvider({ children }) {
  const [exportData, setExportData] = useState(null);
  const processExportData = () => {
    if (!exportData) {
      return "No export data available";
    }
    // Perform some operation on exportData
    return `Processed data: ${JSON.stringify(exportData)}`;
  };
  return (
    <ExportContext.Provider
      value={{ exportData, setExportData, processExportData }}
    >
      {children}
    </ExportContext.Provider>
  );
}

export const useExportContext = () => {
  const context = useContext(ExportContext);
  if (context === undefined) {
    throw new Error("useExportContext must be used within a ExportProvider");
  }
  return context;
};
