import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [theme, setTheme] = useState(styles.lightTheme);

  const credentials = {
    username: 'nonano',
    password: 'Password123!',
  };

  const minLength = 6;

  useEffect(() => {
    setCharCount(username.length);
  }, [username]);

  const handleInputChange = (text) => {
    if (text.length < minLength) {
      setError(true);
    } else {
      setError(false);
    }
    setUsername(text);
  };

  useEffect(() => {
    if (darkMode) {
      setTheme(styles.darkTheme);
    } else {
      setTheme(styles.lightTheme);
    }
  }, [darkMode]);

  const passwordRequirements = {
    hasUppercase: /[A-Z]/,
    hasLowercase: /[a-z]/,
    hasNumber: /\d/,
    hasSpecialChar: /[^A-Za-z0-9]/,
    minLength: 8,
  };

  useEffect(() => {
    const checkPasswordValidity = () => {
      if (password.length < passwordRequirements.minLength) {
        setErrorMessage(`Password must be at least ${passwordRequirements.minLength} characters long.`);
      } else if (!passwordRequirements.hasUppercase.test(password)) {
        setErrorMessage('Password must include at least one uppercase letter.');
      } else if (!passwordRequirements.hasLowercase.test(password)) {
        setErrorMessage('Password must include at least one lowercase letter.');
      } else if (!passwordRequirements.hasNumber.test(password)) {
        setErrorMessage('Password must include at least one number.');
      } else if (!passwordRequirements.hasSpecialChar.test(password)) {
        setErrorMessage('Password must include at least one special character.');
      } else {
        setErrorMessage(null);
      }
    };

    checkPasswordValidity();
  }, [password]);

  return (
    <View style={[styles.container, theme.container]}>
        <Text style={theme.text}>Username</Text>
        <TextInput
          style={styles.textInput}
          value={username}
          onChangeText={handleInputChange}
          maxLength={20}
        />
        {error ? (
          <Text style={styles.errorText}>Minimum {minLength} characters required</Text>
        ) : null}

        <Text style={theme.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (username === credentials.username && password === credentials.password)
              Alert.alert('Login Success');
            else
              Alert.alert('Login Failed');
          }}
          disabled={!!(errorMessage || error)}
        >
          <Text>Login</Text>
        </TouchableOpacity>

      <View>
        <Text style={theme.text}>Username Character Counter: {charCount}</Text>
      </View>

      <TouchableOpacity
        onPress={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <Text style={styles.emojiSize}>🙉</Text> : <Text style={styles.emojiSize}>🙈</Text>}
      </TouchableOpacity>

      <StatusBar style="auto" translucent={false} backgroundColor="transparent" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    marginBottom: 20,
  },
  backgroundDefault: {
    backgroundColor: '#fff',
  },
  backgroundDark: {
    backgroundColor: '#000',
  },
  textDefault: {
    color: '#000',
  },
  textDark: {
    color: '#FFF',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  textInput: {
    width: "40%",
    borderWidth: 1,
    marginBottom: 10,
  },
  lightTheme: {
    container: {
      backgroundColor: '#fff',
    },
    text: {
      color: '#000',
    },
  },
  darkTheme: {
    container: {
      backgroundColor: '#000',
    },
    text: {
      color: '#FFF',
    },
  },
  emojiSize:{
    fontSize: 40,
    padding: 20
  },
  button: {
    borderWidth:1,
    borderRadius:15,
    padding:10
  }
});
