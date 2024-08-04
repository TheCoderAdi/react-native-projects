import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { Container } from "@/components/Container";
import Entypo from "@expo/vector-icons/Entypo";

interface Todo {
  text: string;
  id: number;
}

export default function Todo() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (text === "") {
      Alert.alert("Please enter a todo");
      return;
    }
    const randomId = Math.floor(Math.random() * 1000);
    const newTodo = { text, id: randomId };
    setTodos([...todos, newTodo]);
    setText("");
  };

  const editTodo = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      return;
    }
    setEditTodoId(id);
    setEditText(todo.text);
    setEditModalVisible(true);
  };

  const saveEditTodo = () => {
    if (editText === "") {
      Alert.alert("Please enter a todo");
      return;
    }
    const updatedTodos = todos.map((t) =>
      t.id === editTodoId ? { ...t, text: editText } : t
    );
    setTodos(updatedTodos);
    setEditModalVisible(false);
    setEditTodoId(null);
    setEditText("");
  };

  return (
    <Container>
      <View className="relative w-[100%]">
        <TextInput
          placeholder="Add a todo"
          value={text}
          onChangeText={setText}
          className="full rounded-lg border border-gray-300 bg-white p-3 font-SpaceMono text-2xl"
          placeholderTextColor={"#000"}
          onSubmitEditing={addTodo}
        />
        <Pressable className="absolute right-0 top-1 p-2" onPress={addTodo}>
          <Entypo name="plus" size={30} color="black" />
        </Pressable>
      </View>
      <ScrollView className="mt-5 h-full w-full">
        {todos.length === 0 ? (
          <View className="flex items-center justify-center">
            <Text className="text-center font-SpaceMono text-5xl text-cyan-500">
              No todos yet
            </Text>
          </View>
        ) : (
          todos.map((todo) => (
            <View
              key={todo.id}
              className="mb-4 flex flex-row items-center justify-between rounded-lg bg-cyan-100 p-3"
            >
              <Text className="w-3/4 font-SpaceMono text-2xl">{todo.text}</Text>
              <View className="flex flex-row items-center gap-6">
                <Pressable
                  onPress={() => {
                    setTodos(todos.filter((t) => t.id !== todo.id));
                  }}
                >
                  <Entypo name="trash" size={24} color="black" />
                </Pressable>
                <Pressable onPress={() => editTodo(todo.id)}>
                  <Entypo name="edit" size={24} color="black" />
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <Modal
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-black bg-opacity-50">
          <View className="w-80 rounded-lg bg-white p-5">
            <TextInput
              placeholder="Edit todo"
              value={editText}
              onChangeText={setEditText}
              className="mb-4 rounded-lg border border-gray-300 p-3 font-SpaceMono text-2xl"
              placeholderTextColor={"#000"}
            />
            <Pressable
              className="mb-4 rounded-lg bg-cyan-500 p-3"
              onPress={saveEditTodo}
            >
              <Text className="text-center font-SpaceMono text-2xl text-white">
                Save
              </Text>
            </Pressable>
            <Pressable
              className="rounded-lg bg-gray-300 p-3"
              onPress={() => setEditModalVisible(false)}
            >
              <Text className="text-center font-SpaceMono text-2xl text-black">
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Container>
  );
}
