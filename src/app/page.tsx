"use client";

import React from "react";
import { usePriceWebSocket } from "../hooks/usePriceWebsocket";
import { PriceDisplay } from "../components/PriceWebsocket";
import { WindowSelector } from "../components/WindowSelector";
import Navbar from "../components/navbar";

export default function HomePage() {
  const {
    prices,
    isConnected,
    error,
    lastUpdate,
    selectedWindow,
    changeWindow,
  } = usePriceWebSocket();

  const formatTime = (date: Date | null) => {
    if (!date) return "Never";
    return date.toLocaleTimeString();
  };

  const formatWindowMinutes = (seconds: number) => {
    return Math.round(seconds / 60);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="bg-gray-900 p-8 rounded-lg shadow-md">
          <h2 className="text-pink-500 text-xl font-bold">Connection Error</h2>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded transition"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            {/* Left Section */}
            <div>
              <h1 className="text-2xl font-bold text-pink-500">
                Live Crypto Prices
              </h1>
              <p className="text-sm  text-gray-400 mt-2">
                Real-time prices from Uniswap V3 pools with TWAP calculations
              </p>
            </div>

            {/* Right Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <WindowSelector
                selectedWindow={selectedWindow}
                onWindowChange={changeWindow}
                isConnected={isConnected}
              />

              <div className="flex items-center space-x-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isConnected ? "bg-green-400" : "bg-red-500"
                  }`}
                />
                <span className="text-sm text-gray-300">
                  {isConnected ? "Connected" : "Disconnected"}
                </span>
                <span className="text-sm text-gray-400">
                  Last update: {formatTime(lastUpdate)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Window Info */}
        <div className="bg-pink-100/10 border border-pink-500 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-pink-400">
                Current TWAP Window: {formatWindowMinutes(selectedWindow)}{" "}
                minutes
              </h3>
              <p className="text-gray-400">
                Prices update every 10 seconds with{" "}
                {formatWindowMinutes(selectedWindow)}-minute averages
              </p>
            </div>
            <div className="bg-pink-500/20 px-3 py-1 rounded-full">
              <span className="text-pink-400 font-medium">
                {formatWindowMinutes(selectedWindow)} min TWAP
              </span>
            </div>
          </div>
        </div>

        {/* Price Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(prices).map(([poolName, priceData]) => (
            <div
              key={poolName}
              className="bg-gray-900 rounded-lg shadow-md p-4 hover:shadow-pink-500/30 transition-shadow"
            >
              <PriceDisplay poolName={poolName} priceData={priceData} />
            </div>
          ))}
        </div>

        {/* Loading State */}
        {Object.keys(prices).length === 0 && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Connecting to price feed...</p>
            <p className="text-sm text-gray-500">
              Using {formatWindowMinutes(selectedWindow)}-minute TWAP window
            </p>
          </div>
        )}

        {/* Connection Status Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Data updates every 10 seconds with{" "}
            {formatWindowMinutes(selectedWindow)}-minute TWAP
          </p>
        </div>
      </div>
    </div>
  );
}
