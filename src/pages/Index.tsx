"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ValentineEnvelope from '@/components/ValentineEnvelope';
import ValentineCard from '@/components/ValentineCard';
import { MadeWithDyad } from "@/components/made-with-dyad";
import confetti from 'canvas-confetti';

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const handleNoHover = () => {
    const newX = (Math.random() - 0.5) * 300;
    const newY = (Math.random() - 0.5) * 150;
    setNoButtonPos({ x: newX, y: newY });
  };

  const handleAccept = () => {
    setIsAccepted(true);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 overflow-hidden p-4">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 1000 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              y: -200,
              x: Math.random() * 1000,
              rotate: 360
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-rose-200"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-rose-600 font-bold">
            {isAccepted ? "Merveilleux ! ❤️" : isOpen ? "Une surprise pour toi..." : "Tu as reçu un message !"}
          </h1>
        </motion.div>

        {/* Conteneur de l'enveloppe avec une marge supérieure pour laisser la carte monter */}
        <div className="relative flex flex-col items-center mt-24 sm:mt-32">
          <ValentineEnvelope 
            isOpen={isOpen} 
            isAccepted={isAccepted}
            onOpen={() => setIsOpen(true)}
          >
            <ValentineCard isAccepted={isAccepted} />
          </ValentineEnvelope>

          {/* Boutons positionnés sous l'enveloppe */}
          <div className="h-32 flex items-center justify-center mt-8">
            <AnimatePresence>
              {isOpen && !isAccepted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAccept}
                    className="bg-rose-500 text-white px-10 py-4 rounded-full font-bold shadow-xl text-lg z-50"
                  >
                    Oui ! ❤️
                  </motion.button>

                  <motion.button
                    animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                    onMouseEnter={handleNoHover}
                    className="bg-white text-rose-300 px-8 py-3 rounded-full font-semibold border border-rose-100 shadow-sm cursor-default"
                  >
                    Non 💔
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <div className="fixed bottom-4 w-full">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;