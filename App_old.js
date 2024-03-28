import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Entypo, Fontisto } from "@expo/vector-icons";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text
        style={{
          margin: 10,
          borderWidth: 2,
          padding: 6,
          borderRadius: 15,
        }}
      >
        working
      </Text>

      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Entypo name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#841584" }]}
          activeOpacity={0.8}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#841584" }]}
          activeOpacity={0.8}
          onPress={() => {
            // Handle Close button press
          }}
        >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>This is a modal</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={[
                styles.button,
                { backgroundColor: "#841584", marginTop: 20 },
              ]}
            >
              <Text style={styles.buttonText}>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={drawerOpen}
        onRequestClose={() => {
          setDrawerOpen(!drawerOpen);
        }}
      >
        <View style={styles.drawer}>
          <Text>Drawer Content</Text>
          <TouchableOpacity onPress={toggleDrawer}>
            <Fontisto name="close-a" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40, // Adjust according to your needs
  },
  header: {
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 250, // Adjust according to your needs
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 100,
    borderRightWidth: 1,
    borderColor: "#ccc",
    zIndex: 10,
  },
});
