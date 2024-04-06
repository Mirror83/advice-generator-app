import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import PatternDivider from './assets/images/pattern-divider-mobile.svg';
import DiceIcon from './assets/images/icon-dice.svg';

interface SlipObject {
  slipId: number;
  advice: string;
}

const slipObject: SlipObject = {
  slipId: 117,
  advice:
    'It is easy to sit up and take notice, what is not easy is getting up and taking action',
};

interface FetchRandomAdviceButtonProps {
  onPress: () => void;
}

function FetchRandomAdviceButton({onPress}: FetchRandomAdviceButtonProps) {
  const [isBeingPressed, setIsBeingPressed] = useState(false);

  return (
    <View
      style={
        isBeingPressed
          ? {...styles.diceIcon, ...styles.diceIconActive}
          : {...styles.diceIcon}
      }>
      <Pressable
        onPressIn={() => setIsBeingPressed(true)}
        onPressOut={() => setIsBeingPressed(false)}
        onPress={onPress}>
        <DiceIcon />
      </Pressable>
    </View>
  );
}

function App() {
  return (
    <View style={styles.container}>
      <View style={styles.adviceContainer}>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <Text style={styles.adviceHeader}>Advice #{slipObject.slipId}</Text>
          <Text style={styles.advice}>"{slipObject.advice}"</Text>
        </View>
        <PatternDivider style={{marginBottom: 50}} />
        <FetchRandomAdviceButton
          onPress={() => console.log('Fetch new advice')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'hsl(218, 23%, 16%)',
  },
  adviceContainer: {
    backgroundColor: 'hsl(217, 19%, 24%)',
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    padding: 20,
    elevation: 10,
  },
  adviceHeader: {
    textTransform: 'uppercase',
    color: 'hsl(150, 100%, 66%)',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 4,
    marginTop: 30,
  },
  advice: {
    fontFamily: 'Manrope',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginVertical: 30,
    fontWeight: 'bold',
  },
  diceIcon: {
    position: 'absolute',
    left: '47.2%',
    bottom: -30,
    backgroundColor: 'hsl(150, 100%, 66%)',
    padding: 20,
    borderRadius: 50,
  },
  diceIconActive: {
    elevation: 30,
    backgroundColor: 'hsl(150, 100%, 80%)',
    shadowColor: 'hsl(150, 100%, 66%)',
  },
});

export default App;
