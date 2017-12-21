import React, { Component } from 'react'
import {View, Text, TextInput,
        TouchableOpacity, StyleSheet, Platform} from 'react-native'
import { purple, white } from '../utils/colors'
import { saveDeckToStorage } from '../utils/api'

import { connect } from 'react-redux'

import { addDeckToStore } from '../actions'

class NewDeck extends Component {
    state = {
        deckTitle : 'Deck Title'
    }

    submit = () => {
        const { deckTitle }  = this.state
        console.log("submit button is clicked with value",deckTitle)
        // update redux
        this.props.dispatch(addDeckToStore(deckTitle)) 
        // save deck title to async storage
        saveDeckToStorage(deckTitle)
        // Navigation to deck list
        this.props.navigation.navigate('DeckList')
        // reset title
        this.setState(() => ({deckTitle: 'Deck Title'}))
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text style={styles.deckQtn}>What is the title of your new deck? </Text>
                <View style={{paddingTop: 10}}>
                    <TextInput 
                        placeholder={this.state.deckTitle}
                        style={styles.deckTitle}
                        onChangeText={(text) => this.setState({deckTitle: text})}
                    />
                </View>
                <View style={{paddingTop: 10}}>
                    <SubmitBtn onPress={this.submit}/>
                </View>
            </View>
        )
    }
}

function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity 
            style={Platform === 'ios'?styles.iosSubmitBtn:styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  deckQtn: {
    paddingTop: 30,
    textAlign: 'center',
    fontSize: 52,
  },
  deckTitle: {
    height: 40,
    width: 300,
    borderColor: purple,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
})

export default connect()(NewDeck)
