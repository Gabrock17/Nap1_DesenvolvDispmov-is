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
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const validarNota = (valorTexto) => {
    if (!valorTexto.trim()) return null;
    const numero = parseFloat(valorTexto.replace(',', '.'));
    if (isNaN(numero) || numero < 0 || numero > 10) return null;
    return numero;
  };

  const calcularMedia = () => {
    Keyboard.dismiss();
    setErro('');
    setResultado(null);

    if (!nome.trim()) {
      setErro('Por favor, informe o nome do estudante.');
      return;
    }

    const n1 = validarNota(nota1);
    const n2 = validarNota(nota2);
    const n3 = validarNota(nota3);

    if (n1 === null || n2 === null || n3 === null) {
      setErro('Insira três notas válidas entre 0 e 10.');
      return;
    }

    const media = (n1 + n2 + n3) / 3;
    const aprovado = media >= 7.0;

    setResultado({
      estudante: nome.trim(),
      mediaFormatada: media.toFixed(1).replace('.', ','),
      situacao: aprovado ? 'Aprovado' : 'Reprovado',
      aprovado,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.titulo}>Sistema Acadêmico</Text>
          <Text style={styles.subtitulo}>
            Cálculo de média aritmética e situação do estudante
          </Text>

          <Text style={styles.label}>Nome do Estudante:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Maria Silva"
            value={nome}
            onChangeText={(texto) => {
              setNome(texto);
              if (erro) setErro('');
            }}
          />

          <View style={styles.linhaNotas}>
            <View style={styles.colunaNota}>
              <Text style={styles.label}>Nota 1:</Text>
              <TextInput
                style={styles.input}
                placeholder="0 a 10"
                keyboardType="numeric"
                value={nota1}
                onChangeText={(texto) => {
                  setNota1(texto);
                  if (erro) setErro('');
                }}
              />
            </View>

            <View style={styles.colunaNota}>
              <Text style={styles.label}>Nota 2:</Text>
              <TextInput
                style={styles.input}
                placeholder="0 a 10"
                keyboardType="numeric"
                value={nota2}
                onChangeText={(texto) => {
                  setNota2(texto);
                  if (erro) setErro('');
                }}
              />
            </View>

            <View style={styles.colunaNota}>
              <Text style={styles.label}>Nota 3:</Text>
              <TextInput
                style={styles.input}
                placeholder="0 a 10"
                keyboardType="numeric"
                value={nota3}
                onChangeText={(texto) => {
                  setNota3(texto);
                  if (erro) setErro('');
                }}
              />
            </View>
          </View>

          {erro ? <Text style={styles.textoErro}>{erro}</Text> : null}

          <TouchableOpacity style={styles.botao} onPress={calcularMedia}>
            <Text style={styles.textoBotao}>Calcular média</Text>
          </TouchableOpacity>

          {resultado && (
            <View
              style={[
                styles.caixaResultado,
                resultado.aprovado ? styles.caixaAprovado : styles.caixaReprovado,
              ]}
            >
              <Text style={styles.nomeResultado}>
                Estudante: {resultado.estudante}
              </Text>
              <Text style={styles.mediaResultado}>
                Média: {resultado.mediaFormatada}
              </Text>
              <Text
                style={[
                  styles.situacaoResultado,
                  resultado.aprovado
                    ? styles.textoAprovado
                    : styles.textoReprovado,
                ]}
              >
                Situação: {resultado.situacao}
              </Text>
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
    backgroundColor: '#F0F4F8',
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
    color: '#1E3A8A',
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
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    marginBottom: 14,
  },
  linhaNotas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  colunaNota: {
    flex: 1,
  },
  textoErro: {
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '500',
  },
  botao: {
    backgroundColor: '#2563EB',
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
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  caixaAprovado: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
  },
  caixaReprovado: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5',
  },
  nomeResultado: {
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 4,
  },
  mediaResultado: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  situacaoResultado: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  textoAprovado: {
    color: '#15803D',
  },
  textoReprovado: {
    color: '#B91C1C',
  },
});