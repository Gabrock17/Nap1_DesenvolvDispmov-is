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
  const [temperatura, setTemperatura] = useState('');
  const [sentido, setSentido] = useState('C_PARA_F'); // 'C_PARA_F' ou 'F_PARA_C'
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const converterTemperatura = () => {
    Keyboard.dismiss();
    setErro('');
    setResultado(null);

    if (!temperatura.trim()) {
      setErro('Por favor, informe uma temperatura.');
      return;
    }

    const valorNumerico = parseFloat(temperatura.replace(',', '.'));

    if (isNaN(valorNumerico)) {
      setErro('Insira um valor numérico válido.');
      return;
    }

    let valorConvertido = 0;
    let textoResultado = '';

    if (sentido === 'C_PARA_F') {
      valorConvertido = (valorNumerico * 9) / 5 + 32;
      const orig = valorNumerico.toString().replace('.', ',');
      const conv = Number(valorConvertido.toFixed(2)).toString().replace('.', ',');
      textoResultado = orig + ' °C  →  ' + conv + ' °F';
    } else {
      valorConvertido = ((valorNumerico - 32) * 5) / 9;
      const orig = valorNumerico.toString().replace('.', ',');
      const conv = Number(valorConvertido.toFixed(2)).toString().replace('.', ',');
      textoResultado = orig + ' °F  →  ' + conv + ' °C';
    }

    setResultado(textoResultado);
  };

  const alterarSentido = (novoSentido) => {
    setSentido(novoSentido);
    setResultado(null);
    setErro('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Conversor de Temperatura</Text>
        <Text style={styles.subtitulo}>
          Converta valores entre as escalas Celsius e Fahrenheit
        </Text>

        <Text style={styles.label}>Sentido da conversão:</Text>
        <View style={styles.grupoSelecao}>
          <TouchableOpacity
            style={[
              styles.opcaoSentido,
              sentido === 'C_PARA_F' ? styles.opcaoAtiva : null,
            ]}
            onPress={() => alterarSentido('C_PARA_F')}
          >
            <Text
              style={[
                styles.textoOpcao,
                sentido === 'C_PARA_F' ? styles.textoOpcaoAtiva : null,
              ]}
            >
              Celsius → Fahrenheit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.opcaoSentido,
              sentido === 'F_PARA_C' ? styles.opcaoAtiva : null,
            ]}
            onPress={() => alterarSentido('F_PARA_C')}
          >
            <Text
              style={[
                styles.textoOpcao,
                sentido === 'F_PARA_C' ? styles.textoOpcaoAtiva : null,
              ]}
            >
              Fahrenheit → Celsius
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>
          {sentido === 'C_PARA_F'
            ? 'Temperatura em Celsius (°C):'
            : 'Temperatura em Fahrenheit (°F):'}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={sentido === 'C_PARA_F' ? 'Ex: 30' : 'Ex: 86'}
          keyboardType="numbers-and-punctuation"
          value={temperatura}
          onChangeText={(texto) => {
            setTemperatura(texto);
            if (erro) setErro('');
          }}
        />

        {erro ? <Text style={styles.textoErro}>{erro}</Text> : null}

        <TouchableOpacity style={styles.botao} onPress={converterTemperatura}>
          <Text style={styles.textoBotao}>Converter</Text>
        </TouchableOpacity>

        {resultado ? (
          <View style={styles.caixaResultado}>
            <Text style={styles.labelResultado}>Resultado da conversão:</Text>
            <Text style={styles.valorResultado}>{resultado}</Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
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
    color: '#9A3412',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  grupoSelecao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  opcaoSentido: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#F9FAFB',
  },
  opcaoAtiva: {
    backgroundColor: '#EA580C',
    borderColor: '#EA580C',
  },
  textoOpcao: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
    textAlign: 'center',
  },
  textoOpcaoAtiva: {
    color: '#FFFFFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    marginBottom: 14,
  },
  textoErro: {
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '500',
  },
  botao: {
    backgroundColor: '#C2410C',
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
    backgroundColor: '#FFEDD5',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FDBA74',
  },
  labelResultado: {
    fontSize: 14,
    color: '#7C2D12',
    marginBottom: 4,
  },
  valorResultado: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#9A3412',
  },
});