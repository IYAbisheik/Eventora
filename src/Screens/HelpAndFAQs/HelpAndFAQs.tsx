import {
    LayoutAnimation,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    useWindowDimensions,
    View,
    ScrollView,
    Linking,
} from "react-native";
import React, { useState } from "react";
import Fa from "react-native-vector-icons/Ionicons";
import GradientText from "../../Components/GradientText/GradientText";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {};

const HelpAndFAQs = (props: Props) => {
    const { width } = useWindowDimensions();

    const navigation = useNavigation();

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is eventora?",
            answer:
                "Eventora allows you to browse, book, and manage tickets for events such as concerts, conferences, workshops, festivals, and private gatherings.",
        },
        {
            question: "Do I need an account to use the app?",
            answer:
                "Yes, creating an account helps us save your bookings, tickets, and preferences securely.",
        },
        {
            question: "Is the app free to use?",
            answer:
                "Yes! Browsing events is free. You only pay for tickets or services you book.",
        },
        {
            question: "How do I book an event?",
            answer:
                "Browse or search for your event, select date, time, and ticket type, then complete payment to confirm your booking.",
        },
        {
            question: "Where can I find my tickets?",
            answer:
                "Your tickets will appear under “My Bookings” in the app. You’ll also receive an email confirmation.",
        },
        {
            question: "Can I cancel or refund my ticket?",
            answer:
                "Refund and cancellation policies depend on the event organizer. Please check the event details page before booking.",
        },
        {
            question: "Can I transfer my ticket to someone else?",
            answer:
                "Some events allow ticket transfers. If available, you’ll see a “Transfer Ticket” option in your booking details.",
        },
        {
            question: "What payment methods are supported?",
            answer:
                "We support credit/debit cards, UPI, net banking, and digital wallets (depends on your region).",
        },
        {
            question: "Is my payment information secure?",
            answer:
                "Yes. We use secure payment gateways and never store your card details.",
        },
        {
            question: "How can I create or list my own event?",
            answer:
                "If you’re an organizer, go to “Host an Event” in the app, fill in event details, set ticket prices, and publish.",
        },
        {
            question: "Can I track ticket sales for my event?",
            answer:
                "Yes. Organizers get a dashboard to monitor bookings, sales, and attendee information.",
        },
        {
            question: "I didn’t receive my ticket email. What should I do?",
            answer:
                "Check your spam/junk folder. If still missing, go to “My Bookings” in the app or contact support.",
        },
        {
            question: "My payment failed, but money was deducted.",
            answer:
                "Sometimes banks take time to reverse failed transactions. If not refunded within 3–5 business days, contact our support team with payment details.",
        },
        {
            question: "The app isn’t working properly.",
            answer:
                "Try updating the app to the latest version, clear cache, or reinstall. If the problem continues, contact support.",
        },
    ];

    const handleEmail = () => {
        const email = "eventoraaa@gmail.com";
        const subject = "Eventora Support";
        const body = "Hi, I need help with...";
        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        Linking.openURL(url).catch((err) => console.error("Error: ", err));
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Fa name="arrow-back" size={26} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, fontWeight: "500" }}>Help Desk</Text>
                <TouchableOpacity>
                    <Fa name="settings" size={26} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.bodyContainer} showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: width / 15, paddingVertical: width / 20, gap: 20 }}>
                    <Text style={{ fontSize: 28, fontWeight: "bold" }}>
                        We’re here to help you with{"\n"}anything and everything on Eventora
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: "400" }}>
                        At Eventora we expect at a day’s start is you, better and happier than yesterday.
                        We have got you covered — share your concern or check our frequently asked questions listed below.
                    </Text>
                </View>

                <View style={{ paddingHorizontal: width / 15 }}>
                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#ddd",
                        paddingVertical: 12
                    }}>
                        <Text style={{ fontSize: 21, fontWeight: "800" }}>FAQs</Text>
                    </View>
                    {faqs.map((faq, index) => {
                        const isExpanded = expandedIndex === index;
                        return (
                            <View key={index} style={styles.faqItem}>
                                <TouchableOpacity
                                    style={styles.questionRow}
                                    onPress={() => toggleExpand(index)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.question}>{faq.question}</Text>
                                    <Fa
                                        name={isExpanded ? "remove" : "add"}
                                        size={24}
                                        color="#333"
                                    />
                                </TouchableOpacity>
                                {isExpanded && (
                                    <View style={styles.answerContainer}>
                                        <Text style={styles.answer}>{faq.answer}</Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
            <View style={{ paddingHorizontal: width / 15, paddingVertical: width / 35, backgroundColor: "#fafffc" }}>
                <Text style={{ textAlign: "center", fontSize: 19, fontWeight: "700", marginBottom: 10 }}>Still stuck? Help as a mail away</Text>
                <LinearGradient
                    colors={['#000000', '#4A6CF7', '#7B2FF7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ borderRadius: 100 }}
                >
                    <TouchableOpacity style={styles.helpBtn} onPress={handleEmail}>
                        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "500", color: "white" }}>Send a message</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    );
};

export default HelpAndFAQs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: "7%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fafffc"
    },
    bodyContainer: {
        flex: 1,
        backgroundColor: "#f0faf4",
    },
    faqItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingVertical: 12,
    },
    questionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    question: {
        fontSize: 17,
        fontWeight: "600",
        color: "#333",
        flex: 1,
        marginRight: 10,
    },
    answerContainer: {
        marginTop: 8,
    },
    answer: {
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
    },
    helpBtn: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        padding: 18
    }
});
