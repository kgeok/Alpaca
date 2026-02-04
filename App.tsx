import React, { useEffect, useState } from 'react';
import { StatusBar, KeyboardAvoidingView, useColorScheme, View, FlatList, Pressable, ScrollView, Text, TextInput, Modal, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styles from './stylesheet.js';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNetInfo } from "@react-native-community/netinfo";

const productName = 'Alpaca';
const version = '0.1';
const release = 'Prototype';

interface MessageItem {
  id: string;
  text: string;
  sender: 'user' | 'reciever';
}

const Separator = () => <View style={styles.Separator} />;

function MessageBubbleSent({ message }: { message: string }) {
  return (
    <View style={styles.MessageBubbleSent}>
      <Text style={{
        color: "white",
        fontSize: 16
      }}>{message}</Text>
    </View>
  )
};

function MessageBubbleRecieved({ message }: { message: string }) {
  return (
    <View style={styles.MessageBubbleRecieved}>
      <Text style={{
        color: "black",
        fontSize: 16
      }}>{message}</Text>
    </View>
  )
};

function SendMessageButton({ onPress }: { onPress: any }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.SendMessageButton,
        {
          backgroundColor: pressed ? "#065783ff" : "#099ae8ff", // Change color when pressed
        },
      ]}
    >
      <Text style={{
        color: "white",
        fontSize: 28,
        padding: 20
      }}>➜</Text>
    </Pressable>
  )
}

function ModalDialog({ visable, onClose, title, children }: { visable: boolean; onClose: () => any; title: string, children: React.ReactNode }) {
  return (
    <Modal
      animationType='slide'
      allowSwipeDismissal={true}
      presentationStyle='pageSheet'
      visible={visable}
      onRequestClose={() => {
        { onClose }
      }}>
      <View style={styles.ModalCenter}>
        <View style={styles.ModalContainer}>
          <Text style={{ textAlign: "center", fontSize: 20, margin: 20 }}>{title}</Text>
          {children}
        </View>
      </View>
    </Modal>
  )
}

async function checkConnection({ url, app }: { url: string, app: string }) {
  switch (app) {

    case "Ollama":
      try {

        await (fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }));

      } catch (error) {
        console.error("An Error Occurred: ", error);
      }
      break;

    default:
      try {
        const estabishedurl = (await fetch(url)).ok;
      } catch (error) {
        console.error("An Error Occurred: ", error);
      }
      break;

  }


}

const Tabs = createBottomTabNavigator();

function App() {
  const dateTime = Date();
  const [ipaddress, setipaddress] = useState("0.0.0.0");
  const [port, setport] = useState("000");
  const [app, setapp] = useState("Other");
  const isLightMode = useColorScheme() === 'light';
  const isDarkMode = useColorScheme() === 'dark';
  const [messages, setMessages] = useState<MessageItem[]>([]);

  <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

  function MessagesViewScreen() {
    const safeAreaInsets = useSafeAreaInsets();


    return (
      <View
        style={{
          justifyContent: "center",
        }}
      >

        <View style={styles.MainMessageView}>
          <Text style={{ textAlign: "center", paddingBottom: 15, color: "#79797955" }}>{dateTime}</Text>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MessageBubbleSent message={item.text} />}
            ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20, color: "grey" }}>No messages yet.</Text>}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={120}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.MessageCompose}>
              <TextInput placeholder="Type a message..." style={styles.MessageInput}></TextInput>
              <SendMessageButton onPress={undefined} />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View >

    );
  }

  function SettingsScreen() {

    const [inputTextIP, setInputTextIP] = useState('');
    const [inputTextPort, setInputTextPort] = useState('');
    const [modals, setModals] = useState({ ip: false, app: false, clear: false, });
    const toggleModal = (key: keyof typeof modals) => setModals({ ...modals, [key]: !modals[key] });

    const handleSubmitIPPortDialog = () => {
      if (inputTextIP && inputTextPort != "") {
        checkConnection({ url: "http://" + { inputTextIP } + ":" + { port } + "/", app: app });
        setipaddress(inputTextIP);
        setport(inputTextPort);
      }
    }

    return (
      <View
        style={{
          justifyContent: "center",
        }}
      >
        <ScrollView style={styles.MainMessageView}>
          <MessageBubbleRecieved message={productName} />
          <MessageBubbleSent message={"Version " + version} />
          <MessageBubbleRecieved message="http://kgeok.github.io/" />
          <MessageBubbleSent message={release} />

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Separator />
            <SafeAreaProvider>
              <SafeAreaView>
                <ModalDialog visable={modals.ip} onClose={() => toggleModal("ip")} title={"Change IP Address/Port"} >
                  <Text style={{ padding: 1 }}>Current IP: {ipaddress}</Text>
                  <Text style={{ padding: 1, marginBottom: 20 }}>Current Port: {port}</Text>
                  <TextInput inputMode='decimal' value={inputTextIP} onChangeText={setInputTextIP} returnKeyType="done" style={styles.GeneralInput} placeholder={ipaddress} ></TextInput>
                  <TextInput inputMode='numeric' value={inputTextPort} onChangeText={setInputTextPort} returnKeyType="done" style={styles.GeneralInput} placeholder={port} ></TextInput>
                  <Pressable style={styles.SettingsButton} onPress={() => {
                    handleSubmitIPPortDialog();
                    toggleModal("ip");
                  }}>
                    <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>Done</Text>
                  </Pressable>
                </ModalDialog>
              </SafeAreaView>
            </SafeAreaProvider>

            <SafeAreaProvider>
              <SafeAreaView>
                <ModalDialog visable={modals.app} onClose={() => toggleModal("ip")} title={"Change Application"} >
                  <Text style={{ padding: 1, marginBottom: 20 }}>Current App: {app}</Text>
                  <Pressable style={styles.GeneralButton} onPress={() => {
                    setapp("Ollama");
                  }}
                  >
                    <Text style={{ textAlign: "center", fontSize: 16, color: "black" }}>Ollama</Text>
                  </Pressable>
                  <Pressable style={styles.GeneralButton} onPress={() => {
                    setapp("Other");
                  }}
                  >
                    <Text style={{ textAlign: "center", fontSize: 16, color: "black" }}>Other</Text>
                  </Pressable>
                  <Pressable style={styles.SettingsButton} onPress={() => {
                    toggleModal("app");
                    console.log(app);
                  }}>
                    <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>Done</Text>
                  </Pressable>
                </ModalDialog>
              </SafeAreaView>
            </SafeAreaProvider>

            <SafeAreaProvider>
              <SafeAreaView>
                <ModalDialog visable={modals.clear} onClose={() => toggleModal("ip")} title={"Clear Chat?"} >
                  <Pressable style={styles.DestructiveButton} onPress={() => toggleModal("clear")}>
                    <Text style={{ textAlign: "center", fontSize: 16, color: "pink" }}>Clear</Text>
                  </Pressable>
                  <Pressable style={styles.SettingsButton} onPress={() => toggleModal("clear")}>
                    <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>Dismiss</Text>
                  </Pressable>

                </ModalDialog>
              </SafeAreaView>
            </SafeAreaProvider>

            <Pressable style={styles.GeneralButton} onPress={() => toggleModal("ip")}>
              <Text style={{ textAlign: "center", fontSize: 16, color: "black" }}>Change IP Address/Port</Text>
            </Pressable>
            <Pressable style={styles.GeneralButton} onPress={() => toggleModal("app")}>
              <Text style={{ textAlign: "center", fontSize: 16, color: "black" }}>Change Application</Text>
            </Pressable>
            <Pressable style={styles.DestructiveButton} onPress={() => toggleModal("clear")}>
              <Text style={{ textAlign: "center", fontSize: 16, color: "pink" }}>Clear Chat</Text>
            </Pressable>
          </View>
        </ScrollView >


      </View >
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Tabs.Navigator screenOptions={({ route }) => ({
          headerShown: true,
          tabBarInactiveTintColor: 'grey',
          tabBarActiveTintColor: 'black',
          tabBarStyle: {
            backgroundColor: "white"
          },
          tabBarIcon: ({ focused, color, size }) => {
            let icon;
            switch (route.name) {
              case 'Messages':
                icon = '💬'
                break;

              case 'Settings':
                icon = '⚙️'
                break;

              default:
                break;

            }
            return <Text
              style={{ fontSize: 18 }}
            >{icon}</Text>;
          }
        })}>
          <Tabs.Screen name='Messages' component={MessagesViewScreen} />
          <Tabs.Screen name='Settings' component={SettingsScreen} />
        </Tabs.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
