import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Clipboard from "expo-clipboard";
import { Container } from "@/components/Container";
import { useNavigation } from "expo-router";

export default function QrCode() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const navigation = useNavigation();

  if (!permission) {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("/" as never)}>
          <Text>Go to home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <StatusBar style="dark" />
        <Text style={styles.permissionText}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(facing === "back" ? "front" : "back");
  }

  function handleBarCodeScanned({ data }: { data: string }) {
    setScanned(true);
    setScannedData(data);
  }

  async function handleCopy() {
    if (scannedData) {
      await Clipboard.setStringAsync(scannedData);
      Alert.alert("Copied to Clipboard", scannedData);
    }
  }

  async function handleOpenLink() {
    if (scannedData) {
      if (await Linking.canOpenURL(scannedData)) {
        Linking.openURL(scannedData);
      } else {
        Alert.alert("Invalid URL", "The scanned data is not a valid URL.");
      }
    }
  }

  function handleScanAgain() {
    setScanned(false);
    setScannedData(null);
  }

  return (
    <>
      {scanned ? (
        <Container>
          <StatusBar style="light" />
          <View className="flex w-full flex-1 items-center justify-center">
            <Text className="font-SpaceMono text-3xl text-cyan-500">
              QR Encoded Text:
            </Text>
            <Text className="font-SpaceMono text-lg text-white">
              {scannedData}
            </Text>
            <TouchableOpacity
              className="mt-5 w-[300] items-center justify-center rounded-md bg-cyan-300 p-2"
              onPress={handleCopy}
            >
              <Text className="font-SpaceMono text-2xl">Copy Text</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-5 w-[300] items-center justify-center rounded-md bg-cyan-300 p-2"
              onPress={handleOpenLink}
            >
              <Text className="font-SpaceMono text-2xl">Go to URL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-5 w-[300] items-center justify-center rounded-md bg-cyan-300 p-2"
              onPress={handleScanAgain}
            >
              <Text className="font-SpaceMono text-2xl">Scan Again</Text>
            </TouchableOpacity>
          </View>
        </Container>
      ) : (
        <View style={styles.container}>
          <CameraView
            style={styles.camera}
            facing={facing}
            onBarcodeScanned={({ data }) => {
              handleBarCodeScanned({ data });
            }}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <MaterialCommunityIcons
                  name="camera-flip"
                  size={50}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.overlayContainer}>
              <View
                style={styles.corner}
                className="left-0 top-0 border-l-4 border-t-4"
              />
              <View
                style={styles.corner}
                className="right-0 top-0 border-r-4 border-t-4"
              />
              <View
                style={styles.corner}
                className="bottom-0 left-0 border-b-4 border-l-4"
              />
              <View
                style={styles.corner}
                className="bottom-0 right-0 border-b-4 border-r-4"
              />
            </View>
          </CameraView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    position: "relative",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 10,
    color: "white",
    fontSize: 18,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  overlayContainer: {
    position: "absolute",
    top: "30%",
    left: "50%",
    width: 250,
    height: 250,
    marginLeft: -125,
    marginTop: -125,
    borderColor: "transparent",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#00FF00",
  },
});
