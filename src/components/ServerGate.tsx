import { useState, type ReactNode } from "react";
import { useServerStatus } from "@/context/ServerStatusContext";
import { WakeUpScreen } from "@/components/WakeUpScreen";

export function ServerGate({ children }: { children: ReactNode }) {
  const { isServerAwake } = useServerStatus();
  const [showOverlay, setShowOverlay] = useState(true);

  const handleTransitionEnd = () => {
    if (isServerAwake) {
      setShowOverlay(false);
    }
  };

  return (
    <>
      <div
        className={
          isServerAwake
            ? "opacity-100 transition-opacity duration-700"
            : "pointer-events-none opacity-0"
        }
      >
        {children}
      </div>

      {showOverlay && (
        <div
          onTransitionEnd={handleTransitionEnd}
          className={`transition-opacity duration-700 ${
            isServerAwake ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <WakeUpScreen />
        </div>
      )}
    </>
  );
}
