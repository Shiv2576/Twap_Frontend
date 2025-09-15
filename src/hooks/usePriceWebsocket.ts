import { useState, useEffect, useCallback, useRef } from "react";

export interface PoolPrice {
  SpotPrice: string;
  TwapPrice: string;
  slippage_percent: string;
}

export interface PriceData {
  Pools: {
    [poolName: string]: PoolPrice;
  };
  Window: number;
}

export function usePriceWebSocket() {
  const [prices, setPrices] = useState<{ [poolName: string]: PoolPrice }>({});
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [selectedWindow, setSelectedWindow] = useState<number>(900);
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback((windowSeconds: number = 6000) => {
    const url = `wss://additamentary-ettie-unrefining.ngrok-free.app/ws?window=${windowSeconds}`;

    try {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log("✅ Connected to price server");
        setIsConnected(true);
        setError(null);
        setSelectedWindow(windowSeconds);
      };

      ws.current.onmessage = (event) => {
        try {
          const data: PriceData = JSON.parse(event.data);
          if (data.Pools) {
            setPrices(data.Pools);
            setLastUpdate(new Date());
          }
        } catch (err) {
          setError("Failed to parse price data");
          console.error("Parse error:", err);
        }
      };

      ws.current.onclose = () => {
        console.log("❌ Disconnected from price server");
        setIsConnected(false);
      };

      ws.current.onerror = (error) => {
        setError("WebSocket connection error");
        console.error("WebSocket error:", error);
      };
    } catch (err) {
      setError("Failed to connect to WebSocket");
      console.error("Connection error:", err);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
    setIsConnected(false);
  }, []);

  const changeWindow = useCallback(
    (windowSeconds: number) => {
      disconnect();
      connect(windowSeconds);
    },
    [connect, disconnect],
  );

  useEffect(() => {
    connect(selectedWindow);

    return () => {
      disconnect();
    };
  }, []);

  const getPrice = useCallback(
    (poolName: string): PoolPrice | undefined => {
      return prices[poolName];
    },
    [prices],
  );

  const getAllPrices = useCallback((): { [poolName: string]: PoolPrice } => {
    return prices;
  }, [prices]);

  return {
    prices,
    isConnected,
    error,
    lastUpdate,
    selectedWindow,
    changeWindow,
    connect,
    disconnect,
    getPrice,
    getAllPrices,
  };
}
