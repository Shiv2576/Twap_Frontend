"use client";

import { useState } from "react";
import Link from "next/link";
import { Dialog } from "@headlessui/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-pink-400 font-bold text-2xl">
            TwapOracle
          </Link>

          <div className="flex space-x-8">
            <button
              onClick={() => setIsOpen(true)}
              className="hover:text-pink-400 transition text-lg"
            >
              FAQ
            </button>
          </div>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        {/* Dialog Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="relative bg-white text-gray-900 rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
            <Dialog.Title className="text-xl font-bold text-pink-400 mb-4">
              Frequently Asked Questions
            </Dialog.Title>

            <div className="space-y-4">
              <div>
                <p className="font-semibold">
                  ❓ What is TWAP and how is it calculated?
                </p>
                <p className="text-gray-700">
                  TWAP (Time-Weighted Average Price) is the average price of an
                  asset over a chosen time window. It smooths out short-term
                  volatility and gives a fairer price estimate by considering
                  how the price moves over time instead of just at a single
                  moment.
                </p>
              </div>

              <div>
                <p className="font-semibold">❓ What does slippage mean?</p>
                <p className="text-gray-700">
                  Slippage is the difference between the price you expect for a
                  trade and the price you actually get. It usually happens when
                  the market is moving fast or when you are trading large
                  amounts against limited liquidity.
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  ❓ How do I know the trade size threshold based on slippage?
                </p>
                <p className="text-gray-700">
                  A good rule of thumb is to set a maximum slippage tolerance
                  (e.g., 0.3% or 1%). The higher your trade size compared to the
                  pool’s liquidity, the more slippage you’ll face. For example,
                  you can’t push millions through a small pool in 5 minutes
                  without causing heavy price impact, so thresholds help decide
                  when to split trades or wait for better conditions.
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  ❓ What is VWAP and how is it calculated?
                </p>
                <p className="text-gray-700">
                  VWAP (Volume-Weighted Average Price) measures the average
                  price of an asset, weighted by trading volume. In other words,
                  it tells you the “real” price the market paid during a period
                  by giving more importance to high-volume trades. Formula:
                  (Price × Volume) ÷ Total Volume.
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  ❓ How are TWAP and VWAP different?
                </p>
                <p className="text-gray-700">
                  TWAP looks only at time — it’s great for smoothing out
                  volatility or building safer oracles that aren’t easy to
                  manipulate. VWAP looks at both price and trading volume — it’s
                  widely used to measure execution quality, helping you see if
                  you traded better or worse than the market average.
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  ❓ What’s planned for the future?
                </p>
                <p className="text-gray-700">
                  🚀 VWAP integration is on the roadmap. The idea is to
                  calculate VWAP directly from live swap data, while
                  continuously monitoring liquidity and trades on Uniswap V3
                  pools for more accurate and actionable insights.
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-pink-400"
            >
              ✕
            </button>
          </div>
        </div>
      </Dialog>
    </nav>
  );
}
