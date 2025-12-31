import React from "react";

export const CommentIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4 7 7 0 0 1-2.05-5.6 7 7 0 0 1-2.05-5.6 8.5 8.5 0 0 1-7.6-4A8.38 8.38 0 0 1 3 11.5"></path>
    <line x1="12" y1="17" x2="12" y2="17"></line>
  </svg>
);
