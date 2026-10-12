const fs = require('fs');
const path = require('path');
const appJsPath = path.join(__dirname, 'app.js');
let code = fs.readFileSync(appJsPath, 'utf8');

const LOCALITIES = [
  { name: "Koyambedu", lat: 13.0722, lng: 80.1912 },
  { name: "Guindy", lat: 13.0067, lng: 80.2206 },
  { name: "T. Nagar", lat: 13.0396, lng: 80.2336 },
  { name: "Velachery", lat: 12.9756, lng: 80.2207 },
  { name: "Adyar", lat: 13.0012, lng: 80.2565 },
  { name: "Anna Nagar", lat: 13.0850, lng: 80.2101 },
  { name: "Nungambakkam", lat: 13.0641, lng: 80.2405 },
  { name: "Vadapalani", lat: 13.0487, lng: 80.2117 },
  { name: "Porur", lat: 13.0333, lng: 80.1500 },
  { name: "Tambaram", lat: 12.9238, lng: 80.1141 },
  { name: "Pallavaram", lat: 12.9675, lng: 80.1491 },
  { name: "Chromepet", lat: 12.9516, lng: 80.1406 },
  { name: "Mylapore", lat: 13.0368, lng: 80.2676 },
  { name: "Perambur", lat: 13.1114, lng: 80.2427 },
  { name: "Ambattur", lat: 13.1143, lng: 80.1548 }
];

const DEALERS = [
  { name: "ABC Events", rating: 4.8 },
  { name: "Chennai Catering Services", rating: 4.9 },
  { name: "Urban Events", rating: 4.7 },
  { name: "Metro Hospitality", rating: 4.6 },
  { name: "Prime Stage Solutions", rating: 5.0 },
  { name: "City Event Works", rating: 4.8 },
  { name: "Royal Feast Banquets", rating: 4.9 },
  { name: "Nexus Brand Activations", rating: 4.7 },
  { name: "Star Logistics", rating: 4.5 },
  { name: "Apex Retail Mart", rating: 4.6 }
];

const JOB_TEMPLATES = [
  { category: "Catering", title: "Catering Assistant", gender: "any" },
  { category: "Catering", title: "Wedding Catering Staff", gender: "any" },
  { category: "Catering", title: "Waiter", gender: "boys" },
  { category: "Catering", title: "Kitchen Helper", gender: "any" },
  { category: "Catering", title: "Food Packing Staff", gender: "any" },
  { category: "Promotions", title: "Event Promoter", gender: "girls" },
  { category: "Ushering", title: "Event Coordinator", gender: "any" },
  { category: "Setup", title: "Stage Assistant", gender: "boys" },
  { category: "Setup", title: "Stage & Logistics", gender: "boys" },
  { category: "Setup", title: "Event Setup Worker", gender: "boys" },
  { category: "Setup", title: "Event Cleanup Staff", gender: "any" },
  { category: "Setup", title: "Warehouse Helper", gender: "boys" },
  { category: "Setup", title: "Delivery Assistant", gender: "boys" },
  { category: "Promotions", title: "Retail Assistant", gender: "any" },
  { category: "Promotions", title: "Sales Promoter", gender: "any" },
  { category: "Ushering", title: "Reception Assistant", gender: "girls" },
  { category: "Ushering", title: "Security Assistant", gender: "boys" },
  { category: "Setup", title: "Photography Assistant", gender: "any" },
  { category: "Setup", title: "Videography Assistant", gender: "any" },
  { category: "Setup", title: "Decoration Helper", gender: "any" },
  { category: "Catering", title: "Housekeeping Staff", gender: "any" },
  { category: "Catering", title: "Hotel Service Staff", gender: "any" },
  { category: "Setup", title: "Loading & Unloading Helper", gender: "boys" },
  { category: "Ushering", title: "Customer Support Assistant", gender: "any" },
  { category: "Promotions", title: "Exhibition Staff", gender: "girls" },
  { category: "Promotions", title: "Brand Promoter", gender: "girls" },
  { category: "Ushering", title: "College Event Staff", gender: "any" },
  { category: "Ushering", title: "Conference Assistant", gender: "any" },
  { category: "Ushering", title: "Ticketing Staff", gender: "any" },
  { category: "Ushering", title: "Registration Desk Staff", gender: "any" },
  { category: "Setup", title: "Parking Assistant", gender: "boys" },
  { category: "Setup", title: "Store Helper", gender: "any" },
  { category: "Setup", title: "Inventory Assistant", gender: "any" },
  { category: "Catering", title: "Kitchen Staff", gender: "any" },
  { category: "Catering", title: "Banquet Server", gender: "any" },
  { category: "Ushering", title: "Event Marshal", gender: "boys" },
  { category: "Setup", title: "Backstage Assistant", gender: "any" },
  { category: "Setup", title: "Sound & Light Assistant", gender: "boys" }
];

const PERKS = [
  ["Dinner Provided", "Overtime Bonus ₹120/hr", "Uniform Provided"],
  ["Branded Tee Given", "Lunch & Snacks Provided", "Certificate Available"],
  ["Morning Breakfast Provided", "Instant UPI Payout"],
  ["Buffet Lunch Included", "ID Badge & Certificate"],
  ["Late Night Drop Provided", "Hot Snacks & Tea Included"],
  ["AC Work Environment", "Snacks & Coffee Provided"],
  ["Transport Provided", "Performance Bonus"],
  ["Direct Cash Payout", "Meals Provided"]
];

let generatedShifts = [];
let idCounter = 101;
const activeDateStrs = ["02 Oct 2026", "03 Oct 2026", "04 Oct 2026", "05 Oct 2026", "06 Oct 2026"];
const endTimes = ["6:00 PM", "8:00 PM", "9:30 PM", "11:00 PM", "3:00 PM", "7:30 PM"];

// Generate 40 jobs, exactly 4 per dealer
for (let d = 0; d < DEALERS.length; d++) {
  let dealerObj = DEALERS[d];
  
  for (let j = 0; j < 4; j++) {
    const tmpl = JOB_TEMPLATES[Math.floor(Math.random() * JOB_TEMPLATES.length)];
    const loc = LOCALITIES[Math.floor(Math.random() * LOCALITIES.length)];
    const payAmt = Math.floor(Math.random() * 800) + 500;
    const duration = Math.floor(Math.random() * 5) + 3;
    const perkList = PERKS[Math.floor(Math.random() * PERKS.length)];
    const isUrgent = Math.random() > 0.7;
    const activeDate = activeDateStrs[Math.floor(Math.random() * activeDateStrs.length)];
    const endTime = endTimes[Math.floor(Math.random() * endTimes.length)];

    generatedShifts.push(`  {
    id: "JOB-0${idCounter++}",
    category: "${tmpl.category}",
    categoryDisplay: "${tmpl.category}",
    image: "assets/${tmpl.category.toLowerCase()}.jpg",
    title: "${tmpl.title}",
    fullTitle: "${tmpl.title} at ${loc.name}",
    dealerName: "${dealerObj.name}",
    dealerRating: ${dealerObj.rating},
    pay: "₹${payAmt}",
    payType: "Per Shift (${duration} hrs)",
    rawPay: ${payAmt},
    loc: "${loc.name}, Chennai",
    lat: ${loc.lat},
    lng: ${loc.lng},
    durationHours: ${duration},
    date: "${activeDate}",
    dateType: "upcoming",
    time: "2:00 PM – ${endTime}",
    slotsTotal: ${Math.floor(Math.random() * 10) + 5},
    slotsFilled: ${Math.floor(Math.random() * 4) + 1},
    urgent: ${isUrgent},
    instantPay: true,
    genderReq: "${tmpl.gender}",
    perks: ${JSON.stringify(perkList)},
    requirements: "Punctuality, discipline, and neat grooming.",
    dressCode: "Formals or Smart Casuals as requested",
    description: "Provide excellent service and support for the assigned tasks in a professional environment."
  }`);
  }
}

const shiftsArrayString = "[\n" + generatedShifts.join(",\n") + "\n]";

const regex = /const INITIAL_SHIFTS = \[[\s\S]*?\];/;
const replaceString = "const INITIAL_SHIFTS = " + shiftsArrayString + ";";

const newCode = code.replace(regex, replaceString);
fs.writeFileSync(appJsPath, newCode);
console.log("Replaced jobs with exactly 40 jobs across 10 dealers.");
