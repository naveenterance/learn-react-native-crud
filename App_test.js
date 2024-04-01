import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Entypo, Fontisto } from "@expo/vector-icons";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ScrollView>
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

        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et
          condimentum quam. Maecenas justo quam, tempus in mollis eu, feugiat
          eget ante. In sed velit libero. Nunc a dui eget ante sodales faucibus.
          Curabitur ac ligula et augue ultricies bibendum. Sed convallis libero
          eu metus venenatis, at condimentum risus interdum. Aenean ornare leo
          eget mauris blandit auctor. Vestibulum magna purus, finibus vitae elit
          id, elementum vestibulum orci. Cras nec libero enim. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Praesent commodo urna ut felis
          accumsan, eu malesuada enim commodo. Ut nec posuere ex. Nulla bibendum
          molestie eros a semper. Pellentesque aliquam lacus in diam placerat
          bibendum. Vivamus quis congue eros. Proin varius, arcu eu dictum
          aliquet, purus est feugiat justo, ac blandit justo tellus ut ex. Donec
          aliquam feugiat ante et hendrerit. Ut pretium velit quis urna
          facilisis, quis rhoncus ex aliquam. Praesent vehicula ac lectus vitae
          ultricies. Morbi non lorem at dui sagittis varius. Vestibulum sed
          rhoncus ex. Integer velit justo, ullamcorper id elit pellentesque,
          volutpat gravida sapien. Etiam vitae mi vitae leo mattis rhoncus
          maximus sit amet mi. Quisque ac pretium orci, facilisis pharetra est.
          Suspendisse pretium est risus, ac scelerisque leo accumsan ut. Integer
          in quam feugiat libero faucibus aliquam. Cras vel finibus nulla. Donec
          suscipit ex sed scelerisque mollis. Donec vulputate rutrum dignissim.
          Nam id aliquam ante, nec condimentum mauris. Cras tempor, nulla vitae
          blandit hendrerit, orci tortor eleifend augue, nec tempor arcu erat ut
          leo. Sed lacinia at velit sit amet pharetra. Phasellus sem mauris,
          tristique ut lacus vel, malesuada iaculis sem. Quisque ac urna at nibh
          finibus convallis quis non elit. Vivamus id nisl vehicula, euismod
          urna nec, sollicitudin nibh. Phasellus sed massa eu lacus faucibus
          varius eu a massa. Nulla nec dictum orci, at dictum tellus. Maecenas
          dapibus tortor enim, sed vulputate quam molestie quis. Duis posuere
          vel nunc eget condimentum. Mauris quis tempus risus. Phasellus in erat
          in urna sodales feugiat. Cras sit amet malesuada nisi. Vivamus
          malesuada nunc sed consequat condimentum. Sed sit amet faucibus lacus.
          Quisque nisl quam, molestie id rhoncus nec, suscipit at tortor.
          Aliquam cursus nulla ac placerat auctor. Nunc dapibus lectus lectus,
          sed placerat velit porta nec. Nulla a mauris nulla. Nam scelerisque
          nulla facilisis efficitur feugiat. Aenean sit amet fringilla diam.
          Donec lectus odio, ullamcorper sit amet nibh id, fringilla placerat
          est. Vivamus euismod varius metus, id mattis dolor tempor nec.
          Suspendisse rutrum eros nec tortor auctor congue. Vestibulum ante
          ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Cras placerat molestie varius. Ut interdum sem sit amet lacus
          venenatis lobortis.
        </Text>

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
    </ScrollView>
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
