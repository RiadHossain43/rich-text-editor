import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TextEditor from "components/editor/Index";

export const Router = () => {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<Navigate replace to="/editor" />} />
        <Route path="/editor" element={<TextEditor />} />
      </Routes>
    </div>
  );
};
