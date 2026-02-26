import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ResultsScreen() {

  const router = useRouter();

  const { score, total } = useLocalSearchParams();

  const scoreNum = parseInt(score);
  const totalNum = parseInt(total);

  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    loadHighScore();
  }, []);

  async function loadHighScore() {
    try {
      const saved = await AsyncStorage.getItem('highScore');
      if (saved !== null) {
        const savedNumber = parseInt(saved);
        setHighScore(savedNumber);

        if (scoreNum > savedNumber) {
          await AsyncStorage.setItem('highScore', String(scoreNum));
          setHighScore(scoreNum);
        }
      } else {
        await AsyncStorage.setItem('highScore', String(scoreNum));
        setHighScore(scoreNum);
      }
    } catch (error) {
      console.log('Error loading high score:', error);
    }
  }

  function getEmoji() {
    if (scoreNum === totalNum) return '🏆';
    if (scoreNum >= totalNum * 0.8) return '🎉';
    if (scoreNum >= totalNum * 0.5) return '👍';
    return '📚';
  }

  function getMessage() {
    if (scoreNum === totalNum) return 'Perfect score! Amazing!';
    if (scoreNum >= totalNum * 0.8) return 'Great job! Keep it up!';
    if (scoreNum >= totalNum * 0.5) return 'Not bad! Keep practicing!';
    return 'Keep studying, you got this!';
  }

  return (
    <View style={styles.container}>

      <Text style={styles.emoji}>{getEmoji()}</Text>

      <Text style={styles.title}>Quiz Complete!</Text>

      <Text style={styles.message}>{getMessage()}</Text>

      <View style={styles.scoreBox}>
        <Text style={styles.scoreLabel}>Your Score</Text>
        <Text style={styles.scoreNumber}>{scoreNum} / {totalNum}</Text>
      </View>


      <View style={styles.highScoreBox}>
        <Text style={styles.highScoreLabel}>🏅 High Score</Text>
        <Text style={styles.highScoreNumber}>{highScore} / {totalNum}</Text>
      </View>

      {/* Try Again button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/quiz')}
      >
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.push('/home')}
      >
        <Text style={styles.homeButtonText}>Go Home</Text>
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
  emoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#555',
    marginBottom: 32,
    textAlign: 'center',
  },
  scoreBox: {
    backgroundColor: '#df016c',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  scoreLabel: {
    color: '#c7d2fe',
    fontSize: 14,
    marginBottom: 4,
  },
  scoreNumber: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  highScoreBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  highScoreLabel: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
  },
  highScoreNumber: {
    color: '#1a1a2e',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#df016c',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#df016c',
  },
  homeButtonText: {
    color: '#df016c',
    fontSize: 16,
    fontWeight: 'bold',
  },
});