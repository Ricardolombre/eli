"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ValentineCardProps {
  isAccepted: boolean;
  onAccept: () => void;
}

const ValentineCard: React.FC<ValentineCardProps> = ({ isAccepted, onAccept }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const handleNoHover = () => {
    const newX = (Math.random() - 0.5) * 200;
    const newY = (Math.random() - 0.5) * 100;
    setNoButtonPos({ x: newX, y: newY });
  };

  const handleAcceptClick = () => {
    onAccept();
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-2xl border border-rose-100 p-5 sm:p-6 text-center relative overflow-hidden"
      layout
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden border-4 border-rose-50 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=500&auto=format&fit=crop" 
                alt="Toi et Moi"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-serif text-rose-600 font-bold">
                Ma Valentine...
              </h2>
              <p className="text-rose-800 font-bold text-lg">
                Veux-tu être ma Valentine ?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAcceptClick}
                className="bg-rose-500 text-white px-6 py-2 rounded-full font-bold shadow-lg text-sm z-50"
              >
                Oui ! ❤️
              </motion.button>

              <motion.button
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={handleNoHover}
                className="bg-rose-50 text-rose-300 px-6 py-2 rounded-full font-semibold text-sm border border-rose-100 cursor-default"
              >
                Non 💔
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-4 space-y-4"
          >
            <div className="flex justify-center">
              <Heart className="text-rose-500 animate-pulse" size={60} fill="currentColor" />
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-serif text-rose-600 font-bold">
                Merveilleux !
              </h2>
              <p className="text-rose-500 font-medium">
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