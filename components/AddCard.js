import React, { Component } from 'react'
import {View, Text, TextInput,
        TouchableOpacity, Platform, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { connect } from 'react-redux'

import { addCard } from '../actions'
import { addCardToDeckInStorage } from '../utils/api'
import { styles } from '../utils/styles'

class AddCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            question : '',
            answer: ''
        }
    }

    submit = () => {
        const { saveCard, decks, selectedDeck, navigation} = this.props
        const { question, answer } = this.state
        if(question.length>0 && answer.length>0) {
            const card = { question, answer }
            // update redux
            saveCard(card)
            // save to storage
            addCardToDeckInStorage(selectedDeck.title,card)
            // navigate to add card screen
            navigation.goBack()
        } else {
            Alert.alert(
                'Attention',
                'Please enter question and answer to continue',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                { cancelable: false }
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{paddingTop: 20}}>
                    <TextInput 
                        placeholder="Enter Question"
                        style={styles.title}
                        onChangeText={text => this.setState({...this.state,question: text})}
                        value={this.state.question}
                    />
                </View>
                <View style={{paddingTop: 20}}>
                    <TextInput 
                        placeholder="Enter Answer"
                        style={styles.title}
                        onChangeText={text => this.setState({...this.state,answer: text})}
                        value={this.state.answer}
                    />
                </View>
                <View style={{paddingTop: 30}}>
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

function mapStateToProps(state) {
    return {
        selectedDeck: state.selectedDeck,
        decks: state.decks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveCard : (card) => dispatch(addCard(card))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
