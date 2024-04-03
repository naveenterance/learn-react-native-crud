import { Alert, Button, View, Pressable, Text } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

const Camera = () => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
  }

  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1.0 },
          { marginTop: "10%" },
        ]}
        onPress={takeImageHandler}
      >
        <Text style={{ fontSize: 20 }}>
          Add profile pic <AntDesign name="camerao" size={24} color="black" />
        </Text>
      </Pressable>
    </View>
  );
};

export default Camera;
