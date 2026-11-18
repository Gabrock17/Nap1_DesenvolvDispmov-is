import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function App() {
  const [produto, setProduto] = useState('');
  const [precoOriginal, setPrecoOriginal] = useState('');
  const [percentualDesconto, setPercentualDesconto] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const formatarMoeda = (valor) => {
    const partes = valor.toFixed(2).split('.');
    const inteiro = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return 'R$ ' + inteiro + ',' + partes[1];
  };

  const aplicarDesconto = () => {
    Keyboard.dismiss();
    setErro('');
    setResultado(null);

    if (!produto.trim()) {
      setErro('Por favor, informe o nome do produto.');
      return;
    }

    if (!precoOriginal.trim() || !percentualDesconto.trim()) {
      setErro('Preencha o preço original e o percentual de desconto.');
      return;
    }

    const precoNum = parseFloat(precoOriginal.replace(',', '.'));
    const descontoNum = parseFloat(percentualDesconto.replace(',', '.'));

    if (isNaN(precoNum) || precoNum < 0) {
      setErro('O preço original deve ser um valor válido e não negativo.');
      return;
    }

    if (isNaN(descontoNum) || descontoNum < 0 || descontoNum > 100) {
      setErro('O percentual de desconto deve estar entre 0% e 100%.');
      return;
    }

    const economia = precoNum * (descontoNum / 100);
    const precoFinal = precoNum - economia;

    setResultado({
      nomeProduto: produto.trim(),
      precoOriginalFormatado: formatarMoeda(precoNum),
      descontoFormatado: descontoNum.toString().replace('.', ',') + '%',
      economiaFormatada: formatarMoeda(economia),
      precoFinalFormatado: formatarMoeda(precoFinal),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.titulo}>Calculadora de Descontos</Text>
          <Text style={styles.subtitulo}>
            Simule o valor final e a economia nas suas compras
          </Text>

          <Text style={styles.label}>Nome do Produto:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Fone Bluetooth"
            value={produto}
            onChangeText={(texto) => {
              setProduto(texto);
              if (erro) setErro('');
            }}
          />

          <Text style={styles.label}>Preço Original (R$):</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 200,00"
            keyboardType="numeric"
            value={precoOriginal}
            onChangeText={(texto) => {
              setPrecoOriginal(texto);
              if (erro) setErro('');
            }}
          />

          <Text style={styles.label}>Percentual de Desconto (%):</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 15"
            keyboardType="numeric"
            value={percentualDesconto}
            onChangeText={(texto) => {
              setPercentualDesconto(texto);
              if (erro) setErro('');
            }}
          />

          {erro ? <Text style={styles.textoErro}>{erro}</Text> : null}

          <TouchableOpacity style={styles.botao} onPress={aplicarDesconto}>
            <Text style={styles.textoBotao}>Aplicar desconto</Text>
          </TouchableOpacity>

          {resultado ? (
            <View style={styles.caixaResultado}>
              <Text style={styles.produtoResultado}>
                {resultado.nomeProduto}
              </Text>
              <Text style={styles.detalheResultado}>
                De {resultado.precoOriginalFormatado} com {resultado.descontoFormatado} de desconto
              </Text>

              <View style={styles.divisor} />

              <Text style={styles.textoEconomia}>
                Economia: {resultado.economiaFormatada}
              </Text>
              <Text style={styles.textoPrecoFinal}>
                Preço final: {resultado.precoFinalFormatado}
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF5FF',
  },
  scrollContainer: {
    flexGrow: 1,
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
    color: '#581C87',
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
    marginBottom: 6,
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
    backgroundColor: '#7E22CE',
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
    backgroundColor: '#F3E8FF',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8B4FE',
  },
  produtoResultado: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3B0764',
    marginBottom: 4,
  },
  detalheResultado: {
    fontSize: 13,
    color: '#6B21A8',
    textAlign: 'center',
  },
  divisor: {
    height: 1,
    width: '100%',
    backgroundColor: '#D8B4FE',
    marginVertical: 12,
  },
  textoEconomia: {
    fontSize: 15,
    fontWeight: '600',
    color: '#15803D',
    marginBottom: 4,
  },
  textoPrecoFinal: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#581C87',
  },
});