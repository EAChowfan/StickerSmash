import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View} from 'react-native';
import * as imagePicker from 'expo-image-picker';
import { useState } from 'react';
import ImageViewer from './components/ImageViewer';
import Button from './components/Buttons';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

const PlaceHolderImage = require('./assets/images/background-image.png');

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ShowAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible,  setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const pickImageAsync = async () => {
    let result = await imagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })
  if(!result.canceled){
    setSelectedImage(result.assets[0].uri);
  }
  else{
    alert('You did not select any Image.');
    setShowAppOptions(true);
  }
  };

  const onReset = () =>{
    setShowAppOptions(false);
  };

  const onAddSticker = () =>{
    setIsModalVisible(true);
  };

  const onModalClose =() =>{
    setIsModalVisible(false);
  };
  const onSaveImageAsync = async() => {

  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer 
        placeholderImageSource={PlaceHolderImage}
        selectedImage={selectedImage}
        />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
    </View>
      {ShowAppOptions ?(
      <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          <IconButton icon="refresh" label="Reset" onPress={onReset}/>
          <CircleButton onPress={onAddSticker}/>
          <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
        </View>
      </View>
      ) : (
      <View style={styles.footerContainer}>
      <Button theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
      <Button label = "Use this photo" onPress={() => setShowAppOptions(true)} />
      </View>
    )} 
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
    flex: 1,
    paddingTop: 58,
  },
  footerContainer:{
    flex: 1/3,
    alignItems:'center',
  },
  optionsContainer:{
    position:'center',
    bottom: 80,
  },
  optionsRow:{
    alignItems: 'center',
    flexDirection: 'row',
  },
});
