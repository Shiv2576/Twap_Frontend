import React from "react";
import { PoolPrice } from "../hooks/usePriceWebsocket";

interface PriceDisplayProps {
  poolName: string;
  priceData?: PoolPrice;
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  poolName,
  priceData,
  className = "",
}) => {
  if (!priceData) {
    return (
      <div className={`price-display loading ${className}`}>
        <span className="pool-name">{poolName}</span>
        <span className="price">Loading...</span>
      </div>
    );
  }

  const slippage = parseFloat(priceData.slippage_percent);

  const formatSlippage = (value: number): string => {
    if (value === 0) return "0.000000";

    if (value < 0.000001) {
      return value.toFixed(10);
    } else if (value < 0.001) {
      return value.toFixed(7);
    } else if (value < 0.01) {
      return value.toFixed(6);
    } else if (value < 0.1) {
      return value.toFixed(6);
    } else if (value < 1) {
      return value.toFixed(6);
    } else {
      return value.toFixed(6);
    }
  };

  const formatPrice = (priceString: string): string => {
    const price = parseFloat(priceString);

    // For very small prices (like LINK/ETH), show more decimals
    if (price < 0.001) {
      return price.toFixed(15);
    }
    // For small prices, show 6 decimals
    else if (price < 0.1) {
      return price.toFixed(6);
    }
    // For medium prices, show 4 decimals
    else if (price < 10) {
      return price.toFixed(4);
    }
    // For large prices, show 2 decimals
    else if (price < 1000) {
      return price.toFixed(2);
    }
    // For very large prices, show 0 decimals but with commas
    else {
      return Math.round(price).toLocaleString();
    }
  };

  const slippageText = formatSlippage(slippage);

  const getSlippageColor = (slippage: number) => {
    if (slippage > 1) return "text-red-500";
    if (slippage > 0.5) return "text-orange-500";
    return "text-green-500";
  };

  return (
    <div className={`price-display ${className} flex flex-col gap-2`}>
      {/* Pool Name */}
      <div className="pool-name font-semibold text-white text-lg">
        {poolName}
      </div>

      {/* Spot Price */}
      <div className="spot-price text-2xl font-bold text-white">
        {formatPrice(priceData.SpotPrice)}
      </div>

      {/* TWAP */}
      <div className="text-white text-sm">
        TWAP: {formatPrice(priceData.TwapPrice)}
      </div>

      {/* Slippage */}
      <div className={`${getSlippageColor(slippage)} text-sm font-medium`}>
        Slippage: {slippageText}%
      </div>
    </div>
  );
};
