import React, { createContext, useContext, useState } from 'react';

interface Partida {
  id: number;
  resultado: string;
}

interface JuegoContextProps {
  partidas: Partida[];
  agregarPartida: (resultado: string) => void;
}

const JuegoContext = createContext<JuegoContextProps | undefined>(undefined);

export const JuegoProvider = ({ children }: any) => {
  const [partidas, setPartidas] = useState<Partida[]>([]);

  const agregarPartida = (resultado: string) => {
    const nueva = { id: partidas.length + 1, resultado };
    setPartidas([...partidas, nueva]);
  };

  return (
    <JuegoContext.Provider value={{ partidas, agregarPartida }}>
      {children}
    </JuegoContext.Provider>
  );
};

export const useJuego = () => {
  const context = useContext(JuegoContext);
  if (!context) throw new Error('Debe usarse dentro de JuegoProvider');
  return context;
};

