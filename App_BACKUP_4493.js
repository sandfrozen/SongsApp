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
import Sound from 'react-native-sound';

const iosBlue = 'rgb(0, 122, 255)'
const iosRed = 'rgb(255, 59, 48)'
const buttonsHeight = 40

const songs = [
  {
    id: 0,
    title: 'Astronomyy',
    url: 'Astronomyy.mp3',
  },
  {
    id: 1,
    title: 'Far From Home',
    url: 'FarFromHome.mp3',
  },
  {
    id: 2,
    title: 'Homegrown',
    url: 'Homegrown.mp3',
  },
  {
    id: 3,
    title: 'Hundred Miles',
    url: 'HundredMiles.mp3',
  },
  {
    id: 4,
    title: 'Indian Summer',
    url: 'IndianSummer.mp3',
  },
  {
    id: 5,
    title: 'Stay',
    url: 'Stay.mp3',
  },
  {
    id: 6,
    title: 'Lay It',
    url: 'LayIt.mp3',
  },
  {
    id: 7,
    title: 'Drive',
    url: 'Drive.mp3',
  },
];

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      songsList: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      actualSong: -1,
      time: 0,
<<<<<<< HEAD
      songDuration: 0
=======
      songFullTime: 0
>>>>>>> mucha
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

    setInterval(() => {
      if (this.state.isPlaying) {
        song.getCurrentTime((sec) => {
          this.setState({ time: Math.floor(sec.toFixed(0)) })
        })
      }
    }, 300);
<<<<<<< HEAD

=======
>>>>>>> mucha
  }

  loadAndPlay(songData) {
    this.resetSong()

    song = new Sound(songData.url, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        Alert.alert('Cannot play this song', error.message);
        return;
      }
<<<<<<< HEAD
      this.setState({ actualSong: songData.id,
        songDuration: song.getDuration().toFixed(0) })
=======
      this.setState({
        actualSong: songData.id,
        songFullTime: song.getDuration().toFixed(0)
      })
>>>>>>> mucha

      this.playNow()
    });
  }

  resetSong() {
    if (typeof song == "undefined") {
      return;
    }
    song.release();
    song = undefined;

    this.setState({
      isPlaying: false,
      actualSong: -1,
      time: 0
    })
  }

  playNow() {
    song.play((success) => {
      if (success) {
        console.log('successfully finished playing');
        this.nextSong()
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
      song.play((success) => {
        if (success) {
          console.log('successfully finished playing');
          this.nextSong()
        } else {
          console.log('playback failed due to audio decoding errors');
          song.reset();
        }
      });
    }

    this.setState({ isPlaying: !this.state.isPlaying })
  }

  nextSong() {

    let actual = this.state.actualSong + 1

    if (actual > songs.length - 1) {
      actual = 0
    }

    this.loadAndPlay(songs[actual])
  }

  previousSong() {
    let actual = this.state.actualSong - 1

    if (actual < 0) {
      actual = songs.length - 1
    }

    this.loadAndPlay(songs[actual])
  }

  renderRow(rowData, sectionID) {
    let songIcon = "music-note"
    let title = rowData.title
    console.log("render before if")
    if (this.state.actualSong == rowData.id) {
      console.log("render in if")
      songIcon = this.state.isPlaying ? 'play-arrow' : 'pause'
    }

    return (
      <ListItem
        leftIcon={{ name: songIcon }}
        hideChevron
        title={title}
        subtitle={rowData.duration}
        onPress={() => {
          this.loadAndPlay(rowData)
        }}
      />
    )
  }

  getTimeFromSec(seconds) {
    let mins = (seconds / 60).toFixed(0)
    let sec = (seconds) % 60
    if( sec < 10 ) {
      sec = "0" + sec
    }

    return mins+":"+sec
  }

  render() {
    const component1 = () => <Icon name='stop' type='material-icons' color={iosRed} />
    const component2 = () => <Icon name='skip-previous' type='material-icons' color={iosBlue} />
    const component3 = () => <Icon name={this.state.isPlaying ? 'pause-circle-outline' : 'play-circle-outline'} type='material-icons' color={iosBlue} />
    const component4 = () => <Icon name='skip-next' type='material-icons' color={iosBlue} />
    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }, { element: component4 }]

    return (
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
        <ScrollView style={{ width: "100%", marginBottom: this.state.isPlaying ? 30 : 0 }}>
          <List>
            <ListView
              dataSource={this.state.songsList}
              renderRow={this.renderRow}
              enableEmptySections={true}
            />
          </List>
        </ScrollView>
        <Text
<<<<<<< HEAD
          style={{ height: 32, position: 'absolute', left: 0, right: 0, bottom: buttonsHeight-8, marginLeft: 0, marginBottom: 0, marginRight: 0, marginTop: 0, alignItems: 'center', textAlign: 'center', backgroundColor: 'whitesmoke', paddingTop: 6 }}>
          {this.state.isPlaying ? songs[this.state.actualSong].title + " ": "Song "}{this.state.time} / {this.state.songDuration}
        </Text>

=======
          style={{ height: this.state.isPlaying ? 32 : 0, position: 'absolute', left: 0, right: 0, bottom: buttonsHeight - 8, marginLeft: 0, marginBottom: 0, marginRight: 0, marginTop: 0, alignItems: 'center', textAlign: 'center', backgroundColor: 'whitesmoke', paddingTop: 6 }}>
          {this.state.isPlaying ? songs[this.state.actualSong].title + " " : ""}{this.getTimeFromSec(this.state.time) + "/" + this.getTimeFromSec(this.state.songFullTime)}
        </Text>
>>>>>>> mucha
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
