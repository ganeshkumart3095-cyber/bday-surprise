/* =====================================================================
 * 🎀 BIRTHDAY CONFIG — edit everything about the surprise here.
 * ---------------------------------------------------------------------
 * Photos: put files in /public/images and set src: "/images/01.jpg"
 * Videos: put files in /public/videos and set src: "/videos/clip1.mp4"
 * Music:  put a file in /public/audio and set musicSrc: "/audio/song.mp3"
 * ===================================================================== */

export const birthday = {
  name: "Thangachii",
  nameTamil: "தங்கச்சி",
  from: "Anna",
  fromTamil: "அண்ணா",

  welcomeMessage: "Happy Birthday, Dear Thangachii! 🎉✨",
  question: "Do you know how special you are?",
  finalMessage: "May this year be your best one yet!",

  // Leave empty ("") to hide the music player's sound until you add a song.
  musicSrc: "/audio/birthday-music.mp3",
  musicTitle: "Birthday melody for you 🎵",

  // 20 photos — mapped cleanly to existing images in public/images
  photos: [
    { src: "/images/photo1.jpg", alt: "Memory 1 with Thangachii", caption: "The day it all began 💕" },
    { src: "/images/photo2.jpg", alt: "Memory 2 with Thangachii", caption: "That smile could light up the whole house" },
    { src: "/images/photo3.jpg", alt: "Memory 3 with Thangachii", caption: "Partners in crime since forever" },
    { src: "/images/photo4.jpg", alt: "Memory 4 with Thangachii", caption: "Remember this trip? I do, every bit." },
    { src: "/images/photo5.jpg", alt: "Memory 5 with Thangachii", caption: "Festival vibes ✨" },
    { src: "/images/photo6.jpg", alt: "Memory 6 with Thangachii", caption: "You laughed so hard here" },
    { src: "/images/photo7.jpg", alt: "Memory 7 with Thangachii", caption: "Our silly faces era" },
    { src: "/images/photo8.jpg", alt: "Memory 8 with Thangachii", caption: "School days, big dreams" },
    { src: "/images/photo9.jpg", alt: "Memory 9 with Thangachii", caption: "Sunday mornings at home" },
    { src: "/images/photo10.jpg", alt: "Memory 10 with Thangachii", caption: "The best cake thief 🎂" },
    { src: "/images/photo11.jpg", alt: "Memory 11 with Thangachii", caption: "Pongal memories" },
    { src: "/images/photo12.jpg", alt: "Memory 12 with Thangachii", caption: "When you beat me at carrom (once!)" },
    { src: "/images/photo13.jpg", alt: "Memory 13 with Thangachii", caption: "Family photo — you stole the show" },
    { src: "/images/photo14.jpg", alt: "Memory 14 with Thangachii", caption: "Beach day, sandy feet" },
    { src: "/images/photo15.jpg", alt: "Memory 15 with Thangachii", caption: "Proud Anna moment" },
    { src: "/images/photo16.jpg", alt: "Memory 16 with Thangachii", caption: "Late night talks" },
    { src: "/images/photo17.jpg", alt: "Memory 17 with Thangachii", caption: "Your graduation glow" },
    { src: "/images/photo18.jpg", alt: "Memory 18 with Thangachii", caption: "Just being us" },
    { src: "/images/photo19.jpg", alt: "Memory 19 with Thangachii", caption: "Always my favourite person" },
    { src: "/images/photo.jpg", alt: "Memory 20 with Thangachii", caption: "Here's to many more memories 🌸" },
  ],

  // 1–3 videos. Use "" for src to show a gentle placeholder card.
  videos: [
    { src: "/videos/video1.mp4", poster: "", title: "Our little moments", caption: "A tiny clip that always makes me smile." },
    { src: "", poster: "", title: "Birthday wishes from family", caption: "Everyone who loves you, in one place." },
  ],

  // The letter — one string per paragraph (5–7 is perfect).
  letter: [
    "Dear Thangachii,",
    "From the very first day you came into our lives, everything became brighter. I didn't know it then, but I had just been given the best gift I would ever receive — a little sister who would grow up to be my best friend.",
    "We've fought over the TV remote, the last piece of sweet, and who gets the window seat. But every single time, you were the first person I wanted to share good news with, and the first person I worried about when things were hard.",
    "Watching you grow into the kind, brave, beautiful person you are today has been one of the proudest journeys of my life. You carry so much love in your heart, and you give it away so freely.",
    "On the days you doubt yourself, please remember: your Anna is always in your corner. No matter how far life takes us, you'll always have a home in me.",
    "Thank you for the laughter, the patience, the silly fights and the endless memories. I'm so grateful that out of everyone in the world, I got you.",
    "Happy birthday, my dearest. Keep shining, keep smiling, and never stop being you.",
  ],
  signature: "With all my love, your Anna 💗",

  // "Why you're special" — add or edit as many as you like.
  reasons: [
    { emoji: "🌸", title: "Your kindness", text: "You make everyone around you feel cared for." },
    { emoji: "😂", title: "Your laugh", text: "It's contagious, loud, and my favourite sound." },
    { emoji: "💪", title: "Your strength", text: "You face every challenge with quiet courage." },
    { emoji: "🎨", title: "Your creativity", text: "You see beauty where others don't look." },
    { emoji: "🤝", title: "Your loyalty", text: "Once you love someone, it's for life." },
    { emoji: "✨", title: "Just you", text: "There is no one else in the world like you." },
  ],
};
