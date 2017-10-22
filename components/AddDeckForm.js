import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { addDeck } from '../helpers/api'
import colors from '../helpers/colors'

class AddDeckForm extends Component {
  state = {
    deckNameField: ''
  }
  cancel = () => {
    this.props.afterCancel()
  }
  submit = () => {
    // Save the deck in local storage only if the field is filled
    // with a valid deck name
    if (this.state.deckNameField) {
      addDeck(this.state.deckNameField)
      this.props.afterSubmit()
    }

    /**
     * TODO:
     * Warn the user that the deck field must be filled
     */
  }
  changeDeckNameField = (deckName) => {
    /**
     * TODO:
     * Warn the user that the deck is required when the field
     * gets empty
     */
    this.setState({ deckNameField: deckName })
  }
  render() {

    const { deckNameField } = this.state
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors["BlueGrey"].dark }}
      >
        <View
          style={{
            position: 'absolute',
            top: 22,
            right: 8,
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.cancel()
            }}
          >
            <Entypo name='circle-with-cross' size={28} style={{
              color: 'white',
              backgroundColor: 'transparent',
              margin: 8
            }} />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{}}
        >
          <Text style={{
            fontSize: 48,
            color: colors["BlueGrey"].extraLight,
            margin: 4,
            textAlign: 'center',
          }}>New Deck Title
          </Text>
          <TextInput
            style={{
              fontSize: 24,
              color: colors["BlueGrey"].extraLight,
              borderWidth: 1, borderRadius: 5,
              borderColor: colors["BlueGrey"].extraLight,
              margin: 4,
              padding: 4,
            }}
            autoFocus={true}
            value={deckNameField}
            onChangeText={(deckName) => this.changeDeckNameField(deckName)}
          ></TextInput>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: colors["BlueGrey"].extraLight,
              margin: 4,
              padding: 4,
              alignItems: 'center'
            }}
            onPress={() => {
              /**TODO:
               * Create deck (add to local storage)
               */
              this.submit()
            }}
          >
            <Text style={{ fontSize: 24, color: colors["BlueGrey"].extraLight }}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default AddDeckForm