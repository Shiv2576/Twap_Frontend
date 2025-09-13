import React from "react";

interface WindowOption {
  seconds: number;
  label: string;
  description: string;
}

const WINDOW_OPTIONS: WindowOption[] = [
  {
    seconds: 300,
    label: "5 min",
    description: "Very short-term (high sensitivity)",
  },
  {
    seconds: 900,
    label: "15 min",
    description: "Short-term (medium sensitivity)",
  },
  {
    seconds: 1800,
    label: "30 min",
    description: "Medium-term (balanced)",
  },
  {
    seconds: 3600,
    label: "60 min",
    description: "Long-term (low sensitivity)",
  },
  {
    seconds: 7200,
    label: "120 min",
    description: "Very long-term (very stable)",
  },
];

interface WindowSelectorProps {
  selectedWindow: number;
  onWindowChange: (windowSeconds: number) => void;
  isConnected: boolean;
}

export const WindowSelector: React.FC<WindowSelectorProps> = ({
  selectedWindow,
  onWindowChange,
  isConnected,
}) => {
  const handleWindowChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newWindow = parseInt(event.target.value, 10);
    onWindowChange(newWindow);
  };

  return (
    <div className="window-selector">
      <label
        htmlFor="window-select"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        TWAP Time Window:
      </label>
      <select
        id="window-select"
        value={selectedWindow}
        onChange={handleWindowChange}
        disabled={!isConnected}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
      >
        {WINDOW_OPTIONS.map((option) => (
          <option key={option.seconds} value={option.seconds}>
            {option.label} - {option.description}
          </option>
        ))}
      </select>

      <div className="mt-2 text-xs text-gray-500">
        <p>Current window: {Math.round(selectedWindow / 60)} minutes</p>
      </div>
    </div>
  );
};
