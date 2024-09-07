"use client"

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, CreditCard, ShoppingCart, Plane, Coffee, Book } from 'lucide-react';

interface CardData {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const cardData: CardData[] = [
  { title: "Credit Card", description: "Manage your finances with ease", icon: <CreditCard size={24} />, color: "from-purple-400 to-indigo-500" },
  { title: "Shopping", description: "Track and optimize your expenses", icon: <ShoppingCart size={24} />, color: "from-green-400 to-emerald-500" },
  { title: "Travel", description: "Plan and book your next adventure", icon: <Plane size={24} />, color: "from-orange-400 to-pink-500" },
  { title: "Lifestyle", description: "Enhance your daily experiences", icon: <Coffee size={24} />, color: "from-blue-400 to-cyan-500" },
  { title: "Education", description: "Expand your knowledge and skills", icon: <Book size={24} />, color: "from-red-400 to-rose-500" },
];

const CardStack: React.FC = () => {
  const stackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = cardData.length;

  useEffect(() => {
    if (stackRef.current) {
      const cards = Array.from(stackRef.current.children) as HTMLElement[];
      gsap.set(cards, {
        position: 'absolute',
        top: 0,
        left: 0,
      });
      updateCardPositions(activeIndex);
    }
  }, [activeIndex]);

  const updateCardPositions = (currentIndex: number) => {
    if (stackRef.current) {
      const cards = Array.from(stackRef.current.children) as HTMLElement[];
      gsap.to(cards, {
        x: (i) => {
          const diff = (i - currentIndex + totalCards) % totalCards;
          return diff * 10;
        },
        y: (i) => {
          const diff = (i - currentIndex + totalCards) % totalCards;
          return diff * 20;
        },
        rotate: (i) => {
          const diff = (i - currentIndex + totalCards) % totalCards;
          return diff * 2;
        },
        scale: (i) => {
          const diff = (i - currentIndex + totalCards) % totalCards;
          return 1 - (diff * 0.05);
        },
        opacity: (i) => {
          const diff = (i - currentIndex + totalCards) % totalCards;
          return 1 - (diff * 0.2);
        },
        zIndex: (i) => totalCards - ((i - currentIndex + totalCards) % totalCards),
        duration: 0.6,
        ease: 'power3.out',
      });
    }
  };

  const navigateCards = (direction: number) => {
    let newIndex = (activeIndex + direction + totalCards) % totalCards;
    setActiveIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br font-poppins from-black-100 to-black-100 p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-medium text-white mb-12 tracking-tight">Card Stack</h1>

      <div className="relative w-[400px] h-[340px]">
        <div ref={stackRef} className="relative w-full h-full">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`absolute w-full h-full bg-gradient-to-br ${card.color} rounded-3xl shadow-lg p-6 cursor-pointer transition-all duration-300 overflow-hidden`}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 rounded-3xl"></div>
              <div className="relative flex flex-col h-full z-10">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-white bg-opacity-20 rounded-2xl mr-4">
                    {React.cloneElement(card.icon as React.ReactElement, { className: "text-black" })}
                  </div>
                  <h2 className="text-3xl font-bold text-black">{card.title}</h2>
                </div>
                <p className="text-lg text-black mb-6">{card.description}</p>
                <div className="mt-auto">
                  <button className="px-5 py-2.5 bg-white bg-opacity-20 hover:bg-opacity-30 text-black text-sm rounded-full font-semibold transition-all duration-200 backdrop-blur-sm">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 w-24 h-24 bg-white opacity-20 rounded-full blur-xl"></div>
            </div>
          ))}
        </div>

        <button
          className="absolute top-1/2 -left-24 transform -translate-y-1/2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-3 focus:outline-none transition-all duration-200"
          onClick={() => navigateCards(-1)}
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
        <button
          className="absolute top-1/2 -right-24 transform -translate-y-1/2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-3 focus:outline-none transition-all duration-200"
          onClick={() => navigateCards(1)}
        >
          <ChevronRight className="text-white" size={24} />
        </button>
      </div>
    </div>
  );
};

export default CardStack;