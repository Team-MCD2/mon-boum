import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CartDrawer() {
  const { items, count, total, remove, update, clear, isOpen, closeCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[5000]"
            style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[5001] flex flex-col w-full max-w-md"
            style={{ backgroundColor: "var(--b-dark)", borderLeft: "1px solid var(--b-border)" }}
            aria-label="Panier"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "var(--b-border)" }}>
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} style={{ color: "var(--b-red)" }} />
                <span className="font-display text-white" style={{ fontSize: "1.4rem", letterSpacing: "0.05em" }}>
                  MON PANIER
                </span>
                {count > 0 && (
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: "var(--b-red)" }}
                  >
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                aria-label="Fermer le panier"
              >
                <X size={18} className="text-white" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 text-center"
                  >
                    <ShoppingBag size={48} className="mb-4 opacity-20 text-white" />
                    <p className="font-display text-white opacity-40" style={{ fontSize: "1.5rem" }}>PANIER VIDE</p>
                    <p className="text-xs mt-2" style={{ color: "var(--b-muted)" }}>Ajoutez vos produits préférés</p>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className="flex gap-4 p-4 rounded-2xl"
                      style={{ backgroundColor: "var(--b-card)" }}
                    >
                      {/* Image */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 img-zoom">
                        <ImageWithFallback
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover img-inner"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-white truncate" style={{ fontSize: "1.1rem", letterSpacing: "0.04em" }}>
                          {item.name}
                        </p>
                        {item.tag && (
                          <span className="inline-block text-xs px-2 py-0.5 rounded-full mt-0.5" style={{ backgroundColor: "rgba(229,37,10,0.2)", color: "var(--b-red)", fontWeight: 700 }}>
                            {item.tag}
                          </span>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-display" style={{ color: "var(--b-yellow)", fontSize: "1.1rem" }}>
                            {(item.price * item.qty).toFixed(2).replace(".", ",")}€
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => update(item.id, item.qty - 1)}
                              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                              style={{ backgroundColor: "var(--b-card2)", color: "var(--b-white)" }}
                              aria-label="Diminuer la quantité"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold text-white">{item.qty}</span>
                            <button
                              onClick={() => update(item.id, item.qty + 1)}
                              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                              style={{ backgroundColor: "var(--b-red)", color: "white" }}
                              aria-label="Augmenter la quantité"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => remove(item.id)}
                        className="self-start mt-1 transition-opacity opacity-40 hover:opacity-100"
                        aria-label={`Supprimer ${item.name}`}
                      >
                        <Trash2 size={16} style={{ color: "var(--b-red)" }} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t space-y-4" style={{ borderColor: "var(--b-border)" }}>
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: "var(--b-muted)" }}>Sous-total</span>
                  <span className="font-display text-white" style={{ fontSize: "1.4rem" }}>
                    {total.toFixed(2).replace(".", ",")}€
                  </span>
                </div>
                <p className="text-xs" style={{ color: "var(--b-muted)" }}>Livraison calculée à l'étape suivante</p>
                <button
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-full font-display uppercase tracking-widest btn-shine transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: "var(--b-red)", color: "white", fontSize: "1.1rem" }}
                  aria-label="Passer commande"
                >
                  Commander
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={clear}
                  className="w-full text-center text-xs transition-colors"
                  style={{ color: "var(--b-muted)" }}
                >
                  Vider le panier
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
