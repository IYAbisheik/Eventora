import { AnimationObject } from "lottie-react-native";

export interface onboardingData{
    id: number;
    animation: AnimationObject;
    title: string;
    text: string;
    textColor: string;
    backgroundColor: string;
}

const data: onboardingData[] = [
    {
        id: 1,
        animation: require("../../../Assets/animations/Couple_love.json"),
        title: 'Plan Smarter, Not Harder',
        text: `Create events in minutes with intuitive tools designed to save you time and effort.`,
        textColor: "#4285F4",
        backgroundColor: "#F4B142"
    },
    {
        id: 2,
        animation: require("../../../Assets/animations/book_event_Animation.json"),
        title: 'Seamless Guest Management',
        text: 'Track RSVPs, send invites, and stay connected with your attendees—all in one place.',
        textColor: "#EA4335",
        backgroundColor: "#35D7EA"
    },
    {
        id: 3,
        animation: require("../../../Assets/animations/event_organizing.json"),
        title: 'Stay on Top of Every Detail',
        text: 'From schedules to reminders, keep everything organized so your event runs smoothly.',
        textColor: "#34A853",
        backgroundColor: "#A83485"
    },
    {
        id: 4,
        animation: require("../../../Assets/animations/Long_Dog.json"),
        title: 'Celebrate Without Stress',
        text: 'Focus on the moments that matter while we handle the logistics behind the scenes.',
        textColor: "#FBBC04",
        backgroundColor: "#043EFB"
    }
]

export default data;