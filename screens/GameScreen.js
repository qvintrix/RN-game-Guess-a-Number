import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value, numOfRound) => {
  return (
    <View key={value} style={styles.listItem}>
      <Text>#{numOfRound}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [avalableDeviceWidth, setAvalableDeviceWidth] = useState(
    Dimensions.get('window').width,
  );

  const [avalableDeviceHeight, setAvalableDeviceHeight] = useState(
    Dimensions.get('window').height,
  );

  useEffect(() => {
    const updateLayout = () => {
      setAvalableDeviceWidth(Dimensions.get('window').width);
      setAvalableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);
    return Dimensions.removeEventListener('change', updateLayout);
  });
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const {userChoice, onGameScreen} = props;
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameScreen(pastGuesses.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGuess, userChoice, onGameScreen]);
  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong ...', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
  };

  if (avalableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={styles.headerTitle}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <Button
            title="Lower"
            onPress={nextGuessHandler.bind(this, 'lower')}
          />
          <NumberContainer>{currentGuess}</NumberContainer>
          <Button
            title="Greater"
            onPress={nextGuessHandler.bind(this, 'greater')}
          />
        </View>
        <View style={styles.list}>
          <ScrollView>
            {pastGuesses.map((guess, i) =>
              renderListItem(guess, pastGuesses.length - i),
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Text style={styles.headerTitle}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.buttonContainer,
          marginTop: avalableDeviceHeight > 600 ? 20 : 5,
        }}>
        <Button title="Lower" onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button
          title="Greater"
          onPress={nextGuessHandler.bind(this, 'greater')}
        />
      </Card>
      <View style={styles.list}>
        <ScrollView>
          {pastGuesses.map((guess, i) =>
            renderListItem(guess, pastGuesses.length - i),
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 400,
    maxWidth: '90%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  list: {
    width: '80%',
    flex: 1,
  },
});

export default GameScreen;
