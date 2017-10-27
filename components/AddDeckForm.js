import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { addDeck } from '../actions'
import colors from '../helpers/colors'
import { connect } from 'react-redux'

class AddDeckForm extends Component {
  state = {
    deckNameField: '',
    invalidInput: false,
  }
  cancel = () => {
    this.props.afterCancel()
  }
  submit = () => {
    // Save the deck in local storage only if the field is filled
    // with a valid deck name
    if (this.state.deckNameField) {
      this.props.addDeck(this.state.deckNameField)
      this.props.afterSubmit()
    }
    else
      this.setState({
        invalidInput: true
      })
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

    const { deckNameField, invalidInput } = this.state
    return (
      <View
        style={[styles.container, { backgroundColor: colors["BlueGrey"].dark }]}
      >
        <View
          style={styles.closeBtnContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.cancel()
            }}
          >
            <Entypo name='circle-with-cross' size={28} style={styles.closeBtn} />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{}}
        >
          <Text style={[styles.inputLabel, { color: colors["BlueGrey"].extraLight }]}>New Deck Title
          </Text>
          <TextInput
            style={[styles.input, {
              color: colors["BlueGrey"].extraLight,
              borderColor: colors[invalidInput?"Red":"BlueGrey"].medium,
            }]}
            autoFocus={true}
            value={deckNameField}
            onChangeText={(deckName) => this.changeDeckNameField(deckName)}
            onSubmitEditing={() => {
              this.submit()
            }}
          ></TextInput>
          <TouchableOpacity
            style={[styles.submit, { borderColor: colors["BlueGrey"].extraLight, }]}
            onPress={() => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnContainer: {
    position: 'absolute',
    top: 22,
    right: 8,
  },
  closeBtn: {
    color: 'white',
    backgroundColor: 'transparent',
    margin: 8
  },
  inputLabel: {
    fontSize: 48,
    margin: 4,
    textAlign: 'center',
  },
  input: {
    fontSize: 24,
    borderWidth: 1, borderRadius: 5,
    margin: 4,
    padding: 4,
  },
  submit: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 4,
    padding: 4,
    alignItems: 'center'
  }
})

const mapStateToProps = ({ deck }) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addDeck: (deckName) => dispatch(addDeck(deckName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeckForm)