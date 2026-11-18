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
  const [nomeProduto, setNomeProduto] = useState('');
  const [quantidadeInicialInput, setQuantidadeInicialInput] = useState('');
  const [produtoAtivo, setProdutoAtivo] = useState(null);
  const [estoqueAtual, setEstoqueAtual] = useState(0);
  const [movimentacaoInput, setMovimentacaoInput] = useState('');
  const [erro, setErro] = useState('');

  const iniciarControle = () => {
    Keyboard.dismiss();
    setErro('');

    if (!nomeProduto.trim()) {
      setErro('Informe o nome do produto.');
      return;
    }

    const qtdInicial = parseInt(quantidadeInicialInput, 10);
    if (isNaN(qtdInicial) || qtdInicial < 0) {
      setErro('Informe uma quantidade inicial válida (0 ou maior).');
      return;
    }

    setProdutoAtivo(nomeProduto.trim());
    setEstoqueAtual(qtdInicial);
    setMovimentacaoInput('');
  };

  const validarMovimentacao = () => {
    if (!movimentacaoInput.trim()) {
      setErro('Informe a quantidade para movimentação.');
      return null;
    }

    const qtd = parseInt(movimentacaoInput, 10);
    if (isNaN(qtd) || qtd <= 0) {
      setErro('A quantidade de movimentação deve ser maior que zero.');
      return null;
    }

    return qtd;
  };

  const adicionarEstoque = () => {
    Keyboard.dismiss();
    setErro('');

    const qtd = validarMovimentacao();
    if (qtd === null) return;

    setEstoqueAtual((prev) => prev + qtd);
    setMovimentacaoInput('');
  };

  const retirarEstoque = () => {
    Keyboard.dismiss();
    setErro('');

    const qtd = validarMovimentacao();
    if (qtd === null) return;

    if (qtd > estoqueAtual) {
      setErro(
        'Retirada bloqueada! Estoque disponível: ' + estoqueAtual + ' unidade(s).'
      );
      return;
    }

    setEstoqueAtual((prev) => prev - qtd);
    setMovimentacaoInput('');
  };

  const reiniciar = () => {
    setProdutoAtivo(null);
    setNomeProduto('');
    setQuantidadeInicialInput('');
    setMovimentacaoInput('');
    setEstoqueAtual(0);
    setErro('');
  };

  const estoqueBaixo = produtoAtivo !== null && estoqueAtual < 5;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.titulo}>Controle de Estoque</Text>
          <Text style={styles.subtitulo}>
            Gerenciamento de entradas e saídas de produtos
          </Text>

          {!produtoAtivo ? (
            <View>
              <Text style={styles.label}>Nome do Produto:</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Café Torrado 500g"
                value={nomeProduto}
                onChangeText={(texto) => {
                  setNomeProduto(texto);
                  if (erro) setErro('');
                }}
              />

              <Text style={styles.label}>Quantidade Inicial:</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 20"
                keyboardType="numeric"
                value={quantidadeInicialInput}
                onChangeText={(texto) => {
                  setQuantidadeInicialInput(texto.replace(/[^0-9]/g, ''));
                  if (erro) setErro('');
                }}
              />

              {erro ? <Text style={styles.textoErro}>{erro}</Text> : null}

              <TouchableOpacity
                style={styles.botaoPrincipal}
                onPress={iniciarControle}
              >
                <Text style={styles.textoBotao}>Iniciar Controle</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={styles.painelStatus}>
                <Text style={styles.labelProduto}>Produto:</Text>
                <Text style={styles.valorProduto}>{produtoAtivo}</Text>

                <Text style={styles.labelSaldo}>Quantidade Disponível:</Text>
                <Text
                  style={[
                    styles.valorSaldo,
                    estoqueBaixo ? styles.valorSaldoCritico : null,
                  ]}
                >
                  {estoqueAtual} {estoqueAtual === 1 ? 'unidade' : 'unidades'}
                </Text>
              </View>

              {estoqueBaixo ? (
                <View style={styles.caixaAlerta}>
                  <Text style={styles.textoAlerta}>
                    Atenção: Estoque baixo! Restam menos de 5 unidades.
                  </Text>
                </View>
              ) : null}

              <Text style={styles.label}>Quantidade da Movimentação:</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 7"
                keyboardType="numeric"
                value={movimentacaoInput}
                onChangeText={(texto) => {
                  setMovimentacaoInput(texto.replace(/[^0-9]/g, ''));
                  if (erro) setErro('');
                }}
              />

              {erro ? <Text style={styles.textoErro}>{erro}</Text> : null}

              <View style={styles.linhaBotoes}>
                <TouchableOpacity
                  style={[styles.botaoAcao, styles.botaoAdicionar]}
                  onPress={adicionarEstoque}
                >
                  <Text style={styles.textoBotao}>Adicionar estoque</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.botaoAcao, styles.botaoRetirar]}
                  onPress={retirarEstoque}
                >
                  <Text style={styles.textoBotao}>Retirar estoque</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.botaoSecundario} onPress={reiniciar}>
                <Text style={styles.textoBotaoSecundario}>
                  Cadastrar outro produto
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
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
    color: '#111827',
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
  botaoPrincipal: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  painelStatus: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  labelProduto: {
    fontSize: 13,
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valorProduto: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 12,
    textAlign: 'center',
  },
  labelSaldo: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4,
  },
  valorSaldo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#059669',
  },
  valorSaldoCritico: {
    color: '#DC2626',
  },
  caixaAlerta: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#F59E0B',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textoAlerta: {
    color: '#92400E',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
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
  botaoAdicionar: {
    backgroundColor: '#16A34A',
  },
  botaoRetirar: {
    backgroundColor: '#EA580C',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botaoSecundario: {
    marginTop: 18,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textoBotaoSecundario: {
    color: '#6B7280',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});