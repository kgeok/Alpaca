import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    MainMessageView: {
        flex: 0,
        backgroundColor: '#f6f6f6ff',
        paddingTop: 20,
        paddingBottom: 30,
        height: '88%',
    },
    SendMessageButton: {
        width: 65,
        height: 65,
        borderRadius: 50,
        color: "#099ae8ff",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        textAlign: 'center',
        textAlignVertical: 'center',

    },
    SettingsButton: {
        width: "95%",
        borderRadius: 10,
        margin: 10,
        backgroundColor: "#099ae8ff",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: 20,
        fontSize: 16,
        textAlign: "center"

    },
    GeneralButton: {
        width: "95%",
        borderRadius: 10,
        margin: 10,
        backgroundColor: "#aeaeae",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: 20,
        fontSize: 16,
        textAlign: "center"

    },
    DestructiveButton: {
        width: "95%",
        borderRadius: 10,
        margin: 10,
        backgroundColor: "#bb0000ff",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: 20,
        fontSize: 16,
        textAlign: "center"

    },
    MessageCompose: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flex: 1,
        padding: 10,
        paddingTop: 40,
        paddingBottom: 20
    },
    MessageBubbleSent: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        maxWidth: '70%',
        backgroundColor: "#099ae8ff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'space-between',
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 20,
        color: "#ffffff",
        fontSize: 18,
        margin: 10,
        justifyContent: 'flex-end',
    },
    MessageBubbleRecieved: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        maxWidth: '70%',
        backgroundColor: "#aeaeae",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'space-between',
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 20,
        color: "#ffffff",
        fontSize: 18,
        margin: 10,
        justifyContent: 'flex-end',
    },
    MessageInput: {
        width: '80%',
        fontSize: 18,
        padding: 20,
        height: 65,
        borderColor: '#b3b3b3ff',
        borderRadius: 50,
        borderWidth: 2,
        backgroundColor: '#f3efefff',
    },
    GeneralInput: {
        width: '95%',
        fontSize: 18,
        padding: 20,
        height: 65,
        borderColor: '#b3b3b3ff',
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor: '#f3efefff',
        marginBottom: 10
    },
    Separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    ModalContainer: {
        padding: 20,
        borderRadius: 20,
        backgroundColor: "#ebeaeaff",
        height: "100%",
        alignItems: "center",

    },
    ModalCenter: {
        flex: 1,
        justifyContent: 1,
        alignitems: 1

    }


})

export default styles;