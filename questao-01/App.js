import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
} from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const calcularHidratacao = () => {
    Keyboard.dismiss();
    setErro('');
    setResultado(null);

    // Verifica se o campo está vazio
    if (!peso.trim()) {
      setErro('Por favor, informe o seu peso.');
      return;
    }

    // Substitui vírgula por ponto para evitar erro na conversão numérica
    const pesoNumerico = parseFloat(peso.replace(',', '.'));

    // Valida se não é um número, se é zero ou negativo
    if (isNaN(pesoNumerico) || pesoNumerico <= 0) {
      setErro('Insira um peso válido maior que zero.');
      return;
    }

    // Cálculo: 35 mL por kg, dividido por 1000 para converter em litros
    const totalMl = pesoNumerico * 35;
    const totalLitros = totalMl / 1000;

    // Formata para 2 casas decimais e troca ponto por vírgula (padrão BR)
    const litrosFormatado = totalLitros.toFixed(2).replace('.', ',');

    setResultado(`${litrosFormatado} litros por dia`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Calculadora de Hidratação</Text>
        <Text style={styles.subtitulo}>
          Estime seu consumo diário ideal de água (35 mL por kg)
        </Text>

        <Text style={styles.label}>Peso (kg):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 70"
          keyboardType="numeric"
          value={peso}
          onChangeText={(texto) => {
            setPeso(texto);
            if (erro) setErro('');
          }}
        />

        {erro ? <Text style={styles.textoErro}>{erro}</Text> : null}

        <TouchableOpacity style={styles.botao} onPress={calcularHidratacao}>
          <Text style={styles.textoBotao}>Calcular</Text>
        </TouchableOpacity>

        {resultado && (
          <View style={styles.caixaResultado}>
            <Text style={styles.labelResultado}>Consumo diário estimado:</Text>
            <Text style={styles.valorResultado}>{resultado}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#023E8A',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    marginBottom: 12,
  },
  textoErro: {
    color: '#D90429',
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '500',
  },
  botao: {
    backgroundColor: '#0077B6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  caixaResultado: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#CAF0F8',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#90E0EF',
  },
  labelResultado: {
    fontSize: 14,
    color: '#03045E',
    marginBottom: 4,
  },
  valorResultado: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0077B6',
  },
});