import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const PRODUTOS_DISPONIVEIS = [
  { id: 1, nome: 'Sanduíche Natural', preco: 8.0 },
  { id: 2, nome: 'Suco Natural', preco: 5.0 },
  { id: 3, nome: 'Salgado Assado', preco: 6.5 },
  { id: 4, nome: 'Café Expresso', preco: 4.0 },
];

export default function App() {
  const [quantidadesSelecionadas, setQuantidadesSelecionadas] = useState({
    1: 1,
    2: 1,
    3: 1,
    4: 1,
  });
  const [pedido, setPedido] = useState([]);
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);

  const formatarMoeda = (valor) => {
    const partes = valor.toFixed(2).split('.');
    const inteiro = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return 'R$ ' + inteiro + ',' + partes[1];
  };

  const alterarQuantidadeCatalogo = (id, delta) => {
    setQuantidadesSelecionadas((prev) => {
      const novaQtd = (prev[id] || 1) + delta;
      return {
        ...prev,
        [id]: novaQtd < 1 ? 1 : novaQtd,
      };
    });
  };

  const adicionarAoPedido = (produto) => {
    const qtd = quantidadesSelecionadas[produto.id] || 1;
    setPedidoFinalizado(false);

    setPedido((listaAtual) => {
      const indiceExistente = listaAtual.findIndex(
        (item) => item.id === produto.id
      );

      if (indiceExistente !== -1) {
        const novaLista = [...listaAtual];
        const itemAtual = novaLista[indiceExistente];
        const novaQuantidade = itemAtual.quantidade + qtd;
        novaLista[indiceExistente] = {
          ...itemAtual,
          quantidade: novaQuantidade,
          subtotal: novaQuantidade * itemAtual.preco,
        };
        return novaLista;
      }

      const novoItem = {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: qtd,
        subtotal: qtd * produto.preco,
      };

      return [...listaAtual, novoItem];
    });
  };

  const removerItemPedido = (id) => {
    setPedidoFinalizado(false);
    setPedido((listaAtual) => listaAtual.filter((item) => item.id !== id));
  };

  const limparPedido = () => {
    setPedido([]);
    setPedidoFinalizado(false);
  };

  const totalGeral = pedido.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.titulo}>Lanchonete Universitária</Text>
          <Text style={styles.subtitulo}>
            Selecione os produtos e monte seu pedido
          </Text>

          <Text style={styles.tituloSecao}>Cardápio</Text>
          {PRODUTOS_DISPONIVEIS.map((produto) => {
            const qtdAtual = quantidadesSelecionadas[produto.id] || 1;
            return (
              <View key={produto.id} style={styles.itemCatalogo}>
                <View style={styles.infoProduto}>
                  <Text style={styles.nomeProduto}>{produto.nome}</Text>
                  <Text style={styles.precoProduto}>
                    {formatarMoeda(produto.preco)}
                  </Text>
                </View>

                <View style={styles.controlesQuantidade}>
                  <TouchableOpacity
                    style={styles.botaoQtd}
                    onPress={() => alterarQuantidadeCatalogo(produto.id, -1)}
                  >
                    <Text style={styles.textoBotaoQtd}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.valorQtd}>{qtdAtual}</Text>

                  <TouchableOpacity
                    style={styles.botaoQtd}
                    onPress={() => alterarQuantidadeCatalogo(produto.id, 1)}
                  >
                    <Text style={styles.textoBotaoQtd}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.botaoAdicionar}
                  onPress={() => adicionarAoPedido(produto)}
                >
                  <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            );
          })}

          <View style={styles.divisor} />

          <Text style={styles.tituloSecao}>
            Itens do Pedido ({pedido.length})
          </Text>

          {pedido.length === 0 ? (
            <View style={styles.caixaVazia}>
              <Text style={styles.textoVazio}>
                Nenhum item adicionado ao pedido ainda.
              </Text>
            </View>
          ) : (
            <View>
              {pedido.map((item) => (
                <View key={item.id} style={styles.itemPedido}>
                  <View style={styles.detalhesItemPedido}>
                    <Text style={styles.nomeItemPedido}>
                      {item.quantidade}x {item.nome}
                    </Text>
                    <Text style={styles.subtotalItemPedido}>
                      Unitário: {formatarMoeda(item.preco)} | Subtotal:{' '}
                      <Text style={styles.negrito}>
                        {formatarMoeda(item.subtotal)}
                      </Text>
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.botaoRemover}
                    onPress={() => removerItemPedido(item.id)}
                  >
                    <Text style={styles.textoBotaoRemover}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <View style={styles.painelTotal}>
                <Text style={styles.labelTotal}>Total do Pedido:</Text>
                <Text style={styles.valorTotal}>
                  {formatarMoeda(totalGeral)}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.botaoFinalizar}
                onPress={() => setPedidoFinalizado(true)}
              >
                <Text style={styles.textoBotaoFinalizar}>
                  Exibir Resumo Final
                </Text>
              </TouchableOpacity>

              {pedidoFinalizado ? (
                <View style={styles.caixaResumoFinal}>
                  <Text style={styles.tituloResumo}>
                    Resumo Final do Pedido
                  </Text>
                  {pedido.map((item) => (
                    <Text key={item.id} style={styles.linhaResumo}>
                      • {item.quantidade}x {item.nome} —{' '}
                      {formatarMoeda(item.subtotal)}
                    </Text>
                  ))}
                  <View style={styles.divisorResumo} />
                  <Text style={styles.totalResumo}>
                    Valor Total a Pagar: {formatarMoeda(totalGeral)}
                  </Text>

                  <TouchableOpacity
                    style={styles.botaoNovoPedido}
                    onPress={limparPedido}
                  >
                    <Text style={styles.textoBotaoNovoPedido}>
                      Iniciar Novo Pedido
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
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
    backgroundColor: '#FFFBEB',
  },
  scrollContainer: {
    padding: 18,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#92400E',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#78716C',
    textAlign: 'center',
    marginBottom: 20,
  },
  tituloSecao: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1C1917',
    marginBottom: 10,
  },
  itemCatalogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAF9',
    borderWidth: 1,
    borderColor: '#E7E5E4',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  infoProduto: {
    flex: 1,
    paddingRight: 6,
  },
  nomeProduto: {
    fontSize: 15,
    fontWeight: '600',
    color: '#292524',
  },
  precoProduto: {
    fontSize: 13,
    color: '#B45309',
    fontWeight: 'bold',
    marginTop: 2,
  },
  controlesQuantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  botaoQtd: {
    backgroundColor: '#E7E5E4',
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotaoQtd: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1917',
  },
  valorQtd: {
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: '#1C1917',
  },
  botaoAdicionar: {
    backgroundColor: '#D97706',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  textoBotaoAdicionar: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  divisor: {
    height: 1,
    backgroundColor: '#E7E5E4',
    marginVertical: 16,
  },
  caixaVazia: {
    backgroundColor: '#F5F5F4',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  textoVazio: {
    color: '#78716C',
    fontSize: 14,
  },
  itemPedido: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  detalhesItemPedido: {
    flex: 1,
    paddingRight: 8,
  },
  nomeItemPedido: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#78350F',
  },
  subtotalItemPedido: {
    fontSize: 13,
    color: '#92400E',
    marginTop: 2,
  },
  negrito: {
    fontWeight: 'bold',
  },
  botaoRemover: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  textoBotaoRemover: {
    color: '#B91C1C',
    fontSize: 12,
    fontWeight: 'bold',
  },
  painelTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F4',
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 12,
  },
  labelTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#292524',
  },
  valorTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B45309',
  },
  botaoFinalizar: {
    backgroundColor: '#15803D',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoFinalizar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  caixaResumoFinal: {
    marginTop: 16,
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
    borderRadius: 10,
    padding: 16,
  },
  tituloResumo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#14532D',
    marginBottom: 8,
    textAlign: 'center',
  },
  linhaResumo: {
    fontSize: 14,
    color: '#166534',
    marginBottom: 4,
  },
  divisorResumo: {
    height: 1,
    backgroundColor: '#86EFAC',
    marginVertical: 10,
  },
  totalResumo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#14532D',
    textAlign: 'center',
    marginBottom: 12,
  },
  botaoNovoPedido: {
    backgroundColor: '#166534',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoBotaoNovoPedido: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});