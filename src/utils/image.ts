import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

export const downloadAndSaveImage = async (imageUrl: string) => {
  let fileUri = FileSystem.documentDirectory + `${new Date().getTime()}.jpg`;

  try {
    const res = await FileSystem.downloadAsync(imageUrl, fileUri);
    return saveFile(res.uri);
  } catch (err) {
    console.log('FS Err: ', err);
  }
};

export const imageBase64ToImage = async (base64: string, uuidImage: string): Promise<string> => {
  let filename = new Date().getTime().toString() + uuidImage + ".png"
  if (base64.startsWith("data:image/")){
    base64 = base64.split("base64,")[1]
  }
  filename = FileSystem.documentDirectory + filename
  await FileSystem.writeAsStringAsync(filename, base64, {
    encoding: FileSystem.EncodingType.Base64
  })
  return filename
}

export const getBase64Image = async (imageUrl: string): Promise<string|any> => {
  let fileUri = FileSystem.documentDirectory + `${new Date().getTime()}.jpg`;
  const res = await FileSystem.downloadAsync(imageUrl, fileUri);
  const base64 = await FileSystem.readAsStringAsync(res.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return base64
}

export const saveFile = async (fileUri: string) => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status === 'granted') {
    try {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync('Download');
      if (album == null) {
        const result = await MediaLibrary.createAlbumAsync('Download', asset, false);
        if (result) {
          Alert.alert('Image saved to Photos');
        }
      } else {
        const result = await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        if (result) {
          Alert.alert('Image saved to Photos');
        }
      }
    } catch (err) {
      console.log('Save err: ', err);
    }
  } else if (status === 'denied') {
    Alert.alert('Veuillez donner la permission pour télécharger une image');
  }
};

export const copyImageToClipboard = async (imageUrl: string) => {
  let fileUri = FileSystem.documentDirectory + `${new Date().getTime()}.jpg`;

  try {
    const res = await FileSystem.downloadAsync(imageUrl, fileUri);
    const base64 = await FileSystem.readAsStringAsync(res.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await Clipboard.setImageAsync(base64);
  } catch (err) {
    console.log('FS Err: ', err);
  }
};

export const shareImage = async (imageUrl: string) => {
  Sharing.shareAsync(imageUrl);
};
