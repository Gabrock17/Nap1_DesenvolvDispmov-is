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
  const [saldo, setSaldo] = useState(1000.0);
  const [valorInput, setValorInput] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const formatarMoeda = (valor) => {
    const partes = valor.toFixed(2).split('.');
    const inteiro = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return 'R$ ' + inteiro + ',' + partes[1];
  };

  const validarValor = () => {
    if (!valorInput.trim()) {
      setErro('Por favor, informe um valor para a operação.');
      return null;
    }

    const numero = parseFloat(valorInput.replace(',', '.'));

    if (isNaN(numero) || numero <= 0) {
      setErro('O valor deve ser maior que zero.');
      return null;
    }

    return numero;
  };

  const realizarDeposito = () => {
    Keyboard.dismiss();
    setErro('');
    setMensagem('');

    const valor = validarValor();
    if (valor === null) return;

    setSaldo((saldoAtual) => saldoAtual + valor);
    setMensagem('Depósito de ' + formatarMoeda(valor) + ' realizado com sucesso.');
    setValorInput('');
  };

  const realizarSaque = () => {
    Keyboard.dismiss();
    setErro('');
    setMensagem('');

    const valor = validarValor();
    if (valor === null) return;

    if (valor > saldo) {
      setErro(
        'Saldo insuficiente! Você possui ' + formatarMoeda(saldo) + ' disponível.'
      );
      return;
    }

    setSaldo((saldoAtual) => saldoAtual - valor);
    setMensagem('Saque de ' + formatarMoeda(valor) + ' realizado com sucesso.');
    setValorInput('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.titulo}>Simulador Bancário</Text>
          <Text style={styles.subtitulo}>
            Operações financeiras de depósito e saque
          </Text>

          <View style={styles.painelSaldo}>
            <Text style={styles.labelSaldo}>Saldo Atual da Conta</Text>
            <Text style={styles.valorSaldo}>{formatarMoeda(saldo)}</Text>
          </View>

          <Text style={styles.label}>Valor da Operação (R$):</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 200,00"
            keyboardType="numeric"
            value={valorInput}
            onChangeText={(texto) => {
              setValorInput(texto);
              if (erro) setErro('');
              if (mensagem) setMensagem('');
            }}
          />

          {erro ? <Text style={styles.textoErro}>{erro}</Text> : null}
          {mensagem ? <Text style={styles.textoSucesso}>{mensagem}</Text> : null}

          <View style={styles.linhaBotoes}>
            <TouchableOpacity
              style={[styles.botaoAcao, styles.botaoDepositar]}
              onPress={realizarDeposito}
            >
              <Text style={styles.textoBotao}>Depositar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botaoAcao, styles.botaoSacar]}
              onPress={realizarSaque}
            >
              <Text style={styles.textoBotao}>Sacar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFDF5',
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
    color: '#065F46',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  painelSaldo: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  labelSaldo: {
    fontSize: 14,
    color: '#166534',
    marginBottom: 4,
    fontWeight: '500',
  },
  valorSaldo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#047857',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
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
  textoSucesso: {
    color: '#059669',
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '500',
  },
  linhaBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  botaoAcao: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  botaoDepositar: {
    backgroundColor: '#059669',
  },
  botaoSacar: {
    backgroundColor: '#DC2626',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});