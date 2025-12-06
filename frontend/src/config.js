// BLACK FEATHER GANG - ADMIN CONFIGURATION FILE
// Edit this file to control all website content, colors, images, and settings

export const siteConfig = {
  // ===== GANG IDENTITY =====
  gangName: "BLACK FEATHER",
  tagline: "Rise Silent. Strike Loud. Rule the Shadows.",
  
  // ===== THEME COLORS =====
  colors: {
    primaryBlack: "#0a0a0a",
    deepGrey: "#2a2a2a",
    royalPurple: "#6b21a8",
    electricYellow: "#facc15",
    softGreyHighlight: "#4b5563",
    // Additional calculated colors for UI
    purpleDark: "#581c87",
    purpleLight: "#a855f7",
    yellowDark: "#eab308",
  },

  // ===== IMAGES & ASSETS =====
  images: {
    logo: "/logo.png", // Upload your logo here
    heroBackground: "/hero-bg.jpg", // Hero section background
    aboutBanner: "/about-banner.jpg",
    rulesBanner: "/rules-banner.jpg",
    rosterBanner: "/roster-banner.jpg",
    joinBanner: "/join-banner.jpg",
    contactBanner: "/contact-banner.jpg",
    rankIcons: {
      ravenRegent: "/ranks/regent.png",
      blackTalon: "/ranks/talon.png",
      nightborneCouncil: "/ranks/council.png",
      shadowhands: "/ranks/shadowhands.png",
      featherborn: "/ranks/featherborn.png",
    },
  },

  // ===== NAVIGATION =====
  navigation: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Rules", path: "/rules" },
    { name: "Roster", path: "/roster" },
    { name: "Join", path: "/join" },
    { name: "Contact", path: "/contact" },
  ],

  // ===== LANDING PAGE =====
  hero: {
    title: "BLACK FEATHER",
    tagline: "Rise Silent. Strike Loud. Rule the Shadows.",
    primaryButton: {
      text: "Join Discord",
      link: "https://discord.gg/yourlink", // ADD YOUR DISCORD INVITE
      external: true,
    },
    secondaryButton: {
      text: "Requirements",
      link: "/join",
      external: false,
    },
  },

  // ===== ABOUT PAGE =====
  about: {
    title: "Who We Are",
    description: "BLACK FEATHER is a disciplined criminal organization that operates in the shadows of Los Santos. We are not a street gang — we are a syndicate. Silent, strategic, and deadly. We built our reputation on loyalty, precision, and unwavering discipline.",
    mission: "Our mission is to control the underground economy through calculated operations, strategic alliances, and ruthless execution. We value quality over quantity, loyalty over ego, and discipline over chaos.",
    values: [
      {
        title: "Loyalty",
        description: "Absolute loyalty to the flock. Betrayal is met with swift consequences.",
      },
      {
        title: "Discipline",
        description: "Every action is calculated. Emotion has no place in operations.",
      },
      {
        title: "Silence",
        description: "We move in the shadows. Information is power, and we protect it fiercely.",
      },
      {
        title: "Excellence",
        description: "We demand the highest quality of roleplay and criminal execution.",
      },
    ],
  },

  // ===== RULES PAGE =====
  rules: {
    title: "Code of Conduct",
    categories: [
      {
        id: "ranks",
        title: "Rank Structure",
        icon: "crown",
        rules: [
          {
            title: "Raven Regent (Rank 1)",
            description: "Supreme leader and ultimate decision-maker. Controls vision, alliances, finances, and all promotions/demotions.",
          },
          {
            title: "Black Talon (Rank 2)",
            description: "Second-in-command and operational commander. Executes the Regent's vision and manages daily operations.",
          },
          {
            title: "Nightborne Council (Rank 3)",
            description: "Strategic backbone and management crew. Leads crews in operations and maintains discipline.",
          },
          {
            title: "Shadowhands (Rank 4)",
            description: "Main operational force. Ground soldiers who execute missions and protect assets.",
          },
          {
            title: "Featherborn (Rank 5)",
            description: "Trainees on probation. New recruits learning the code and culture.",
          },
        ],
      },
      {
        id: "communication",
        title: "Communication Protocol",
        icon: "radio",
        rules: [
          {
            title: "Chain of Command",
            description: "Strict hierarchy must be followed: Regent → Talon → Council → Shadowhands → Featherborn.",
          },
          {
            title: "Radio Discipline",
            description: "Keep radio clear and concise. No panic, no sensitive topics in public, and never talk over higher ranks.",
          },
          {
            title: "Information Security",
            description: "Never reveal real names, safehouse locations, values, supplier details, or internal conflicts.",
          },
          {
            title: "Emergency Callouts",
            description: "Use coded phrases: 'Bird Down' (member captured), 'Nightfall' (abort mission), 'Flock Shift' (change location).",
          },
        ],
      },
      {
        id: "operations",
        title: "Operational Standards",
        icon: "target",
        rules: [
          {
            title: "Pre-Operation Briefing",
            description: "All operations require briefing on plan, roles, and escape routes. Position assignments are mandatory.",
          },
          {
            title: "Combat Conduct",
            description: "Survival priority over pride. Use cover, communicate, and secure wounded members first.",
          },
          {
            title: "Profit Distribution",
            description: "Cuts follow hierarchy: Regent → Talon → Council → Shadowhands → Featherborn. 20% goes to gang treasury.",
          },
          {
            title: "Internal Operations Security",
            description: "Zero tolerance for leaks. No unauthorized screenshots or sharing gang information with civilians.",
          },
        ],
      },
      {
        id: "discipline",
        title: "Discipline & Consequences",
        icon: "alert-triangle",
        rules: [
          {
            title: "Minor Violations",
            description: "Backtalk, weak communication, tardiness. Consequences: warnings, extra training, reduced payout.",
          },
          {
            title: "Major Violations",
            description: "Repeated disrespect, ignoring orders, endangering the gang. Consequences: demotion, suspension, retraining.",
          },
          {
            title: "Critical Violations",
            description: "Leaking information, snitching, betrayal, stealing. Consequences: removal, blacklist, exile.",
          },
          {
            title: "Code of Silence (Omertà)",
            description: "NEVER reveal safehouse locations, stash details, internal conflicts, identities, money flow, or operational plans.",
          },
        ],
      },
    ],
  },

  // ===== ROSTER PAGE =====
  roster: {
    title: "The Flock",
    subtitle: "Our hierarchy is built on loyalty, discipline, and proven excellence.",
    ranks: [
      {
        id: "regent",
        name: "Raven Regent",
        rank: 1,
        description: "Supreme Leader",
        expandable: false,
        members: [
          { name: "[Your Leader Name]", since: "Founding" },
        ],
      },
      {
        id: "talon",
        name: "Black Talon",
        rank: 2,
        description: "Second-in-Command",
        expandable: false,
        members: [
          { name: "[Second-in-Command Name]", since: "2024" },
        ],
      },
      {
        id: "council",
        name: "Nightborne Council",
        rank: 3,
        description: "Strategic Leadership",
        expandable: true,
        members: [
          { name: "Member 1", since: "Jan 2024" },
          { name: "Member 2", since: "Feb 2024" },
          { name: "Member 3", since: "Mar 2024" },
        ],
      },
      {
        id: "shadowhands",
        name: "Shadowhands",
        rank: 4,
        description: "Operational Force",
        expandable: true,
        members: [
          { name: "Operative 1", since: "Mar 2024" },
          { name: "Operative 2", since: "Apr 2024" },
          { name: "Operative 3", since: "Apr 2024" },
          { name: "Operative 4", since: "May 2024" },
          { name: "Operative 5", since: "May 2024" },
        ],
      },
      {
        id: "featherborn",
        name: "Featherborn",
        rank: 5,
        description: "Trainees",
        expandable: true,
        members: [
          { name: "Recruit 1", since: "Jun 2024" },
          { name: "Recruit 2", since: "Jun 2024" },
          { name: "Recruit 3", since: "Jul 2024" },
        ],
      },
    ],
  },

  // ===== JOIN REQUIREMENTS =====
  joinRequirements: {
    title: "Join the Flock",
    subtitle: "We seek disciplined, loyal, and skilled individuals who understand the value of silence and strategy.",
    requirements: [
      {
        title: "Age Requirement",
        description: "Must be 16+ years old",
      },
      {
        title: "Roleplay Experience",
        description: "Solid understanding of serious RP. No fail RP, no trolling, no childish behavior.",
      },
      {
        title: "Activity Level",
        description: "Active participation required. Minimum 3-4 days per week.",
      },
      {
        title: "Discipline",
        description: "Ability to follow orders, respect chain of command, and maintain composure under pressure.",
      },
      {
        title: "Loyalty",
        description: "Absolute loyalty to the gang. No snitching, no betrayal, no leaking information.",
      },
      {
        title: "Communication",
        description: "Active Discord presence. Must have a working microphone and stable internet.",
      },
    ],
    applicationProcess: [
      "Join our Discord server",
      "Fill out the application form in #applications",
      "Attend an interview with Council or higher",
      "Complete trial period as Featherborn",
      "Prove loyalty and skill to earn full membership",
    ],
  },

  // ===== CONTACT & SOCIALS =====
  contact: {
    title: "Get in Touch",
    subtitle: "Ready to join the shadows?",
    discord: {
      label: "Discord Server",
      link: "https://discord.gg/yourlink", // ADD YOUR DISCORD INVITE
    },
    serverInfo: {
      label: "Server",
      name: "Your GTA V RP Server Name",
      ip: "connect your.server.ip",
    },
    socials: [
      {
        platform: "Instagram",
        link: "https://instagram.com/yourgang",
        username: "@blackfeather",
      },
      {
        platform: "TikTok",
        link: "https://tiktok.com/@yourgang",
        username: "@blackfeather",
      },
      {
        platform: "Twitter",
        link: "https://twitter.com/yourgang",
        username: "@blackfeather",
      },
    ],
    // Contact Form Fields (Editable)
    formFields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "John Doe",
      },
      {
        name: "discordId",
        label: "Discord ID",
        type: "text",
        required: true,
        placeholder: "username#1234",
      },
      {
        name: "age",
        label: "Age",
        type: "number",
        required: true,
        placeholder: "18",
      },
      {
        name: "experience",
        label: "RP Experience",
        type: "textarea",
        required: true,
        placeholder: "Tell us about your roleplay experience...",
      },
      {
        name: "whyJoin",
        label: "Why BLACK FEATHER?",
        type: "textarea",
        required: true,
        placeholder: "Why do you want to join our organization?",
      },
    ],
  },
};
