import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PatternDivider from './assets/images/pattern-divider-mobile.svg';
import DiceIcon from './assets/images/icon-dice.svg';

interface SlipObject {
  id: number;
  advice: string;
}

type AdviceApiResponse = {
  slip: SlipObject;
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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentAdvice, setCurrentAdvice] = useState<SlipObject | undefined>();

  async function getAdvice() {
    try {
      setIsLoading(true);
      setIsError(false);

      const headers = new Headers();
      headers.append('pragma', 'no-cache');
      headers.append('cache-control', 'no-cache');

      const response = await fetch('https://api.adviceslip.com/advice', {
        headers: headers,
      });
      const data = await response.json();

      setCurrentAdvice(data.slip);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.adviceContainer}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            opacity: currentAdvice && isLoading ? 0.5 : 1,
          }}>
          {!currentAdvice && isLoading ? (
            <View>
              <Text style={styles.adviceHeader}>Loading...</Text>
              <ActivityIndicator size={64} style={{marginVertical: 48}} />
            </View>
          ) : isError ? (
            <>
              <Text style={styles.adviceHeader}> Something went wrong!</Text>
              <Text style={styles.advice}>
                Try checking your internet connection.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.adviceHeader}>
                Advice #{currentAdvice?.id}
              </Text>
              <Text style={styles.advice}>"{currentAdvice?.advice}"</Text>
            </>
          )}
        </View>
        <PatternDivider style={{marginBottom: 50}} />
        <FetchRandomAdviceButton
          onPress={() => {
            getAdvice();
          }}
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
