"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface ValentineEnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
  isAccepted: boolean;
  children: React.ReactNode;
}

const ValentineEnvelope: React.FC<ValentineEnvelopeProps> = ({ onOpen, isOpen, isAccepted, children }) => {
  return (
    <div className="relative flex items-center justify-center w-full [perspective:1000px] h-[400px]">
      <div 
        className="relative w-80 h-56 transition-all duration-500"
        onClick={!isOpen ? onOpen : undefined}
      >
        {/* 1. Dos de l'enveloppe (Couche la plus basse) */}
        <div className="absolute inset-0 bg-rose-200 rounded-lg shadow-xl z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        </div>

        {/* 2. La Carte (Couche intermédiaire - dans la poche) */}
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ 
            y: isAccepted ? -280 : isOpen ? -120 : 0, 
            opacity: isOpen ? 1 : 0,
            scale: isAccepted ? 1.1 : 1,
            zIndex: isAccepted ? 100 : 10 // Passe devant tout le monde une fois accepté
          }}
          transition={{ 
            type: "spring", 
            stiffness: 40, 
            damping: 15,
            delay: isOpen && !isAccepted ? 0.5 : 0 
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-[340px] sm:w-[380px]">
            {children}
          </div>
        </motion.div>

        {/* 3. Devant de l'enveloppe (La "Poche" - Couche supérieure) */}
        <div 
          className="absolute inset-0 bg-rose-100 rounded-lg z-20 shadow-inner border border-rose-200/50" 
          style={{ clipPath: 'polygon(0 0, 50% 60%, 100% 0, 100% 100%, 0 100%)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-200/50 to-transparent" />
        </div>

        {/* 4. Rabat supérieur (Flap) */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-rose-300 rounded-t-lg origin-top z-30"
          initial={false}
          animate={isOpen ? { rotateX: 160, zIndex: 5 } : { rotateX: 0, zIndex: 30 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ 
            clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
          
          {/* Sceau (Fixe sur le rabat) */}
          {!isOpen && (
            <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Heart className="text-rose-500 drop-shadow-md" fill="currentColor" size={48} />
            </div>
          )}
        </motion.div>

        {/* Texte d'indication (Fixe) */}
        {!isOpen && (
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-rose-500 font-serif italic text-sm bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm z-50">
            Clique pour ouvrir...
          </div>
        )}
      </div>
    </div>
  );
};

export default ValentineEnvelope;