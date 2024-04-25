import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import PatternDivider from "./assets/images/pattern-divider-mobile.svg";
import DiceIcon from "./assets/images/icon-dice.svg";

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

function FetchRandomAdviceButton({ onPress }: FetchRandomAdviceButtonProps) {
  const [isBeingPressed, setIsBeingPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setIsBeingPressed(true)}
      onPressOut={() => setIsBeingPressed(false)}
      onPress={onPress}
      style={
        isBeingPressed
          ? { ...styles.diceIcon, ...styles.diceIconActive }
          : { ...styles.diceIcon }
      }
    >
      <DiceIcon />
    </Pressable>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentAdvice, setCurrentAdvice] = useState<SlipObject | undefined>();

  async function getAdvice() {
    try {
      setIsLoading(true);
      setIsError(false);

      const response = await fetch("https://api.adviceslip.com/advice", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
      });
      const data = (await response.json()) as AdviceApiResponse;

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
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            opacity: currentAdvice && isLoading ? 0.5 : 1,
          }}
          role="main"
        >
          {!currentAdvice && isLoading ? (
            <View>
              <Text style={styles.adviceHeader} role="heading">
                Loading...
              </Text>
              <ActivityIndicator size={64} style={{ marginVertical: 48 }} />
            </View>
          ) : (
            <>
              <Text style={styles.adviceHeader} role="heading">
                {isError
                  ? "Something went wrong!"
                  : `Advice #${currentAdvice?.id}`}
              </Text>
              <Text style={styles.advice}>
                {isError
                  ? "Try checking your internet connection."
                  : `"${currentAdvice?.advice}"`}
              </Text>
              <PatternDivider style={{ marginBottom: 40 }} />
              <FetchRandomAdviceButton
                onPress={() => {
                  getAdvice();
                }}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Manrope",
    flex: 1,
    backgroundColor: "hsl(218, 23%, 16%)",
    alignItems: "center",
    justifyContent: "center",
  },
  adviceContainer: {
    backgroundColor: "hsl(217, 19%, 24%)",
    display: "flex",
    alignItems: "center",
    width: "90%",
    maxWidth: 800,
    padding: 20,
    elevation: 10,
  },
  adviceHeader: {
    textTransform: "uppercase",
    color: "hsl(150, 100%, 66%)",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 4,
    marginTop: 30,
  },
  advice: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    marginVertical: 30,
    fontWeight: "bold",
  },
  diceIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: -45,
    backgroundColor: "hsl(150, 100%, 66%)",
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  diceIconActive: {
    elevation: 30,
    backgroundColor: "hsl(150, 100%, 80%)",
    shadowColor: "hsl(150, 100%, 66%)",
  },
});
