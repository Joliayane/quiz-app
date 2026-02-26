import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {

  const router = useRouter();

  return (
    <View style={styles.container}>

      <Text style={styles.icon}>💻</Text>

      <Text style={styles.title}>Code Quiz</Text>

      <Text style={styles.subtitle}>Test your programming knowledge!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/quiz')}
      >
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icon: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 48,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#df016c',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});