
import { Producer, Persona, Preset } from './types';

export const PRODUCERS: Producer[] = [
  // Group A: Legends & Vets
  { id: "A1", name: "Quincy", category: "Legends", style: "Jazz-Fusion, Orchestral Hip Hop, Big Band Brass, Cinematic, Complex Arrangement, 90s Production" },
  { id: "A2", name: "Babyface", category: "Legends", style: "90s R&B, Acoustic Guitar, Smooth Synths, Velvet Texture, Romantic Ballad, Slow Jam" },
  { id: "A3", name: "Teddy Riley", category: "Legends", style: "New Jack Swing, Hard Hitting Drums, Orchestra Hits, 90s Up-Tempo R&B, Swing Beat" },
  { id: "A4", name: "Dr. Dre", category: "Legends", style: "West Coast Hip Hop, G-Funk, High-Pitched Sine Whistle, P-Funk Bass, Clean Mixing, Gangsta Rap" },
  { id: "A5", name: "Quik", category: "Legends", style: "West Coast Funk, Talkbox, Groovy Bassline, Handclaps, Up-Tempo, Jazzy Hip Hop" },
  { id: "A6", name: "U-Neek", category: "Legends", style: "Midwest Hip Hop, Dark Ambient, Gothic, Rapid Hi-Hats, Deep Bass, Horrorcore, Melodic Rap" },

  // Group B: Modern Titans
  { id: "B1", name: "40", category: "Modern", style: "Lo-Fi Hip Hop, Underwater Filter, Ambient Synths, Muffled Drums, Deep Bass, Emotional, Atmospheric" },
  { id: "B2", name: "Boi-1da", category: "Modern", style: "Modern Trap, Dancehall Influence, Stadium Anthem, Sharp Drums, Heavy 808, Triumphant" },
  { id: "B3", name: "D’Mile", category: "Modern", style: "Neo-Soul, Live Instrumentation, Retro-Future R&B, Smooth Bass, 70s Soul Influence" },
  { id: "B4", name: "London", category: "Modern", style: "Melodic Trap, Piano-Driven, Bouncy 808s, Crisp Hi-Hats, Atlanta Sound" },
  { id: "B5", name: "Mustard", category: "Modern", style: "West Coast Bounce, Minimalist Trap, Ratchet, Heavy Clap, Club Banger, Up-Tempo" },
  { id: "B6", name: "Metro", category: "Modern", style: "Dark Trap, Minor Key, Cinematic, Haunting Melody, Heavy 808, Orchestral Trap" },
  { id: "B7", name: "The Phantom", category: "Modern", style: "Trapsoul, Muffled 90s R&B Sample, Rapid Trap Hi-Hats, Deep Distorted 808, Underwater Filter, Dark Ambient, Toxic Vibe" },

  // Group C: 2000s Hitmakers
  { id: "C1", name: "Timbo", category: "2000s Hits", style: "Futuristic Funk, Beatboxing, Syncopated Drums, Eastern Samples, Stutter FX, 2000s Hip Hop" },
  { id: "C2", name: "Darkchild", category: "2000s Hits", style: "2000s R&B, Pop Rap, Vocal Stutters, Polished Production, Acoustic Guitar Riffs" },
  { id: "C3", name: "JD", category: "2000s Hits", style: "Atlanta Bass, Party Rap, Fast Tempo, Catchy Hook, Bounce Music" },
  { id: "C4", name: "Velvet Vic", category: "2000s Hits", style: "90s R&B Hip Hop, New Jack Swing Drums, Rap/Sung Flow, Melismatic Vocals, Smooth Synth Pads, Heavy Kick Drum, Street Soul" },

  // Group D: Fusion & Specialized
  { id: "D1", name: "Salsa", category: "Fusion", style: "Latin Hip Hop, Piano Montuno, Horn Section, Clave Rhythm, Tropical" },
  { id: "D2", name: "Orch", category: "Fusion", style: "Aggressive Orchestral Rap, Gothic Choir, Epic Drums, Dramatic Strings" },
  { id: "D3", name: "Motown", category: "Fusion", style: "Modern Soul, Walking Bassline, Tambourine, Brass Section, Retro Pop" },
  { id: "D4", name: "Latin", category: "Fusion", style: "Reggaeton, Dembow Rhythm, Latin Trap, 808s" },
  { id: "D5", name: "El Jefe", category: "Fusion", style: "Latin Hip Hop, Salsa Piano Montuno, Hard Hitting Boom Bap Drums, Clave Rhythm, Deep 808 Bass, Horn Stabs, Street Rap Flow" },
  { id: "D6", name: "The Maestro", category: "Fusion", style: "Orchestral Trap, Pizzicato Strings, Rolling Hi-Hats, Deep 808 Sub Bass, Dissonant Harmony, Cinematic Hip Hop, Gothic Rap" },
  { id: "D7", name: "The Mechanic", category: "Fusion", style: "Hip Hop Soul, Motown Sample Flip, Heavy Breakbeat, Dusty Drum Loops, Retro Soul Harmonies, Modern Rap Verses, Wall of Sound" },

  // Group E: Sample Kings
  { id: "E1", name: "J Soul", category: "Sample Based", style: "90s Boom Bap, Dusty Vinyl Crackle, Scratching, Jazz Sample, Heavy Drums" },
  { id: "E2", name: "Marcus", category: "Sample Based", style: "Chipmunk Soul Sample, Luxury Rap, Sped-Up Vocal Sample, Expensive Sound" },
  { id: "E3", name: "Dusty", category: "Sample Based", style: "Delta Blues Boom Bap, Slide Guitar Riff, Dirty Drum Break, Vinyl Crackle, Microtonal Bends, Gritty Rap, Stomping Rhythm" },
  { id: "E4", name: "The Cat", category: "Sample Based", style: "Jazz Rap, Upright Bass Loop, Swing Hop Drums, Saxophone Samples, Syncopated Kick, Smokey Vibe, Conscious Rap Flow" },

  // Group G: Master Selection (New Additions)
  { id: "G1", name: "The Don", category: "Master Selection", style: "1998 East Coast Hip Hop, Fast Tempo Boom Bap, Relentless 70s Funk Loop, Aggressive, Gritty, Mafioso Rap, Hypnotic Sample, Hard Hitting Drums, High Energy, Raw, Cinematic Street Anthem" },
  { id: "G3", name: "The Sermon", category: "Master Selection", style: "Slow Tempo Blues Hip Hop, Hammond B3 Organ, Deep Upright Bass, Minimalist, Humming Vocal Texture, Slow Drag Drums, Emotional, Sad, Soulful, Vintage, Swampy, Heavy Groove, No Guitar" },
  { id: "G4", name: "Z. The Villain", category: "Master Selection", style: "orchestral, dark r&b, aggressive, hardcore hip hop, rap, trap bass, boom bap drums, dramatic strings, cinematic" },
  { id: "G5", name: "The Crossroads", category: "Master Selection", style: "Slow Tempo Blues Hip Hop, Gritty Electric Guitar Riffs, Heavy Boom Bap Drums, Hammond Organ, Swampy, Southern Gothic, Melancholy, Raw, Lo-Fi, Vinyl Crackle, Swing Rhythm" },
  { id: "G6", name: "The Delta Ghost", category: "Master Selection", style: "Ultra Slow Tempo Blues, Minimalist Hip Hop, Stripped Back, Lonely Electric Guitar, Deep Sub Bass, Spacious, Melancholy, Painful, Haunting, Raw Emotion, Slow Motion Groove, Sparse Instrumentation, Sad" },
  { id: "G7", name: "The Nocturne", category: "Master Selection", style: "Ultra Slow Tempo Hip Hop, Dark Minor Key Piano, Minimalist, Heavy Sub Bass, Spacious, Melancholy, Sad, Cinematic, Cold, Emotional, Stripped Back, Atmospheric, Reverb" },
  { id: "G8", name: "The Headliner", category: "Master Selection", style: "Pop Rap, Melodic Hip Hop, 2000s Chart Topper, Catchy Hook, Bright Synths, Radio Hit, Polished Production, Upbeat, Club Banger, Major Key, Commercial" },
];

export const RAPPERS: Persona[] = [
  // Original 5
  { name: "The Observer", tag: "[Verse | Male Vocals | Boom Bap Flow | Storytelling | Complex Rhyme Scheme]" },
  { name: "The Prophet", tag: "[Verse | Male Vocals | Aggressive Flow | Voice Switch | Manic Delivery]" },
  { name: "The Coder", tag: "[Verse | Male Vocals | Lyrical Miracle | Intricate Flow | Clear Enunciation]" },
  { name: "The Surgeon", tag: "[Verse | Male Vocals | Fast Flow | Alliteration | Technical]" },
  { name: "The Chopper", tag: "[Verse | Male Vocals | Rapid Fire | Triplet Flow | Melodic Rap | Harmonized]" },
  
  // Roster
  { name: "The Hustler", tag: "[Verse | Male Vocals | Gritty | Streetwise | Raspy | Mid-Tempo | Swagger]" },
  { name: "The Zen Master", tag: "[Verse | Male Vocals | Calm | Monotone | Deep Bass | Meditative Flow | Wise]" },
  { name: "The Sophisticate", tag: "[Verse | Male Vocals | Intelligent | Smooth | Crisp | Jazzy Flow | Eloquent]" },
  { name: "The Titan", tag: "[Verse | Male Vocals | Booming | Heavy | Slow & Powerful Flow | Command]" },
  { name: "The Glitch", tag: "[Verse | Male Vocals | Stutter-flow | Syncopated | Electronic | Futuristic Flow]" },
  { name: "The Ghost", tag: "[Verse | Male Vocals | Ethereal | Whisper-like | Dark | Atmospheric Flow]" },

  // New Dossiers
  { name: "The Martian", tag: "[Verse | Male Vocals | Free Association | Weird Similes | Non-Sequitur | High Pitched | Auto-Tune | Alien Sound]" },
  { name: "Smooth Operator", tag: "[Verse | Male Vocals | Monorhyme Scheme | Relaxed Flow | 2000s R&B Rap | Whisper Ad-libs | Luxury Rap]" },
  { name: "The Franchise", tag: "[Verse | Male Vocals | Staccato Flow | Stadium Projection | Basketball Metaphors | High Energy | Jumbotron Voice]" },
  { name: "The Architect (King Los)", tag: "[Verse | Male Vocals | Lyrical Architecture | Multi-Syllabic Rhymes | Elastic Flow | Internal Rhyming | Street Scholar | Rapid Fire Switch | Precise Articulation]" },
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

export const PRESETS: Preset[] = [
  {
    id: "p6",
    name: "Master Class: Architecture",
    description: "Maximum technical difficulty. Multi-syllabic rhymes and flow switches.",
    config: {
      performanceMode: "solo_rap",
      producerId: "G1", // The Don
      rapperName: "The Architect (King Los)"
    }
  },
  {
    id: "p1",
    name: "90s West Coast",
    description: "Laid back G-Funk vibes with smooth baritone vocals.",
    config: {
      performanceMode: "duet",
      producerId: "A4", // Dr. Dre
      rapperName: "The Titan",
      singerName: "The Crooner"
    }
  },
  {
    id: "p2",
    name: "Toxic Trapsoul",
    description: "Atmospheric, dark, and emotional underwater vibes.",
    config: {
      performanceMode: "duet",
      producerId: "B7", // The Phantom
      rapperName: "The Ghost",
      singerName: "The Siren"
    }
  },
  {
    id: "p3",
    name: "Stadium Anthem",
    description: "High energy, aggressive bars and powerful belt vocals.",
    config: {
      performanceMode: "duet",
      producerId: "B2", // Boi-1da
      rapperName: "The Franchise",
      singerName: "The Anthem"
    }
  },
  {
    id: "p4",
    name: "Cinematic Drama",
    description: "Gothic orchestral strings with manic rap delivery.",
    config: {
      performanceMode: "duet",
      producerId: "G4", // Z. The Villain
      rapperName: "The Prophet",
      singerName: "The Matriarch"
    }
  },
  {
    id: "p5",
    name: "Lo-Fi Lullaby",
    description: "Muffled lo-fi hip hop with ethereal female falsetto.",
    config: {
      performanceMode: "duet",
      producerId: "B1", // 40
      rapperName: "The Zen Master",
      singerName: "The Songbird"
    }
  }
];
