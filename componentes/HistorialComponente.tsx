import { View, Text, StyleSheet } from 'react-native';
import { useJuego } from '../context/JuegoProvider';

export default function HistorialComponente() {
  const { partidas } = useJuego();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Historial de partidas</Text>
      {partidas.map((p) => (
        <Text key={p.id}>#{p.id} - {p.resultado}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  }
});

