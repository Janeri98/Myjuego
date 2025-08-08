import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import CartaComponente from './componentes/CartaComponente';
import HistorialComponente from './componentes/HistorialComponente';
import { JuegoProvider, useJuego } from './context/JuegoProvider';

function Juego() {
  const [cartas, setCartas] = useState<string[]>([]);
  const [visibles, setVisibles] = useState<boolean[]>([]);
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
  const [jugando, setJugando] = useState(false);

  const { agregarPartida } = useJuego();

  const iniciarJuego = () => {
    const valores = ['A', 'B', 'C', 'D'];
    const mezcla = [...valores, ...valores].sort(() => Math.random() - 0.5);
    setCartas(mezcla);
    setVisibles(Array(8).fill(false));
    setSeleccionadas([]);
    setJugando(true);
  };

  const presionarCarta = (indice: number) => {
    if (visibles[indice] || seleccionadas.length === 2 || !jugando) return;

    const nuevasVisibles = [...visibles];
    nuevasVisibles[indice] = true;
    setVisibles(nuevasVisibles);
    const nuevasSeleccionadas = [...seleccionadas, indice];
    setSeleccionadas(nuevasSeleccionadas);

    if (nuevasSeleccionadas.length === 2) {
      const [i1, i2] = nuevasSeleccionadas;
      setTimeout(() => {
        if (cartas[i1] === cartas[i2]) {
          Alert.alert('¡Ganaste!', 'Encontraste un par.');
          agregarPartida('Ganó');
          const nuevasVis = [...visibles];
          setVisibles(nuevasVis);
        } else {
          Alert.alert('No son iguales', 'Perdiste.');
          agregarPartida('Perdió');
          const ocultar = [...visibles];
          ocultar[i1] = false;
          ocultar[i2] = false;
          setVisibles(ocultar);
        }
        setSeleccionadas([]);
        setJugando(false);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Juego Mental</Text>
      <Button title="Iniciar a jugar" onPress={iniciarJuego} />

      <View style={styles.tablero}>
        {cartas.map((valor, i) => (
          <CartaComponente
            key={i}
            valor={valor}
            visible={visibles[i]}
            onPress={() => presionarCarta(i)}
          />
        ))}
      </View>

      <HistorialComponente />
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <JuegoProvider>
      <Juego />
    </JuegoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0a0b0cff',
    marginBottom: 20,
  },
  tablero: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
});
