
import { Producer, Persona } from './types';

export const PRODUCERS: Producer[] = [
  { id: "A1", category: "Legends", name: "Quincy", style: "Jazz-Fusion, Orchestral Hip Hop, Big Band Brass, Cinematic, Complex Arrangement, 90s Production" },
  { id: "A2", category: "Legends", name: "Babyface", style: "90s R&B, Acoustic Guitar, Smooth Synths, Velvet Texture, Romantic Ballad, Slow Jam" },
  { id: "A3", category: "Legends", name: "Teddy Riley", style: "New Jack Swing, Hard Hitting Drums, Orchestra Hits, 90s Up-Tempo R&B, Swing Beat" },
  { id: "A4", category: "Legends", name: "Dr. Dre", style: "West Coast Hip Hop, G-Funk, High-Pitched Sine Whistle, P-Funk Bass, Clean Mixing, Gangsta Rap" },
  { id: "A5", category: "Legends", name: "Quik", style: "West Coast Funk, Talkbox, Groovy Bassline, Handclaps, Up-Tempo, Jazzy Hip Hop" },
  { id: "A6", category: "Legends", name: "U-Neek", style: "Midwest Hip Hop, Dark Ambient, Gothic, Rapid Hi-Hats, Deep Bass, Horrorcore, Melodic Rap" },
  { id: "B1", category: "Modern", name: "40", style: "Lo-Fi Hip Hop, Underwater Filter, Ambient Synths, Muffled Drums, Deep Bass, Emotional, Atmospheric" },
  { id: "B2", category: "Modern", name: "Boi-1da", style: "Modern Trap, Dancehall Influence, Stadium Anthem, Sharp Drums, Heavy 808, Triumphant" },
  { id: "B3", category: "Modern", name: "D’Mile", style: "Neo-Soul, Live Instrumentation, Retro-Future R&B, Smooth Bass, 70s Soul Influence" },
  { id: "B4", category: "Modern", name: "London", style: "Melodic Trap, Piano-Driven, Bouncy 808s, Crisp Hi-Hats, Atlanta Sound" },
  { id: "B5", category: "Modern", name: "Mustard", style: "West Coast Bounce, Minimalist Trap, Ratchet, Heavy Clap, Club Banger, Up-Tempo" },
  { id: "B6", category: "Modern", name: "Metro", style: "Dark Trap, Minor Key, Cinematic, Haunting Melody, Heavy 808, Orchestral Trap" },
  { id: "C1", category: "Hitmakers", name: "Timbo", style: "Futuristic Funk, Beatboxing, Syncopated Drums, Eastern Samples, Stutter FX, 2000s Hip Hop" },
  { id: "C2", category: "Hitmakers", name: "Darkchild", style: "2000s R&B, Pop Rap, Vocal Stutters, Polished Production, Acoustic Guitar Riffs" },
  { id: "C3", category: "Hitmakers", name: "JD", style: "Atlanta Bass, Party Rap, Fast Tempo, Catchy Hook, Bounce Music" },
  { id: "D1", category: "Specialty", name: "Salsa", style: "Latin Hip Hop, Piano Montuno, Horn Section, Clave Rhythm, Tropical" },
  { id: "D2", category: "Specialty", name: "Orch", style: "Aggressive Orchestral Rap, Gothic Choir, Epic Drums, Dramatic Strings" },
  { id: "D3", category: "Specialty", name: "Motown", style: "Modern Soul, Walking Bassline, Tambourine, Brass Section, Retro Pop" },
  { id: "D4", category: "Specialty", name: "Latin", style: "Reggaeton, Dembow Rhythm, Latin Trap, 808s" },
  { id: "E1", category: "Custom", name: "J Soul", style: "90s Boom Bap, Dusty Vinyl Crackle, Scratching, Jazz Sample, Heavy Drums" },
  { id: "E2", category: "Custom", name: "Marcus", style: "Chipmunk Soul Sample, Luxury Rap, Sped-Up Vocal Sample, Expensive Sound" },
];

export const RAPPERS: Persona[] = [
  { name: "The Observer", tag: "[Verse | Male Vocals | Boom Bap Flow | Storytelling | Complex Rhyme Scheme]" },
  { name: "The Prophet", tag: "[Verse | Male Vocals | Aggressive Flow | Voice Switch | Manic Delivery]" },
  { name: "The Coder", tag: "[Verse | Male Vocals | Lyrical Miracle | Intricate Flow | Clear Enunciation]" },
  { name: "The Surgeon", tag: "[Verse | Male Vocals | Fast Flow | Alliteration | Technical]" },
  { name: "The Chopper", tag: "[Verse | Male Vocals | Rapid Fire | Triplet Flow | Melodic Rap | Harmonized]" },
];

export const SINGERS: Persona[] = [
  { name: "The Matriarch", tag: "[Chorus | Female Vocals | Soulful | Gritty | Aggressive Alto]" },
  { name: "The Crooner", tag: "[Chorus | Male Vocals | Baritone | Smooth | West Coast Harmony]" },
  { name: "The Siren", tag: "[Chorus | Female Vocals | Breathy | Falsetto | Atmospheric | Reverb]" },
  { name: "The Anthem", tag: "[Chorus | Female Vocals | Power Pop | Staccato | Belted | High Energy]" },
  { name: "The Heartthrob", tag: "[Chorus | Male Vocals | R&B Tenor | Smooth Runs | Falsetto]" },
  { name: "The Titan", tag: "[Chorus | Male Vocals | Pop | Percussive | Hiccups | Aggressive]" },
  { name: "The Preacher", tag: "[Chorus | Male Vocals | Southern Soul | Raspy | Gospel Influence]" },
  { name: "The Songbird", tag: "[Chorus | Female Vocals | Whistle Register | Melismatic | High Note]" },
];
