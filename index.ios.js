/**
 * Sample React Native App
 * React non-native example with static mocklives here: https://jsfiddle.net/reactjs/yun1vgqb/
 * Christopher Lacy-Hulbert  http://christo.uk.com
 */
'use strict';

var React = require('react-native');

var key='INSERTYOURAPIKEYHERE';
var REQUEST_BASE = "https://query.yahooapis.com/v1/public/yql";
var REQUEST_URL = REQUEST_BASE+"?q=select%20*%20from%20flickr.photos.recent(40)%20where%20api_key%3D%27"+key+"%27%20and%20extras=%27owner_name%27&diagnostics=true&format=json"

var {
  AppRegistry,
  StyleSheet,
  ListView,
  Image,
  Text,
  View,
} = React;

var renapro = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }, 

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => { 
		  	return response.json()
	  })
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.query.results.photo),
          loaded: true,
        });
      })
	  .done();
  },

  componentDidMount: function() {
    this.fetchData();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPhoto}
        style={styles.listView}
      />
    );
  },

  
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading photos...
        </Text>
      </View>
    );
  },

  renderPhoto: function(photo) {
    return (
      <View style={styles.container}>
		  <Image
		source={{uri: 'http://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_t_d.jpg'}}
		style={styles.thumbnail}
		/>
		<View style={styles.rightcontainer}>
          <Text style={styles.titletext}>{photo.title}</Text>
		  <Text style={styles.ownertext}>By {photo.ownername}</Text>
		</View>
      </View>
    );
  },
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
	flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
	  flexDirection: 'column',
	  alignItems: 'center',
  },
  titletext: {
    fontSize: 18,
    marginBottom: 0,
	  padding: 5,
	  paddingLeft: 10,
  },
  ownertext: {
    fontSize: 14,
    marginBottom: 8,
	  padding: 5,
	  paddingLeft: 10,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
  	width: 80,
  	height: 80,
  },
});

AppRegistry.registerComponent('renapro', () => renapro);
