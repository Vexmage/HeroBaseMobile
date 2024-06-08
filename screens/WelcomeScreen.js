
import React from 'react'; // Import React
import { View, Text, Button, StyleSheet } from 'react-native'; // Import View, Text, Button, and StyleSheet components

const WelcomeScreen = ({ navigation }) => { // Pass navigation prop
    // Return JSX
    return ( 
        <View style={styles.container}>
            <Text style={styles.title}>Adventure Awaits!</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Login"
                    color="#8C7853" // Bronze
                    onPress={() => navigation.navigate('Login')}
                />
                <View style={styles.space} />
                <Button
                    title="Register"
                    color="#704214" // Dark Wood
                    onPress={() => navigation.navigate('Register')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#3C2F2F' // Dark Reddish-Brown, reminiscent of leather
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700', // Golden text
        marginBottom: 20,
        fontFamily: 'ConanFont', // The font is actually named Crom, but ConanFont was left here.
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'space-between'
    },
    space: {
        height: 20,
    }
});

export default WelcomeScreen;