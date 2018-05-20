import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  ScrollView,
  Alert
} from 'react-native';
import { Icon, ButtonGroup, List, ListItem, Tile } from 'react-native-elements'
// import Icon from 'react-native-vector-icons';
import Sound from 'react-native-sound';

const iosBlue = 'rgb(0, 122, 255)'
const iosRed = 'rgb(255, 59, 48)'
const buttonsHeight = 40

const songs = [
  {
    id: 0,
    title: 'Hippie Sabotage - Your Soul',
    url: 'HippieSabotageYourSoul.mp3',
    basePath: Sound.MAIN_BUNDLE,
  },
  {
    id: 1,
    title: 'Taconafide - Visa',
    url: 'TaconafideVisa.mp3',
    basePath: Sound.MAIN_BUNDLE,
  },
];

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      songsList: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      actualSong: -1
    }

    var song = null;

    // this.playOrPause = this.playOrPause.bind(this)
    // this.loadAndPlay = this.loadAndPlay.bind(this)
    // this.playNow = this.playNow.bind(this)
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.setState({
      songsList: this.state.songsList.cloneWithRows(songs),
    })

    //this.loadSong('abc.mp3')
  }

  loadAndPlay(songData) {
    this.resetSong()
    this.setState({
      isPlaying: false,
      actualSong: songData.id
    })
    Sound.setCategory('Playback');

    song = new Sound(songData.url, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        Alert.alert('Cannot play this song', error.message);
        return;
      }
      this.setState({ actualSong: songData.id })
      console.log('duration in seconds: ' + song.getDuration() + 'number of channels: ' + song.getNumberOfChannels());
      this.playNow()
    });
  }

  playNow() {
    console.log("play now")
    song.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        song.reset();
      }
    });
    this.setState({ isPlaying: true })
  }

  playOrPause() {
    if (typeof song == "undefined") {
      this.loadAndPlay(songs[0])
    }
    if (this.state.actualSong == -1) {

    }
    if (this.state.isPlaying == true) {
      song.pause()
    } else {
      song.play()
    }

    this.setState({ isPlaying: !this.state.isPlaying })
  }

  // stopSong() {
  //   if (typeof song == "undefined") {
  //     return;
  //   }

  //   song.stop(() => {
  //     this.setState({
  //       isPlaying: false,
  //       actualSong: -1
  //     })
  //   });


  // }

  resetSong() {
    if (typeof song == "undefined") {
      return;
    }
    song.release();
    song = undefined;

    this.setState({
      isPlaying: false,
      actualSong: -1
    })
  }

  renderRow(rowData, sectionID) {
    console.log(rowData)
    let songIcon = "music-note"
    let title = rowData.title
    if (this.state.actualSong == rowData.id) {
      songIcon = this.state.isPlaying ? 'play-arrow' : 'pause'
      // var duration = song.getDuration().toFixed(0)
      // var mins = Math.floor(duration / 60)
      // var secs = Math.floor((duration / 60 - mins) * 60)
      //title = title + " " + mins + ":" + secs
      // setInterval(() => {
      //   if (typeof song !== "undefined") {
      //     song.getCurrentTime((currentTime) => {
      //       console.log(currentTime);
      //       title = title + " " + currentTime
      //     });
      //   }
      // }, 1000);
      
    }

    return (
      <ListItem
        leftIcon={{ name: songIcon }}
        title={title}
        subtitle={rowData.duration}
        onPress={() => {
          this.loadAndPlay(rowData)
        }}
      />
    )
  }

  render() {
    const component1 = () => <Icon name='stop' type='material-icons' color={iosRed} />
    const component2 = () => <Icon name='skip-previous' type='material-icons' color={iosBlue} />
    const component3 = () => <Icon name={this.state.isPlaying ? 'pause-circle-outline' : 'play-circle-outline'} type='material-icons' color={iosBlue} />
    const component4 = () => <Icon name='skip-next' type='material-icons' color={iosBlue} />
    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }, { element: component4 }]

    let time = ['czas']

    // setInterval(() => {
    //   if (typeof song !== "undefined") {
    //     song.getCurrentTime((currentTime) => {
    //       console.log(currentTime);
    //       time = ['czas ' + currentTime]
    //     });
    //   }
    // }, 1000);

    return (
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
        <ScrollView style={{ width: "100%", marginBottom: buttonsHeight }}>
          <List>
            <ListView
              dataSource={this.state.songsList}
              renderRow={this.renderRow}
              enableEmptySections={true}
            />
          </List>
        </ScrollView>
        <ButtonGroup
          buttons={time}
          // this.state.isPlaying ? 32 :
          containerStyle={{ height: 0, position: 'absolute', left: 0, right: 0, bottom: buttonsHeight - 2, marginLeft: 0, marginBottom: 0, marginRight: 0, marginTop: 0 }}
        />
        <ButtonGroup
          buttons={buttons}
          containerStyle={{ height: buttonsHeight, position: 'absolute', left: 0, right: 0, bottom: 0, marginLeft: 0, marginBottom: 0, marginRight: 0, marginTop: 0 }}
          onPress={(index) => {
            if (index == 0) {
              this.resetSong()
            } else if (index == 1) {
              this.previousSong()
            } else if (index == 2) {
              this.playOrPause()
            } else {
              this.nextSong()
            }
          }}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
