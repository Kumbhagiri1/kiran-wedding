/**
 * Centralized Wedding Configuration
 * All wedding details, couple profiles, two-day schedule, muhurtham, venue, elders, family,
 * invocations, and interactive settings are configured here.
 */

export interface EventScheduleItem {
  id: string;
  badge: string;
  title: string;
  day: string;
  date: string;
  displayTiming: string;
  guestArrivalHighlight?: string;
  eventName: string;
  tagline: string;
  venueName: string;
  venueAddress: string;
  directionsUrl: string;
  descriptionParagraphs: string[];
  callToActionNote: string;
  panchangam?: {
    nakshatra: string;
    tithi: string;
    lagna: string;
  };
  theme: {
    accentColor: string;
    badgeBg: string;
    badgeText: string;
    cardBorder: string;
    cardBg: string;
  };
  calendar: {
    title: string;
    description: string;
    location: string;
    startDate: string; // YYYYMMDDTHHMMSSZ for ICS / Google Calendar
    endDate: string;
    fileName: string;
  };
}

export interface WeddingData {
  invitationTitle: string;
  subTitle: string;
  twoDayDisplay: string;
  openingBlessing: string;
  openingSubBlessing: string;
  eventDateDisplay: string;
  eventDateIso: string; // Main wedding target for countdown: 02 Dec 2026, 09:04 AM IST (+05:30)
  coupleImage?: string;
  coupleFullImage?: string;
  websiteUrl?: string;
  
  groom: {
    title: string;
    name: string;
    honorific: string;
    relation: string;
    parents: string;
    nativePlace: string;
    currentResidence: string;
    image?: string;
    portraitPlaceholderLabel: string;
  };
  
  bride: {
    title: string;
    name: string;
    honorific: string;
    relation: string;
    parents: string;
    nativePlace: string;
    image?: string;
    portraitPlaceholderLabel: string;
  };
  
  invocations: {
    deityMantras: string[];
    traditionalBlessings: string[];
  };

  cordialInvitation: {
    heading: string;
    paragraphs: string[];
    highlightQuote: string;
    subQuote: string;
  };

  schedule: {
    sectionTitle: string;
    subTitle: string;
    events: EventScheduleItem[];
  };
  
  muhurtham: {
    sectionTitle: string;
    day: string;
    date: string;
    timeWindow: string;
    nakshatra: string;
    tithi: string;
    lagna: string;
    detailsList: { label: string; value: string }[];
  };
  
  venue: {
    name: string;
    tagline: string;
    addressLine1: string;
    addressLine2: string;
    fullAddress: string;
    city: string;
    state: string;
    country: string;
    mapsSearchUrl: string;
    directionsUrl: string;
    embedMapUrl: string;
  };

  accommodation: {
    title: string;
    subtitle: string;
    badge: string;
    intro: string;
    reservationNote: string;
    limitedNotice: string;
    callToAction: string;
    closingGreeting: string;
    contacts: {
      name: string;
      phone: string;
    }[];
  };
  
  elders: {
    title: string;
    list: string[];
  };
  
  brothers: {
    title: string;
    list: string[];
  };

  sisters: {
    title: string;
    list: string[];
  };

  cousins: {
    title: string;
    subtitle: string;
    list: string[];
  };
  
  compliments: {
    title: string;
    hosts: string;
    footerNote: string;
  };
  
  closing: {
    firstParagraph: string;
    secondParagraph: string;
    regardsTitle: string;
    familySignature: string;
    finalBlessing: string;
  };

  rsvp: {
    title: string;
    description: string;
    contactPlaceholders: {
      label: string;
      contact: string;
      note: string;
    }[];
    defaultWhatsappNumber: string; // Placeholder for WhatsApp RSVP
  };

  calendar: {
    title: string;
    description: string;
    location: string;
    startDate: string; // YYYYMMDDTHHMMSSZ for ICS / Google Calendar
    endDate: string;
  };
}

export const WEDDING_DATA: WeddingData = {
  invitationTitle: "A ROYAL WEDDING CELEBRATION",
  subTitle: "Two Days of Sacred Traditions, Joyful Festivities & Eternal Union",
  twoDayDisplay: "01 & 02 DECEMBER 2026",
  openingBlessing: "॥ SHRI GANESHAYA NAMAH ॥",
  openingSubBlessing: "With the Divine Blessings of Lord Venkateshwara Swamy and the Love of Our Elders",
  eventDateDisplay: "02 DECEMBER 2026",
  eventDateIso: "2026-12-02T09:04:00+05:30", // Preserved: Main wedding countdown targets 2 December 2026, 09:04 AM IST
  coupleImage: "/images/couple-frame.jpg",
  coupleFullImage: "/images/couple.jpg",
  websiteUrl: "https://tempered-skyblue-squid-71.hostingersite.com",

  groom: {
    title: "THE GROOM",
    honorific: "CH.",
    name: "KUMBHAGIRI SAI KIRAN",
    relation: "Elder son of",
    parents: "Smt. Shyamala & Sri Kumbhagiri Srinivas",
    nativePlace: "Native of Narvakattapalli Village, Vontimitta Mandal, Kadapa District.",
    currentResidence: "Presently residing at Dammaiguda, Hyderabad, Telangana.",
    image: "/images/groom-portrait.jpg",
    portraitPlaceholderLabel: "Ch. Kumbhagiri Sai Kiran",
  },

  bride: {
    title: "THE BRIDE",
    honorific: "CH. SOU.",
    name: "GANGALLA MAHESWARI",
    relation: "Only daughter of",
    parents: "Late Sri Gangalla Venkata Ramana & Smt. Gangalla Peddakka",
    nativePlace: "Native of Krishnapuram Village, C.K. Dinne Mandal, Kadapa District.",
    image: "/images/bride-portrait.jpg",
    portraitPlaceholderLabel: "Ch. Sou. Gangalla Maheswari",
  },

  invocations: {
    deityMantras: [
      "॥ Sri Vighneshwaraya Namah ॥",
      "॥ Sri Venkateshwaraya Namah ॥",
      "॥ Sri Lakshmi Narayanabhyam Namah ॥",
      "॥ Sri Uma Maheshwarabhyam Namah ॥",
      "॥ Sri Dakshina Murthy Namah ॥",
      "॥ Sri Sitaramachandrabhyam Namah ॥",
    ],
    traditionalBlessings: [
      "SRI RASTU",
      "SHUBHAMASTU",
      "MANGALAMASTU",
    ],
  },

  cordialInvitation: {
    heading: "CORDIAL INVITATION",
    paragraphs: [
      "By the boundless grace and divine blessings of the Almighty, and with the cherished blessings of our elders, we are delighted to celebrate a precious and auspicious occasion in our family.",
      "On the joyous occasion of the wedding of our beloved son, CH. KUMBHAGIRI SAI KIRAN with CH. SOU. GANGALLA MAHESWARI, we consider it our privilege and immense pleasure to cordially invite you and your family to grace this sacred celebration with your gracious presence.",
      "Amidst the sanctity of Vedic chants, the melodious notes of auspicious wedding music, and the joyful gathering of family and friends, this blessed union shall be solemnised across two auspicious days.",
      "We humbly request you to join us with your family, bless the bride and groom with Akshinthalu, shower your heartfelt wishes upon the newlyweds for a lifetime of happiness, prosperity and togetherness, and honour us by accepting our hospitality.",
    ],
    highlightQuote: "Your gracious presence will add splendour to our celebration.",
    subQuote: "Your blessings will remain our family's most cherished treasure.",
  },

  schedule: {
    sectionTitle: "TWO-DAY CELEBRATION ITINERARY",
    subTitle: "Please join us in celebrating every sacred tradition and festive moment across two joyous days.",
    events: [
      {
        id: "haldi-music",
        badge: "EVENT 1 • PRE-WEDDING CELEBRATION",
        title: "HALDI & MUSIC CEREMONY",
        day: "TUESDAY",
        date: "01 DECEMBER 2026",
        displayTiming: "Guest Arrival: 04:00 PM Onwards",
        guestArrivalHighlight: "We warmly invite you to arrive by 4:00 PM and celebrate this special evening with us!",
        eventName: "Traditional Haldi Ceremony & Music Celebrations",
        tagline: "An evening filled with colours, traditions, music and happiness!",
        venueName: "Krishna Kalyanamandapam",
        venueAddress: "Madras Road, Kadapa, Andhra Pradesh, India.",
        directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Krishna+Kalyanamandapam+Madras+Road+Kadapa+Andhra+Pradesh",
        descriptionParagraphs: [
          "An evening filled with colours, traditions, music and happiness!",
          "Join us as we celebrate the beautiful pre-wedding traditions with Haldi, joyful music and the warmth of family and friends.",
          "Your presence will make these celebrations even more memorable.",
        ],
        callToActionNote: "We warmly invite you to arrive by 4:00 PM and celebrate this special evening with us!",
        theme: {
          accentColor: "#D97706", // Marigold Amber
          badgeBg: "bg-amber-100",
          badgeText: "text-amber-900",
          cardBorder: "border-amber-400",
          cardBg: "from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]",
        },
        calendar: {
          title: "Haldi & Music Ceremony - Kumbhagiri Sai Kiran & Gangalla Maheswari",
          description: "Traditional Haldi Ceremony & Music Celebrations for the wedding of Kumbhagiri Sai Kiran & Gangalla Maheswari. Guest Arrival: 04:00 PM. Venue: Krishna Kalyanamandapam, Madras Road, Kadapa.",
          location: "Krishna Kalyanamandapam, Madras Road, Kadapa, Andhra Pradesh, India",
          startDate: "20261201T103000Z", // 04:00 PM IST = 10:30 AM UTC
          endDate: "20261201T153000Z",   // 09:00 PM IST = 03:30 PM UTC
          fileName: "Haldi_and_Music_Ceremony.ics",
        },
      },
      {
        id: "wedding-ceremony",
        badge: "EVENT 2 • MAIN SACRED MUHURTHAM",
        title: "WEDDING CEREMONY",
        day: "WEDNESDAY",
        date: "02 DECEMBER 2026",
        displayTiming: "Auspicious Muhurtham: 09:04 AM – 09:37 AM",
        eventName: "The Auspicious Wedding Muhurtham",
        tagline: "Sacred Vedic Union, Akshinthalu Blessing & Mangalya Dharana",
        venueName: "Krishna Kalyanamandapam",
        venueAddress: "Madras Road, Kadapa, Andhra Pradesh, India.",
        directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Krishna+Kalyanamandapam+Madras+Road+Kadapa+Andhra+Pradesh",
        panchangam: {
          nakshatra: "Uttara Phalguni Nakshatra",
          tithi: "Krishna Navami Tithi",
          lagna: "Dhanu Lagna",
        },
        descriptionParagraphs: [
          "Amidst the sanctity of Vedic chants, the melodious notes of auspicious wedding music, and the joyful gathering of family and friends, this blessed union shall be solemnised.",
          "We humbly request you to join us with your family, bless the bride and groom with Akshinthalu, and shower your heartfelt wishes upon the newlyweds.",
        ],
        callToActionNote: "Sumuhurtham Window: 09:04 AM to 09:37 AM (Dhanu Lagna)",
        theme: {
          accentColor: "#641B2E", // Royal Maroon
          badgeBg: "bg-rose-950",
          badgeText: "text-amber-200",
          cardBorder: "border-[#C6A15B]",
          cardBg: "from-[#42101F] via-[#641B2E] to-[#2A0B14]",
        },
        calendar: {
          title: "Wedding Ceremony - Kumbhagiri Sai Kiran & Gangalla Maheswari",
          description: "Sacred Wedding Ceremony of CH. Kumbhagiri Sai Kiran and CH. Sou. Gangalla Maheswari. Auspicious Sumuhurtham: 09:04 AM – 09:37 AM (Uttara Phalguni, Krishna Navami, Dhanu Lagna) at Krishna Kalyanamandapam, Madras Road, Kadapa.",
          location: "Krishna Kalyanamandapam, Madras Road, Kadapa, Andhra Pradesh, India",
          startDate: "20261202T033400Z", // 09:04 AM IST = 03:34 AM UTC
          endDate: "20261202T083000Z",   // ~02:00 PM IST = 08:30 AM UTC
          fileName: "Wedding_Muhurtham_Ceremony.ics",
        },
      },
    ],
  },

  muhurtham: {
    sectionTitle: "THE AUSPICIOUS WEDDING MUHURTHAM",
    day: "WEDNESDAY",
    date: "02 DECEMBER 2026",
    timeWindow: "09:04 AM – 09:37 AM",
    nakshatra: "Uttara Phalguni Nakshatra",
    tithi: "Krishna Navami Tithi",
    lagna: "Dhanu Lagna",
    detailsList: [
      { label: "Auspicious Date", value: "Wednesday, 02 December 2026" },
      { label: "Sumuhurtham Window", value: "09:04 AM to 09:37 AM (IST)" },
      { label: "Nakshatram", value: "Uttara Phalguni Nakshatra" },
      { label: "Tithi", value: "Krishna Navami Tithi" },
      { label: "Lagnam", value: "Dhanu Lagna (Sagittarius Ascendant)" },
    ],
  },

  venue: {
    name: "KRISHNA KALYANAMANDAPAM",
    tagline: "Auspicious Wedding Venue for Both Celebrations",
    addressLine1: "Madras Road",
    addressLine2: "Kadapa, Andhra Pradesh - 516001, India",
    fullAddress: "Krishna Kalyanamandapam, Madras Road, Kadapa, Andhra Pradesh, India",
    city: "Kadapa",
    state: "Andhra Pradesh",
    country: "India",
    mapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=Krishna+Kalyanamandapam+Madras+Road+Kadapa+Andhra+Pradesh",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Krishna+Kalyanamandapam+Madras+Road+Kadapa+Andhra+Pradesh",
    embedMapUrl: "https://maps.google.com/maps?q=Krishna+Kalyanamandapam+Madras+Road+Kadapa&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },

  accommodation: {
    title: "GUEST ACCOMMODATION",
    subtitle: "Comfortable Stay Arranged For Out-Of-Town Guests",
    badge: "24 Air-Conditioned Rooms",
    intro: "For the convenience of our out-of-town guests, we have arranged 24 air-conditioned rooms.",
    reservationNote: "Guests who require accommodation are kindly requested to inform us in advance so that we can reserve a room for them.",
    limitedNotice: "As the number of rooms is limited, reservations will be confirmed subject to availability.",
    callToAction: "Kindly contact the family in advance for room reservations.",
    closingGreeting: "We look forward to welcoming you!",
    contacts: [
      {
        name: "Hospitality & Room Reservations",
        phone: "+91 7659098055",
      },
      {
        name: "Guest Inquiries Desk",
        phone: "+91 7093694475",
      },
      {
        name: "Sri Kumbhagiri Srinivas",
        phone: "+91 7207374807",
      },
    ],
  },

  elders: {
    title: "WITH THE BLESSINGS OF OUR ELDERS",
    list: [
      "Sri Devara Subbarayudu",
      "Sri Kumbhagiri Venkateshwarlu",
      "Sri Kumbhagiri Krishna",
      "Sri Kathi Yerkulaiah",
      "Sri Devara Chandra Shekar",
      "Sri Devara Jaganadha Rao",
      "Sri Devara Vishnu Vardhan Rao",
      "Sri Devara Kalyan",
      "Sri Devara Vijay Rama Rao",
      "Sri Kadapa Babu",
    ],
  },

  brothers: {
    title: "BROTHERS",
    list: [
      "Sri Arun Kumar",
      "Sri Lakshman",
      "Sri Raju (Agafee)",
    ],
  },

  sisters: {
    title: "SISTERS",
    list: [
      "Chi. Sou. Jareesha",
      "Chi. Sou. Kadapa Parvathi",
    ],
  },

  cousins: {
    title: "COUSINS & NEAR AND DEAR",
    subtitle: "With the loving affection of our cousins, near and dear",
    list: [
      "Sri Hari",
      "Sri Harsha",
      "Sri Uday",
    ],
  },

  compliments: {
    title: "WITH BEST COMPLIMENTS FROM",
    hosts: "Smt. Shyamala & Sri Kumbhagiri Srinivas",
    footerNote: "Along with all family members, relatives, friends and well-wishers.",
  },

  closing: {
    firstParagraph: "On this auspicious occasion, we warmly await your gracious presence and heartfelt blessings.",
    secondParagraph: "Your presence is our happiness; your blessings are our greatest gift.",
    regardsTitle: "WITH WARM REGARDS",
    familySignature: "THE KUMBHAGIRI & GANGALLA FAMILIES",
    finalBlessing: "SHUBHAMASTU | MANGALAMASTU",
  },

  rsvp: {
    title: "RSVP & CORDIAL INQUIRIES",
    description: "Please grace us with your confirmation for the Haldi & Music Ceremony and Wedding Ceremony so that we may extend our warmest hospitality to you and your family.",
    contactPlaceholders: [
      {
        label: "Sri Kumbhagiri Srinivas & Family",
        contact: "+91 7207374807",
        note: "Calls & WhatsApp",
      },
      {
        label: "Family Representative",
        contact: "+91 7659098055",
        note: "Calls & WhatsApp",
      },
      {
        label: "Hospitality & Assistance",
        contact: "+91 7093694475",
        note: "Calls & WhatsApp",
      },
    ],
    defaultWhatsappNumber: "917207374807",
  },

  calendar: {
    title: "Wedding of Kumbhagiri Sai Kiran & Gangalla Maheswari",
    description: "Sacred Wedding Ceremony of CH. Kumbhagiri Sai Kiran and CH. Sou. Gangalla Maheswari at Krishna Kalyanamandapam, Madras Road, Kadapa. Sumuhurtham: 09:04 AM – 09:37 AM.",
    location: "Krishna Kalyanamandapam, Madras Road, Kadapa, Andhra Pradesh, India",
    startDate: "20261202T033400Z", // 09:04 AM IST = 03:34 AM UTC
    endDate: "20261202T083000Z",   // ~02:00 PM IST = 08:30 AM UTC
  },
};
