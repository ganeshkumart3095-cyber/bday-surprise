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
  musicSrc: "",
  musicTitle: "Her favourite song",

  // 20 photos — replace src with your own (e.g. "/images/01.jpg") and write captions.
  photos: Array.from({ length: 20 }, (_, i) => ({
    src: `https://picsum.photos/seed/thangachii${i + 1}/600/750`,
    alt: `Memory ${i + 1} with Thangachii`,
    caption: [
      "The day it all began 💕",
      "That smile could light up the whole house",
      "Partners in crime since forever",
      "Remember this trip? I do, every bit.",
      "Festival vibes ✨",
      "You laughed so hard here",
      "Our silly faces era",
      "School days, big dreams",
      "Sunday mornings at home",
      "The best cake thief 🎂",
      "Pongal memories",
      "When you beat me at carrom (once!)",
      "Family photo — you stole the show",
      "Beach day, sandy feet",
      "Proud Anna moment",
      "Late night talks",
      "Your graduation glow",
      "Just being us",
      "Always my favourite person",
      "Here's to many more memories 🌸",
    ][i],
  })),

  // 1–3 videos. Use "" for src to show a gentle placeholder card.
  videos: [
    { src: "", poster: "", title: "Our little moments", caption: "A tiny clip that always makes me smile." },
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
