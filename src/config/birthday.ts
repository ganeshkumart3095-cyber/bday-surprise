/* =====================================================================
 * 🎀 BIRTHDAY CONFIG — edit everything about the surprise here.
 * ---------------------------------------------------------------------
 * Photos: put files in /public/images and set src: "/images/01.jpg"
 * Videos: put files in /public/videos and set src: "/videos/clip1.mp4"
 * Music:  put a file in /public/audio and set musicSrc: "/audio/song.mp3"
 * ===================================================================== */

import { assetUrl } from "@/lib/utils";

export const birthday = {
  name: "Thangachii",
  nameTamil: "தங்கச்சி",
  from: "Anna",
  fromTamil: "அண்ணா",

  welcomeMessage: "Happy Birthday, Dear Thangachii! 🎉✨",
  question: "Do you know how special you are?",
  finalMessage: "May this year be your best one yet!",

  // Leave empty ("") to hide the music player's sound until you add a song.
  musicSrc: assetUrl("/audio/birthday-music.mp3"),
  musicTitle: "Birthday melody for you 🎵",

  // 20 photos — mapped cleanly to existing images in public/images
  photos: [
    {
      src: assetUrl("/images/photo1.jpg"),
      alt: "Memory 1 with Thangachii",
      caption: "The day it all began 💕",
    },
    {
      src: assetUrl("/images/photo2.jpg"),
      alt: "Memory 2 with Thangachii",
      caption: "That smile could light up the whole house",
    },
    {
      src: assetUrl("/images/photo3.jpg"),
      alt: "Memory 3 with Thangachii",
      caption: "Partners in crime since forever",
    },
    {
      src: assetUrl("/images/photo4.jpg"),
      alt: "Memory 4 with Thangachii",
      caption: "Remember this trip? I do, every bit.",
    },
    {
      src: assetUrl("/images/photo5.jpg"),
      alt: "Memory 5 with Thangachii",
      caption: "Festival vibes ✨",
    },
    {
      src: assetUrl("/images/photo6.jpg"),
      alt: "Memory 6 with Thangachii",
      caption: "You laughed so hard here",
    },
    {
      src: assetUrl("/images/photo7.jpg"),
      alt: "Memory 7 with Thangachii",
      caption: "Our silly faces era",
    },
    {
      src: assetUrl("/images/photo8.jpg"),
      alt: "Memory 8 with Thangachii",
      caption: "School days, big dreams",
    },
    {
      src: assetUrl("/images/photo9.jpg"),
      alt: "Memory 9 with Thangachii",
      caption: "Sunday mornings at home",
    },
    {
      src: assetUrl("/images/photo10.jpg"),
      alt: "Memory 10 with Thangachii",
      caption: "The best cake thief 🎂",
    },
    {
      src: assetUrl("/images/photo11.jpg"),
      alt: "Memory 11 with Thangachii",
      caption: "Pongal memories",
    },
    {
      src: assetUrl("/images/photo12.jpg"),
      alt: "Memory 12 with Thangachii",
      caption: "When you beat me at carrom (once!)",
    },
    {
      src: assetUrl("/images/photo13.jpg"),
      alt: "Memory 13 with Thangachii",
      caption: "Family photo — you stole the show",
    },
    {
      src: assetUrl("/images/photo14.jpg"),
      alt: "Memory 14 with Thangachii",
      caption: "Beach day, sandy feet",
    },
    {
      src: assetUrl("/images/photo15.jpg"),
      alt: "Memory 15 with Thangachii",
      caption: "Proud Anna moment",
    },
    {
      src: assetUrl("/images/photo16.jpg"),
      alt: "Memory 16 with Thangachii",
      caption: "Late night talks",
    },
    {
      src: assetUrl("/images/photo17.jpg"),
      alt: "Memory 17 with Thangachii",
      caption: "Your graduation glow",
    },
    {
      src: assetUrl("/images/photo18.jpg"),
      alt: "Memory 18 with Thangachii",
      caption: "Just being us",
    },
    {
      src: assetUrl("/images/photo19.jpg"),
      alt: "Memory 19 with Thangachii",
      caption: "Always my favourite person",
    },
    {
      src: assetUrl("/images/photo.jpg"),
      alt: "Memory 20 with Thangachii",
      caption: "Here's to many more memories 🌸",
    },
  ],

  // 1–3 videos. Use "" for src to show a gentle placeholder card.
  videos: [
    {
      src: assetUrl("/videos/video1.mp4"),
      poster: "",
      title: "Our little moments",
      caption: "A tiny clip that always makes me smile.",
    },
    {
      src: "",
      poster: "",
      title: "Birthday wishes from family",
      caption: "Everyone who loves you, in one place.",
    },
  ],

  // The letter — one string per paragraph (5–7 is perfect).
  letter: [
    "Dear Thangachii,",
    "Idhuvum oru vagaila love dhaan... aana idhu romba pure-aana, edhirpaappu illaadha love 🫂. Oru naal Instagram-la random-ah meet panna ponnu, konjam konjam-ah pesi pazhaga aarambichom. Appo lam enakku nee stranger dhaan...😅 aana naal pogapoga, unnoda care, understanding, paasam ellame en manasula oru thani idam create panniduchu🥹.",
    "Blood relationship illa naalum, enakku nee dan en thangachiiiiii madhiri aayita🥹🥹🥹. Ippo en life-la enna nadandhaalum, mudhala nyabagam varra persons-la neeyum oruthi ma🥹💯.",
    "Naan happy-ah irundhaalum, sad-ah irundhaalum, Un kitta share panna oru comfort irukku. Sila relationships blood-la create aagathu... manasula create aagum. Apdi en life-ku kadavul random-ah anuppina oru azhagana relationship dhaan nee en thangachi🫂🫂.",
    "Inniku nee enakku just Instagram-la random-ah meet aana ponnu illa da... enakku romba precious-aana oru thangachiiii. Blood same illa, family same illa... aana paasathula endha difference-um illa🥹🥹.",
    "Unnoda happiness enakku romba mukkiyam, unaku edhu nadandhaalum naan iruppen nu solli kudutha bond idhu. 'Thangachi' nu koopidradhu oru vaarthai dhaan... aana nee en uyirukku romba nerukkamaan Oru uravu agita ma.",
    "HAPPY BIRTHDAY MA THANGACHIII 🤍🫂",
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
