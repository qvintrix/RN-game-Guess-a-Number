import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

import MainButton from '../components/MainButton';

const GameOverScreen = props => {
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width,
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height,
  );

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text>The Game is Over!</Text>
        <View
          style={{
            ...styles.imageContainer,
            width: availableDeviceWidth * 0.7,
            height: availableDeviceWidth * 0.7,
            borderRadius: (availableDeviceWidth * 0.7) / 2,
            marginVertical: availableDeviceHeight / 30,
          }}>
          <Image
            style={styles.image}
            source={require('../assets/success.png')}
            resizeMode="cover"
          />
        </View>
        <Text>Number of rounds: {props.roundsNumber}</Text>
        <Text>Number was: {props.userNumber}</Text>
        <MainButton onPress={props.onRestart}>New Game</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default GameOverScreen;
