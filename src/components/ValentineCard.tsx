"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface ValentineCardProps {
  isAccepted: boolean;
}

const ValentineCard: React.FC<ValentineCardProps> = ({ isAccepted }) => {
  // On encode le nom du fichier pour gérer les espaces
  const photoPath = encodeURI("/metise.jpeg");

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-2xl border border-rose-100 p-6 text-center relative overflow-hidden flex flex-col items-center justify-center ${
        isAccepted ? 'min-h-[400px]' : 'min-h-[220px]'
      }`}
      layout
    >
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-rose-50 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=500&auto=format&fit=crop" 
                alt="Décoration"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-serif text-rose-600 font-bold">
                Ma Valentine...
              </h2>
              <p className="text-rose-800 font-bold text-base leading-tight">
                Veux-tu être ma Valentine ?
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-6"
          >
            <div className="relative w-full aspect-square max-w-[280px] mx-auto">
              <motion.div 
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-4 -right-4 z-20 bg-white rounded-full p-2 shadow-xl border-2 border-rose-100"
              >
                <Heart className="text-rose-500 fill-rose-500" size={32} />
              </motion.div>
              
              <div className="w-full h-full rounded-3xl overflow-hidden border-8 border-white shadow-2xl transform rotate-2">
                <img 
                  src={photoPath} 
                  alt="Nous"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Erreur de chargement de l'image");
                    // Fallback si l'image ne charge vraiment pas
                    e.currentTarget.src = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=500&auto=format&fit=crop";
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-rose-500 font-serif italic text-xl">
                "Pour toujours..."
              </p>
              <p className="text-rose-600 font-bold text-2xl">
                Je t'aime. ❤️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ValentineCard;
