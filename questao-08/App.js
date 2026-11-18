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
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  const [estudantes, setEstudantes] = useState([]);
  const [erro, setErro] = useState('');

  const cadastrarEstudante = () => {
    Keyboard.dismiss();
    setErro('');

    const nomeLimpo = nome.trim();
    const matriculaLimpa = matricula.trim();
    const emailLimpo = email.trim();
    const cursoLimpo = curso.trim();

    if (!nomeLimpo || !matriculaLimpa || !emailLimpo || !cursoLimpo) {
      setErro('Todos os campos são obrigatórios.');
      return;
    }

    if (!emailLimpo.includes('@') || !emailLimpo.includes('.')) {
      setErro('Informe um endereço de e-mail válido.');
      return;
    }

    const matriculaExiste = estudantes.some(
      (est) => est.matricula.toLowerCase() === matriculaLimpa.toLowerCase()
    );

    if (matriculaExiste) {
      setErro('Já existe um estudante cadastrado com esta matrícula.');
      return;
    }

    const novoEstudante = {
      nome: nomeLimpo,
      matricula: matriculaLimpa,
      email: emailLimpo,
      curso: cursoLimpo,
    };

    setEstudantes((listaAtual) => [...listaAtual, novoEstudante]);
    setNome('');
    setMatricula('');
    setEmail('');
    setCurso('');
  };

  const removerEstudante = (matriculaAlvo) => {
    setEstudantes((listaAtual) =>
      listaAtual.filter((est) => est.matricula !== matriculaAlvo)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.cardFormulario}>
          <Text style={styles.titulo}>Cadastro de Estudantes</Text>
          <Text style={styles.subtitulo}>
            Registo académico e consulta de alunos
          </Text>

          <Text style={styles.label}>Nome Completo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Maria Silva"
            value={nome}
            onChangeText={(texto) => {
              setNome(texto);
              if (erro) setErro('');
            }}
          />

          <Text style={styles.label}>Matrícula:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 20260001"
            value={matricula}
            onChangeText={(texto) => {
              setMatricula(texto);
              if (erro) setErro('');
            }}
          />

          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: maria@exemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(texto) => {
              setEmail(texto);
              if (erro) setErro('');
            }}
          />

          <Text style={styles.label}>Curso:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Licenciatura em Computação"
            value={curso}
            onChangeText={(texto) => {
              setCurso(texto);
              if (erro) setErro('');
            }}
          />

          {erro ? <Text style={styles.textoErro}>{erro}</Text> : null}

          <TouchableOpacity style={styles.botaoCadastrar} onPress={cadastrarEstudante}>
            <Text style={styles.textoBotao}>Cadastrar Estudante</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.secaoLista}>
          <Text style={styles.tituloSecao}>
            Estudantes Registados ({estudantes.length})
          </Text>

          {estudantes.length === 0 ? (
            <View style={styles.cardVazio}>
              <Text style={styles.textoVazio}>
                Nenhum estudante cadastrado até o momento.
              </Text>
            </View>
          ) : (
            estudantes.map((item) => (
              <View key={item.matricula} style={styles.cardEstudante}>
                <View style={styles.cabecalhoCard}>
                  <Text style={styles.nomeEstudante}>{item.nome}</Text>
                  <TouchableOpacity
                    style={styles.botaoRemover}
                    onPress={() => removerEstudante(item.matricula)}
                  >
                    <Text style={styles.textoBotaoRemover}>Remover</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.infoEstudante}>
                  <Text style={styles.negrito}>Matrícula:</Text> {item.matricula}
                </Text>
                <Text style={styles.infoEstudante}>
                  <Text style={styles.negrito}>E-mail:</Text> {item.email}
                </Text>
                <Text style={styles.infoEstudante}>
                  <Text style={styles.negrito}>Curso:</Text> {item.curso}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  cardFormulario: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#F8FAFC',
    marginBottom: 12,
  },
  textoErro: {
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '500',
  },
  botaoCadastrar: {
    backgroundColor: '#0284C7',
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
  secaoLista: {
    flex: 1,
  },
  tituloSecao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  cardVazio: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textoVazio: {
    color: '#64748B',
    fontSize: 14,
  },
  cardEstudante: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0284C7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cabecalhoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nomeEstudante: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0F172A',
    flex: 1,
    paddingRight: 8,
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
  infoEstudante: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 3,
  },
  negrito: {
    fontWeight: '600',
    color: '#1E293B',
  },
});