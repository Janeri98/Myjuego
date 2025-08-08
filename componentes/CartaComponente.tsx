import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  valor: string;
  visible: boolean;
  onPress: () => void;
}

export default function CartaComponente({ valor, visible, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.carta} onPress={onPress}>
      <Text style={styles.texto}>{visible ? valor : '?'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  carta: {
    backgroundColor: '#d33dbaff', // azul fuerte como el botón
    width: 70,
    height: 70,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  texto: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
});

