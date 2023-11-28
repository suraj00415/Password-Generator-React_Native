import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from "formik"
import BouncyCheckbox from 'react-native-bouncy-checkbox'


const PasswordSchema = Yup.object({
  passwordLength: Yup.number().min(4, "Minimum characters must be 4").max(30, "Maximum characters must be 16").required("Length is Required")
})


export default function App() {
  const [password, setPassword] = useState('')
  const [isPasswordGenerated, setIsPasswrodGenerated] = useState(false)
  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [number, setNumber] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const genreatePasswordString = (passworLength: number) => {
    let characterList = ''
    const upperCaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowerCaseChar = "abcdefghijklmnopqrstuvwxyz"
    const digitChar = '0123456789'
    const specialchar = "!@#$%^&*()_+"
    if (upperCase) {
      characterList += upperCaseChar
    }
    if (lowerCase) {
      characterList += lowerCaseChar
    }
    if (number) {
      characterList += digitChar
    }
    if (symbols) {
      characterList += specialchar
    }
    const passwordRes = createPassword(characterList, passworLength)
    setPassword(passwordRes)
    setIsPasswrodGenerated(true)
  }

  const createPassword = (characters: string, passwordLength: number): string => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result;
  }
  const resetPassword = () => {
    setPassword('')
    setIsPasswrodGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumber(false)
    setSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <SafeAreaView style={styles.subMainContainer}>
        <View >
          <Text style={styles.mainText}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              genreatePasswordString(+values.passwordLength)
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset
            }) => (
              <>
                <View style={styles.inputWrapperField}>
                  <Text style={styles.headingText}>Password Length</Text>
                  <View style={styles.inputTextWrapper}>
                    <TextInput style={styles.inputText} value={values.passwordLength} onChangeText={handleChange('passwordLength')} placeholder='Ex. 8' keyboardType='numeric' placeholderTextColor="black" />
                  </View>

                  {touched.passwordLength && errors.passwordLength && (<Text style={styles.errorText}>{errors.passwordLength}</Text>)}
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Lower Case:</Text>
                  <BouncyCheckbox isChecked={lowerCase} disableBuiltInState onPress={() => setLowerCase(!lowerCase)} fillColor='blue' />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Upper Case:</Text>
                  <BouncyCheckbox isChecked={upperCase} disableBuiltInState onPress={() => setUpperCase(!upperCase)} fillColor='blue' />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Number:</Text>
                  <BouncyCheckbox isChecked={number} disableBuiltInState onPress={() => setNumber(!number)} fillColor='blue' />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols:</Text>
                  <BouncyCheckbox isChecked={symbols} disableBuiltInState onPress={() => setSymbols(!symbols)} fillColor='blue' />
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity disabled={!isValid} onPress={handleSubmit} >
                    <Text style={styles.button}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    handleReset()
                    resetPassword()
                  }}>
                    <Text style={styles.button} >Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPasswordGenerated ? (
          <View style={styles.card}>
            <Text style={styles.subtitle}>Result:</Text>
            <Text style={styles.subtitle}>Long Press to Copy</Text>
            <Text style={styles.title} selectable={true}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white"
  },
  mainText: {
    color: "black",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 20,
  },
  subMainContainer: {
    margin: 15,
  },
  button: {
    color: "white",
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 15,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  inputTextWrapper: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  inputWrapper: {
    margin: 5,
    marginBottom: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  inputWrapperField: {
    margin: 5,
  },
  inputText: {
    color: "black",
    padding: 10
  },
  headingText: {
    marginBottom: 10,
    color: "black",
    fontSize: 17,
    fontWeight: "600"
  },
  errorText: {
    color: "red"
  },
  heading: {
    color: 'black',
    fontSize: 20,
    fontWeight: "400"
  },
  title: {
    color: "black",
    fontSize: 40,
    fontWeight: '900',
    marginTop: 10
  },
  subtitle: {
    color: "black",
    fontSize: 18,
    fontWeight: '400'
  },
  card: {
    margin: 20,
    padding: 30,
    width: 'auto',
    height: 'auto',
    borderRadius: 3,
    elevation: 3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: "black"
  },
})