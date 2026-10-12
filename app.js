/**
 * OnSpot Part-Time Work Platform - Client Engine
 * Clean, Compact Dashboard with Collapsed Avatar & Profile Drawer
 */

// Category Media Configuration (Local assets with reliable Unsplash fallbacks)
const CATEGORY_MEDIA = {
  Catering: {
    src:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    fallback:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    alt: "Catering banquet food buffet",
  },
  Promotions: {
    src:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    fallback:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    alt: "Brand promotion exhibition launch",
  },
  Pamphlet: {
    src:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
    fallback:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
    alt: "Flyer and pamphlet distribution",
  },
  Ushering: {
    src:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    fallback:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    alt: "VIP ushering & hospitality service",
  },
  Setup: {
    src:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
    fallback:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
    alt: "Stage sound & event setup",
  },
};

function getCategoryMedia(category) {
  return CATEGORY_MEDIA[category] || CATEGORY_MEDIA.Catering;
}

// Known Chennai localities used for manual location selection in the Filter drawer
const KNOWN_LOCALITIES = [
  { name: "Chennai (City Center)", lat: 13.0827, lng: 80.2707 },
  { name: "Adyar", lat: 13.0012, lng: 80.2565 },
  { name: "Guindy", lat: 13.0067, lng: 80.2206 },
  { name: "Velachery", lat: 12.9756, lng: 80.2207 },
  { name: "Nandanam", lat: 13.0332, lng: 80.2422 },
  { name: "Taramani", lat: 12.9889, lng: 80.2444 },
  { name: "Royapettah", lat: 13.0524, lng: 80.2645 },
];

// Haversine distance (in km) between two lat/lng coordinates
function getDistanceKm(lat1, lng1, lat2, lng2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Initial Seed Data for Shifts
const INITIAL_SHIFTS = [
  {
    id: "JOB-0101",
    category: "Ushering",
    categoryDisplay: "Ushering",
    image: "assets/ushering.jpg",
    title: "College Event Staff",
    fullTitle: "College Event Staff at Adyar",
    dealerName: "ABC Events",
    dealerRating: 4.8,
    pay: "₹605",
    payType: "Per Shift (6 hrs)",
    rawPay: 605,
    loc: "Adyar, Chennai",
    lat: 13.0012,
    lng: 80.2565,
    durationHours: 6,
    date: "06 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 7:30 PM",
    slotsTotal: 12,
    slotsFilled: 3,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Morning Breakfast Provided","Instant UPI Payout"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0102",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Store Helper",
    fullTitle: "Store Helper at Adyar",
    dealerName: "ABC Events",
    dealerRating: 4.8,
    pay: "₹601",
    payType: "Per Shift (6 hrs)",
    rawPay: 601,
    loc: "Adyar, Chennai",
    lat: 13.0012,
    lng: 80.2565,
    durationHours: 6,
    date: "06 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 3:00 PM",
    slotsTotal: 10,
    slotsFilled: 4,
    urgent: true,
    instantPay: true,
    genderReq: "any",
    perks: ["Transport Provided","Performance Bonus"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0103",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Stage Assistant",
    fullTitle: "Stage Assistant at Velachery",
    dealerName: "ABC Events",
    dealerRating: 4.8,
    pay: "₹1054",
    payType: "Per Shift (3 hrs)",
    rawPay: 1054,
    loc: "Velachery, Chennai",
    lat: 12.9756,
    lng: 80.2207,
    durationHours: 3,
    date: "04 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 6:00 PM",
    slotsTotal: 5,
    slotsFilled: 3,
    urgent: true,
    instantPay: true,
    genderReq: "boys",
    perks: ["Morning Breakfast Provided","Instant UPI Payout"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0104",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Backstage Assistant",
    fullTitle: "Backstage Assistant at Vadapalani",
    dealerName: "ABC Events",
    dealerRating: 4.8,
    pay: "₹973",
    payType: "Per Shift (5 hrs)",
    rawPay: 973,
    loc: "Vadapalani, Chennai",
    lat: 13.0487,
    lng: 80.2117,
    durationHours: 5,
    date: "05 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 9:30 PM",
    slotsTotal: 7,
    slotsFilled: 3,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Buffet Lunch Included","ID Badge & Certificate"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0105",
    category: "Ushering",
    categoryDisplay: "Ushering",
    image: "assets/ushering.jpg",
    title: "Registration Desk Staff",
    fullTitle: "Registration Desk Staff at Guindy",
    dealerName: "Chennai Catering Services",
    dealerRating: 4.9,
    pay: "₹1158",
    payType: "Per Shift (4 hrs)",
    rawPay: 1158,
    loc: "Guindy, Chennai",
    lat: 13.0067,
    lng: 80.2206,
    durationHours: 4,
    date: "05 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 3:00 PM",
    slotsTotal: 9,
    slotsFilled: 1,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Branded Tee Given","Lunch & Snacks Provided","Certificate Available"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0106",
    category: "Ushering",
    categoryDisplay: "Ushering",
    image: "assets/ushering.jpg",
    title: "Ticketing Staff",
    fullTitle: "Ticketing Staff at Vadapalani",
    dealerName: "Chennai Catering Services",
    dealerRating: 4.9,
    pay: "₹721",
    payType: "Per Shift (6 hrs)",
    rawPay: 721,
    loc: "Vadapalani, Chennai",
    lat: 13.0487,
    lng: 80.2117,
    durationHours: 6,
    date: "05 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 3:00 PM",
    slotsTotal: 9,
    slotsFilled: 1,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Dinner Provided","Overtime Bonus ₹120/hr","Uniform Provided"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0107",
    category: "Promotions",
    categoryDisplay: "Promotions",
    image: "assets/promotions.jpg",
    title: "Event Promoter",
    fullTitle: "Event Promoter at Koyambedu",
    dealerName: "Chennai Catering Services",
    dealerRating: 4.9,
    pay: "₹669",
    payType: "Per Shift (6 hrs)",
    rawPay: 669,
    loc: "Koyambedu, Chennai",
    lat: 13.0722,
    lng: 80.1912,
    durationHours: 6,
    date: "06 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 9:30 PM",
    slotsTotal: 6,
    slotsFilled: 3,
    urgent: true,
    instantPay: true,
    genderReq: "girls",
    perks: ["Direct Cash Payout","Meals Provided"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0108",
    category: "Promotions",
    categoryDisplay: "Promotions",
    image: "assets/promotions.jpg",
    title: "Sales Promoter",
    fullTitle: "Sales Promoter at Nungambakkam",
    dealerName: "Chennai Catering Services",
    dealerRating: 4.9,
    pay: "₹1249",
    payType: "Per Shift (3 hrs)",
    rawPay: 1249,
    loc: "Nungambakkam, Chennai",
    lat: 13.0641,
    lng: 80.2405,
    durationHours: 3,
    date: "02 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 11:00 PM",
    slotsTotal: 7,
    slotsFilled: 2,
    urgent: true,
    instantPay: true,
    genderReq: "any",
    perks: ["Buffet Lunch Included","ID Badge & Certificate"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0109",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Stage Assistant",
    fullTitle: "Stage Assistant at Velachery",
    dealerName: "Urban Events",
    dealerRating: 4.7,
    pay: "₹845",
    payType: "Per Shift (4 hrs)",
    rawPay: 845,
    loc: "Velachery, Chennai",
    lat: 12.9756,
    lng: 80.2207,
    durationHours: 4,
    date: "06 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 8:00 PM",
    slotsTotal: 12,
    slotsFilled: 2,
    urgent: false,
    instantPay: true,
    genderReq: "boys",
    perks: ["Dinner Provided","Overtime Bonus ₹120/hr","Uniform Provided"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0110",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Event Cleanup Staff",
    fullTitle: "Event Cleanup Staff at Koyambedu",
    dealerName: "Urban Events",
    dealerRating: 4.7,
    pay: "₹1065",
    payType: "Per Shift (5 hrs)",
    rawPay: 1065,
    loc: "Koyambedu, Chennai",
    lat: 13.0722,
    lng: 80.1912,
    durationHours: 5,
    date: "05 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 3:00 PM",
    slotsTotal: 5,
    slotsFilled: 1,
    urgent: true,
    instantPay: true,
    genderReq: "any",
    perks: ["Direct Cash Payout","Meals Provided"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0111",
    category: "Ushering",
    categoryDisplay: "Ushering",
    image: "assets/ushering.jpg",
    title: "Registration Desk Staff",
    fullTitle: "Registration Desk Staff at Mylapore",
    dealerName: "Urban Events",
    dealerRating: 4.7,
    pay: "₹1179",
    payType: "Per Shift (5 hrs)",
    rawPay: 1179,
    loc: "Mylapore, Chennai",
    lat: 13.0368,
    lng: 80.2676,
    durationHours: 5,
    date: "05 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 6:00 PM",
    slotsTotal: 6,
    slotsFilled: 1,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Buffet Lunch Included","ID Badge & Certificate"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0112",
    category: "Ushering",
    categoryDisplay: "Ushering",
    image: "assets/ushering.jpg",
    title: "Registration Desk Staff",
    fullTitle: "Registration Desk Staff at T. Nagar",
    dealerName: "Urban Events",
    dealerRating: 4.7,
    pay: "₹803",
    payType: "Per Shift (7 hrs)",
    rawPay: 803,
    loc: "T. Nagar, Chennai",
    lat: 13.0396,
    lng: 80.2336,
    durationHours: 7,
    date: "03 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 9:30 PM",
    slotsTotal: 14,
    slotsFilled: 3,
    urgent: true,
    instantPay: true,
    genderReq: "any",
    perks: ["Dinner Provided","Overtime Bonus ₹120/hr","Uniform Provided"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0113",
    category: "Ushering",
    categoryDisplay: "Ushering",
    image: "assets/ushering.jpg",
    title: "Ticketing Staff",
    fullTitle: "Ticketing Staff at Perambur",
    dealerName: "Metro Hospitality",
    dealerRating: 4.6,
    pay: "₹618",
    payType: "Per Shift (3 hrs)",
    rawPay: 618,
    loc: "Perambur, Chennai",
    lat: 13.1114,
    lng: 80.2427,
    durationHours: 3,
    date: "05 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 9:30 PM",
    slotsTotal: 11,
    slotsFilled: 3,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Morning Breakfast Provided","Instant UPI Payout"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0114",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Sound & Light Assistant",
    fullTitle: "Sound & Light Assistant at Mylapore",
    dealerName: "Metro Hospitality",
    dealerRating: 4.6,
    pay: "₹797",
    payType: "Per Shift (3 hrs)",
    rawPay: 797,
    loc: "Mylapore, Chennai",
    lat: 13.0368,
    lng: 80.2676,
    durationHours: 3,
    date: "04 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 7:30 PM",
    slotsTotal: 6,
    slotsFilled: 1,
    urgent: false,
    instantPay: true,
    genderReq: "boys",
    perks: ["Buffet Lunch Included","ID Badge & Certificate"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0115",
    category: "Catering",
    categoryDisplay: "Catering",
    image: "assets/catering.jpg",
    title: "Kitchen Staff",
    fullTitle: "Kitchen Staff at Vadapalani",
    dealerName: "Metro Hospitality",
    dealerRating: 4.6,
    pay: "₹608",
    payType: "Per Shift (6 hrs)",
    rawPay: 608,
    loc: "Vadapalani, Chennai",
    lat: 13.0487,
    lng: 80.2117,
    durationHours: 6,
    date: "02 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 9:30 PM",
    slotsTotal: 6,
    slotsFilled: 1,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Transport Provided","Performance Bonus"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0116",
    category: "Ushering",
    categoryDisplay: "Ushering",
    image: "assets/ushering.jpg",
    title: "Customer Support Assistant",
    fullTitle: "Customer Support Assistant at Perambur",
    dealerName: "Metro Hospitality",
    dealerRating: 4.6,
    pay: "₹851",
    payType: "Per Shift (3 hrs)",
    rawPay: 851,
    loc: "Perambur, Chennai",
    lat: 13.1114,
    lng: 80.2427,
    durationHours: 3,
    date: "05 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 11:00 PM",
    slotsTotal: 13,
    slotsFilled: 1,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Buffet Lunch Included","ID Badge & Certificate"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0117",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Stage & Logistics",
    fullTitle: "Stage & Logistics at Perambur",
    dealerName: "Prime Stage Solutions",
    dealerRating: 5,
    pay: "₹1132",
    payType: "Per Shift (6 hrs)",
    rawPay: 1132,
    loc: "Perambur, Chennai",
    lat: 13.1114,
    lng: 80.2427,
    durationHours: 6,
    date: "03 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 6:00 PM",
    slotsTotal: 10,
    slotsFilled: 1,
    urgent: false,
    instantPay: true,
    genderReq: "boys",
    perks: ["Direct Cash Payout","Meals Provided"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0118",
    category: "Ushering",
    categoryDisplay: "Ushering",
    image: "assets/ushering.jpg",
    title: "Event Marshal",
    fullTitle: "Event Marshal at Porur",
    dealerName: "Prime Stage Solutions",
    dealerRating: 5,
    pay: "₹756",
    payType: "Per Shift (5 hrs)",
    rawPay: 756,
    loc: "Porur, Chennai",
    lat: 13.0333,
    lng: 80.15,
    durationHours: 5,
    date: "06 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 11:00 PM",
    slotsTotal: 13,
    slotsFilled: 2,
    urgent: false,
    instantPay: true,
    genderReq: "boys",
    perks: ["Morning Breakfast Provided","Instant UPI Payout"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0119",
    category: "Catering",
    categoryDisplay: "Catering",
    image: "assets/catering.jpg",
    title: "Catering Assistant",
    fullTitle: "Catering Assistant at Vadapalani",
    dealerName: "Prime Stage Solutions",
    dealerRating: 5,
    pay: "₹1040",
    payType: "Per Shift (3 hrs)",
    rawPay: 1040,
    loc: "Vadapalani, Chennai",
    lat: 13.0487,
    lng: 80.2117,
    durationHours: 3,
    date: "05 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 9:30 PM",
    slotsTotal: 14,
    slotsFilled: 1,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Buffet Lunch Included","ID Badge & Certificate"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0120",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Parking Assistant",
    fullTitle: "Parking Assistant at Chromepet",
    dealerName: "Prime Stage Solutions",
    dealerRating: 5,
    pay: "₹1116",
    payType: "Per Shift (4 hrs)",
    rawPay: 1116,
    loc: "Chromepet, Chennai",
    lat: 12.9516,
    lng: 80.1406,
    durationHours: 4,
    date: "03 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 11:00 PM",
    slotsTotal: 8,
    slotsFilled: 3,
    urgent: false,
    instantPay: true,
    genderReq: "boys",
    perks: ["Dinner Provided","Overtime Bonus ₹120/hr","Uniform Provided"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0121",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Event Cleanup Staff",
    fullTitle: "Event Cleanup Staff at Anna Nagar",
    dealerName: "City Event Works",
    dealerRating: 4.8,
    pay: "₹595",
    payType: "Per Shift (5 hrs)",
    rawPay: 595,
    loc: "Anna Nagar, Chennai",
    lat: 13.085,
    lng: 80.2101,
    durationHours: 5,
    date: "04 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 3:00 PM",
    slotsTotal: 11,
    slotsFilled: 4,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Transport Provided","Performance Bonus"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0122",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Store Helper",
    fullTitle: "Store Helper at Vadapalani",
    dealerName: "City Event Works",
    dealerRating: 4.8,
    pay: "₹993",
    payType: "Per Shift (3 hrs)",
    rawPay: 993,
    loc: "Vadapalani, Chennai",
    lat: 13.0487,
    lng: 80.2117,
    durationHours: 3,
    date: "04 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 3:00 PM",
    slotsTotal: 8,
    slotsFilled: 4,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Buffet Lunch Included","ID Badge & Certificate"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0123",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Store Helper",
    fullTitle: "Store Helper at Koyambedu",
    dealerName: "City Event Works",
    dealerRating: 4.8,
    pay: "₹1251",
    payType: "Per Shift (7 hrs)",
    rawPay: 1251,
    loc: "Koyambedu, Chennai",
    lat: 13.0722,
    lng: 80.1912,
    durationHours: 7,
    date: "06 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 9:30 PM",
    slotsTotal: 10,
    slotsFilled: 2,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Dinner Provided","Overtime Bonus ₹120/hr","Uniform Provided"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0124",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Inventory Assistant",
    fullTitle: "Inventory Assistant at Chromepet",
    dealerName: "City Event Works",
    dealerRating: 4.8,
    pay: "₹602",
    payType: "Per Shift (7 hrs)",
    rawPay: 602,
    loc: "Chromepet, Chennai",
    lat: 12.9516,
    lng: 80.1406,
    durationHours: 7,
    date: "03 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 6:00 PM",
    slotsTotal: 12,
    slotsFilled: 4,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["AC Work Environment","Snacks & Coffee Provided"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0125",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Store Helper",
    fullTitle: "Store Helper at Porur",
    dealerName: "Royal Feast Banquets",
    dealerRating: 4.9,
    pay: "₹875",
    payType: "Per Shift (7 hrs)",
    rawPay: 875,
    loc: "Porur, Chennai",
    lat: 13.0333,
    lng: 80.15,
    durationHours: 7,
    date: "06 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 6:00 PM",
    slotsTotal: 14,
    slotsFilled: 2,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Transport Provided","Performance Bonus"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0126",
    category: "Catering",
    categoryDisplay: "Catering",
    image: "assets/catering.jpg",
    title: "Housekeeping Staff",
    fullTitle: "Housekeeping Staff at Ambattur",
    dealerName: "Royal Feast Banquets",
    dealerRating: 4.9,
    pay: "₹804",
    payType: "Per Shift (5 hrs)",
    rawPay: 804,
    loc: "Ambattur, Chennai",
    lat: 13.1143,
    lng: 80.1548,
    durationHours: 5,
    date: "03 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 7:30 PM",
    slotsTotal: 14,
    slotsFilled: 4,
    urgent: true,
    instantPay: true,
    genderReq: "any",
    perks: ["Late Night Drop Provided","Hot Snacks & Tea Included"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0127",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Photography Assistant",
    fullTitle: "Photography Assistant at Ambattur",
    dealerName: "Royal Feast Banquets",
    dealerRating: 4.9,
    pay: "₹654",
    payType: "Per Shift (3 hrs)",
    rawPay: 654,
    loc: "Ambattur, Chennai",
    lat: 13.1143,
    lng: 80.1548,
    durationHours: 3,
    date: "03 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 6:00 PM",
    slotsTotal: 6,
    slotsFilled: 3,
    urgent: true,
    instantPay: true,
    genderReq: "any",
    perks: ["Late Night Drop Provided","Hot Snacks & Tea Included"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0128",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Inventory Assistant",
    fullTitle: "Inventory Assistant at Porur",
    dealerName: "Royal Feast Banquets",
    dealerRating: 4.9,
    pay: "₹631",
    payType: "Per Shift (4 hrs)",
    rawPay: 631,
    loc: "Porur, Chennai",
    lat: 13.0333,
    lng: 80.15,
    durationHours: 4,
    date: "06 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 7:30 PM",
    slotsTotal: 9,
    slotsFilled: 4,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Dinner Provided","Overtime Bonus ₹120/hr","Uniform Provided"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0129",
    category: "Catering",
    categoryDisplay: "Catering",
    image: "assets/catering.jpg",
    title: "Kitchen Helper",
    fullTitle: "Kitchen Helper at Koyambedu",
    dealerName: "Nexus Brand Activations",
    dealerRating: 4.7,
    pay: "₹777",
    payType: "Per Shift (3 hrs)",
    rawPay: 777,
    loc: "Koyambedu, Chennai",
    lat: 13.0722,
    lng: 80.1912,
    durationHours: 3,
    date: "06 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 9:30 PM",
    slotsTotal: 9,
    slotsFilled: 1,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Transport Provided","Performance Bonus"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0130",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Inventory Assistant",
    fullTitle: "Inventory Assistant at Porur",
    dealerName: "Nexus Brand Activations",
    dealerRating: 4.7,
    pay: "₹553",
    payType: "Per Shift (6 hrs)",
    rawPay: 553,
    loc: "Porur, Chennai",
    lat: 13.0333,
    lng: 80.15,
    durationHours: 6,
    date: "04 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 8:00 PM",
    slotsTotal: 8,
    slotsFilled: 3,
    urgent: true,
    instantPay: true,
    genderReq: "any",
    perks: ["AC Work Environment","Snacks & Coffee Provided"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0131",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Event Cleanup Staff",
    fullTitle: "Event Cleanup Staff at Pallavaram",
    dealerName: "Nexus Brand Activations",
    dealerRating: 4.7,
    pay: "₹909",
    payType: "Per Shift (6 hrs)",
    rawPay: 909,
    loc: "Pallavaram, Chennai",
    lat: 12.9675,
    lng: 80.1491,
    durationHours: 6,
    date: "06 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 11:00 PM",
    slotsTotal: 9,
    slotsFilled: 1,
    urgent: true,
    instantPay: true,
    genderReq: "any",
    perks: ["Transport Provided","Performance Bonus"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0132",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Decoration Helper",
    fullTitle: "Decoration Helper at Tambaram",
    dealerName: "Nexus Brand Activations",
    dealerRating: 4.7,
    pay: "₹1092",
    payType: "Per Shift (6 hrs)",
    rawPay: 1092,
    loc: "Tambaram, Chennai",
    lat: 12.9238,
    lng: 80.1141,
    durationHours: 6,
    date: "02 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 3:00 PM",
    slotsTotal: 12,
    slotsFilled: 3,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Dinner Provided","Overtime Bonus ₹120/hr","Uniform Provided"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0133",
    category: "Ushering",
    categoryDisplay: "Ushering",
    image: "assets/ushering.jpg",
    title: "Security Assistant",
    fullTitle: "Security Assistant at Chromepet",
    dealerName: "Star Logistics",
    dealerRating: 4.5,
    pay: "₹512",
    payType: "Per Shift (3 hrs)",
    rawPay: 512,
    loc: "Chromepet, Chennai",
    lat: 12.9516,
    lng: 80.1406,
    durationHours: 3,
    date: "03 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 7:30 PM",
    slotsTotal: 11,
    slotsFilled: 3,
    urgent: false,
    instantPay: true,
    genderReq: "boys",
    perks: ["Morning Breakfast Provided","Instant UPI Payout"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0134",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Store Helper",
    fullTitle: "Store Helper at Vadapalani",
    dealerName: "Star Logistics",
    dealerRating: 4.5,
    pay: "₹1012",
    payType: "Per Shift (7 hrs)",
    rawPay: 1012,
    loc: "Vadapalani, Chennai",
    lat: 13.0487,
    lng: 80.2117,
    durationHours: 7,
    date: "06 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 6:00 PM",
    slotsTotal: 6,
    slotsFilled: 4,
    urgent: true,
    instantPay: true,
    genderReq: "any",
    perks: ["Morning Breakfast Provided","Instant UPI Payout"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0135",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Store Helper",
    fullTitle: "Store Helper at Tambaram",
    dealerName: "Star Logistics",
    dealerRating: 4.5,
    pay: "₹1256",
    payType: "Per Shift (4 hrs)",
    rawPay: 1256,
    loc: "Tambaram, Chennai",
    lat: 12.9238,
    lng: 80.1141,
    durationHours: 4,
    date: "06 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 9:30 PM",
    slotsTotal: 9,
    slotsFilled: 4,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Transport Provided","Performance Bonus"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0136",
    category: "Catering",
    categoryDisplay: "Catering",
    image: "assets/catering.jpg",
    title: "Kitchen Helper",
    fullTitle: "Kitchen Helper at Chromepet",
    dealerName: "Star Logistics",
    dealerRating: 4.5,
    pay: "₹628",
    payType: "Per Shift (6 hrs)",
    rawPay: 628,
    loc: "Chromepet, Chennai",
    lat: 12.9516,
    lng: 80.1406,
    durationHours: 6,
    date: "06 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 9:30 PM",
    slotsTotal: 13,
    slotsFilled: 3,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Morning Breakfast Provided","Instant UPI Payout"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0137",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Parking Assistant",
    fullTitle: "Parking Assistant at Guindy",
    dealerName: "Apex Retail Mart",
    dealerRating: 4.6,
    pay: "₹1133",
    payType: "Per Shift (5 hrs)",
    rawPay: 1133,
    loc: "Guindy, Chennai",
    lat: 13.0067,
    lng: 80.2206,
    durationHours: 5,
    date: "04 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 9:30 PM",
    slotsTotal: 7,
    slotsFilled: 1,
    urgent: false,
    instantPay: true,
    genderReq: "boys",
    perks: ["Transport Provided","Performance Bonus"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0138",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Loading & Unloading Helper",
    fullTitle: "Loading & Unloading Helper at Pallavaram",
    dealerName: "Apex Retail Mart",
    dealerRating: 4.6,
    pay: "₹1094",
    payType: "Per Shift (7 hrs)",
    rawPay: 1094,
    loc: "Pallavaram, Chennai",
    lat: 12.9675,
    lng: 80.1491,
    durationHours: 7,
    date: "04 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 8:00 PM",
    slotsTotal: 5,
    slotsFilled: 2,
    urgent: true,
    instantPay: true,
    genderReq: "boys",
    perks: ["Buffet Lunch Included","ID Badge & Certificate"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0139",
    category: "Ushering",
    categoryDisplay: "Ushering",
    image: "assets/ushering.jpg",
    title: "Registration Desk Staff",
    fullTitle: "Registration Desk Staff at Koyambedu",
    dealerName: "Apex Retail Mart",
    dealerRating: 4.6,
    pay: "₹508",
    payType: "Per Shift (7 hrs)",
    rawPay: 508,
    loc: "Koyambedu, Chennai",
    lat: 13.0722,
    lng: 80.1912,
    durationHours: 7,
    date: "03 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 6:00 PM",
    slotsTotal: 12,
    slotsFilled: 4,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Morning Breakfast Provided","Instant UPI Payout"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  },
  {
    id: "JOB-0140",
    category: "Setup",
    categoryDisplay: "Setup",
    image: "assets/setup.jpg",
    title: "Backstage Assistant",
    fullTitle: "Backstage Assistant at Pallavaram",
    dealerName: "Apex Retail Mart",
    dealerRating: 4.6,
    pay: "₹1285",
    payType: "Per Shift (5 hrs)",
    rawPay: 1285,
    loc: "Pallavaram, Chennai",
    lat: 12.9675,
    lng: 80.1491,
    durationHours: 5,
    date: "04 Oct 2026",
    dateType: "upcoming",
    time: "2:00 PM – 11:00 PM",
    slotsTotal: 11,
    slotsFilled: 1,
    urgent: false,
    instantPay: true,
    genderReq: "any",
    perks: ["Branded Tee Given","Lunch & Snacks Provided","Certificate Available"],
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  }
];

// Initial Dealer Openings
const INITIAL_DEALER_POSTS = [
  {
    id: "dealer-post-1",
    category: "Catering",
    categoryDisplay: "Catering Services",
    image: "assets/catering.jpg",
    title: "Need 12 Banquet Catering Assistants for Reception",
    dealerName: "Self (Franklin Stanly)",
    dealerRating: 5.0,
    pay: "₹850",
    payType: "Per Shift",
    rawPay: 850,
    loc: "Mayor Ramanathan Hall, MRC Nagar",
    date: "25 Sept 2026",
    dateType: "tomorrow",
    time: "5:30 PM – 11:00 PM",
    slotsTotal: 12,
    slotsFilled: 8,
    urgent: true,
    instantPay: true,
    perks: ["Dinner Provided", "Direct Cash / UPI"],
    requirements: "Polite attitude, dress code: white shirt.",
    dressCode: "White Shirt & Black Trousers",
    description: "Manage 8 buffet counters and serve welcome drinks to guests.",
    applicants: [
      {
        id: "app-1",
        name: "Karthik Raja",
        rating: "4.9",
        gigs: 32,
        phone: "+91 98401 23456",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "app-2",
        name: "Suresh Menon",
        rating: "4.8",
        gigs: 18,
        phone: "+91 94440 98765",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
      },
    ],
  },
  {
    id: "dealer-post-2",
    category: "Promotions",
    categoryDisplay: "Event Promotions",
    image: "assets/promotions.jpg",
    title: "Need 6 Brand Promoters for Weekend Mall Stalls",
    dealerName: "Self (Franklin Stanly)",
    dealerRating: 5.0,
    pay: "₹1,100",
    payType: "Per Shift",
    rawPay: 1100,
    loc: "Express Avenue Mall, Royapettah",
    date: "26 Sept 2026",
    dateType: "upcoming",
    time: "1:00 PM – 8:00 PM",
    slotsTotal: 6,
    slotsFilled: 4,
    urgent: false,
    instantPay: true,
    perks: ["T-shirt Provided", "Snack Allowance"],
    requirements: "Fluent Tamil & conversational English.",
    dressCode: "Smart Casuals",
    description: "Drive consumer engagement for new gaming smartwatch launch.",
    applicants: [
      {
        id: "app-4",
        name: "Deepa Lakshmi",
        rating: "5.0",
        gigs: 41,
        phone: "+91 98840 55443",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
      },
    ],
  },
];

// App State
const state = {
  userRole: "seeker", // 'seeker' | 'dealer'
  shifts: [...INITIAL_SHIFTS],
  dealerPosts: [...INITIAL_DEALER_POSTS],
  appliedJobIds: new Set(),
  appliedJobs: [], // rich application records: { jobId, title, company, location, date, time, salary, status, appliedDate }
  bookmarkedJobIds: new Set(),
  activeCategory: "All",
  activeFilterChips: new Set(),
  searchQuery: "",
  sortBy: "recommended",
  userProfile: {
    name: "Franklin Stanly",
    phone: "+91 98402 88192",
    city: "Chennai, Tamil Nadu",
    rating: "4.9",
    gigsCompleted: 24,
    upiId: "franklin@okaxis",
    verified: true,
    photo: null,
  },
  isAuthenticated: true,
  completedJobs: [],
  activeModalShift: null,
  // Advanced Filter Drawer state
  advancedFilters: {
    categories: new Set(), // empty = all categories
    dateFilter: null, // 'today' | 'tomorrow' | 'upcoming' | null
    salaryMin: null,
    salaryMax: null,
    duration: null, // 'short' | 'medium' | 'long' | null
    gender: null, // 'boys' | 'girls' | 'any' | null
    location: null, // { name, lat, lng } | null
    distanceKm: null,
  },
};

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  loadSavedState();
  initEventListeners();
  syncProfileData();
  updateFilterCountBadge();
  renderCategoryTabs();
  renderListings();
  
  // Cleanup startup loader from DOM after animation completes
  setTimeout(() => {
    const loader = document.getElementById("startup-loader");
    if (loader) loader.remove();
  }, 3000);
});

function loadSavedState() {
  try {
    const savedAppliedJobs = localStorage.getItem("onspot_applied_jobs");
    if (savedAppliedJobs) {
      state.appliedJobs = JSON.parse(savedAppliedJobs);
      state.appliedJobIds = new Set(state.appliedJobs.map((a) => a.jobId));
    }
    const savedCompletedJobs = localStorage.getItem("onspot_completed_jobs");
    if (savedCompletedJobs) {
      state.completedJobs = JSON.parse(savedCompletedJobs);
    }
    const savedBookmarks = localStorage.getItem("onspot_bookmarks");
    if (savedBookmarks) {
      state.bookmarkedJobIds = new Set(JSON.parse(savedBookmarks));
    }
    const savedProfile = localStorage.getItem("onspot_profile");
    if (savedProfile) {
      state.userProfile = { ...state.userProfile, ...JSON.parse(savedProfile) };
    }
    const savedAuth = localStorage.getItem("onspot_auth");
    if (savedAuth !== null) {
      state.isAuthenticated = savedAuth === "true";
    }
  } catch (e) {
    console.warn("Storage sync error:", e);
  }
}

function saveState() {
  try {
    localStorage.setItem(
      "onspot_applied_jobs",
      JSON.stringify(state.appliedJobs),
    );
    localStorage.setItem(
      "onspot_completed_jobs",
      JSON.stringify(state.completedJobs),
    );
    localStorage.setItem(
      "onspot_bookmarks",
      JSON.stringify([...state.bookmarkedJobIds]),
    );
    localStorage.setItem("onspot_profile", JSON.stringify(state.userProfile));
    localStorage.setItem("onspot_auth", state.isAuthenticated);
  } catch (e) {
    console.warn("Storage save error:", e);
  }
}

function syncProfileData() {
  const displayNames = document.querySelectorAll(".display-username");
  displayNames.forEach((el) => (el.innerText = state.userProfile.name));

  const drawerCity = document.getElementById("drawer-city");
  if (drawerCity) drawerCity.innerText = state.userProfile.city;

  const drawerPhone = document.getElementById("drawer-phone");
  if (drawerPhone) drawerPhone.innerText = state.userProfile.phone;

  const drawerUpi = document.getElementById("drawer-upi");
  if (drawerUpi) drawerUpi.innerText = state.userProfile.upiId;

  const drawerCompleted = document.getElementById("drawer-completed-count");
  if (drawerCompleted)
    drawerCompleted.innerText = state.userProfile.gigsCompleted;

  const photoUrl =
    state.userProfile.photo ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80";
  const topNavAvatar = document.getElementById("top-nav-avatar-img");
  const drawerAvatar = document.getElementById("drawer-avatar-img");
  if (topNavAvatar) topNavAvatar.src = photoUrl;
  if (drawerAvatar) drawerAvatar.src = photoUrl;

  const loginBtn = document.getElementById("login-btn-action");
  const logoutBtn = document.getElementById("logout-btn-action");
  if (loginBtn && logoutBtn) {
    if (state.isAuthenticated) {
      loginBtn.style.display = "none";
      logoutBtn.style.display = "flex";
    } else {
      loginBtn.style.display = "flex";
      logoutBtn.style.display = "none";
    }
  }

  renderCompletedWorks();
  if (typeof renderSavedJobs === "function") renderSavedJobs();
}

/* ==========================================================================
   MY APPLICATIONS (Profile Drawer)
   ========================================================================== */
function renderCompletedWorks() {
  const listEl = document.getElementById("completed-work-list");
  const titleEl = document.getElementById("completed-work-title");
  const countBadge = document.getElementById("drawer-completed-count");

  if (!listEl) return;

  const count = state.completedJobs ? state.completedJobs.length : 0;

  if (titleEl) {
    titleEl.innerHTML = `MY COMPLETED WORK <span style="color:var(--mint-primary); font-size:12px; margin-left:auto; text-transform:none;">✓ ${count} Works Completed</span>`;
    titleEl.style.display = "flex";
  }

  if (countBadge) {
    countBadge.innerText = count;
  }

  if (count === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
        <div style="font-size: 32px; margin-bottom: 10px;">📋</div>
        <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">No completed work yet</div>
        <div style="font-size: 13px;">Your completed work history will appear here after you finish a job.</div>
      </div>
    `;
    return;
  }

  // Sort by date completed (most recent first)
  const sorted = [...state.completedJobs].reverse();

  listEl.innerHTML = sorted
    .map(
      (job) => `
    <div class="application-item" style="border-left: 3px solid var(--mint-primary); padding: 12px; background: var(--bg-card); border-radius: var(--radius-md); border-right: 1px solid var(--border-subtle); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
        <div class="application-title" style="font-size: 15px; display: flex; align-items: center; gap: 6px;">
          <span style="color:var(--mint-primary);">✅</span> ${job.title}
        </div>
        <span style="background:var(--mint-subtle); color:var(--mint-primary); font-size:11px; padding:2px 8px; border-radius:12px; font-weight:700;">Completed</span>
      </div>
      <div class="application-meta" style="display: flex; flex-direction: column; gap: 4px;">
        <span>📅 ${job.date}</span>
        <span>🕐 ${job.time}</span>
      </div>
    </div>
  `,
    )
    .join("");
}

/* ==========================================================================
   EVENT LISTENERS
   ========================================================================== */
function initEventListeners() {
  // Live Search Input
  const searchInput = document.getElementById("search-input");
  const clearBtn = document.getElementById("clear-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      if (clearBtn)
        clearBtn.style.display = state.searchQuery ? "block" : "none";
      renderListings();
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.searchQuery = "";
      clearBtn.style.display = "none";
      renderListings();
    });
  }

  // Sort Dropdown
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderListings();
    });
  }

  // Close modals on overlay backdrop click
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        if (overlay.id === "post-modal") return; // DO NOT close on outside click
        closeAllModals();
      }
    });
  });

  // ESC key closes drawer and modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProfileDrawer();
      closeAllModals();
    }
  });
}

/* ==========================================================================
   PROFILE DRAWER (Open/Close with smooth transition)
   ========================================================================== */
function openProfileDrawer() {
  syncProfileData();
  const drawer = document.getElementById("profile-drawer");
  const backdrop = document.getElementById("drawer-backdrop");
  if (drawer) drawer.classList.add("open");
  if (backdrop) backdrop.classList.add("open");
}

function closeProfileDrawer() {
  const drawer = document.getElementById("profile-drawer");
  const backdrop = document.getElementById("drawer-backdrop");
  if (drawer) drawer.classList.remove("open");
  if (backdrop) backdrop.classList.remove("open");
}

/* ==========================================================================
   ROLE TOGGLE
   ========================================================================== */
function switchRole(role) {
  state.userRole = role;

  const seekerBtn = document.getElementById("btn-seeker");
  const dealerBtn = document.getElementById("btn-dealer");
  const dealerFab = document.getElementById("dealer-fab");
  const navMyLabel = document.getElementById("top-label-my");
  const userRatingBox = document.getElementById("user-rating-box");

  if (role === "seeker") {
    if (seekerBtn) seekerBtn.classList.add("active");
    if (dealerBtn) dealerBtn.classList.remove("active");
    if (dealerFab) dealerFab.style.display = "none";

    if (navMyLabel) navMyLabel.innerText = "My Shifts";
    if (userRatingBox)
      userRatingBox.innerText = `★ ${state.userProfile.rating} (${state.userProfile.gigsCompleted} Gigs Completed)`;
  } else {
    if (dealerBtn) dealerBtn.classList.add("active");
    if (seekerBtn) seekerBtn.classList.remove("active");
    if (dealerFab) dealerFab.style.display = "flex";

    if (navMyLabel) navMyLabel.innerText = "Posted Work";
    if (userRatingBox) userRatingBox.innerText = `★ 5.0 (Verified Dealer)`;
  }

  renderCategoryTabs();
  renderListings();
}

/* ==========================================================================
   CATEGORY TABS & BADGES
   ========================================================================== */
const CATEGORIES = [
  { key: "All", label: "All Openings" },
  { key: "Catering", label: "Catering Services" },
  { key: "Promotions", label: "Event Promotions" },
  { key: "Pamphlet", label: "Pamphlet Distribution" },
  { key: "Ushering", label: "Ushering & VIP" },
  { key: "Setup", label: "Stage & Logistics" },
];

function renderCategoryTabs() {
  const tabsContainer = document.getElementById("category-tabs");
  if (!tabsContainer) return;

  const dataset =
    state.userRole === "seeker" ? state.shifts : state.dealerPosts;

  tabsContainer.innerHTML = CATEGORIES.map((cat) => {
    const count =
      cat.key === "All"
        ? dataset.length
        : dataset.filter((i) => i.category === cat.key).length;

    const isActive = state.activeCategory === cat.key ? "active" : "";

    return `
      <div class="cat-tab ${isActive}" onclick="selectCategory('${cat.key}')">
        <span>${cat.label}</span>
        <span class="cat-badge">${count}</span>
      </div>
    `;
  }).join("");
}

function selectCategory(categoryKey) {
  state.activeCategory = categoryKey;
  renderCategoryTabs();
  renderListings();
}

/* ==========================================================================
   FILTER CHIPS
   ========================================================================== */
function toggleFilterChip(chipKey, element) {
  if (state.activeFilterChips.has(chipKey)) {
    state.activeFilterChips.delete(chipKey);
    element.classList.remove("active");
  } else {
    state.activeFilterChips.add(chipKey);
    element.classList.add("active");
  }
  renderListings();
}

function setGenderFilter(type) {
  const allChip = document.getElementById("chip-gender-all");
  const boysChip = document.getElementById("chip-gender-boys");
  const girlsChip = document.getElementById("chip-gender-girls");

  state.activeFilterChips.delete("boys");
  state.activeFilterChips.delete("girls");

  if (allChip) allChip.classList.remove("active");
  if (boysChip) boysChip.classList.remove("active");
  if (girlsChip) girlsChip.classList.remove("active");

  if (type === "boys") {
    state.activeFilterChips.add("boys");
    if (boysChip) boysChip.classList.add("active");
  } else if (type === "girls") {
    state.activeFilterChips.add("girls");
    if (girlsChip) girlsChip.classList.add("active");
  } else {
    if (allChip) allChip.classList.add("active");
  }

  renderListings();
}

/* ==========================================================================
   ADVANCED FILTER DRAWER
   ========================================================================== */

// Working copy of filters edited inside the drawer, committed on "Apply Filters"
let draftFilters = {
  categories: new Set(),
  dateFilter: null,
  duration: null,
  gender: null,
  location: null,
  distanceKm: null,
};

function openFilterModal() {
  // Start the draft from the currently applied filters
  draftFilters = {
    categories: new Set(state.advancedFilters.categories),
    dateFilter: state.advancedFilters.dateFilter,
    duration: state.advancedFilters.duration,
    gender: state.advancedFilters.gender,
    location: state.advancedFilters.location,
    distanceKm: state.advancedFilters.distanceKm,
  };

  // Category checkboxes
  const catGroup = document.getElementById("filter-category-group");
  if (catGroup) {
    catGroup.innerHTML = CATEGORIES.filter((c) => c.key !== "All")
      .map(
        (cat) => `
      <button class="filter-option-btn ${draftFilters.categories.has(cat.key) ? "active" : ""}"
        data-category="${cat.key}" onclick="toggleCategoryFilter('${cat.key}', this)">${cat.label}</button>
    `,
      )
      .join("");
  }

  // Locality quick-select buttons
  const localityRow = document.getElementById("filter-locality-row");
  if (localityRow) {
    localityRow.innerHTML = KNOWN_LOCALITIES.map(
      (loc) => `
      <button class="filter-option-btn ${draftFilters.location && draftFilters.location.name === loc.name ? "active" : ""}"
        onclick="selectLocality('${loc.name}')">${loc.name}</button>
    `,
    ).join("");
  }

  // Restore existing selections in the option groups
  document
    .querySelectorAll("#filter-date-group .filter-option-btn")
    .forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.dataset.date === draftFilters.dateFilter,
      );
    });
  document
    .querySelectorAll("#filter-distance-group .filter-option-btn")
    .forEach((btn) => {
      btn.classList.toggle(
        "active",
        Number(btn.dataset.distance) === draftFilters.distanceKm,
      );
    });
  document
    .querySelectorAll("#filter-duration-group .filter-option-btn")
    .forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.dataset.duration === draftFilters.duration,
      );
    });
  document
    .querySelectorAll("#filter-gender-group .filter-option-btn")
    .forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.dataset.gender === draftFilters.gender,
      );
    });

  const salaryMinInput = document.getElementById("filter-salary-min");
  const salaryMaxInput = document.getElementById("filter-salary-max");
  if (salaryMinInput)
    salaryMinInput.value = state.advancedFilters.salaryMin ?? "";
  if (salaryMaxInput)
    salaryMaxInput.value = state.advancedFilters.salaryMax ?? "";

  updateLocationActiveLabel();

  const modal = document.getElementById("filter-modal");
  if (modal) modal.classList.add("open");
}

function toggleCategoryFilter(categoryKey, element) {
  if (draftFilters.categories.has(categoryKey)) {
    draftFilters.categories.delete(categoryKey);
    element.classList.remove("active");
  } else {
    draftFilters.categories.add(categoryKey);
    element.classList.add("active");
  }
}

function setDateFilter(value, element) {
  draftFilters.dateFilter = draftFilters.dateFilter === value ? null : value;
  document
    .querySelectorAll("#filter-date-group .filter-option-btn")
    .forEach((btn) => btn.classList.remove("active"));
  if (draftFilters.dateFilter) element.classList.add("active");
}

function setDistanceFilter(km, element) {
  draftFilters.distanceKm = draftFilters.distanceKm === km ? null : km;
  document
    .querySelectorAll("#filter-distance-group .filter-option-btn")
    .forEach((btn) => btn.classList.remove("active"));
  if (draftFilters.distanceKm) element.classList.add("active");
}

function setDurationFilter(value, element) {
  draftFilters.duration = draftFilters.duration === value ? null : value;
  document
    .querySelectorAll("#filter-duration-group .filter-option-btn")
    .forEach((btn) => btn.classList.remove("active"));
  if (draftFilters.duration) element.classList.add("active");
}

function setGenderFilter(value, element) {
  if (element) {
    draftFilters.gender = draftFilters.gender === value ? null : value;
    document
      .querySelectorAll("#filter-gender-group .filter-option-btn")
      .forEach((btn) => btn.classList.remove("active"));
    if (draftFilters.gender) element.classList.add("active");
  } else {
    // Quick chips on home page
    const allChip = document.getElementById("chip-gender-all");
    const boysChip = document.getElementById("chip-gender-boys");
    const girlsChip = document.getElementById("chip-gender-girls");

    state.activeFilterChips.delete("boys");
    state.activeFilterChips.delete("girls");

    if (allChip) allChip.classList.remove("active");
    if (boysChip) boysChip.classList.remove("active");
    if (girlsChip) girlsChip.classList.remove("active");

    if (value === "boys") {
      state.activeFilterChips.add("boys");
      if (boysChip) boysChip.classList.add("active");
    } else if (value === "girls") {
      state.activeFilterChips.add("girls");
      if (girlsChip) girlsChip.classList.add("active");
    } else {
      if (allChip) allChip.classList.add("active");
    }

    renderListings();
  }
}

function selectLocality(name) {
  const loc = KNOWN_LOCALITIES.find((l) => l.name === name);
  if (!loc) return;
  draftFilters.location = { name: loc.name, lat: loc.lat, lng: loc.lng };
  document
    .querySelectorAll("#filter-locality-row .filter-option-btn")
    .forEach((btn) => {
      btn.classList.toggle("active", btn.textContent.trim() === name);
    });
  updateLocationActiveLabel();
}

function requestNearMe() {
  if (!navigator.geolocation) {
    showToast(
      "Location access isn't available on this device. Please pick a locality manually.",
    );
    return;
  }
  const btn = document.getElementById("btn-near-me");
  if (btn) btn.textContent = "Detecting your location...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      draftFilters.location = {
        name: "Near Me",
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      document
        .querySelectorAll("#filter-locality-row .filter-option-btn")
        .forEach((btn) => btn.classList.remove("active"));
      updateLocationActiveLabel();
      resetNearMeButton();
    },
    () => {
      showToast(
        "Location permission denied. Please choose a locality from the list instead.",
      );
      resetNearMeButton();
    },
    { enableHighAccuracy: false, timeout: 8000 },
  );
}

function resetNearMeButton() {
  const btn = document.getElementById("btn-near-me");
  if (btn) {
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
      Use My Current Location
    `;
  }
}

function updateLocationActiveLabel() {
  const labelWrap = document.getElementById("filter-location-active");
  const labelText = document.getElementById("filter-location-active-text");
  if (!labelWrap || !labelText) return;
  if (draftFilters && draftFilters.location) {
    labelText.textContent = `Using: ${draftFilters.location.name}`;
    labelWrap.classList.add("show");
  } else {
    labelWrap.classList.remove("show");
  }
}

function applyAdvancedFilters() {
  const salaryMinInput = document.getElementById("filter-salary-min");
  const salaryMaxInput = document.getElementById("filter-salary-max");

  state.advancedFilters = {
    categories: new Set(draftFilters.categories),
    dateFilter: draftFilters.dateFilter,
    salaryMin:
      salaryMinInput && salaryMinInput.value !== ""
        ? Number(salaryMinInput.value)
        : null,
    salaryMax:
      salaryMaxInput && salaryMaxInput.value !== ""
        ? Number(salaryMaxInput.value)
        : null,
    duration: draftFilters.duration,
    gender: draftFilters.gender,
    location: draftFilters.location,
    // Default to a sensible 10km radius if a location was chosen but no distance picked
    distanceKm: draftFilters.location
      ? draftFilters.distanceKm || 10
      : draftFilters.distanceKm,
  };

  updateFilterCountBadge();
  closeAllModals();
  renderListings();
  showToast("Filters applied!");
}

function clearAllAdvancedFilters() {
  state.advancedFilters = {
    categories: new Set(),
    dateFilter: null,
    salaryMin: null,
    salaryMax: null,
    duration: null,
    gender: null,
    location: null,
    distanceKm: null,
  };
  draftFilters = {
    categories: new Set(),
    dateFilter: null,
    duration: null,
    gender: null,
    location: null,
    distanceKm: null,
  };
  document
    .querySelectorAll("#filter-modal .filter-option-btn")
    .forEach((btn) => btn.classList.remove("active"));
  const salaryMinInput = document.getElementById("filter-salary-min");
  const salaryMaxInput = document.getElementById("filter-salary-max");
  if (salaryMinInput) salaryMinInput.value = "";
  if (salaryMaxInput) salaryMaxInput.value = "";
  updateLocationActiveLabel();
  updateFilterCountBadge();
  renderListings();
  showToast("All filters cleared.");
}

function updateFilterCountBadge() {
  const af = state.advancedFilters;
  let count = 0;
  if (af.categories.size > 0) count++;
  if (af.dateFilter) count++;
  if (af.salaryMin != null || af.salaryMax != null) count++;
  if (af.duration) count++;
  if (af.gender) count++;
  if (af.location) count++;

  const badge = document.getElementById("filter-count-badge");
  const filterBtn = document.getElementById("btn-open-filter");
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle("show", count > 0);
  }
  if (filterBtn) {
    filterBtn.classList.toggle("has-active", count > 0);
  }
}

/* ==========================================================================
   RENDER LISTINGS (CARDS)
   ========================================================================== */
function renderListings() {
  const box = document.getElementById("listings-container");
  const countBadge = document.getElementById("listings-count-badge");
  const sectionTitle = document.getElementById("section-title-text");
  if (!box) return;

  const dataset =
    state.userRole === "seeker" ? state.shifts : state.dealerPosts;

  // Filter by Category
  let filtered =
    state.activeCategory === "All"
      ? dataset
      : dataset.filter((item) => item.category === state.activeCategory);

  // Filter by Search Query
  if (state.searchQuery) {
    filtered = filtered.filter((item) => {
      const target =
        `${item.title} ${item.loc} ${item.category} ${item.dealerName} ${(item.perks || []).join(" ")}`.toLowerCase();
      return target.includes(state.searchQuery);
    });
  }

  // Filter by Active Chips
  if (state.activeFilterChips.size > 0) {
    if (state.activeFilterChips.has("today")) {
      filtered = filtered.filter((item) => item.dateType === "today");
    }
    if (state.activeFilterChips.has("highpay")) {
      filtered = filtered.filter((item) => (item.rawPay || 0) >= 800);
    }
    if (state.activeFilterChips.has("instant")) {
      filtered = filtered.filter((item) => item.instantPay === true);
    }
    if (state.activeFilterChips.has("urgent")) {
      filtered = filtered.filter((item) => item.urgent === true);
    }
    if (state.activeFilterChips.has("meals")) {
      filtered = filtered.filter((item) =>
        (item.perks || []).some(
          (p) =>
            p.toLowerCase().includes("dinner") ||
            p.toLowerCase().includes("lunch") ||
            p.toLowerCase().includes("food") ||
            p.toLowerCase().includes("snack") ||
            p.toLowerCase().includes("breakfast"),
        ),
      );
    }
    if (state.activeFilterChips.has("boys")) {
      filtered = filtered.filter((item) => {
        if (!item.genderReq) return false;
        const val = item.genderReq.toLowerCase().trim();
        return [
          "boys",
          "boys only",
          "male only",
          "boy",
          "male",
          "men",
        ].includes(val);
      });
    }
    if (state.activeFilterChips.has("girls")) {
      filtered = filtered.filter((item) => {
        if (!item.genderReq) return false;
        const val = item.genderReq.toLowerCase().trim();
        return [
          "girls",
          "girls only",
          "female only",
          "girl",
          "female",
          "women",
        ].includes(val);
      });
    }
  }

  // Filter by the Advanced Filter Drawer
  const af = state.advancedFilters;

  if (af.categories.size > 0) {
    filtered = filtered.filter((item) => af.categories.has(item.category));
  }

  if (af.dateFilter) {
    filtered = filtered.filter((item) => item.dateType === af.dateFilter);
  }

  if (af.salaryMin != null && !Number.isNaN(af.salaryMin)) {
    filtered = filtered.filter((item) => (item.rawPay || 0) >= af.salaryMin);
  }
  if (af.salaryMax != null && !Number.isNaN(af.salaryMax)) {
    filtered = filtered.filter((item) => (item.rawPay || 0) <= af.salaryMax);
  }

  if (af.duration) {
    filtered = filtered.filter((item) => {
      const h = item.durationHours;
      if (h == null) return true; // don't exclude items without duration data
      if (af.duration === "short") return h < 4;
      if (af.duration === "medium") return h >= 4 && h <= 6;
      if (af.duration === "long") return h > 6;
      return true;
    });
  }

  if (af.gender && af.gender !== "any") {
    filtered = filtered.filter((item) => {
      if (!item.genderReq) return false;
      const val = item.genderReq.toLowerCase().trim();
      if (af.gender === "boys") {
        return [
          "boys",
          "boys only",
          "male only",
          "boy",
          "male",
          "men",
        ].includes(val);
      }
      if (af.gender === "girls") {
        return [
          "girls",
          "girls only",
          "female only",
          "girl",
          "female",
          "women",
        ].includes(val);
      }
      return false;
    });
  }

  // Always filter out expired jobs from the main view
  if (typeof isJobExpired === "function") {
    filtered = filtered.filter((item) => !isJobExpired(item));
  }

  // Location / Distance: attach a computed distance to each item, filter and sort by it
  let usingDistanceSort = false;
  if (af.location && af.distanceKm) {
    filtered = filtered
      .map((item) => {
        if (item.lat != null && item.lng != null) {
          return {
            ...item,
            distanceKm: getDistanceKm(
              af.location.lat,
              af.location.lng,
              item.lat,
              item.lng,
            ),
          };
        }
        return { ...item, distanceKm: null };
      })
      .filter(
        (item) => item.distanceKm != null && item.distanceKm <= af.distanceKm,
      );
    usingDistanceSort = true;
  }

  // Sort
  if (usingDistanceSort) {
    filtered.sort((a, b) => {
      if (a.distanceKm == null) return 1;
      if (b.distanceKm == null) return -1;
      return a.distanceKm - b.distanceKm;
    });
  } else if (state.sortBy === "pay_desc") {
    filtered.sort((a, b) => (b.rawPay || 0) - (a.rawPay || 0));
  } else if (state.sortBy === "slots_open") {
    filtered.sort(
      (a, b) => b.slotsTotal - b.slotsFilled - (a.slotsTotal - a.slotsFilled),
    );
  } else if (state.sortBy === "rating") {
    filtered.sort((a, b) => b.dealerRating - a.dealerRating);
  }

  // Update Section Header Counts
  if (countBadge) countBadge.innerText = `${filtered.length} Openings`;
  if (sectionTitle) {
    sectionTitle.innerText =
      state.userRole === "seeker"
        ? "Available Shift Openings"
        : "Your Published Requirements";
  }

  // Empty State
  if (filtered.length === 0) {
    let icon = "🔍";
    let title = "No matching shifts found";
    let message =
      "Try clearing search keywords or active filter chips to discover more available gigs.";

    const hasGirlsFilter =
      state.activeFilterChips.has("girls") || af.gender === "girls";
    const hasBoysFilter =
      state.activeFilterChips.has("boys") || af.gender === "boys";

    if (hasGirlsFilter && !hasBoysFilter) {
      icon = "👩";
      title = "No Girls Only jobs available";
      message = "Currently there are no jobs matching this requirement.";
    } else if (hasBoysFilter && !hasGirlsFilter) {
      icon = "👨";
      title = "No Boys Only jobs available";
      message = "Currently there are no Boys Only jobs available.";
    } else if (state.activeCategory && state.activeCategory !== "All") {
      const catInfo =
        typeof ALL_CATEGORIES !== "undefined"
          ? ALL_CATEGORIES.find((c) => c.id === state.activeCategory)
          : null;
      if (catInfo) {
        icon = catInfo.icon;
        title = `No ${catInfo.name} jobs are currently available`;
        message = "Please check again later.";
      }
    }

    box.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle);">
        <div style="font-size: 36px; margin-bottom: 10px;">${icon}</div>
        <h4 style="font-size: 17px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px;">${title}</h4>
        <p style="font-size: 13px; color: var(--text-muted); max-width: 360px; margin: 0 auto 16px auto;">${message}</p>
        <button class="btn-action-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  // Render cards
  box.innerHTML = filtered
    .map((item) => {
      const isApplied = state.appliedJobIds.has(item.id);
      const isBookmarked = state.bookmarkedJobIds.has(item.id);
      const isExpired =
        typeof isJobExpired === "function" && isJobExpired(item);
      const slotsRemaining = item.slotsTotal - item.slotsFilled;
      const progressPercent = Math.round(
        (item.slotsFilled / item.slotsTotal) * 100,
      );
      const media = getCategoryMedia(item.category);
      const itemImg = item.image || media.src;
      const itemFallback = media.fallback;

      const perksHtml = (item.perks || [])
        .slice(0, 2)
        .map(
          (p) => `
      <span class="perk-pill">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        ${p}
      </span>
    `,
        )
        .join("");

      return `
      <div class="shift-card" id="card-${item.id}">
        <!-- Top Category Image Header with Overlaid Badges (Matches Reference Design) -->
        <div class="card-image-wrap">
          <img 
            src="${itemImg}" 
            alt="${media.alt || item.title}" 
            class="card-img" 
            loading="lazy"
            onerror="this.onerror=null; this.src='${itemFallback}';"
          >
          <div class="card-image-overlay"></div>
          
          <div class="card-image-top-bar">
            <span class="category-tag on-image">
              <span class="category-tag-dot"></span>
              ${item.categoryDisplay || item.category}
            </span>
            <div class="card-actions-top on-image">
              ${item.genderReq === "boys" ? `<span class="gender-badge on-image boys-only">♂ Boys Only</span>` : ""}
              ${item.genderReq === "girls" ? `<span class="gender-badge on-image girls-only">♀ Girls Only</span>` : ""}
              ${item.urgent ? `<span class="urgent-badge on-image">🔥 Urgent</span>` : ""}
              <button class="btn-bookmark on-image ${isBookmarked ? "bookmarked" : ""}" onclick="toggleBookmark('${item.id}', this)" title="Save for later" aria-label="Bookmark shift">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Card Body Details (Keeps all existing layout & functionality) -->
        <div class="card-body">
          <div class="card-title" onclick="openShiftDetails('${item.id}')" title="${item.fullTitle || item.title}">${item.title}</div>

          <div class="perks-row">
            ${perksHtml}
          </div>

          <div class="card-info-list">
            <div class="info-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span title="${item.loc}"><strong>${item.loc}</strong>${item.distanceKm != null ? ` • ${item.distanceKm.toFixed(1)} km away` : ""}</span>
            </div>
            <div class="info-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              <span>${item.date}</span>
            </div>
            <div class="info-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${item.time}</span>
            </div>
          </div>

          <div class="slots-bar-wrapper">
            <div class="slots-bar-header">
              <span>Slots Availability</span>
              <span style="color:var(--mint-primary);">${slotsRemaining} spots left (${item.slotsFilled}/${item.slotsTotal})</span>
            </div>
            <div class="slots-progress-track">
              <div class="slots-progress-fill" style="width: ${progressPercent}%;"></div>
            </div>
          </div>

          <div class="card-footer">
            <div class="pay-container">
              <div class="pay-amount">${item.pay}</div>
              <div class="pay-type">${item.payType || "Guaranteed Pay"}</div>
            </div>

            <div class="card-btn-group">
              <button class="btn-details" onclick="openShiftDetails('${item.id}')">Details</button>
              ${
                state.userRole === "seeker"
                  ? `
                <button 
                  class="btn-action-primary ${isApplied || isExpired ? "applied" : ""}" 
                  onclick="${isExpired ? `showToast('This shift has expired because the scheduled date/time has passed.')` : `handleApplyClick('${item.id}')`}"
                  id="apply-btn-${item.id}"
                  ${isExpired ? 'style="background: var(--bg-card); color: var(--danger); border: 1px solid var(--danger); pointer-events: auto;"' : ""}
                >
                  ${isExpired ? "Expired" : isApplied ? "✓ Already Applied" : "Quick Apply"}
                </button>
              `
                  : `
                <button class="btn-action-primary" onclick="openManageApplicantsModal('${item.id}')">
                  Manage (${item.applicants ? item.applicants.length : 0})
                </button>
              `
              }
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

/* ==========================================================================
   WORKFLOWS & MODALS
   ========================================================================== */
function resetFilters() {
  state.activeCategory = "All";
  state.searchQuery = "";
  state.activeFilterChips.clear();
  state.advancedFilters = {
    categories: new Set(),
    dateFilter: null,
    salaryMin: null,
    salaryMax: null,
    duration: null,
    gender: null,
    location: null,
    distanceKm: null,
  };
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";
  document
    .querySelectorAll(".filter-chip")
    .forEach((c) => c.classList.remove("active"));

  const allGenderChip = document.getElementById("chip-gender-all");
  if (allGenderChip) allGenderChip.classList.add("active");

  updateFilterCountBadge();
  renderCategoryTabs();
  renderListings();
}

function toggleBookmark(jobId, element) {
  if (state.bookmarkedJobIds.has(jobId)) {
    state.bookmarkedJobIds.delete(jobId);
    if (element) element.classList.remove("bookmarked");
    showToast("Shift removed from bookmarks");
  } else {
    state.bookmarkedJobIds.add(jobId);
    if (element) element.classList.add("bookmarked");
    showToast("Shift saved to bookmarks ❤️");
  }
  saveState();
  updateSavedJobsCount();

  if (
    document.getElementById("saved-section") &&
    document.getElementById("saved-section").style.display !== "none"
  ) {
    renderSavedJobsSection();
  }

  if (typeof renderSavedJobs === "function") {
    renderSavedJobs();
  }
}

function handleApplyClick(jobId) {
  if (state.appliedJobIds.has(jobId)) {
    showToast("You have already submitted your application for this shift!");
    return;
  }
  openShiftDetails(jobId, true);
}

function openShiftDetails(jobId, autoFocusApply = false) {
  const allShifts = [...state.shifts, ...state.dealerPosts];
  const item = allShifts.find((s) => s.id === jobId);
  if (!item) return;

  state.activeModalShift = item;
  const modal = document.getElementById("details-modal");
  const content = document.getElementById("details-modal-content");
  if (!modal || !content) return;

  const isApplied = state.appliedJobIds.has(item.id);
  const media = getCategoryMedia(item.category);
  const itemImg = item.image || media.src;
  const itemFallback = media.fallback;

  content.innerHTML = `
    <div style="width:100%; height:160px; border-radius:var(--radius-md); overflow:hidden; margin-bottom:16px; position:relative; background:#09130e;">
      <img src="${itemImg}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.onerror=null; this.src='${itemFallback}';">
      <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(14,24,19,0.85) 100%);"></div>
      <div style="position:absolute; bottom:12px; left:14px;">
        <span class="category-tag on-image">${item.categoryDisplay || item.category}</span>
      </div>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
      <div>
        <h2 style="font-size:19px; font-weight:800; color:var(--text-primary); margin-top:4px;">${item.fullTitle || item.title}</h2>
        <div style="font-size:12.5px; color:var(--text-muted); margin-top:4px;">Posted by <strong>${item.dealerName}</strong> (★ ${item.dealerRating})</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:22px; font-weight:800; color:var(--mint-primary); font-family:'Space Grotesk'">${item.pay}</div>
        <div style="font-size:11px; color:var(--text-muted);">${item.payType || "Per Shift"}</div>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:12px; margin-bottom:16px;">
      <div class="info-item">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        <div>
          <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase;">Venue Location</div>
          <div style="font-weight:700; color:var(--text-primary);">${item.loc}</div>
        </div>
      </div>
      <div class="info-item">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <div>
          <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase;">Timing & Date</div>
          <div style="font-weight:700; color:var(--text-primary);">${item.date} • ${item.time}</div>
        </div>
      </div>
    </div>

    <div style="margin-bottom:14px;">
      <h4 style="font-size:12px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-bottom:5px;">Role Description</h4>
      <p style="font-size:13.5px; color:var(--text-primary); line-height:1.55;">${item.description || "Assisting venue leads with guests hospitality, counter coordination, and cordial service."}</p>
    </div>

    <div style="margin-bottom:14px;">
      <h4 style="font-size:12px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-bottom:5px;">Requirements & Dress Code</h4>
      <div style="padding:10px 12px; background:rgba(0, 245, 155, 0.05); border-left:3px solid var(--mint-primary); border-radius:4px; font-size:12.5px; color:var(--text-primary);">
        👔 <strong>Dress Code:</strong> ${item.dressCode || "Smart formals"}<br>
        📋 <strong>Criteria:</strong> ${item.requirements || "Punctuality and neat grooming."}
      </div>
    </div>

    <div style="margin-bottom:18px;">
      <h4 style="font-size:12px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-bottom:6px;">Perks & Facilities</h4>
      <div class="perks-row">
        ${(item.perks || []).map((p) => `<span class="perk-pill" style="padding:4px 10px;">✨ ${p}</span>`).join("")}
      </div>
    </div>

    <div style="margin-bottom:14px;">
      <h4 style="font-size:12px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-bottom:5px;">Dealer Details</h4>
      <div style="padding:12px; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-md);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div>
            <div style="font-size:14px; font-weight:800; color:var(--text-primary); display:flex; align-items:center; gap:6px;">
              ${item.dealerName}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--mint-primary)" stroke="#000" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
            </div>
            <div style="font-size:12px; color:var(--text-secondary);">⭐ ${item.dealerRating} Rating</div>
          </div>
        </div>
        <div style="display:flex; gap:10px; margin-top:10px;">
          <button class="btn-details" style="flex:1; padding:8px;" onclick="window.location.href='tel:${item.phone || "+910000000000"}'">📞 Call</button>
          <button class="btn-details" style="flex:1; padding:8px;" onclick="openChat('${item.id}', 'dealer_${item.dealerName.replace(/\\s+/g, '')}', '${item.dealerName}')">💬 Message</button>
        </div>
      </div>
    </div>

    <div style="display:flex; gap:10px; margin-top:16px; border-top:1px solid var(--border-subtle); padding-top:14px;">
      <button class="btn-details" onclick="closeAllModals()" style="flex:1; padding:10px;">Close</button>
      ${
        state.userRole === "seeker"
          ? `
        <button 
          class="btn-action-primary ${isApplied ? "applied" : ""}" 
          style="flex:2; justify-content:center; padding:11px;"
          onclick="${isApplied ? "" : `openInstantApplyConfirmation('${item.id}')`}"
          ${isApplied ? "disabled" : ""}
        >
          ${isApplied ? "✓ Application Submitted" : "Confirm & Apply"}
        </button>
      `
          : `
        <button class="btn-action-primary" style="flex:2; justify-content:center;" onclick="closeAllModals(); openManageApplicantsModal('${item.id}')">
          View Current Applicants
        </button>
      `
      }
    </div>
  `;

  modal.classList.add("open");
}

function openInstantApplyConfirmation(jobId) {
  closeAllModals();
  const allShifts = [...state.shifts, ...state.dealerPosts];
  const job = allShifts.find((s) => s.id === jobId);
  if (!job) return;

  const modal = document.getElementById("details-modal");
  const content = document.getElementById("details-modal-content");

  content.innerHTML = `
    <h3 style="font-size: 18px; font-weight: 800; color: var(--text-primary); margin-bottom: 16px; text-align: center;">Ready to Apply?</h3>
    
    <div style="background: var(--bg-card); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 20px;">
      <div style="margin-bottom: 8px;">
        <span style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Job</span>
        <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">${job.title}</div>
      </div>
      <div style="margin-bottom: 8px;">
        <span style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Location</span>
        <div style="font-size: 14px; color: var(--text-primary);">📍 ${job.loc}</div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 8px;">
        <div>
          <span style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Date</span>
          <div style="font-size: 14px; color: var(--text-primary);">${job.date}</div>
        </div>
        <div>
          <span style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Time</span>
          <div style="font-size: 14px; color: var(--text-primary);">${job.time}</div>
        </div>
      </div>
      <div style="margin-bottom: 8px;">
        <span style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Amount</span>
        <div style="font-size: 16px; font-weight: 800; color: var(--mint-primary);">${job.pay}</div>
      </div>
      <div>
        <span style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Dealer</span>
        <div style="font-size: 14px; color: var(--text-primary);">${job.dealerName}</div>
      </div>
    </div>

    <div style="display: flex; gap: 10px;">
      <button class="btn-details" onclick="openShiftDetails('${job.id}')" style="flex: 1; padding: 12px;">Back</button>
      <button class="btn-action-primary" style="flex: 2; justify-content: center; padding: 12px;" onclick="confirmApply('${job.id}')">Confirm & Apply</button>
    </div>
  `;

  modal.classList.add("open");
}

function confirmApply(jobId) {
  // Prevent duplicate applications to the same job
  if (state.appliedJobIds.has(jobId)) {
    showToast("You have already submitted your application for this shift!");
    closeAllModals();
    return;
  }

  // Create an application via the backend mock (simulated API integration)
  submitApplicationToBackend(jobId)
    .then((applicationData) => {
      state.appliedJobIds.add(jobId);
      state.appliedJobs.push(applicationData);
      saveState();

      const content = document.getElementById("details-modal-content");
      content.innerHTML = `
      <div style="text-align: center; padding: 30px 10px;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(0, 245, 155, 0.2); color: var(--mint-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 style="font-size: 20px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">✓ Application Submitted</h3>
        <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">Your application has been successfully submitted.</p>
        <div style="background: var(--bg-darkest); padding: 12px; border-radius: var(--radius-sm); display: inline-block; margin-bottom: 24px;">
          <span style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Application ID</span>
          <div style="font-size: 15px; font-weight: 700; color: var(--text-primary);">${applicationData.applicationId}</div>
        </div>
        <button class="btn-action-primary" style="width: 100%; justify-content: center; padding: 12px;" onclick="closeAllModals(); openProfileDrawer();">View My Shifts</button>
      </div>
    `;

      renderListings();
      renderCompletedWorks();
    })
    .catch((err) => {
      showToast("Application failed: " + err.message);
    });
}

// Simulated backend call
async function submitApplicationToBackend(jobId) {
  const allShifts = [...state.shifts, ...state.dealerPosts];
  const job = allShifts.find((s) => s.id === jobId);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        applicationId: "OSP-APP-" + Math.floor(10000 + Math.random() * 90000),
        jobId: job.id,
        title: job.title,
        company: job.dealerName,
        location: job.loc,
        date: job.date,
        time: job.time,
        salary: job.pay,
        status: "Application Submitted",
        appliedDate: new Date().toISOString(),
        appliedBy: state.userProfile.name,
      });
    }, 600);
  });
}

/* ==========================================================================
   DEALER POST WORK MODAL
   ========================================================================== */
function openPostModal() {
  const modal = document.getElementById("post-modal");
  if (modal) modal.classList.add("open");
}

function closePostModal() {
  const modal = document.getElementById("post-modal");
  if (modal) modal.classList.remove("open");
}

const categoryToTitles = {
  "Catering & Food Service": ["Catering Service", "Kitchen Helper", "Cook", "Waiter", "Food Server", "Dishwasher", "Restaurant Helper", "Bartender"],
  "Events & Functions": ["Event Staff", "Wedding Staff", "Event Coordinator", "Decoration Worker", "Usher", "Ticketing Staff", "Stage Setup"],
  "Hotel & Hospitality": ["Hotel Staff", "Housekeeping", "Receptionist", "Bellboy", "Room Service", "Guest Relations"],
  "Retail & Sales": ["Retail Staff", "Sales Promoter", "Cashier", "Store Helper", "Inventory Clerk"],
  "Delivery & Logistics": ["Delivery", "Packing", "Warehouse Worker", "Loader/Unloader", "Driver"],
  "Marketing & Promotion": ["Brand Promoter", "Pamphlet Distribution", "Telecaller", "Field Marketing"],
  "Office & Administration": ["Office Assistant", "Data Entry", "Receptionist", "Clerk", "Admin Assistant"],
  "Security": ["Security Guard", "Bouncer", "Watchman"],
  "Cleaning & Housekeeping": ["Cleaning", "Housekeeping", "Janitor", "Sweeper"],
  "Construction": ["Helper", "Laborer", "Mason", "Painter", "Carpenter"],
  "Electrical & Plumbing": ["Electrician", "Plumber", "Technician", "AC Mechanic"],
  "Driving & Transport": ["Driver", "Valet Parking", "Chauffeur", "Truck Driver"],
  "Education": ["Tutor", "Teaching Assistant", "Librarian"],
  "Healthcare Support": ["Ward Boy", "Nurse Assistant", "Caregiver", "Pharmacy Assistant"],
  "Photography & Videography": ["Photographer", "Videographer", "Photo Editor"],
  "IT & Computer": ["Computer Operator", "IT Support", "Data Entry"],
  "Design & Creative": ["Graphic Designer", "Video Editor", "Content Creator"],
  "Customer Service": ["Customer Support", "Telecaller", "Helpdesk"],
  "Manufacturing": ["Assembly Worker", "Machine Operator", "Factory Helper"],
  "Warehouse": ["Warehouse Worker", "Picker", "Packer", "Loader"],
  "Agriculture": ["Farm Worker", "Gardener", "Harvest Helper"],
  "Beauty & Personal Care": ["Beautician", "Makeup Artist", "Hair Stylist"],
  "Other": ["Other Work"]
};

function updatePostTitleOptions() {
  const cat = document.getElementById("post-category").value;
  const titleSelect = document.getElementById("post-title");
  
  if (!cat || cat === "Other") {
    // Show a default text input for 'Other' or if nothing selected? 
    // The requirement is to show selectable titles. We'll populate if cat exists.
    document.getElementById("other-category-group").style.display = (cat === "Other") ? "block" : "none";
  } else {
    document.getElementById("other-category-group").style.display = "none";
  }

  titleSelect.innerHTML = '<option value="" disabled selected>Select Work Title ▼</option>';
  
  if (categoryToTitles[cat]) {
    categoryToTitles[cat].forEach(title => {
      const opt = document.createElement("option");
      opt.value = title;
      opt.textContent = title;
      titleSelect.appendChild(opt);
    });
  }
}

function highlightError(fieldId, boxId, message) {
  const el = document.getElementById(boxId || fieldId);
  if (!el) return;

  el.style.border = "2px solid var(--danger)";
  el.style.animation = "pulseError 0.5s";

  let errorMsg = document.getElementById(fieldId + "-error");
  if (!errorMsg) {
    errorMsg = document.createElement("div");
    errorMsg.id = fieldId + "-error";
    errorMsg.style.color = "var(--danger)";
    errorMsg.style.fontSize = "13px";
    errorMsg.style.fontWeight = "bold";
    errorMsg.style.marginBottom = "6px";
    errorMsg.style.display = "flex";
    errorMsg.style.flexDirection = "column";
    errorMsg.style.alignItems = "center";
    errorMsg.style.justifyContent = "center";
    el.parentNode.insertBefore(errorMsg, el);
  }
  
  // Add bouncing arrow pointing down
  errorMsg.innerHTML = `
    <span style="font-size:20px; line-height:1; transform:translateY(-2px); animation:bounce 1s infinite">↓</span>
    <span style="text-align:center;">${message}</span>
  `;

  // Add keyframes for bounce if not exists
  if (!document.getElementById("error-bounce-style")) {
    const style = document.createElement("style");
    style.id = "error-bounce-style";
    style.innerHTML = "@keyframes bounce { 0%, 100% { transform: translateY(-2px); } 50% { transform: translateY(4px); } }";
    document.head.appendChild(style);
  }

  el.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => {
    el.style.border = "";
    el.style.animation = "";
    if (errorMsg) errorMsg.remove();
  }, 4000);
}

function handlePostSubmit(e) {
  e.preventDefault();

  const titleInput = document.getElementById("post-title").value.trim();
  const categoryBase = document.getElementById("post-category").value;
  const categoryOther = document
    .getElementById("post-category-other")
    .value.trim();
  const category = categoryBase === "Other" ? categoryOther : categoryBase;

  const slots = document.getElementById("post-slots").value.trim();
  const payAmount = document.getElementById("post-pay-amount").value.trim();
  const date = document.getElementById("post-date").value.trim();

  const startTime = document.getElementById("post-time-start").value.trim();
  const endTime = document.getElementById("post-time-end").value.trim();

  const venueName = document.getElementById("post-venue-name").value.trim();
  const loc = document.getElementById("post-location").value.trim();
  const phone = document.getElementById("post-phone").value.trim();

  // 1. One-by-One 4-Second Validation
  if (!titleInput) {
    return highlightError("post-title", null, "Work Title is required.");
  }
  if (!categoryBase) {
    return highlightError(
      "post-category",
      null,
      "Please select a work category."
    );
  }
  if (categoryBase === "Other" && !categoryOther) {
    return highlightError(
      "post-category-other",
      null,
      "Please specify the other category.",
    );
  }
  if (!slots || parseInt(slots, 10) < 1) {
    return highlightError(
      "post-slots",
      null,
      "Please enter a valid number of workers.",
    );
  }
  if (!payAmount) {
    return highlightError(
      "post-pay-amount",
      null,
      "Please enter the payment amount.",
    );
  }
  if (!date) {
    highlightError(
      "post-date",
      "display-post-date-box",
      "Please select the work date.",
    );
    openDatePickerModal();
    return;
  }
  if (!startTime || !endTime) {
    highlightError(
      "post-time-start",
      "display-post-time-box",
      "Please select the shift start and end time.",
    );
    openTimePickerModal();
    return;
  }
  if (startTime === endTime) {
    highlightError(
      "post-time-start",
      "display-post-time-box",
      "End time must be after start time.",
    );
    openTimePickerModal();
    return;
  }
  if (!venueName) {
    return highlightError("post-venue-name", null, "Please enter the venue.");
  }
  if (!loc) {
    highlightError(
      "post-location",
      "display-post-location-box",
      "Please select the work location.",
    );
    openLocationPickerModal();
    return;
  }
  if (!phone) {
    return highlightError("post-phone", null, "Please enter a contact number.");
  }

  // 2. Data Preparation
  const time = `${startTime} – ${endTime}`;
  const fullLoc = `${venueName}, ${loc}`;
  const payType = document.getElementById("post-pay-type").value;
  const formattedPay = `₹${payAmount} ${payType.replace("Per ", "/ ")}`;
  const details = document.getElementById("post-details").value.trim();
  const genderReq = document.getElementById("post-gender-req")
    ? document.getElementById("post-gender-req").value
    : "any";

  const newOpening = {
    id: `shift-custom-${Date.now()}`,
    category: category,
    categoryDisplay: category === "Catering" ? "Catering Services" : category,
    image:
      typeof getCategoryMedia === "function"
        ? getCategoryMedia(category).src
        : "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
    title: titleInput,
    dealerName: state.userProfile.name,
    dealerRating: 5.0,
    pay: formattedPay,
    payType: payType,
    rawPay: parseInt(payAmount, 10) || 800,
    loc: fullLoc,
    date: date,
    dateType: "upcoming",
    time: time,
    slotsTotal: parseInt(slots, 10),
    slotsFilled: 0,
    urgent: true,
    instantPay: true,
    perks: [],
    requirements: "",
    dressCode: "",
    description:
      details ||
      `Work requirement posted by ${state.userProfile.name}. Need ${slots} reliable workers for ${category}. Contact: ${phone}`,
    phone: phone,
    applicants: [],
    genderReq: genderReq,
  };

  // 3. Submit Data to Backend (End-to-End Fix)
  fetch('http://localhost:3000/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newOpening)
  })
  .then(res => res.json())
  .then(data => {
    if(data.success) {
      console.log("Job successfully posted to MongoDB!", data.job);
      // Still update UI instantly for smooth UX
      state.dealerPosts.unshift(newOpening);
      state.shifts.unshift(newOpening);
      createJobNotification(newOpening);
      
      closePostModal();
      e.target.reset();
      
      if (document.getElementById("display-post-date"))
        document.getElementById("display-post-date").innerText = "📅 Select Date";
      if (document.getElementById("display-post-time"))
        document.getElementById("display-post-time").innerText = "🕐 Select Shift Timing";
      
      renderCategoryTabs();
      renderListings();
      showToast("✅ Work requirement posted successfully!");
    } else {
      console.error("Backend Error:", data.error);
      alert("Failed to post job to backend. Check console.");
    }
  })
  .catch(err => {
    console.error("Network Error:", err);
    // Fallback to local UX if backend is offline for demo purposes
    state.dealerPosts.unshift(newOpening);
    state.shifts.unshift(newOpening);
    createJobNotification(newOpening);
    closePostModal();
    e.target.reset();
    if (document.getElementById("display-post-date"))
      document.getElementById("display-post-date").innerText = "📅 Select Date";
    if (document.getElementById("display-post-time"))
      document.getElementById("display-post-time").innerText = "🕐 Select Shift Timing";
    renderCategoryTabs();
    renderListings();
    showToast("✅ Work requirement posted (local mode)!");
  });
}

/* ==========================================================================
   DEALER MANAGE APPLICANTS MODAL
   ========================================================================== */
function openManageApplicantsModal(postId) {
  const post =
    state.dealerPosts.find((p) => p.id === postId) ||
    state.shifts.find((s) => s.id === postId);
  if (!post) return;

  const modal = document.getElementById("manage-modal");
  const titleElem = document.getElementById("manage-post-title");
  const listElem = document.getElementById("manage-applicants-list");

  titleElem.innerText = post.title;

  const applicants = post.applicants || [
    {
      id: "app-default-1",
      name: "Ravi Shankar",
      rating: "4.9",
      gigs: 19,
      phone: "+91 98841 12345",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "app-default-2",
      name: "Priya Sundaram",
      rating: "5.0",
      gigs: 28,
      phone: "+91 94443 67890",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    },
  ];

  if (applicants.length === 0) {
    listElem.innerHTML = `
      <div style="text-align:center; padding:30px; color:var(--text-muted);">
        No seekers applied yet. Your opening is live in the search feed.
      </div>
    `;
  } else {
    listElem.innerHTML = applicants
      .map(
        (app) => `
      <div class="applicant-item" id="app-row-${app.id}">
        <div class="applicant-info">
          <img src="${app.avatar}" class="applicant-avatar" alt="${app.name}">
          <div>
            <div class="applicant-name">${app.name}</div>
            <div class="applicant-sub">★ ${app.rating} (${app.gigs} Gigs Completed) • ${app.phone}</div>
          </div>
        </div>
        <div class="applicant-actions">
          <button class="btn-accept" onclick="acceptApplicant('${app.id}', '${app.name}', '${post.id}')">Accept & Hire</button>
          <button class="btn-decline" onclick="declineApplicant('${app.id}')">Decline</button>
        </div>
      </div>
    `,
      )
      .join("");
  }

  modal.classList.add("open");
}

function acceptApplicant(appId, name, postId) {
  const row = document.getElementById(`app-row-${appId}`);
  if (row) {
    row.innerHTML = `
      <div style="color:var(--mint-primary); font-weight:700; font-size:12.5px; padding:8px 0; display:flex; justify-content:space-between; align-items:center; width: 100%;">
        <span>✓ ${name} Hired!</span>
        <div style="display:flex; gap:6px;">
          <button class="btn-action-primary" style="padding: 4px 10px; font-size: 11px;" onclick="openLocationTracker('${name}')">Track</button>
          <button class="btn-cancel" style="padding: 4px 10px; font-size: 11px; border:1px solid var(--mint-primary); color:var(--mint-primary);" onclick="markShiftCompleted('${appId}', '${name}', '${postId}', this)">Complete</button>
        </div>
      </div>
    `;
  }
  showToast(`Accepted ${name}! Shift confirmed.`);
}

function declineApplicant(appId) {
  const row = document.getElementById(`app-row-${appId}`);
  if (row) row.remove();
  showToast("Applicant declined.");
}

function markShiftCompleted(appId, name, postId, btn) {
  if (btn) {
    btn.innerText = "Completed ✓";
    btn.disabled = true;
    btn.style.color = "var(--text-muted)";
    btn.style.borderColor = "var(--border-subtle)";
  }

  // Find the job to add to completed work history
  const job = [...state.shifts, ...state.dealerPosts].find(
    (j) => j.id === postId,
  );
  if (job) {
    state.completedJobs.unshift({
      id: `comp-${Date.now()}`,
      jobId: job.id,
      title: job.categoryDisplay || job.category,
      date: job.date,
      time: job.time,
      completedAt: new Date().toISOString(),
    });
    saveState();
  }

  showToast(`Shift marked as completed for ${name}. Payout triggered.`);
}

/* ==========================================================================
   USER PROFILE SETUP MODAL
   ========================================================================== */
function openProfileSetup() {
  document.getElementById("profile-name-input").value = state.userProfile.name;
  document.getElementById("profile-phone-input").value =
    state.userProfile.phone;
  document.getElementById("profile-city-input").value = state.userProfile.city;
  document.getElementById("profile-upi-input").value =
    state.userProfile.upiId || "franklin@upi";
  document.getElementById("profile-modal").classList.add("open");
}

function handleProfileSave(e) {
  e.preventDefault();
  state.userProfile.name = document
    .getElementById("profile-name-input")
    .value.trim();
  state.userProfile.phone = document
    .getElementById("profile-phone-input")
    .value.trim();
  state.userProfile.city = document
    .getElementById("profile-city-input")
    .value.trim();
  state.userProfile.upiId = document
    .getElementById("profile-upi-input")
    .value.trim();

  saveState();
  syncProfileData();
  closeAllModals();
  showToast("Profile credentials updated successfully! 👤");
}

/* ==========================================================================
   TOAST & UTILITIES
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById("global-toast");
  const msgEl = document.getElementById("toast-text");
  if (!toast || !msgEl) return;

  msgEl.innerText = message;
  toast.classList.add("show");

  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    modal.classList.remove("open");
  });

  // Clean up camera if closing camera modal
  if (cameraStream) {
    cameraStream.getTracks().forEach((t) => t.stop());
    cameraStream = null;
  }
}

/* ==========================================================================
   SUPPORT CENTER LOGIC
   ========================================================================== */
const TICKET_HISTORY = [];

function openSupportCenter() {
  document.getElementById("support-modal").classList.add("open");
  showSupportMain();
  renderSupportTickets();
}

function showSupportMain() {
  document.getElementById("support-step-1").style.display = "block";
  document.getElementById("support-step-category").style.display = "none";
  document.getElementById("support-step-refund-info").style.display = "none";
  document.getElementById("support-step-refund-form").style.display = "none";
  document.getElementById("support-step-ticket-history").style.display =
    "block";
}

function backToSupportMain() {
  showSupportMain();
}

function openSupportCategory(category) {
  document.getElementById("support-step-1").style.display = "none";
  document.getElementById("support-step-ticket-history").style.display = "none";

  const titleMap = {
    payment: "Payment & Refund",
    job: "Job / Application",
    shift: "Shift Issues",
    account: "Account & Profile",
    payment_not_received: "Payment Not Received",
    location: "Location / Attendance",
    report: "Report a Problem",
    contact: "Contact Support",
  };

  document.getElementById("support-category-title").innerText =
    titleMap[category];

  let optionsHtml = "";
  if (category === "payment") {
    optionsHtml = `
      <button class="btn-secondary-sidebar" style="justify-content: flex-start; text-align: left;" onclick="showToast('Payment verification flow not implemented.')">Payment failed</button>
      <button class="btn-secondary-sidebar" style="justify-content: flex-start; text-align: left;" onclick="showToast('Will contact support for deduction issue.')">Amount deducted but application not confirmed</button>
      <button class="btn-secondary-sidebar" style="justify-content: flex-start; text-align: left;" onclick="showToast('Check ticket history below.')">Refund status</button>
      <button class="btn-secondary-sidebar" style="justify-content: flex-start; text-align: left; border-color: var(--mint-primary); color: var(--mint-primary);" onclick="openRefundInfo()">Request a refund</button>
      <button class="btn-secondary-sidebar" style="justify-content: flex-start; text-align: left;" onclick="showToast('Connecting to billing.')">Wrong payment amount</button>
      <button class="btn-secondary-sidebar" style="justify-content: flex-start; text-align: left;" onclick="showToast('Checking payment verification...')">Payment verification</button>
    `;
  } else {
    optionsHtml = `
      <div style="font-size: 13px; color: var(--text-muted); text-align: center; padding: 20px;">
        Support options for ${titleMap[category]} will appear here.
      </div>
      <button class="btn-action-primary" style="width:100%; justify-content:center;" onclick="showToast('Creating general ticket...')">Submit General Ticket</button>
    `;
  }

  document.getElementById("support-category-options").innerHTML = optionsHtml;
  document.getElementById("support-step-category").style.display = "block";
  document.getElementById("support-step-refund-info").style.display = "none";
  document.getElementById("support-step-refund-form").style.display = "none";
}

function openRefundInfo() {
  document.getElementById("support-step-category").style.display = "none";
  document.getElementById("support-step-refund-info").style.display = "block";
}

function backToSupportCategory(category) {
  document.getElementById("support-step-refund-info").style.display = "none";
  openSupportCategory(category);
}

function openSupportRefundForm() {
  document.getElementById("support-step-refund-info").style.display = "none";

  // Populate jobs dropdown
  const select = document.getElementById("refund-job-select");
  if (select) {
    select.innerHTML =
      '<option value="">Select Job</option>' +
      state.appliedJobs
        .map(
          (job) =>
            `<option value="${job.jobId}">${job.title} at ${job.company}</option>`,
        )
        .join("");
  }

  document.getElementById("support-step-refund-form").style.display = "block";
}

function backToRefundInfo() {
  document.getElementById("support-step-refund-form").style.display = "none";
  document.getElementById("support-step-refund-info").style.display = "block";
}

async function handleRefundSubmit(e) {
  e.preventDefault();

  const jobId = document.getElementById("refund-job-select").value;
  const paymentId = document.getElementById("refund-payment-id").value;
  const reason = document.getElementById("refund-reason").value;
  const amount = document.getElementById("refund-amount").value;
  const desc = document.getElementById("refund-desc").value;

  const job = state.appliedJobs.find((j) => j.jobId === jobId);

  // Simulated backend save
  const ticket = {
    ticketId: "OSP-REF-" + Math.floor(10000 + Math.random() * 90000),
    type: "Refund Request",
    jobTitle: job ? job.title : "General",
    amount: "₹" + amount,
    status: "Pending Review",
    createdAt: new Date().toISOString(),
  };

  TICKET_HISTORY.push(ticket);

  document.getElementById("support-step-refund-form").style.display = "none";
  e.target.reset();

  document.getElementById("support-center-content").innerHTML = `
    <div style="text-align: center; padding: 40px 20px;">
      <h3 style="font-size: 20px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">Refund request submitted successfully.</h3>
      <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 24px;">Our support team will review your request.</p>
      
      <div style="background: var(--bg-card); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: inline-block; margin-bottom: 24px;">
        <span style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Refund Ticket</span>
        <div style="font-size: 16px; font-weight: 800; color: var(--mint-primary); margin-bottom: 8px;">#${ticket.ticketId}</div>
        <span style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Status</span>
        <div style="font-size: 14px; font-weight: 700; color: var(--accent-gold);">Pending Review</div>
      </div>
      
      <button class="btn-details" style="width: 100%; justify-content: center; padding: 12px;" onclick="closeAllModals()">Close</button>
    </div>
  `;

  showToast("Refund request submitted successfully.");
}

function renderSupportTickets() {
  const container = document.getElementById("support-ticket-list");
  if (!container) return;

  if (TICKET_HISTORY.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 13px; padding: 10px;">No support requests yet.</div>`;
    return;
  }

  container.innerHTML = TICKET_HISTORY.map(
    (ticket) => `
    <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">#${ticket.ticketId}</div>
        <div style="font-size: 12px; color: var(--text-secondary);">${ticket.type}</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 12px; font-weight: 700; color: var(--accent-gold);">${ticket.status}</div>
      </div>
    </div>
  `,
  ).join("");
}

/* ==========================================================================
   PAYMENT LOGIC
   ========================================================================== */
let pendingPaymentJobId = null;

function openPaymentModal(jobId) {
  if (!state.isAuthenticated) {
    showToast("Please login before applying.");
    openLoginModal();
    return;
  }
  closeAllModals();
  pendingPaymentJobId = jobId;
  const job = [...state.shifts, ...state.dealerPosts].find(
    (s) => s.id === jobId,
  );
  if (job) {
    document.getElementById("payment-amount-display").innerText = job.pay;
    document.getElementById("payment-modal").classList.add("open");
  }
}

function togglePaymentFields() {
  const method = document.getElementById("payment-method-select").value;
  document.getElementById("payment-upi-fields").style.display =
    method === "upi" ? "block" : "none";
  document.getElementById("payment-card-fields").style.display =
    method === "card" ? "block" : "none";
}

function processPayment() {
  const btn = document.querySelector("#payment-modal .btn-action-primary");
  const originalText = btn.innerText;
  btn.innerText = "Processing...";
  btn.disabled = true;

  // Simulate payment processing
  setTimeout(() => {
    btn.innerText = originalText;
    btn.disabled = false;
    showToast("Payment Successful! Application Submitted.");

    // Proceed to application submission
    if (pendingPaymentJobId) {
      confirmApply(pendingPaymentJobId);
      pendingPaymentJobId = null;
    }
  }, 1500);
}

/* ==========================================================================
   CAMERA & FACE DETECTION MOCK
   ========================================================================== */
let cameraStream = null;
let detectionInterval = null;
let isFaceDetected = false;

function openCameraModal() {
  closeAllModals();
  document.getElementById("camera-modal").classList.add("open");

  const video = document.getElementById("camera-video");
  const status = document.getElementById("camera-status-text");
  const btnCapture = document.getElementById("btn-capture-photo");
  const preview = document.getElementById("camera-preview-img");

  video.style.display = "block";
  preview.style.display = "none";
  document.getElementById("camera-action-buttons").style.display = "flex";
  document.getElementById("camera-confirm-buttons").style.display = "none";
  document.getElementById("face-guide-overlay").style.display = "block";

  // Ask for camera permission
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        cameraStream = stream;
        video.srcObject = stream;
        status.innerText = "Position your face inside the guide";
        btnCapture.disabled = true;

        // Mock Face Detection loop
        let scanCount = 0;
        detectionInterval = setInterval(() => {
          scanCount++;
          const states = [
            "Move slightly left",
            "Move slightly right",
            "Center your face",
            "Face detected ✓",
            "Face detected ✓",
            "Ready to capture",
          ];

          // Emulate realistic finding sequence
          if (scanCount < 2) {
            status.innerText = states[0];
            document.getElementById("face-guide-overlay").style.borderColor =
              "rgba(255,255,255,0.4)";
          } else if (scanCount < 4) {
            status.innerText = states[2];
          } else {
            status.innerText = "Ready to capture";
            status.style.color = "var(--mint-primary)";
            document.getElementById("face-guide-overlay").style.borderColor =
              "var(--mint-primary)";
            btnCapture.disabled = false;
            isFaceDetected = true;
            clearInterval(detectionInterval);
          }
        }, 800);
      })
      .catch((err) => {
        console.error(err);
        status.innerText = "Camera permission denied or unavailable.";
        btnCapture.disabled = true;
      });
  } else {
    status.innerText = "Camera not supported on this browser.";
  }
}

function capturePhoto() {
  if (!isFaceDetected) {
    showToast("No face detected yet.");
    return;
  }

  const video = document.getElementById("camera-video");
  const canvas = document.getElementById("camera-canvas");
  const preview = document.getElementById("camera-preview-img");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);

  const imgUrl = canvas.toDataURL("image/jpeg");
  preview.src = imgUrl;

  video.style.display = "none";
  preview.style.display = "block";
  document.getElementById("face-guide-overlay").style.display = "none";

  document.getElementById("camera-action-buttons").style.display = "none";
  document.getElementById("camera-confirm-buttons").style.display = "flex";
  document.getElementById("camera-status-text").innerText =
    "Captured successfully";
  document.getElementById("camera-status-text").style.color =
    "var(--text-primary)";

  // Stop stream
  if (cameraStream) {
    cameraStream.getTracks().forEach((t) => t.stop());
    cameraStream = null;
  }
}

function retakePhoto() {
  clearInterval(detectionInterval);
  isFaceDetected = false;
  openCameraModal(); // Re-opens and restarts flow
}

function useCapturedPhoto() {
  const preview = document.getElementById("camera-preview-img");
  state.userProfile.photo = preview.src;
  saveState();
  syncProfileData();
  closeCameraModal();
  showToast("Profile photo updated!");
}

function closeCameraModal() {
  clearInterval(detectionInterval);
  if (cameraStream) {
    cameraStream.getTracks().forEach((t) => t.stop());
    cameraStream = null;
  }
  document.getElementById("camera-modal").classList.remove("open");
}

/* ==========================================================================
   LOGIN / LOGOUT LOGIC
   ========================================================================== */
function openLoginModal() {
  document.getElementById("login-modal").classList.add("open");
}

function handleLoginSubmit(e) {
  e.preventDefault();
  state.isAuthenticated = true;
  saveState();
  syncProfileData();
  closeAllModals();
  showToast("Logged in successfully!");
}

function handleLogoutClick() {
  if (confirm("Are you sure you want to logout?")) {
    state.isAuthenticated = false;
    saveState();
    syncProfileData();
    showToast("Logged out successfully.");
  }
}

/* ==========================================================================
   LOCATION TRACKER LOGIC
   ========================================================================== */
function openLocationTracker(workerName) {
  // Ask for permission before tracking
  if (navigator.geolocation) {
    const permit = confirm(
      "Allow OnSpot to access worker location for live tracking?",
    );
    if (permit) {
      document.getElementById("tracker-worker-name").innerText = workerName;
      document.getElementById("location-tracker-modal").classList.add("open");
    } else {
      showToast("Location access required for live tracking.");
    }
  } else {
    showToast("Geolocation not supported by this browser.");
  }
}

function closeLocationTracker() {
  document.getElementById("location-tracker-modal").classList.remove("open");
}

function stopLocationSharing() {
  closeLocationTracker();
  showToast("Location sharing stopped for this shift.");
}

function turnLocationOff() {
  draftFilters.location = null;
  draftFilters.distanceKm = null;
  document
    .querySelectorAll("#filter-locality-row .filter-option-btn")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelectorAll("#filter-distance-group .filter-option-btn")
    .forEach((b) => b.classList.remove("active"));
  updateLocationActiveLabel();
  resetNearMeButton();
  showToast("Location OFF. Finding jobs everywhere.");
}

function isJobExpired(job) {
  try {
    const endParts = job.time.split("–");
    const endTimeStr =
      endParts.length > 1 ? endParts[1].trim() : endParts[0].trim();
    const cleanDate = job.date
      .replace(/Today, |Tomorrow, |Night Shift |\(Tonight\)/gi, "")
      .trim();
    
    // Custom robust parser for "DD MMM YYYY h:mm A" (e.g. "05 Oct 2026 6:00 PM")
    const dateRegex = /^(\d+)\s+([A-Za-z]+)\s+(\d{4})$/;
    const timeRegex = /^(\d+):(\d+)\s+(AM|PM)$/i;
    
    const dateMatch = cleanDate.match(dateRegex);
    const timeMatch = endTimeStr.match(timeRegex);
    
    if (!dateMatch || !timeMatch) {
      // Fallback if format is unexpected
      const fallback = new Date(`${cleanDate} ${endTimeStr}`);
      return !isNaN(fallback.getTime()) && new Date() > fallback;
    }
    
    const day = parseInt(dateMatch[1], 10);
    const monthStr = dateMatch[2].toLowerCase();
    const year = parseInt(dateMatch[3], 10);
    
    const months = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };
    const month = months[monthStr.substring(0, 3)];
    if (month === undefined) return false;
    
    let hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    const period = timeMatch[3].toUpperCase();
    
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    
    const jobEndTime = new Date(year, month, day, hours, minutes);
    return new Date() > jobEndTime;
  } catch (e) {
    return false;
  }
}

function renderSavedJobs() {
  const listEl = document.getElementById("saved-jobs-list");
  if (!listEl) return;
  const allShifts = [...state.shifts, ...state.dealerPosts];
  const saved = allShifts.filter((s) => state.bookmarkedJobIds.has(s.id));

  if (saved.length === 0) {
    listEl.innerHTML = `<div class="empty-applications">No saved jobs. Click the bookmark icon to save shifts.</div>`;
    return;
  }

  listEl.innerHTML = saved
    .map((job) => {
      const isExpired = typeof isJobExpired === "function" && isJobExpired(job);
      return `
      <div class="application-item">
        <div class="application-item-top">
          <div>
            <div class="application-title">${job.title}</div>
            <div class="application-company">📍 ${job.loc}</div>
          </div>
          <span class="application-status-pill status-under-review">🔖 Saved</span>
        </div>
        <div class="application-meta" style="margin-top: 6px;">
          <span>💰 ${job.pay}</span>
          <span>📅 ${job.date}</span>
        </div>
        ${isExpired ? `<div style="color:var(--danger); font-size:11px; font-weight:bold; margin-top:6px;">🔴 Expired</div>` : ""}
        <div style="display:flex; gap:6px; margin-top:8px;">
          <button class="btn-details" style="flex:1;" onclick="openShiftDetails('${job.id}')">View</button>
          ${!isExpired && !state.appliedJobIds.has(job.id) ? `<button class="btn-action-primary" style="flex:1; padding:6px;" onclick="handleApplyClick('${job.id}')">Apply</button>` : ""}
          ${!isExpired && state.appliedJobIds.has(job.id) ? `<button class="btn-action-primary applied" style="flex:1; padding:6px;" disabled>Applied</button>` : ""}
          <button class="btn-cancel" style="flex:1; border:1px solid var(--border-subtle);" onclick="toggleBookmark('${job.id}', document.getElementById('card-${job.id}')?.querySelector('.btn-bookmark')); renderSavedJobs();">Unsave</button>
        </div>
      </div>
    `;
    })
    .join("");
}

/* ==========================================================================
   SETTINGS AND THEME LOGIC
   ========================================================================== */
function openSettingsDrawer() {
  document.getElementById("settings-drawer").classList.add("open");
  loadSettings();
}

function closeSettingsDrawer() {
  document.getElementById("settings-drawer").classList.remove("open");
}

function setTheme(theme) {
  if (theme === "system") {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  } else if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }

  localStorage.setItem("onspot-theme", theme);

  // Update checkmarks
  document.getElementById("check-dark").style.display =
    theme === "dark" ? "block" : "none";
  document.getElementById("check-light").style.display =
    theme === "light" ? "block" : "none";
  document.getElementById("check-system").style.display =
    theme === "system" ? "block" : "none";
}

function loadSettings() {
  const theme = localStorage.getItem("onspot-theme") || "dark";
  setTheme(theme);

  const lang = localStorage.getItem("onspot-lang") || "en";
  setLanguage(lang);

  const prefs = [
    "pref-instant",
    "pref-meals",
    "notif-job",
    "notif-msg",
    "notif-pay",
    "notif-shift",
    "notif-urgent",
    "priv-loc",
    "priv-online",
    "acc-contrast",
    "acc-anim",
  ];
  prefs.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      const val = localStorage.getItem("onspot-" + id);
      if (val !== null) {
        el.checked = val === "true";
      }
    }
  });
}

function saveTogglePref(id) {
  const el = document.getElementById(id);
  if (el) {
    localStorage.setItem("onspot-" + id, el.checked);
  }
}

function setLanguage(lang) {
  localStorage.setItem("onspot-lang", lang);
  document.getElementById("check-lang-en").style.display =
    lang === "en" ? "block" : "none";
  document.getElementById("check-lang-ta").style.display =
    lang === "ta" ? "block" : "none";
  document.getElementById("check-lang-hi").style.display =
    lang === "hi" ? "block" : "none";
}

function filterSettings() {
  const query = document
    .getElementById("settings-search-input")
    .value.toLowerCase();
  const groups = document.querySelectorAll(".settings-group");
  groups.forEach((group) => {
    const keywords = group.getAttribute("data-keywords") || "";
    if (keywords.includes(query)) {
      group.style.display = "flex";
    } else {
      group.style.display = "none";
    }
  });
}

function openLegalModal(title) {
  document.getElementById("legal-modal-title").innerText = title;
  document.getElementById("legal-modal").classList.add("open");
}

function closeLegalModal() {
  document.getElementById("legal-modal").classList.remove("open");
}

function openDeleteAccountModal() {
  document.getElementById("delete-account-modal").classList.add("open");
}

function closeDeleteAccountModal() {
  document.getElementById("delete-account-modal").classList.remove("open");
}

// Initial Load of Theme
(function () {
  const theme = localStorage.getItem("onspot-theme") || "dark";
  setTheme(theme);
})();

/* ==========================================================================
   DATE & TIME PICKERS LOGIC
   ========================================================================== */

let currentDate = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function openDatePickerModal() {
  document.getElementById("date-picker-modal").classList.add("open");
  renderCalendar();
}

function closeDatePickerModal() {
  document.getElementById("date-picker-modal").classList.remove("open");
}

function renderCalendar() {
  const monthYearStr = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  document.getElementById("date-picker-month-year").innerText = monthYearStr;

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const grid = document.getElementById("date-picker-grid");
  grid.innerHTML = "";

  const today = new Date();

  for (let i = 0; i < firstDay; i++) {
    grid.innerHTML += `<div class="dp-day disabled"></div>`;
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const iterDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      i,
    );
    let classNames = "dp-day";

    // Disable past dates
    iterDate.setHours(23, 59, 59, 999);
    if (iterDate < today) {
      classNames += " disabled";
      grid.innerHTML += `<div class="${classNames}">${i}</div>`;
      continue;
    }

    iterDate.setHours(0, 0, 0, 0);
    const todayZero = new Date(today);
    todayZero.setHours(0, 0, 0, 0);

    if (iterDate.getTime() === todayZero.getTime()) {
      classNames += " today";
    }

    grid.innerHTML += `<div class="${classNames}" onclick="selectDate(${i})">${i}</div>`;
  }
}

function changeMonth(dir) {
  currentDate.setMonth(currentDate.getMonth() + dir);
  renderCalendar();
}

function selectDate(day) {
  const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  const formatted = `${day} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  document.getElementById("display-post-date").innerText = "📅 " + formatted;
  document.getElementById("display-post-date").style.fontWeight = "700";
  document.getElementById("post-date").value = formatted;
  closeDatePickerModal();
}

function selectQuickDate(type) {
  const d = new Date();
  if (type === "tomorrow") d.setDate(d.getDate() + 1);
  const formatted = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  document.getElementById("display-post-date").innerText =
    "📅 " +
    (type === "today" ? `Today, ${formatted}` : `Tomorrow, ${formatted}`);
  document.getElementById("display-post-date").style.fontWeight = "700";
  document.getElementById("post-date").value =
    type === "today" ? `Today, ${formatted}` : `Tomorrow, ${formatted}`;
  closeDatePickerModal();
}

/* Time Picker Logic */
let activeTimeBox = "start";
function initTimeWheels() {
  const hours = document.getElementById("tp-hour");
  const rthours = document.getElementById("rtp-hour");
  if (hours && hours.options.length === 0) {
    for (let i = 1; i <= 12; i++) {
      const val = i < 10 ? "0" + i : "" + i;
      hours.add(new Option(val, val));
      rthours.add(new Option(val, val));
    }
    hours.selectedIndex = 4; // default 05
    document.getElementById("tp-minute").selectedIndex = 2; // default 30
    document.getElementById("tp-ampm").selectedIndex = 1; // PM

    rthours.selectedIndex = 4;
    document.getElementById("rtp-minute").selectedIndex = 0;
    document.getElementById("rtp-ampm").selectedIndex = 1;
  }
}

function openTimePickerModal() {
  initTimeWheels();
  document.getElementById("time-picker-modal").classList.add("open");
}
function closeTimePickerModal() {
  document.getElementById("time-picker-modal").classList.remove("open");
}

function activateTimeBox(box) {
  activeTimeBox = box;
  document
    .getElementById("tp-start-box")
    .classList.toggle("active", box === "start");
  document
    .getElementById("tp-end-box")
    .classList.toggle("active", box === "end");
}

function updateTimeFromWheels() {
  const h = document.getElementById("tp-hour").value || "12";
  const m = document.getElementById("tp-minute").value || "00";
  const a = document.getElementById("tp-ampm").value || "PM";
  const val = `${h}:${m} ${a}`;

  if (activeTimeBox === "start") {
    document.getElementById("tp-start-value").innerText = val;
  } else {
    document.getElementById("tp-end-value").innerText = val;
  }
}

function setQuickTime(timeStr) {
  if (activeTimeBox === "start") {
    document.getElementById("tp-start-value").innerText = timeStr;
    activateTimeBox("end");
  } else {
    document.getElementById("tp-end-value").innerText = timeStr;
  }
}

function calculateDuration(startStr, endStr) {
  if (!startStr || !endStr || typeof startStr !== "string" || typeof endStr !== "string") return "0 hrs";
  const parseTime = (t) => {
    if (!t || !t.includes(" ")) return 0;
    let [time, modifier] = t.split(" ");
    let [hours, minutes] = time ? time.split(":") : [0, 0];
    if (hours === "12") hours = "00";
    if (modifier === "PM") hours = parseInt(hours, 10) + 12;
    return parseInt(hours, 10) * 60 + parseInt(minutes || 0, 10);
  };

  const startMins = parseTime(startStr);
  let endMins = parseTime(endStr);

  if (endMins <= startMins) endMins += 24 * 60;

  const diff = endMins - startMins;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return `${h} hrs ${m > 0 ? m + " mins" : ""}`;
}

function saveTimePicker() {
  const start = document.getElementById("tp-start-value").innerText;
  const end = document.getElementById("tp-end-value").innerText;

  const dur = calculateDuration(start, end);

  document.getElementById("display-post-time").innerText =
    `🕐 ${start} – ${end}`;
  document.getElementById("display-post-time").style.fontWeight = "700";
  document.getElementById("post-time-start").value = start;
  document.getElementById("post-time-end").value = end;

  const durDisplay = document.getElementById("duration-display");
  durDisplay.style.display = "block";
  durDisplay.innerText = `⏱️ Estimated Duration: ${dur}`;

  closeTimePickerModal();
}

/* Reporting Time Picker */
function openReportingTimePickerModal() {
  initTimeWheels();
  document.getElementById("reporting-time-modal").classList.add("open");
}
function closeReportingTimePickerModal() {
  document.getElementById("reporting-time-modal").classList.remove("open");
}

function updateReportingTimeFromWheels() {
  const h = document.getElementById("rtp-hour").value || "12";
  const m = document.getElementById("rtp-minute").value || "00";
  const a = document.getElementById("rtp-ampm").value || "PM";
  const val = `${h}:${m} ${a}`;
  document.getElementById("rtp-value").innerText = val;
}

function saveReportingTimePicker() {
  const rt = document.getElementById("rtp-value").innerText;
  document.getElementById("display-reporting-time").innerText = `🕐 ${rt}`;
  document.getElementById("display-reporting-time").style.fontWeight = "700";
  document.getElementById("post-time-reporting").value = rt;
  closeReportingTimePickerModal();
}

/* ==========================================================================
   CATEGORY & LOCATION PICKER LOGIC
   ========================================================================== */
const categories = [
  "Catering Service",
  "Event Staff",
  "Event Management",
  "Event Promotions",
  "Marketing",
  "Sales",
  "Retail",
  "Shop Assistant",
  "Cashier",
  "Delivery",
  "Food Delivery",
  "Warehouse",
  "Packing",
  "Loading & Unloading",
  "Hospitality",
  "Hotel Staff",
  "Restaurant Staff",
  "Housekeeping",
  "Security",
  "Reception",
  "Customer Support",
  "Office Assistant",
  "Data Entry",
  "Computer Operator",
  "Photography",
  "Videography",
  "Social Media",
  "Content Creation",
  "Graphic Design",
  "Teaching",
  "Tuition",
  "Babysitting",
  "Caretaking",
  "Cleaning",
  "Driver",
  "Construction",
  "Electrician",
  "Plumber",
  "Technician",
  "Stage & Logistics",
  "Setup Crew",
  "Pamphlet Distribution",
  "Ushering & VIP Support",
  "Promotional Staff",
  "Freelancer",
  "Part-Time General Work",
  "Other",
];

const locationsList = [
  "Chennai, Tamil Nadu",
  "Coimbatore, Tamil Nadu",
  "Madurai, Tamil Nadu",
  "Trichy, Tamil Nadu",
  "Salem, Tamil Nadu",
  "Tirunelveli, Tamil Nadu",
  "Erode, Tamil Nadu",
  "Vellore, Tamil Nadu",
  "Thanjavur, Tamil Nadu",
  "Tiruppur, Tamil Nadu",
  "Thoothukudi, Tamil Nadu",
  "Dindigul, Tamil Nadu",
  "Kanchipuram, Tamil Nadu",
  "Kanyakumari, Tamil Nadu",
  "Bengaluru, Karnataka",
  "Mysuru, Karnataka",
  "Mangaluru, Karnataka",
  "Hubballi, Karnataka",
  "Hyderabad, Telangana",
  "Warangal, Telangana",
  "Mumbai, Maharashtra",
  "Pune, Maharashtra",
  "Nagpur, Maharashtra",
  "Nashik, Maharashtra",
  "Delhi, NCR",
  "Gurugram, Haryana",
  "Noida, Uttar Pradesh",
  "Kolkata, West Bengal",
  "Kochi, Kerala",
  "Thiruvananthapuram, Kerala",
  "Kozhikode, Kerala",
  "Ahmedabad, Gujarat",
  "Surat, Gujarat",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
  "Chandigarh",
  "Bhubaneswar, Odisha",
  "Guwahati, Assam",
  "Indore, Madhya Pradesh",
  "Bhopal, Madhya Pradesh",
  "Patna, Bihar",
  "Ranchi, Jharkhand",
  "Raipur, Chhattisgarh",
  "Dehradun, Uttarakhand",
];

function openCategoryPickerModal() {
  document.getElementById("category-picker-modal").classList.add("open");
  document.getElementById("category-search").value = "";
  filterCategories();
}
function closeCategoryPickerModal() {
  document.getElementById("category-picker-modal").classList.remove("open");
}
function filterCategories() {
  const query = document.getElementById("category-search").value.toLowerCase();
  const list = document.getElementById("category-list");
  list.innerHTML = "";
  categories
    .filter((c) => c.toLowerCase().includes(query))
    .forEach((cat) => {
      const isOther = cat === "Other";
      list.innerHTML += `<div class="btn-secondary-sidebar" style="justify-content: flex-start; padding: 12px; border-radius: 8px; cursor: pointer; text-align: left;" onclick="selectPostCategory('${cat}')">
      ${isOther ? "✨" : "💼"} ${cat}
    </div>`;
    });
}
function selectPostCategory(cat) {
  const postCat = document.getElementById("post-category");
  if (postCat) postCat.value = cat;
  const dispCat = document.getElementById("display-post-category");
  if (dispCat) {
    dispCat.innerText = `💼 ${cat}`;
    dispCat.style.fontWeight = "700";
    dispCat.style.color = "var(--text-primary)";
  }

  if (cat === "Other") {
    const otherGroup = document.getElementById("other-category-group");
    if (otherGroup) otherGroup.style.display = "block";
  } else {
    const otherGroup = document.getElementById("other-category-group");
    if (otherGroup) otherGroup.style.display = "none";
    const postCatOther = document.getElementById("post-category-other");
    if (postCatOther) postCatOther.value = "";
  }
  closeCategoryPickerModal();
}

function openLocationPickerModal() {
  document.getElementById("location-picker-modal").classList.add("open");
  document.getElementById("location-search").value = "";
  filterLocations();
}
function closeLocationPickerModal() {
  document.getElementById("location-picker-modal").classList.remove("open");
}
function filterLocations() {
  const query = document.getElementById("location-search").value.toLowerCase();
  const list = document.getElementById("location-list");
  list.innerHTML = "";
  locationsList
    .filter((l) => l.toLowerCase().includes(query))
    .forEach((loc) => {
      list.innerHTML += `<div class="btn-secondary-sidebar" style="justify-content: flex-start; padding: 12px; border-radius: 8px; cursor: pointer; text-align: left;" onclick="selectLocation('${loc}')">
      📍 ${loc}
    </div>`;
    });
}
function selectLocation(loc) {
  document.getElementById("post-location").value = loc;
  document.getElementById("display-post-location").innerText = `📍 ${loc}`;
  document.getElementById("display-post-location").style.fontWeight = "700";
  document.getElementById("display-post-location").style.color =
    "var(--text-primary)";
  closeLocationPickerModal();
}

/* ==========================================================================
   NOTIFICATION SYSTEM LOGIC
   ========================================================================== */

let notificationPrefs;
try {
  notificationPrefs = JSON.parse(localStorage.getItem("onspot-notification-prefs"));
} catch (e) {
  notificationPrefs = null;
}
notificationPrefs = notificationPrefs || {
  allNotifications: false,
  inApp: true,
  sms: false,
  push: false,
  selectedCategories: ["Catering Service", "Pamphlet Distribution"],
};

let inAppNotifications;
try {
  inAppNotifications = JSON.parse(localStorage.getItem("onspot-notifications")) || [];
} catch (e) {
  inAppNotifications = [];
}

function toggleNotificationPanel() {
  const panel = document.getElementById("notification-panel");
  if (panel.style.display === "flex") {
    panel.style.display = "none";
    panel.classList.remove("open");
  } else {
    panel.style.display = "flex";
    // tiny delay for animation
    setTimeout(() => panel.classList.add("open"), 10);
    renderNotifications();
  }
}

// Close panel when clicking outside
document.addEventListener("click", (e) => {
  const panel = document.getElementById("notification-panel");
  const btn = document.getElementById("btn-notification");
  if (panel && panel.classList.contains("open")) {
    if (!panel.contains(e.target) && !btn.contains(e.target)) {
      panel.classList.remove("open");
      setTimeout(() => (panel.style.display = "none"), 200);
    }
  }
});

function openNotificationPreferences() {
  document.getElementById("notification-prefs-modal").classList.add("open");

  document.getElementById("pref-notif-inapp").checked = notificationPrefs.inApp;
  document.getElementById("pref-notif-sms").checked = notificationPrefs.sms;
  document.getElementById("pref-notif-push").checked = notificationPrefs.push;

  const allCheckbox = document.getElementById("pref-notif-all");
  allCheckbox.checked = notificationPrefs.allNotifications;

  const listContainer = document.getElementById("notif-category-prefs-list");
  // keep the first child (All Notifications)
  const allNotifLabel = listContainer.firstElementChild;
  listContainer.innerHTML = "";
  listContainer.appendChild(allNotifLabel);

  categories.forEach((cat) => {
    const isChecked = notificationPrefs.selectedCategories.includes(cat);
    const disabledStr = notificationPrefs.allNotifications ? "disabled" : "";
    listContainer.innerHTML += `
      <label class="benefit-chip">
        <input type="checkbox" class="cat-pref-checkbox" value="${cat}" ${isChecked ? "checked" : ""} ${disabledStr}> ${cat}
      </label>
    `;
  });
}

function closeNotificationPreferences() {
  document.getElementById("notification-prefs-modal").classList.remove("open");
}

function toggleAllNotifCategories() {
  const isAll = document.getElementById("pref-notif-all").checked;
  const checkboxes = document.querySelectorAll(".cat-pref-checkbox");
  checkboxes.forEach((cb) => {
    cb.disabled = isAll;
  });
}

function saveNotificationPreferences() {
  notificationPrefs.inApp = document.getElementById("pref-notif-inapp").checked;
  notificationPrefs.sms = document.getElementById("pref-notif-sms").checked;
  notificationPrefs.push = document.getElementById("pref-notif-push").checked;
  notificationPrefs.allNotifications =
    document.getElementById("pref-notif-all").checked;

  const selected = [];
  const checkboxes = document.querySelectorAll(".cat-pref-checkbox");
  checkboxes.forEach((cb) => {
    if (cb.checked) selected.push(cb.value);
  });
  notificationPrefs.selectedCategories = selected;

  localStorage.setItem(
    "onspot-notification-prefs",
    JSON.stringify(notificationPrefs),
  );
  closeNotificationPreferences();
  showToast("Notification preferences saved!");
}

function createJobNotification(job) {
  // Check if current user wants this notification
  const wantsAll = notificationPrefs.allNotifications;
  const wantsCategory = notificationPrefs.selectedCategories.includes(
    job.category,
  );

  if (!wantsAll && !wantsCategory) return; // Do not send

  // Backend placeholder: if this was a backend, we would queue SMS here
  // sendCategoryNotification(job.category, job);

  if (!notificationPrefs.inApp) return;

  const getEmoji = (cat) => {
    if (
      cat.includes("Catering") ||
      cat.includes("Food") ||
      cat.includes("Restaurant")
    )
      return "🍽️";
    if (
      cat.includes("Pamphlet") ||
      cat.includes("Promot") ||
      cat.includes("Marketing")
    )
      return "📢";
    if (cat.includes("Delivery")) return "🚚";
    if (cat.includes("Clean") || cat.includes("House")) return "🧹";
    if (cat.includes("Data") || cat.includes("Computer")) return "💻";
    if (cat.includes("Photo") || cat.includes("Video")) return "📸";
    if (cat.includes("Event")) return "🎪";
    return "💼";
  };

  const emoji = getEmoji(job.category);

  const notif = {
    id: `notif-${Date.now()}`,
    jobId: job.id,
    title: `New ${job.category} Job`,
    message: `${job.slotsTotal} workers needed in ${job.loc.split(",")[0]}`,
    meta: `💰 ${job.pay} • 📅 ${job.date}`,
    icon: emoji,
    time: Date.now(),
    read: false,
  };

  inAppNotifications.unshift(notif);
  localStorage.setItem(
    "onspot-notifications",
    JSON.stringify(inAppNotifications),
  );

  updateNotificationBadge();
  const panel = document.getElementById("notification-panel");
  if (panel && panel.classList.contains("open")) {
    renderNotifications();
  }
}

function updateNotificationBadge() {
  const unreadCount = inAppNotifications.filter((n) => !n.read).length;
  const badge = document.getElementById("notification-badge");
  if (badge) {
    if (unreadCount > 0) {
      badge.style.display = "block";
    } else {
      badge.style.display = "none";
    }
  }
}

function renderNotifications() {
  const list = document.getElementById("notification-list");
  const emptyState = document.getElementById("empty-notifications");
  const actions = document.getElementById("notification-actions");
  if (!list) return;

  // Remove all existing notification items
  const items = list.querySelectorAll(".notification-item");
  items.forEach((i) => i.remove());

  if (inAppNotifications.length === 0) {
    emptyState.style.display = "block";
    actions.style.display = "none";
  } else {
    emptyState.style.display = "none";
    actions.style.display = "flex";

    inAppNotifications.forEach((n) => {
      const timeStr = timeAgo(n.time);
      const div = document.createElement("div");
      div.className = `notification-item ${n.read ? "" : "unread"}`;
      div.onclick = () => {
        markNotificationAsRead(n.id);
        openJobDetails(n.jobId);
        toggleNotificationPanel();
      };

      div.innerHTML = `
        <div class="notif-icon">${n.icon}</div>
        <div class="notif-content">
          <div class="notif-title">${n.title}</div>
          <div class="notif-desc">${n.message}</div>
          <div class="notif-meta">
            <span>${n.meta}</span>
            <span>•</span>
            <span>${timeStr}</span>
          </div>
          <div class="notif-action">View Job</div>
        </div>
      `;
      list.appendChild(div);
    });
  }
}

function markNotificationAsRead(id) {
  const notif = inAppNotifications.find((n) => n.id === id);
  if (notif) {
    notif.read = true;
    localStorage.setItem(
      "onspot-notifications",
      JSON.stringify(inAppNotifications),
    );
    updateNotificationBadge();
    const panel = document.getElementById("notification-panel");
    if (panel && panel.classList.contains("open")) {
      renderNotifications();
    }
  }
}

function markAllNotificationsAsRead() {
  inAppNotifications.forEach((n) => (n.read = true));
  localStorage.setItem(
    "onspot-notifications",
    JSON.stringify(inAppNotifications),
  );
  updateNotificationBadge();
  renderNotifications();
}

function timeAgo(ms) {
  const diff = Math.floor((Date.now() - ms) / 60000);
  if (diff < 1) return "Just now";
  if (diff < 60) return `${diff} min ago`;
  const hrs = Math.floor(diff / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.floor(hrs / 24)} days ago`;
}

// Initial badge check
setTimeout(() => {
  updateNotificationBadge();
  updateSavedJobsCount(); // Load saved jobs badge initially
}, 500);

/* ==========================================================================
   NEW NAVIGATION SECTIONS (OTHER & SAVED JOBS)
   ========================================================================== */

function openSection(sectionId) {
  const homeSec = document.getElementById("home-section");
  const otherSec = document.getElementById("other-section");
  const savedSec = document.getElementById("saved-section");

  if (homeSec) homeSec.style.display = "none";
  if (otherSec) otherSec.style.display = "none";
  if (savedSec) savedSec.style.display = "none";

  document
    .querySelectorAll(".desktop-nav .nav-item")
    .forEach((el) => el.classList.remove("active"));

  if (sectionId === "home") {
    if (homeSec) homeSec.style.display = "block";
    const nav = document.getElementById("nav-home");
    if (nav) nav.classList.add("active");

    if (typeof renderListings === "function") renderListings();
  } else if (sectionId === "other") {
    if (otherSec) otherSec.style.display = "block";
    const nav = document.getElementById("nav-other");
    if (nav) nav.classList.add("active");

    document.getElementById("all-works-search").value = "";
    renderAllWorks();
  } else if (sectionId === "saved") {
    if (savedSec) savedSec.style.display = "block";
    const nav = document.getElementById("nav-saved");
    if (nav) nav.classList.add("active");

    renderSavedJobsSection();
  }
}

function updateSavedJobsCount() {
  const badge = document.getElementById("saved-jobs-count-badge");
  if (!badge) return;
  const count = state.bookmarkedJobIds.size;
  if (count > 0) {
    badge.innerText = count;
    badge.style.display = "inline-block";
  } else {
    badge.style.display = "none";
  }
}

function renderSavedJobsSection() {
  const box = document.getElementById("saved-jobs-grid");
  const empty = document.getElementById("saved-jobs-empty");
  if (!box || !empty) return;

  const allShifts = [...state.shifts, ...state.dealerPosts];
  const saved = allShifts.filter((s) => state.bookmarkedJobIds.has(s.id));

  if (saved.length === 0) {
    box.style.display = "none";
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    box.style.display = "grid"; // .shifts-grid uses grid
    box.innerHTML = saved
      .map((item) => {
        const isApplied = state.appliedJobIds.has(item.id);
        const isBookmarked = state.bookmarkedJobIds.has(item.id);
        const isExpired =
          typeof isJobExpired === "function" && isJobExpired(item);
        const slotsRemaining = item.slotsTotal - item.slotsFilled;
        const progressPercent = Math.round(
          (item.slotsFilled / item.slotsTotal) * 100,
        );
        const media =
          typeof getCategoryMedia === "function"
            ? getCategoryMedia(item.category)
            : { src: "", fallback: "" };
        const itemImg = item.image || media.src;
        const itemFallback = media.fallback;

        const perksHtml = (item.perks || [])
          .slice(0, 2)
          .map(
            (p) => `
        <span class="perk-pill">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          ${p}
        </span>
      `,
          )
          .join("");

        return `
        <div class="shift-card" id="card-${item.id}">
          <div class="card-image-wrap">
            <img src="${itemImg}" alt="${media.alt || item.title}" class="card-img" loading="lazy" onerror="this.onerror=null; this.src='${itemFallback}';">
            <div class="card-image-overlay"></div>
            <div class="card-image-top-bar">
              <span class="category-tag on-image"><span class="category-tag-dot"></span>${item.categoryDisplay || item.category}</span>
              <div class="card-actions-top on-image">
                ${item.genderReq === "boys" ? '<span class="gender-badge on-image boys-only">♂ Boys Only</span>' : ""}
                ${item.genderReq === "girls" ? '<span class="gender-badge on-image girls-only">♀ Girls Only</span>' : ""}
                ${item.urgent ? '<span class="urgent-badge on-image">🔥 Urgent</span>' : ""}
                <button class="btn-bookmark on-image ${isBookmarked ? "bookmarked" : ""}" onclick="toggleBookmark('${item.id}', this)" title="Save for later" aria-label="Bookmark shift">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                </button>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="card-title" onclick="openShiftDetails('${item.id}')" title="${item.fullTitle || item.title}">${item.title}</div>
            <div class="perks-row">${perksHtml}</div>
            <div class="card-info-list">
              <div class="info-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><span title="${item.loc}"><strong>${item.loc}</strong>${item.distanceKm != null ? " • " + item.distanceKm.toFixed(1) + " km away" : ""}</span></div>
              <div class="info-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg><span>${item.date}</span></div>
              <div class="info-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>${item.time}</span></div>
            </div>
            <div class="slots-bar-wrapper">
              <div class="slots-bar-header"><span>Slots Availability</span><span style="color:var(--mint-primary);">${slotsRemaining} spots left (${item.slotsFilled}/${item.slotsTotal})</span></div>
              <div class="slots-progress-track"><div class="slots-progress-fill" style="width: ${progressPercent}%;"></div></div>
            </div>
            <div class="card-footer">
              <div class="pay-container"><div class="pay-amount">${item.pay}</div><div class="pay-type">${item.payType || "Guaranteed Pay"}</div></div>
              <div class="card-btn-group">
                <button class="btn-details" onclick="openShiftDetails('${item.id}')">Details</button>
                ${
                  state.userRole === "seeker"
                    ? '<button class="btn-action-primary ' +
                      (isApplied || isExpired ? "applied" : "") +
                      '" onclick="' +
                      (isExpired
                        ? "showToast(&quot;This shift has expired.&quot;)"
                        : "handleApplyClick(&quot;" + item.id + "&quot;)") +
                      '" id="apply-btn-' +
                      item.id +
                      '" ' +
                      (isExpired
                        ? 'style="background: var(--bg-card); color: var(--danger); border: 1px solid var(--danger); pointer-events: auto;"'
                        : "") +
                      ">" +
                      (isExpired
                        ? "Expired"
                        : isApplied
                          ? "✓ Already Applied"
                          : "Quick Apply") +
                      "</button>"
                    : '<button class="btn-action-primary" onclick="openManageApplicantsModal(&quot;' +
                      item.id +
                      '&quot;)">Manage (' +
                      (item.applicants ? item.applicants.length : 0) +
                      ")</button>"
                }
              </div>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }
}

const ALL_CATEGORIES = [
  { id: "Catering", icon: "🍽️", name: "Catering Service" },
  { id: "Event Staff", icon: "🎪", name: "Event Staff" },
  { id: "Event Support", icon: "🎤", name: "Event Support" },
  { id: "Event Ticketing", icon: "🎟️", name: "Event Ticketing" },
  { id: "Event Management", icon: "🎉", name: "Event Management" },
  { id: "Setup", icon: "🪑", name: "Event Setup" },
  { id: "Marketing", icon: "📢", name: "Marketing" },
  { id: "Promotion Staff", icon: "📣", name: "Promotion Staff" },
  { id: "Pamphlet", icon: "📄", name: "Pamphlet Distribution" },
  { id: "Retail", icon: "🛍️", name: "Retail Assistant" },
  { id: "Shop Assistant", icon: "🏪", name: "Shop Assistant" },
  { id: "Sales", icon: "💰", name: "Sales" },
  { id: "Packing", icon: "📦", name: "Packing" },
  { id: "Warehouse Worker", icon: "🏭", name: "Warehouse Worker" },
  { id: "Delivery", icon: "🚚", name: "Delivery" },
  { id: "Food Delivery", icon: "🍔", name: "Food Delivery" },
  { id: "Delivery Partner", icon: "🛵", name: "Delivery Partner" },
  { id: "Hotel Staff", icon: "🏨", name: "Hotel Staff" },
  { id: "Restaurant Staff", icon: "🍴", name: "Restaurant Staff" },
  { id: "Housekeeping", icon: "🧹", name: "Housekeeping" },
  { id: "Cleaning", icon: "🧼", name: "Cleaning" },
  { id: "Security", icon: "🛡️", name: "Security" },
  { id: "Security Assistant", icon: "👮", name: "Security Assistant" },
  { id: "Receptionist", icon: "🧑‍💼", name: "Receptionist" },
  { id: "Customer Support", icon: "📞", name: "Customer Support" },
  { id: "Data Entry", icon: "💻", name: "Data Entry" },
  { id: "Computer Operator", icon: "⌨️", name: "Computer Operator" },
  { id: "Office Assistant", icon: "📝", name: "Office Assistant" },
  { id: "Photography", icon: "📸", name: "Photography" },
  { id: "Videography", icon: "🎥", name: "Videography" },
  { id: "Graphic Design", icon: "🎨", name: "Graphic Design" },
  { id: "Social Media", icon: "📱", name: "Social Media Assistant" },
  { id: "Content Writing", icon: "✍️", name: "Content Writing" },
  { id: "Web/Tech Assistant", icon: "💻", name: "Web/Tech Assistant" },
  { id: "Teaching", icon: "👨‍🏫", name: "Teaching" },
  { id: "Tuition", icon: "📚", name: "Tuition" },
  { id: "Babysitting", icon: "👶", name: "Babysitting" },
  { id: "Caretaking", icon: "❤️", name: "Caretaking" },
  { id: "Driver", icon: "🚗", name: "Driver" },
  { id: "Cab Assistant", icon: "🚕", name: "Cab Assistant" },
  { id: "Technician", icon: "🔧", name: "Technician" },
  { id: "Electrician", icon: "⚡", name: "Electrician" },
  { id: "Plumber", icon: "🚰", name: "Plumber" },
  { id: "Construction Helper", icon: "🏗️", name: "Construction Helper" },
  { id: "Loading", icon: "🪜", name: "Loading & Unloading" },
  { id: "Logistics", icon: "📦", name: "Logistics" },
  { id: "Stage Crew", icon: "🎬", name: "Stage Crew" },
  { id: "Light Sound", icon: "💡", name: "Light & Sound Assistant" },
  { id: "DJ Assistant", icon: "🎧", name: "DJ Assistant" },
  { id: "Makeup", icon: "💄", name: "Makeup Assistant" },
  { id: "Salon", icon: "💇", name: "Salon Assistant" },
  { id: "Decoration", icon: "🌸", name: "Decoration Work" },
  { id: "Flower", icon: "💐", name: "Flower Decoration" },
  { id: "Tailoring", icon: "🧵", name: "Tailoring Assistant" },
  { id: "Kitchen", icon: "🍳", name: "Kitchen Helper" },
  { id: "Cafe", icon: "☕", name: "Cafe Staff" },
  { id: "Juice Shop", icon: "🥤", name: "Juice Shop Staff" },
  { id: "Food Stall", icon: "🍿", name: "Food Stall Staff" },
  { id: "Gym", icon: "🏋️", name: "Gym Assistant" },
  { id: "School Event", icon: "🏫", name: "School Event Staff" },
  { id: "Hospital Support", icon: "🏥", name: "Hospital Support" },
  { id: "Library", icon: "📚", name: "Library Assistant" },
  { id: "Supermarket", icon: "🛒", name: "Supermarket Staff" },
  { id: "Home Service", icon: "🏠", name: "Home Service" },
  { id: "Gardening", icon: "🌱", name: "Gardening" },
  { id: "Pet Care", icon: "🐕", name: "Pet Care" },
  { id: "Maintenance", icon: "🧑‍🔧", name: "Maintenance" },
  { id: "Freelancer", icon: "🧑‍💻", name: "Freelancer" },
  { id: "Part-Time", icon: "⏱️", name: "Part-Time General Work" },
  { id: "Other", icon: "🔹", name: "Other" },
];

function renderAllWorks(filterText = "") {
  const grid = document.getElementById("all-works-grid");
  if (!grid) return;

  const text = filterText.toLowerCase();
  const filtered = ALL_CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(text),
  );

  if (filtered.length === 0) {
    grid.innerHTML =
      '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No categories found</div>';
    return;
  }

  grid.innerHTML = filtered
    .map((c) => {
      // Get job count for this category if available
      const count = [...state.shifts, ...state.dealerPosts].filter(
        (s) => s.category === c.id || s.categoryDisplay === c.name,
      ).length;

      return `
      <div class="category-card-custom" onclick="selectWorkCategory('${c.id}')" onmouseover="this.style.borderColor='var(--mint-primary)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.borderColor='var(--border-subtle)'; this.style.transform='translateY(0)';" style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; cursor: pointer; transition: all 0.2s ease; text-align: center;">
        <div style="font-size: 32px; margin-bottom: 12px;">${c.icon}</div>
        <div style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">${c.name}</div>
        <div style="font-size: 12px; color: ${count > 0 ? "var(--mint-primary)" : "var(--text-muted)"};">${count > 0 ? count + (count === 1 ? " Job Available" : " Jobs Available") : "Unavailable"}</div>
      </div>
    `;
    })
    .join("");
}

function filterAllWorks() {
  const val = document.getElementById("all-works-search").value;
  renderAllWorks(val);
}

function selectWorkCategory(categoryId) {
  state.activeCategory = categoryId;
  openSection("home");
  // Re-render tabs so it shows selected
  if (typeof renderCategoryTabs === "function") renderCategoryTabs();
  if (typeof renderListings === "function") renderListings();
}

/* ==========================================================================
   SOCKET.IO REAL-TIME CHAT & NOTIFICATIONS
   ========================================================================== */
let socket;
let currentConversationId = null;
let currentReceiverId = null;

function initSocketIO() {
  if (typeof io === 'undefined') return;
  socket = io('http://localhost:3001');
  
  socket.on('connect', () => {
    console.log('Connected to real-time server');
    const userId = state.userProfile?.id || ('user_' + Math.random().toString(36).substr(2, 9));
    socket.emit('register', userId);
  });
  
  socket.on('new_notification', (notif) => {
    // Show standard web push notification if granted
    if (Notification.permission === 'granted') {
      new Notification(notif.content.title, {
        body: notif.content.message,
        icon: 'assets/onspot-logo-transparent.png'
      });
    }
    // Also show toast
    showToast('🔔 ' + notif.content.title + ': ' + notif.content.message);
  });
  
  socket.on('message_notification', (msg) => {
    if (msg.conversationId !== currentConversationId || !document.getElementById('chat-modal').classList.contains('open')) {
      showToast('💬 New Message received');
    }
  });

  socket.on('chat_history', (history) => {
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = '';
    history.forEach(msg => appendMessage(msg));
    scrollToBottom();
  });

  socket.on('receive_message', (msg) => {
    if (msg.conversationId === currentConversationId) {
      appendMessage(msg);
      scrollToBottom();
    }
  });
  
  socket.on('user_typing', (senderId) => {
    if (senderId === currentReceiverId) {
      const typingInd = document.getElementById('chat-typing-indicator');
      typingInd.classList.add('active');
      clearTimeout(window.typingTimeout);
      window.typingTimeout = setTimeout(() => {
        typingInd.classList.remove('active');
      }, 2000);
    }
  });
}

function openChat(jobId, dealerId, dealerName) {
  const userId = state.userProfile?.id || 'guest';
  currentConversationId = userId + '_' + dealerId + '_' + jobId;
  currentReceiverId = dealerId;
  
  document.getElementById('chat-user-name').innerText = dealerName;
  document.getElementById('chat-avatar-text').innerText = dealerName.charAt(0);
  document.getElementById('chat-user-status').innerText = 'Online';
  document.getElementById('chat-user-status').classList.add('online');
  
  document.getElementById('chat-messages').innerHTML = '';
  document.getElementById('chat-modal').classList.add('open');
  
  if (socket) {
    socket.emit('join_chat', currentConversationId);
  } else {
    // Fallback if socket fails
    appendMessage({
      senderId: currentReceiverId,
      message: 'Hello! I am the dealer for this job. How can I help you?',
      timestamp: new Date()
    });
  }
}

function closeChat() {
  document.getElementById('chat-modal').classList.remove('open');
  currentConversationId = null;
}

function handleChatKeyPress(e) {
  if (e.key === 'Enter') sendChatMessage();
}

function handleChatTyping() {
  if (socket && currentConversationId) {
    const userId = state.userProfile?.id || 'guest';
    socket.emit('typing', { conversationId: currentConversationId, senderId: userId });
  }
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;
  
  const userId = state.userProfile?.id || 'guest';
  
  if (socket) {
    socket.emit('send_message', {
      conversationId: currentConversationId,
      senderId: userId,
      receiverId: currentReceiverId,
      message: message
    });
  } else {
    // Fallback
    appendMessage({ senderId: userId, message: message, timestamp: new Date() });
  }
  
  input.value = '';
}

function appendMessage(msg) {
  const isSent = msg.senderId === (state.userProfile?.id || 'guest');
  const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  const div = document.createElement('div');
  div.className = 'chat-message ' + (isSent ? 'sent' : 'received');
  div.innerHTML = `
    ${msg.message}
    <span class="chat-message-time">${time}</span>
  `;
  document.getElementById('chat-messages').appendChild(div);
}

function scrollToBottom() {
  const container = document.getElementById('chat-messages');
  container.scrollTop = container.scrollHeight;
}

// Request notification permission
if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
  Notification.requestPermission();
}

// Initialize Socket after load
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initSocketIO, 1000);
});
