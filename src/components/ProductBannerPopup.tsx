import { useState } from "react";
import { X, ShoppingCart, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductBannerPopupProps {
  brandName?: string;
  productName?: string;
  price?: string;
  description?: string;
  imageUrl?: string;
  buyUrl?: string;
  onAddToCart?: () => void;
}

export const ProductBannerPopup = ({
  brandName = "TEMU",
  productName = "wood table",
  price = "400 TND",
  description = "console table",
  imageUrl = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
  buyUrl = "#",
  onAddToCart,
}: ProductBannerPopupProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          <div className="flex gap-4 p-4">
            {/* Product image */}
            <div className="w-[140px] h-[140px] flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={imageUrl}
                alt={productName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product info */}
            <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {brandName}
                </span>
                <h3 className="text-lg font-bold text-gray-900 leading-tight mt-0.5">
                  {productName}
                </h3>
                <p className="text-xl font-bold text-emerald-700 mt-1">
                  {price}
                </p>
              </div>

              {/* Description field */}
              <div className="mt-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm text-gray-500">{description}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 px-4 pb-4">
            <button
              onClick={onAddToCart}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-full transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              AJOUTER AU PANIER
            </button>
            <a
              href={buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-50 text-sm font-semibold rounded-full transition-colors"
            >
              ACHETER
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
