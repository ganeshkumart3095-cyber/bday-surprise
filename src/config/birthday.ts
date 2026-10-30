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

  welcomeMessage: "Happy Birthday, Princess! 👑✨",
  question: "Do you know how special you are?",
  finalMessage: "May this year be your best one yet!",

  // Main journey song from Anna
  musicSrc: assetUrl("/audio/birthday-music.mp3"),
  musicTitle: "Birthday melody for you 🎵",

  // Celebration reveal photo & Happy Birthday song for cake-cutting popup
  revealPhoto: assetUrl("/images/happy-reveal.jpg"),
  happyBirthdayMusicSrc: assetUrl("/audio/happy-birthday.mp3"),

  // Funny 4K photo & heartfelt message for Chapter 4 Make a Wish climax
  funnyPhoto: assetUrl("/images/funny-photo.jpg"),

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
      caption: "Forever proud of you, Princess 👑💯",
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
    {
      src: assetUrl("/images/photo28.jpg"),
      alt: "Thumbs up with Pookie bows",
      caption: "Thumbs up with Pookie bows 👍🎀",
    },
    {
      src: assetUrl("/images/photo29.jpg"),
      alt: "Spider squad vibes with bestie",
      caption: "Spider squad vibes with bestie 🕷️✨",
    },
    {
      src: assetUrl("/images/photo30.jpg"),
      alt: "Study breaks & cheerful smiles",
      caption: "Study breaks & cheerful smiles 🌸",
    },
    {
      src: assetUrl("/images/photo31.jpg"),
      alt: "Panda filter princess",
      caption: "Panda filter princess 🐼👑",
    },
    {
      src: assetUrl("/images/photo32.jpg"),
      alt: "Classroom selfies & endless banter",
      caption: "Classroom selfies & endless banter 📚",
    },
    {
      src: assetUrl("/images/photo33.jpg"),
      alt: "Floral grace & golden hour glow",
      caption: "Floral grace & golden hour glow ✨",
    },
    {
      src: assetUrl("/images/photo34.jpg"),
      alt: "Pretty in pink & playful expressions",
      caption: "Pretty in pink & playful expressions 💗",
    },
    {
      src: assetUrl("/images/photo35.jpg"),
      alt: "Flower in hair, dreams in eyes",
      caption: "Flower in hair, dreams in eyes 🌼",
    },
    {
      src: assetUrl("/images/photo36.jpg"),
      alt: "Puppy dog duo outdoor giggles",
      caption: "Puppy dog duo outdoor giggles 🐶",
    },
    {
      src: assetUrl("/images/photo37.jpg"),
      alt: "Saree elegance & timeless charm",
      caption: "Saree elegance & timeless charm <3",
    },
    {
      src: assetUrl("/images/photo38.jpg"),
      alt: "Peacock rangoli celebration with school squad",
      caption: "Peacock rangoli celebration with school squad 🦚",
    },
    {
      src: assetUrl("/images/photo39.jpg"),
      alt: "College celebration hall lights & memories",
      caption: "College celebration hall lights & memories 🏮",
    },
    {
      src: assetUrl("/images/photo40.jpg"),
      alt: "Sunny beach day with best friends",
      caption: "Sunny beach day with best friends 🏖️",
    },
    {
      src: assetUrl("/images/photo41.jpg"),
      alt: "Sunset bridge peace & quiet reflections",
      caption: "Sunset bridge peace & quiet reflections 🌅",
    },
    {
      src: assetUrl("/images/photo42.jpg"),
      alt: "Garden smiles in purple elegance",
      caption: "Garden smiles in purple elegance 💜",
    },
    {
      src: assetUrl("/images/photo43.jpg"),
      alt: "Iconic golden sunset silhouette",
      caption: "Iconic golden sunset silhouette 🌇",
    },
    {
      src: assetUrl("/images/photo44.jpg"),
      alt: "School bus adventures & unstoppable laughter",
      caption: "School bus adventures & unstoppable laughter 🚌",
    },
    {
      src: assetUrl("/images/photo45.jpg"),
      alt: "Purple princess gown & teddy bear cuddle",
      caption: "Purple princess gown & teddy bear cuddle 🧸",
    },
    {
      src: assetUrl("/images/photo46.jpg"),
      alt: "Pure innocence & sweetest sister love",
      caption: "Pure innocence & sweetest sister love 💕",
    },
  ],

  // Private intimate memories & love letter written by her lover Maddy (accessible ONLY via typing /secret)
  secretPhotos: [
    {
      src: assetUrl("/images/photo3.jpg"),
      alt: "Maddy & Thangachii goofy selfies",
      caption: "That crazy, cute smile of yours that stole my heart forever 🤍",
    },
    {
      src: assetUrl("/images/photo18.jpg"),
      alt: "Maddy holding your hand with a drawn heart",
      caption:
        "En viral korthu nee nadakkum podhu, ulagamae ninnu pogudhu di... Forever your hand in mine 🤍",
    },
    {
      src: assetUrl("/images/photo19.jpg"),
      alt: "Maddy & Princess walking side by side",
      caption: "Every single step through this life, only with you by my side 💕",
    },
    {
      src: assetUrl("/images/photo.jpg"),
      alt: "Maddy & Princess with floating heart crowns",
      caption: "You will always be the queen of my heart, today and forever 👑❤️",
    },
  ],

  // Secret vault content written by her lover Maddy
  secretVault: {
    title: "Happy Birthday, En Uyire 🤍✨",
    subtitle:
      "A secret sanctuary meant only for our eyes. Every beat of my heart belongs to you, my love.",
    badge: "From Your Maddy 🔒",
    loverName: "Maddy",
    video: {
      src: assetUrl("/videos/video-secret.mp4"),
      title: "Our Quiet Moments Together 🌿🤍",
      caption: "Walking beside you, listening to your voice, feeling the quiet breeze... Every step with you is my favourite place to be.",
    },
    letter: [
      "Happy Birthday, En Uyire 🤍",
      "Indha ulagathula evvalo per unakku birthday wishes sonnalum, indha oru pakkam unakku mattum dhaan... namakku mattum dhaan. Un kitta naan pesina mudhal naal enakku innum nalla nyabagam irukku. Appo lam oru naal nee en vaazhkaiyae aava nu naan nenaikala di...",
      "Aana ippo? En ovvoru ninaivulayum, en ovvoru aasaikulayum nee dhaan irukka. Unnoda sirippu en manasukku tharra amaidhi vera edhulayum kedaikadhu. Un kooda irukura ovvoru nodiyum, I feel like the luckiest person alive in this universe ✨.",
      "Sila ninaivugal indha ulagathukku kaata mudiyadhu... aana namakku adhu dhaan uyir. En kai korthu nee nadakkum podhu, indha kaala neram ellame ninnudum. Indha jenmam mattum illa, innum ethana jenmam eduthaalum, un kai pudichu un kooda dhaan vaazhanum 🫂❤️.",
      "Happy Birthday to my favourite person, my safe place, my best friend, and the girl of my dreams. Always by your side, protecting you, loving you more with every passing second.",
    ],
    signature: "Forever & Always Yours, With all my heart and soul ❤️💍 — Your Maddy",
  },

  // 12 videos with real video clips
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
    {
      src: assetUrl("/videos/video9.mp4"),
      poster: "",
      title: "Puppy Smiles 🐶",
      caption: "Silly filter fun between classes.",
    },
    {
      src: assetUrl("/videos/video10.mp4"),
      poster: "",
      title: "Campus Laughter 😄",
      caption: "Unfiltered joyful moments with friends.",
    },
    {
      src: assetUrl("/videos/video11.mp4"),
      poster: "",
      title: "Laughing Out Loud 😂",
      caption: "Laughing out loud at the silliest things.",
    },
    {
      src: assetUrl("/videos/video12.mp4"),
      poster: "",
      title: "Sunny Afternoon ☀️",
      caption: "Warm smiles on campus grounds.",
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
    "Happy Birthday Princess 👑💖",
  ],
  signature: "With all my love, your Anna 💗",
};
