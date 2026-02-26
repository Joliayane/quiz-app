import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { questions } from '../data/questions';

export default function QuizScreen() {

  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);

  const [score, setScore] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const currentQuestion = questions[currentIndex];

  function handleAnswer(choice) {
    if (selectedAnswers[currentIndex] !== undefined) return;

    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: choice });

    if (choice === currentQuestion.answer) {
      setScore(score + 1);
    }
  }

  function goNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function goPrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  function finishQuiz() {
    router.push({
      pathname: '/results',
      params: { score: score, total: questions.length },
    });
  }

  function getButtonStyle(choice) {
    const picked = selectedAnswers[currentIndex];

    if (picked === undefined) return styles.choiceButton;

    if (choice === currentQuestion.answer) return [styles.choiceButton, styles.correct];

    if (choice === picked) return [styles.choiceButton, styles.wrong];

    return styles.choiceButton;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.counter}>
        Question {currentIndex + 1} of {questions.length}
      </Text>

      <Text style={styles.scoreText}>Score: {score}</Text>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${((currentIndex + 1) / questions.length) * 100}%` },
          ]}
        />
      </View>

      <Text style={styles.question}>{currentQuestion.question}</Text>

      {currentQuestion.choices.map((choice, index) => (
        <TouchableOpacity
          key={index}
          style={getButtonStyle(choice)}
          onPress={() => handleAnswer(choice)}
        >
          <Text style={styles.choiceText}>{choice}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.navRow}>

        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
          onPress={goPrevious}
          disabled={currentIndex === 0}
        >
          <Text style={styles.navButtonText}>← Previous</Text>
        </TouchableOpacity>

        {currentIndex < questions.length - 1 ? (
          <TouchableOpacity style={styles.navButton} onPress={goNext}>
            <Text style={styles.navButtonText}>Next →</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.navButton, styles.finishButton]} onPress={finishQuiz}>
            <Text style={styles.navButtonText}>Finish ✓</Text>
          </TouchableOpacity>
        )}

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f4ff',
    padding: 24,
    paddingTop: 60,
  },
  counter: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#df016c',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
    marginBottom: 32,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#df016c',
    borderRadius: 4,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 24,
    lineHeight: 28,
  },
  choiceButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  correct: {
    borderColor: '#22c55e',
    backgroundColor: '#f0fdf4',
  },
  wrong: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  choiceText: {
    fontSize: 15,
    color: '#1a1a2e',
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 40,
  },
  navButton: {
    backgroundColor: '#df016c',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  finishButton: {
    backgroundColor: '#22c55e',
  },
  disabledButton: {
    backgroundColor: '#c7d2fe',
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});