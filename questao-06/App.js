import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function App() {
  const [votosCandidato1, setVotosCandidato1] = useState(0);
  const [votosCandidato2, setVotosCandidato2] = useState(0);
  const [votosCandidato3, setVotosCandidato3] = useState(0);

  const candidatos = [
    { id: 1, nome: 'Ana Clara (Chapa 1)', votos: votosCandidato1 },
    { id: 2, nome: 'Bruno Souza (Chapa 2)', votos: votosCandidato2 },
    { id: 3, nome: 'Carla Mendes (Chapa 3)', votos: votosCandidato3 },
  ];

  const registrarVoto = (id) => {
    if (id === 1) setVotosCandidato1((prev) => prev + 1);
    if (id === 2) setVotosCandidato2((prev) => prev + 1);
    if (id === 3) setVotosCandidato3((prev) => prev + 1);
  };

  const zerarEleicao = () => {
    setVotosCandidato1(0);
    setVotosCandidato2(0);
    setVotosCandidato3(0);
  };

  const totalGeral = votosCandidato1 + votosCandidato2 + votosCandidato3;

  const obterStatusLideranca = () => {
    if (totalGeral === 0) {
      return 'Nenhum voto registrado até o momento.';
    }

    const maiorVotacao = Math.max(
      votosCandidato1,
      votosCandidato2,
      votosCandidato3
    );

    const lideres = candidatos.filter((c) => c.votos === maiorVotacao);

    if (lideres.length > 1) {
      const nomesEmpatados = lideres.map((c) => c.nome).join(' e ');
      return 'Empate na liderança entre: ' + nomesEmpatados + ' (' + maiorVotacao + ' votos cada)';
    }

    return 'Mais votado: ' + lideres[0].nome + ' (' + maiorVotacao + ' votos)';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.titulo}>Eleição Estudantil</Text>
          <Text style={styles.subtitulo}>
            Selecione um candidato abaixo para registrar seu voto
          </Text>

          {candidatos.map((candidato) => (
            <View key={candidato.id} style={styles.itemCandidato}>
              <View style={styles.infoCandidato}>
                <Text style={styles.nomeCandidato}>{candidato.nome}</Text>
                <Text style={styles.contagemVotos}>
                  Votos: <Text style={styles.numeroVotos}>{candidato.votos}</Text>
                </Text>
              </View>

              <TouchableOpacity
                style={styles.botaoVotar}
                onPress={() => registrarVoto(candidato.id)}
              >
                <Text style={styles.textoBotaoVotar}>Votar</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.painelResumo}>
            <Text style={styles.totalGeral}>
              Total Geral de Votos: {totalGeral}
            </Text>
            <View style={styles.divisor} />
            <Text style={styles.textoLideranca}>{obterStatusLideranca()}</Text>
          </View>

          {totalGeral > 0 ? (
            <TouchableOpacity style={styles.botaoZerar} onPress={zerarEleicao}>
              <Text style={styles.textoBotaoZerar}>Zerar Votação</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
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
    color: '#312E81',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 22,
  },
  itemCandidato: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  infoCandidato: {
    flex: 1,
    paddingRight: 10,
  },
  nomeCandidato: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  contagemVotos: {
    fontSize: 14,
    color: '#475569',
  },
  numeroVotos: {
    fontWeight: 'bold',
    color: '#4338CA',
  },
  botaoVotar: {
    backgroundColor: '#4F46E5',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  textoBotaoVotar: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  painelResumo: {
    marginTop: 12,
    backgroundColor: '#E0E7FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  totalGeral: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1B4B',
  },
  divisor: {
    height: 1,
    width: '100%',
    backgroundColor: '#C7D2FE',
    marginVertical: 10,
  },
  textoLideranca: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3730A3',
    textAlign: 'center',
  },
  botaoZerar: {
    marginTop: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textoBotaoZerar: {
    color: '#6B7280',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});