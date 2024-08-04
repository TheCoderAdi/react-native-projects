import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
} from "react-native";
import { Container } from "@/components/Container";

type Player = "X" | "O" | null;
type Board = Player[];

const initialBoard: Board = Array(9).fill(null);

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [isXNext, setIsXNext] = useState<boolean | null>(null);
  const [winner, setWinner] = useState<Player | "Draw">(null);
  const [mode, setMode] = useState<"Player" | "Computer" | null>(null);

  useEffect(() => {
    if (mode === "Computer" && !isXNext && !winner) {
      setTimeout(() => computerMove(board), 100);
    }
  }, [isXNext, mode, winner]);

  useEffect(() => {
    const randomTurn = Math.random() < 0.5;
    setIsXNext(randomTurn);
  }, [mode]);

  const handlePress = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const computerMove = (currentBoard: Board) => {
    const emptyIndices = currentBoard
      .map((value, index) => (value === null ? index : null))
      .filter((val) => val !== null) as number[];
    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    if (randomIndex !== undefined) {
      const newBoard = currentBoard.slice();
      newBoard[randomIndex] = "O";
      setBoard(newBoard);
      setIsXNext(true);
      checkWinner(newBoard);
    }
  };

  const checkWinner = (currentBoard: Board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinner(currentBoard[a]);
        return;
      }
    }

    if (!currentBoard.includes(null)) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setMode(null);
  };

  const textAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(textAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => textAnimation.setValue(0);
  }, [winner]);

  if (!mode) {
    return (
      <Container>
        <View className="flex flex-1 justify-center">
          <Text className="mb-4 text-center font-SpaceMono text-4xl text-white">
            Choose Mode
          </Text>
          <Pressable
            className="mt-4 rounded-lg bg-cyan-600 px-8 py-4"
            onPress={() => setMode("Player")}
          >
            <Text className="text-center font-SpaceMono text-3xl text-white">
              Player vs Player
            </Text>
          </Pressable>
          <Pressable
            className="mt-4 rounded-lg bg-cyan-600 px-8 py-4"
            onPress={() => setMode("Computer")}
          >
            <Text className="text-center font-SpaceMono text-3xl text-white">
              Player vs Computer
            </Text>
          </Pressable>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View className="flex flex-1 justify-center">
        <Text className="mb-4 text-center font-SpaceMono text-3xl text-white">
          {mode === "Player" ? "Player vs Player" : "Player vs Computer"}
        </Text>
        {winner ? (
          <Animated.Text
            style={[
              {
                transform: [
                  {
                    translateX: textAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-350, 0],
                    }),
                  },
                ],
              },
            ]}
            className="mt-4 p-2 text-center font-SpaceMono text-5xl text-white"
          >
            {winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`}
          </Animated.Text>
        ) : (
          <>
            <Text className="mb-4 text-center font-SpaceMono text-3xl text-white">
              {isXNext ? "X turn" : "O turn"}
            </Text>
            <View className="relative flex w-72 flex-row flex-wrap">
              {board.map((value, index) => (
                <Pressable
                  key={index}
                  className="flex h-24 w-24 items-center justify-center border border-gray-400"
                  onPress={() => handlePress(index)}
                >
                  <Text className="text-5xl font-bold text-white">{value}</Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
        <Pressable
          className="mt-6 rounded-lg bg-cyan-600 px-8 py-4"
          onPress={resetGame}
        >
          <Text className="text-center font-SpaceMono text-2xl text-white">
            Restart Game
          </Text>
        </Pressable>
      </View>
    </Container>
  );
}
