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

  // Main journey song from Anna
  musicSrc: assetUrl("/audio/birthday-music.mp3"),
  musicTitle: "Birthday melody for you 🎵",

  // Funny reveal photo & celebration song for popup
  funnyPhoto: assetUrl("/images/funny-photo.jpg"),
  happyBirthdayMusicSrc: assetUrl("/audio/happy-birthday.mp3"),

  // Complete memories collection (all photos cleanly mapped)
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
      src: assetUrl("/images/photo20.jpg"),
      alt: "Campus memories with Thangachii",
      caption: "College days & golden friendships 💕",
    },
    {
      src: assetUrl("/images/photo21.jpg"),
      alt: "Spider-Man squad",
      caption: "Spider squad mode: ON! 🕷️✨",
    },
    {
      src: assetUrl("/images/photo22.jpg"),
      alt: "Moonlit fun with Thangachii",
      caption: "Silly filters & endless laughter 🌙",
    },
    {
      src: assetUrl("/images/photo23.jpg"),
      alt: "Flower in her hair",
      caption: "The brightest smile in the room 🌸",
    },
    {
      src: assetUrl("/images/photo24.jpg"),
      alt: "Happy smiles",
      caption: "Smiles that brighten every single day 😊",
    },
    {
      src: assetUrl("/images/photo25.jpg"),
      alt: "Thumbs up gang",
      caption: "Forever proud of you, Thangachii 🫂💯",
    },
    {
      src: assetUrl("/images/photo26.jpg"),
      alt: "Retro monochrome vibes",
      caption: "Retro monochrome vibes & goofy thumbs up 👍🖤",
    },
    {
      src: assetUrl("/images/photo27.jpg"),
      alt: "Sweet companion moments",
      caption: "Floating pink hearts & sweet companion moments 💕✨",
    },
  ],

  // Private intimate memories (accessible ONLY via typing the secret route /secret in address bar)
  secretPhotos: [
    {
      src: assetUrl("/images/photo3.jpg"),
      alt: "Secret Memory with Thangachii",
      caption: "Partners in crime since forever",
    },
    {
      src: assetUrl("/images/photo18.jpg"),
      alt: "Secret Memory with Thangachii",
      caption: "Just being us 🤍",
    },
    {
      src: assetUrl("/images/photo19.jpg"),
      alt: "Secret Memory with Thangachii",
      caption: "Always my favourite person",
    },
    {
      src: assetUrl("/images/photo.jpg"),
      alt: "Secret Memory with Thangachii",
      caption: "Here's to many more memories 🌸",
    },
  ],

  // 8 videos with real video clips
  videos: [
    {
      src: assetUrl("/videos/video1.mp4"),
      poster: "",
      title: "Our little moments",
      caption: "A tiny clip that always makes me smile.",
    },
    {
      src: assetUrl("/videos/video2.mp4"),
      poster: "",
      title: "Celebration moments",
      caption: "Unfiltered laughter, joy, and memories.",
    },
    {
      src: assetUrl("/videos/video3.mp4"),
      poster: "",
      title: "Cultural Night Vlog 🎤🎉",
      caption: "Waiting for DJ & biryani — typical college festival chaos! 😂",
    },
    {
      src: assetUrl("/videos/video4.mp4"),
      poster: "",
      title: "Dil Tu Jaan Tu 🎶",
      caption: "Sweet college memories and favourite melodies.",
    },
    {
      src: assetUrl("/videos/video5.mp4"),
      poster: "",
      title: "Classroom Vibes 🌸",
      caption: "Silly filter moments and endless banter.",
    },
    {
      src: assetUrl("/videos/video6.mp4"),
      poster: "",
      title: "Bestie Banter 👭",
      caption: "Sharing smiles and laughs between lectures.",
    },
    {
      src: assetUrl("/videos/video7.mp4"),
      poster: "",
      title: "Late Night Laughter 🌙",
      caption: "Pouting, laughing, and candid fun with the squad.",
    },
    {
      src: assetUrl("/videos/video8.mp4"),
      poster: "",
      title: "Quick Spark ✨",
      caption: "Spontaneous joy and unstoppable energy!",
    },
  ],

  // The letter — one string per paragraph
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
};
