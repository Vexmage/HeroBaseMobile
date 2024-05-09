import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useUser } from '../UserContext'; // Adjust this path if necessary to correctly point to your UserContext

function LoginScreen({ navigation }) {
    const { loginUser } = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const storedPassword = await SecureStore.getItemAsync(username);
            if (password === storedPassword) {
                await loginUser(username);
                navigation.navigate('Home'); // Ensures redirection after successful login
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            setError('Login failed, please try again later.');
            console.error('Login failed:', error); // Helpful for debugging
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={true}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        marginBottom: 10
    },
    errorText: {
        color: 'red'
    }
});

export default LoginScreen;
