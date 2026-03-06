"use client";
import { useState } from "react";

// ── ACTUAL MKW CUPS & COURSES (verified) ─────────────────────────────────────
// Source: Game8, MarioWiki, NintendoLife
const cups = [
  {
    name: "Mushroom Cup", emoji: "🍄", color: "#e74c3c",
    courses: [
      { name: "Crown City",      isNew: true,  terrain: "mixed",    straights: 60, turns: 40, offroad: 10, jumps: 20, desc: "New urban course. Highway sections, rail grinds through the city, moderate straights with technical inner-city corners." },
      { name: "Moo Moo Meadows", isNew: false, terrain: "offroad",  straights: 40, turns: 55, offroad: 50, jumps: 10, desc: "Retro (MKWii). Rolling countryside with lots of off-road grass. Dirt dominates — Cow gets secret speed bonuses here." },
      { name: "Peach Stadium",   isNew: true,  terrain: "technical",straights: 35, turns: 65, offroad: 5,  jumps: 25, desc: "New stadium circuit. Many hairpins, bleacher jumps, very short straights. Pure handling track." },
      { name: "Choco Mountain",  isNew: false, terrain: "mixed",    straights: 50, turns: 50, offroad: 30, jumps: 15, desc: "Retro (MK64). Mudslide hazards, chocolate terrain. Mix of dirt and paved with medium straights." },
    ]
  },
  {
    name: "Flower Cup", emoji: "🌸", color: "#e91e8c",
    courses: [
      { name: "Faraway Oasis",      isNew: true,  terrain: "offroad",  straights: 45, turns: 55, offroad: 55, jumps: 15, desc: "New lush jungle oasis. Sandy paths, water hazards, lots of winding off-road terrain." },
      { name: "Shy Guy Bazaar",     isNew: false, terrain: "technical",straights: 30, turns: 70, offroad: 10, jumps: 15, desc: "Retro (MK7). Dense marketplace with sharp corners and narrow alleys. Barely any long straights." },
      { name: "Starview Peak",      isNew: true,  terrain: "straight", straights: 70, turns: 30, offroad: 15, jumps: 30, desc: "New alpine mountain road. Long uphill straights and big air ramps. Speed rewards are massive here." },
      { name: "Koopa Troopa Beach", isNew: false, terrain: "mixed",    straights: 55, turns: 45, offroad: 20, jumps: 20, desc: "Retro (MK64). Beachside course with sand shortcuts and open water sections. Fairly balanced layout." },
    ]
  },
  {
    name: "Star Cup", emoji: "⭐", color: "#f1c40f",
    courses: [
      { name: "Wario Shipyard",    isNew: true,  terrain: "straight",  straights: 75, turns: 25, offroad: 10, jumps: 20, desc: "New industrial dockyard. Extremely long warehouse straights. One of the best speed tracks in the game." },
      { name: "DK Spaceport",      isNew: true,  terrain: "mixed",     straights: 60, turns: 40, offroad: 5,  jumps: 40, desc: "New space station. Huge launch ramps, anti-grav sections, and solid straight stretches between stunts." },
      { name: "Dandelion Depths",  isNew: true,  terrain: "technical", straights: 35, turns: 65, offroad: 35, jumps: 20, desc: "New underground cave. Tight winding paths, dirt shortcuts, zero long straights. Swoop unlocked here via Kamek." },
      { name: "Airship Fortress",  isNew: false, terrain: "mixed",     straights: 55, turns: 45, offroad: 5,  jumps: 35, desc: "Retro (MKDS). Battleship decks with cannon hazards, ramp tricks, and moderate straight sections." },
    ]
  },
  {
    name: "Shell Cup", emoji: "🐚", color: "#27ae60",
    courses: [
      { name: "Crown City (Shell)", isNew: true,  terrain: "mixed",    straights: 55, turns: 45, offroad: 10, jumps: 20, desc: "Alternate Crown City layout driven in reverse — more technical flow than the Mushroom Cup version." },
      { name: "Desert Hills",       isNew: false, terrain: "offroad",  straights: 50, turns: 50, offroad: 45, jumps: 15, desc: "Retro (MKDS). Sandy desert with dune bumps and off-road patches. Dirt/sand speed bonuses active." },
      { name: "Whistlestop Summit", isNew: true,  terrain: "technical",straights: 25, turns: 75, offroad: 20, jumps: 40, desc: "New Wild West mountain. Hairpin switchbacks, rail slides, barely any long straights. Spike unlocked here via Kamek." },
      { name: "Salty Salty Speedway",isNew:true,  terrain: "straight", straights: 80, turns: 20, offroad: 5,  jumps: 15, desc: "New salt flat highway — the closest thing to a pure speed track in the game. Massive straights." },
    ]
  },
  {
    name: "Banana Cup", emoji: "🍌", color: "#f39c12",
    courses: [
      { name: "Mario Bros. Circuit", isNew: true,  terrain: "mixed",   straights: 50, turns: 50, offroad: 10, jumps: 20, desc: "New retro-inspired circuit. Balanced mix of straights and sweeping turns on paved road." },
      { name: "Dino Dino Jungle",    isNew: false, terrain: "offroad", straights: 45, turns: 55, offroad: 40, jumps: 25, desc: "Retro (MKDD). Prehistoric jungle with dirt paths and dino stampede hazards." },
      { name: "Peach Beach",         isNew: false, terrain: "mixed",   straights: 50, turns: 50, offroad: 25, jumps: 15, desc: "Retro (MKDD). Sunny beach mix of sand and tarmac. Moderate overall, approachable for any combo." },
      { name: "DK Pass",             isNew: false, terrain: "straight",straights: 65, turns: 35, offroad: 20, jumps: 20, desc: "Retro (MKDS). Snowy mountain pass with long descending straights and broad sweeping bends." },
    ]
  },
  {
    name: "Leaf Cup", emoji: "🍂", color: "#e67e22",
    courses: [
      { name: "Sky-High Sundae",     isNew: false, terrain: "mixed",    straights: 55, turns: 45, offroad: 5,  jumps: 45, desc: "Retro (MK8D). Dessert-themed sky course with big ramps, trick sections, and decent straights." },
      { name: "Cheep Cheep Falls",   isNew: true,  terrain: "technical",straights: 35, turns: 65, offroad: 20, jumps: 30, desc: "New waterfall canyon. Tight river bends, jump pads, very few breathing straights." },
      { name: "Great ? Block Ruins", isNew: true,  terrain: "offroad",  straights: 40, turns: 60, offroad: 50, jumps: 30, desc: "New ancient ruins. Uneven jungle terrain, off-road shortcuts, and tight corners throughout." },
      { name: "Dry Bones Burnout",   isNew: true,  terrain: "straight", straights: 70, turns: 30, offroad: 10, jumps: 25, desc: "New volcanic burnout track. Long lava-side straights with moderate turn frequency." },
    ]
  },
  {
    name: "Lightning Cup", emoji: "⚡", color: "#3498db",
    courses: [
      { name: "Toad's Factory",     isNew: false, terrain: "technical",straights: 40, turns: 60, offroad: 10, jumps: 35, desc: "Retro (MKWii). Conveyor belts, pistons, lots of tight turns. High chaos, low speed reward." },
      { name: "Boo Cinema",         isNew: true,  terrain: "technical",straights: 30, turns: 70, offroad: 5,  jumps: 20, desc: "New haunted movie studio. Winding indoor sets and very tight technical layout. Peepa unlocked here via Kamek." },
      { name: "Wario Stadium",      isNew: false, terrain: "straight", straights: 70, turns: 30, offroad: 10, jumps: 35, desc: "Retro (MK64). Stadium dirt circuit with huge ramp jumps and long stadium straights." },
      { name: "Acorn Heights",      isNew: true,  terrain: "mixed",    straights: 50, turns: 50, offroad: 30, jumps: 20, desc: "New forested heights. Mix of dirt paths and paved roads, moderate turns throughout." },
    ]
  },
  {
    name: "Special Cup 👑", emoji: "🌈", color: "#9b59b6",
    locked: true,
    courses: [
      { name: "Acorn Heights (Alt)", isNew: true,  terrain: "mixed",    straights: 50, turns: 50, offroad: 30, jumps: 25, desc: "Special Cup Acorn Heights — same forested terrain with more dramatic elevation changes." },
      { name: "Mario Circuit",       isNew: false, terrain: "mixed",    straights: 55, turns: 45, offroad: 10, jumps: 20, desc: "Retro (SMK). Classic Mario Circuit reimagined across the full world map. Well-balanced paved layout." },
      { name: "Peach Stadium (Alt)", isNew: true,  terrain: "technical",straights: 30, turns: 70, offroad: 5,  jumps: 30, desc: "Special Cup Peach Stadium — harder layout, more hairpins, longer jump sequences." },
      { name: "Rainbow Road",        isNew: true,  terrain: "straight", straights: 65, turns: 35, offroad: 0,  jumps: 50, desc: "New Rainbow Road. Sky-high track with no barriers, massive jumps, and long colour-streaked straights. Unlock by winning all 7 base cups." },
    ]
  },
];

// ── ALL 50 MKW CHARACTERS (verified from Game8/MarioWiki) ────────────────────
// Stats from Game8 (S/A/W/H out of 100)
const characters = [
  // Main drivers
  { name: "Mario",         weight: "Medium",       emoji: "🔴", color: "#e74c3c",  s:50,a:55,w:45,h:50, unlock:"Default" },
  { name: "Luigi",         weight: "Medium",       emoji: "🟢", color: "#27ae60",  s:50,a:55,w:45,h:50, unlock:"Default" },
  { name: "Peach",         weight: "Med-Light",    emoji: "👸", color: "#f48fb1",  s:45,a:60,w:40,h:55, unlock:"Default" },
  { name: "Daisy",         weight: "Med-Light",    emoji: "🌼", color: "#ffb300",  s:45,a:60,w:40,h:55, unlock:"Flower Cup" },
  { name: "Rosalina",      weight: "Med-Heavy",    emoji: "⭐", color: "#7fb3d3",  s:55,a:50,w:50,h:45, unlock:"Star Cup" },
  { name: "Pauline",       weight: "Med-Heavy",    emoji: "🎤", color: "#c0392b",  s:55,a:50,w:50,h:45, unlock:"Default" },
  { name: "Toad",          weight: "Light",        emoji: "🍄", color: "#e74c3c",  s:40,a:65,w:35,h:60, unlock:"Default" },
  { name: "Toadette",      weight: "Light",        emoji: "🎀", color: "#e91e8c",  s:40,a:65,w:35,h:60, unlock:"Default" },
  { name: "Wario",         weight: "Heavy",        emoji: "💛", color: "#f1c40f",  s:60,a:45,w:55,h:40, unlock:"Default" },
  { name: "Waluigi",       weight: "Heavy",        emoji: "🎩", color: "#9b59b6",  s:60,a:45,w:55,h:40, unlock:"Default" },
  { name: "Baby Mario",    weight: "Featherweight",emoji: "👶", color: "#e74c3c",  s:35,a:70,w:30,h:65, unlock:"Default" },
  { name: "Baby Luigi",    weight: "Featherweight",emoji: "👶", color: "#3498db",  s:35,a:70,w:30,h:65, unlock:"Default" },
  { name: "Baby Peach",    weight: "Featherweight",emoji: "👶", color: "#f8b4d9",  s:35,a:75,w:25,h:65, unlock:"Default" },
  { name: "Baby Daisy",    weight: "Featherweight",emoji: "👶", color: "#f0a500",  s:35,a:75,w:25,h:65, unlock:"Default" },
  { name: "Baby Rosalina", weight: "Featherweight",emoji: "👶", color: "#aed6f1",  s:35,a:70,w:30,h:65, unlock:"Default" },
  { name: "Bowser",        weight: "Heavyweight",  emoji: "🐉", color: "#27ae60",  s:65,a:40,w:60,h:35, unlock:"Default" },
  { name: "Bowser Jr.",    weight: "Med-Light",    emoji: "🐢", color: "#e67e22",  s:45,a:60,w:40,h:55, unlock:"Lightning Cup" },
  { name: "Yoshi",         weight: "Med-Light",    emoji: "🦖", color: "#2ecc71",  s:45,a:60,w:40,h:55, unlock:"Default" },
  { name: "Donkey Kong",   weight: "Heavy",        emoji: "🦍", color: "#e67e22",  s:60,a:45,w:55,h:40, unlock:"Mushroom Cup" },
  { name: "Shy Guy",       weight: "Light",        emoji: "😶", color: "#95a5a6",  s:40,a:65,w:35,h:60, unlock:"Default" },
  { name: "Birdo",         weight: "Med-Light",    emoji: "🎀", color: "#e91e8c",  s:45,a:60,w:40,h:55, unlock:"Banana Cup" },
  { name: "King Boo",      weight: "Med-Heavy",    emoji: "👻", color: "#8e44ad",  s:55,a:50,w:50,h:45, unlock:"Leaf Cup" },
  { name: "Lakitu",        weight: "Light",        emoji: "☁️", color: "#f39c12",  s:40,a:65,w:35,h:60, unlock:"Shell Cup" },
  { name: "Koopa Troopa",  weight: "Light",        emoji: "🐢", color: "#27ae60",  s:40,a:65,w:35,h:60, unlock:"Default" },
  // NPC drivers — default
  { name: "Goomba",        weight: "Featherweight",emoji: "🟤", color: "#8B6914",  s:35,a:70,w:30,h:65, unlock:"Default" },
  { name: "Dry Bones",     weight: "Featherweight",emoji: "💀", color: "#bdc3c7",  s:35,a:70,w:30,h:65, unlock:"Default" },
  { name: "Para-Biddybud", weight: "Featherweight",emoji: "🦋", color: "#9b59b6",  s:35,a:75,w:25,h:65, unlock:"Default" },
  { name: "Cheep Cheep",   weight: "Light",        emoji: "🐟", color: "#e74c3c",  s:40,a:65,w:35,h:60, unlock:"Default" },
  { name: "Stingby",       weight: "Light",        emoji: "🐝", color: "#f1c40f",  s:40,a:65,w:35,h:60, unlock:"Default" },
  { name: "Nabbit",        weight: "Light",        emoji: "🐰", color: "#9c27b0",  s:40,a:65,w:35,h:60, unlock:"Default" },
  { name: "Pokey",         weight: "Medium",       emoji: "🌵", color: "#27ae60",  s:50,a:55,w:45,h:50, unlock:"Default" },
  { name: "Hammer Bro",    weight: "Medium",       emoji: "🔨", color: "#1565c0",  s:50,a:55,w:45,h:50, unlock:"Default" },
  { name: "Piranha Plant", weight: "Med-Heavy",    emoji: "🌱", color: "#e74c3c",  s:55,a:50,w:50,h:45, unlock:"Default" },
  { name: "Wiggler",       weight: "Heavy",        emoji: "🐛", color: "#f39c12",  s:60,a:45,w:55,h:40, unlock:"Default" },
  { name: "Cow",           weight: "Heavy",        emoji: "🐄", color: "#ecf0f1",  s:60,a:45,w:55,h:40, unlock:"Default" },
  { name: "Snowman",       weight: "Med-Heavy",    emoji: "⛄", color: "#aed6f1",  s:55,a:50,w:50,h:45, unlock:"Default" },
  { name: "Penguin",       weight: "Medium",       emoji: "🐧", color: "#2c3e50",  s:50,a:55,w:45,h:50, unlock:"Default" },
  { name: "Monty Mole",    weight: "Med-Light",    emoji: "🐾", color: "#795548",  s:45,a:60,w:40,h:55, unlock:"Default" },
  { name: "Sidestepper",   weight: "Featherweight",emoji: "🦀", color: "#e74c3c",  s:35,a:70,w:30,h:65, unlock:"Default" },
  // NPC drivers — Kamek unlocks
  { name: "Spike",         weight: "Featherweight",emoji: "⚡", color: "#16a085",  s:35,a:70,w:30,h:65, unlock:"Kamek (Whistlestop Summit)" },
  { name: "Swoop",         weight: "Featherweight",emoji: "🦇", color: "#8e44ad",  s:35,a:75,w:25,h:65, unlock:"Kamek (Dandelion Depths)" },
  { name: "Peepa",         weight: "Featherweight",emoji: "👁️", color: "#bdc3c7",  s:35,a:70,w:30,h:65, unlock:"Kamek (Boo Cinema)" },
  { name: "Fish Bone",     weight: "Featherweight",emoji: "🦴", color: "#95a5a6",  s:35,a:70,w:30,h:65, unlock:"Kamek (Toad's Factory→Dry Bones Burnout)" },
  { name: "Cataquack",     weight: "Med-Heavy",    emoji: "🦆", color: "#f39c12",  s:55,a:50,w:50,h:45, unlock:"Kamek (unlock via race)" },
  { name: "Chargin' Chuck",weight: "Heavy",        emoji: "🏈", color: "#2e7d32",  s:60,a:45,w:55,h:40, unlock:"Kamek (unlock via race)" },
  { name: "Coin Coffer",   weight: "Med-Light",    emoji: "💰", color: "#f1c40f",  s:45,a:60,w:40,h:55, unlock:"Kamek (unlock via race)" },
  { name: "Conkdor",       weight: "Med-Heavy",    emoji: "🦅", color: "#607d8b",  s:55,a:50,w:50,h:45, unlock:"Kamek (unlock via race)" },
  { name: "Rocky Wrench",  weight: "Medium",       emoji: "🔧", color: "#7f8c8d",  s:50,a:55,w:45,h:50, unlock:"Kamek (unlock via race)" },
  { name: "Dolphin",       weight: "Med-Light",    emoji: "��", color: "#3498db",  s:45,a:60,w:40,h:55, unlock:"Kamek (unlock via race)" },
  { name: "Pianta",        weight: "Heavy",        emoji: "🌴", color: "#1abc9c",  s:60,a:45,w:55,h:40, unlock:"Kamek (unlock via race)" },
];

// ── KART RECOMMENDATION ENGINE ────────────────────────────────────────────────
function getCombo(char, course) {
  const w = char.weight;
  const t = course?.terrain;
  const s = course?.straights ?? 50;

  if (t === "straight" || s >= 65) {
    if (w === "Heavyweight")              return { kart:"Stellar Sled",    alt:"Chargin' Truck", focus:"speed" };
    if (w === "Heavy")                    return { kart:"Stellar Sled",    alt:"Chargin' Truck", focus:"speed" };
    if (w === "Med-Heavy")                return { kart:"Stellar Sled",    alt:"Baby Blooper",   focus:"speed" };
    if (w === "Medium")                   return { kart:"Stellar Sled",    alt:"Baby Blooper",   focus:"speed" };
    if (w === "Med-Light")                return { kart:"Reel Racer",      alt:"Stellar Sled",   focus:"speed" };
    return { kart:"Mach Rocket", alt:"Reel Racer", focus:"speed" };
  }
  if (t === "technical" || s <= 35) {
    if (w === "Heavyweight" || w === "Heavy") return { kart:"Baby Blooper", alt:"Reel Racer",   focus:"handling" };
    if (w === "Med-Heavy" || w === "Medium")  return { kart:"Baby Blooper", alt:"Reel Racer",   focus:"handling" };
    return { kart:"Baby Blooper", alt:"Mach Rocket", focus:"handling" };
  }
  if (t === "offroad") {
    if (w === "Featherweight" || w === "Light") return { kart:"Baby Blooper", alt:"Mach Rocket",    focus:"acceleration" };
    if (w === "Med-Light" || w === "Medium")    return { kart:"Baby Blooper", alt:"Reel Racer",     focus:"acceleration" };
    if (w === "Med-Heavy")                      return { kart:"Reel Racer",   alt:"Baby Blooper",   focus:"acceleration" };
    return { kart:"Baby Blooper", alt:"Chargin' Truck", focus:"acceleration" };
  }
  // Mixed / default
  if (w === "Featherweight" || w === "Light") return { kart:"Baby Blooper", alt:"Mach Rocket",  focus:"balanced" };
  if (w === "Med-Light")                      return { kart:"Reel Racer",   alt:"Baby Blooper", focus:"balanced" };
  if (w === "Medium")                         return { kart:"Baby Blooper", alt:"Stellar Sled", focus:"balanced" };
  if (w === "Med-Heavy")                      return { kart:"Stellar Sled", alt:"Baby Blooper", focus:"balanced" };
  return { kart:"Stellar Sled", alt:"Chargin' Truck", focus:"speed" };
}

function getStats(char, combo) {
  const kBoost = {
    "Stellar Sled":    { s:+8,  a:-5, w:+3, h:-4 },
    "Chargin' Truck":  { s:+6,  a:-4, w:+5, h:-5 },
    "Baby Blooper":    { s:-2,  a:+6, w:-2, h:+8 },
    "Reel Racer":      { s:+4,  a:+2, w:+1, h:+2 },
    "Mach Rocket":     { s:+3,  a:+7, w:-3, h:+4 },
  }[combo.kart] || { s:0,a:0,w:0,h:0 };
  const clamp = v => Math.min(99, Math.max(5, v));
  return {
    speed:    clamp(char.s + kBoost.s),
    accel:    clamp(char.a + kBoost.a),
    weight:   clamp(char.w + kBoost.w),
    handling: clamp(char.h + kBoost.h),
  };
}

const tMeta = {
  straight:  { label:"Speed Track",  color:"#e74c3c", icon:"🏎️" },
  technical: { label:"Technical",    color:"#3498db", icon:"🔄" },
  offroad:   { label:"Off-Road",     color:"#27ae60", icon:"🌿" },
  mixed:     { label:"Mixed",        color:"#f39c12", icon:"⚖️" },
};
const focusColor = { speed:"#e74c3c", handling:"#3498db", acceleration:"#2ecc71", balanced:"#f1c40f" };
const weightOrder = ["Featherweight","Light","Med-Light","Medium","Med-Heavy","Heavy","Heavyweight"];

// ── COMPONENTS ────────────────────────────────────────────────────────────────
const StatBar = ({ label, value, color, highlight }) => (
  <div style={{ marginBottom:"12px" }}>
    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
      <span style={{ fontSize:"13px", color: highlight?"#fff":"#999", fontWeight: highlight?"600":"normal" }}>
        {highlight && "★ "}{label}
      </span>
      <span style={{ fontSize:"13px", fontWeight:"600", color }}>{value}</span>
    </div>
    <div style={{ height:"10px", background:"#111", borderRadius:"5px", overflow:"hidden", border:"1px solid #2a2a3a" }}>
      <div style={{
        height:"100%", width:`${value}%`,
        background: highlight ? `linear-gradient(90deg,${color},#fff8)` : color,
        borderRadius:"5px", transition:"width 0.5s cubic-bezier(.34,1.56,.64,1)",
        boxShadow:`0 0 ${highlight?10:4}px ${color}77`
      }} />
    </div>
  </div>
);

const MiniBar = ({ label, value, color }) => (
  <div style={{ marginBottom:"10px" }}>
    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
      <span style={{ fontSize:"12px", color:"#777" }}>{label}</span>
      <span style={{ fontSize:"12px", fontWeight:"600", color }}>{value}%</span>
    </div>
    <div style={{ height:"6px", background:"#111", borderRadius:"3px", overflow:"hidden" }}>
      <div style={{ height:"100%", width:`${value}%`, background:color, transition:"width 0.4s ease" }} />
    </div>
  </div>
);

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [selChar,   setSelChar]   = useState(null);
  const [selCup,    setSelCup]    = useState(null);
  const [selCourse, setSelCourse] = useState(null);
  const [search,    setSearch]    = useState("");
  const [aiTip,     setAiTip]     = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const filtered = characters.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const grouped  = {};
  filtered.forEach(c => { if (!grouped[c.weight]) grouped[c.weight] = []; grouped[c.weight].push(c); });

  const combo  = selChar  ? getCombo(selChar, selCourse) : null;
  const stats  = combo    ? getStats(selChar, combo)     : null;
  const tm     = selCourse ? (tMeta[selCourse.terrain] || tMeta.mixed) : null;
  const fc     = combo    ? (focusColor[combo.focus] || "#f1c40f") : "#f1c40f";

  const fetchTip = async (char, course, cmb) => {
    setAiTip(""); setAiLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:"You are an expert Mario Kart World (Switch 2, 2025) coach. Give sharp, course-specific tips. 3-4 sentences, no bullets, coach voice.",
          messages:[{ role:"user", content:
            `Tip for ${char.name} (${char.weight}, S:${char.s}/A:${char.a}/W:${char.w}/H:${char.h}) with the ${cmb.kart} kart on ${course.name} (${course.isNew?"new course":"retro course"}). Terrain: ${course.terrain}, ${course.straights}% straights, ${course.turns}% turns, ${course.offroad}% off-road. Stat priority: ${cmb.focus}. Give a tactical tip specific to this course's challenges.`
          }]
        })
      });
      const d = await res.json();
      setAiTip(d.content?.find(b=>b.type==="text")?.text || "No response.");
    } catch { setAiTip("Couldn't reach the coaching booth right now."); }
    finally  { setAiLoading(false); }
  };

  const selectChar = c => {
    setSelChar(c);
    if (selCourse) fetchTip(c, selCourse, getCombo(c, selCourse));
  };
  const selectCourse = course => {
    setSelCourse(course);
    if (selChar) fetchTip(selChar, course, getCombo(selChar, course));
  };

  const [mobileTab, setMobileTab] = useState("char"); // "char" | "course" | "results"

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0d0b1e,#1a1640,#12102a)", color:"#fff", fontFamily:"system-ui,sans-serif", display:"flex", flexDirection:"column" }}>
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      <style>{`
        @media (max-width: 900px) {
          .desktop-layout { display: none !important; }
          .mobile-layout { display: flex !important; }
        }
        @media (min-width: 901px) {
          .desktop-layout { display: flex !important; }
          .mobile-layout { display: none !important; }
        }
      `}</style>
      <div style={{ height:"5px", background:"linear-gradient(90deg,#e74c3c,#e67e22,#f1c40f,#2ecc71,#3498db,#9b59b6)", flexShrink:0 }} />
      <div style={{ padding:"16px 24px 12px", textAlign:"center", background:"rgba(0,0,0,.4)", borderBottom:"1px solid #ffffff15", flexShrink:0 }}>
        <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"16px", color:"#f1c40f", textShadow:"2px 2px 0 #c0392b", letterSpacing:"1px" }}>🏎️ MARIO KART WORLD</div>
        <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"8px", color:"#666", marginTop:"6px" }}>BEST KART COMBO FINDER — SWITCH 2 — ALL 50 CHARACTERS</div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="mobile-layout" style={{ display:"none", borderBottom:"1px solid #ffffff15", background:"rgba(0,0,0,.2)" }}>
        {[
          { key:"char", label:"Characters", icon:"👤", color:"#f1c40f" },
          { key:"course", label:"Courses", icon:"🗺️", color:"#3498db" },
          { key:"results", label:"Results", icon:"🏆", color:"#2ecc71" },
        ].map(tab => (
          <button key={tab.key} onClick={()=>setMobileTab(tab.key)} style={{
            flex:1, padding:"12px 8px", background: mobileTab===tab.key ? `${tab.color}15` : "transparent",
            border:"none", borderBottom: mobileTab===tab.key ? `3px solid ${tab.color}` : "3px solid transparent",
            color: mobileTab===tab.key ? tab.color : "#666", cursor:"pointer", transition:"all .15s"
          }}>
            <div style={{ fontSize:"18px", marginBottom:"4px" }}>{tab.icon}</div>
            <div style={{ fontSize:"11px", fontWeight:"600" }}>{tab.label}</div>
          </button>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="desktop-layout" style={{ display:"flex", flex:1, minHeight:0 }}>

        {/* COL 1 — Characters */}
        <div style={{ width:"280px", minWidth:"280px", borderRight:"1px solid #ffffff15", display:"flex", flexDirection:"column", overflow:"hidden" }}>
          <div style={{ padding:"14px 16px", borderBottom:"1px solid #ffffff10" }}>
            <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"9px", color:"#f1c40f", marginBottom:"10px" }}>1 · CHARACTER (50)</div>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search characters…"
              style={{ width:"100%", padding:"10px 14px", background:"#ffffff0d", border:"1px solid #ffffff20", borderRadius:"6px", color:"#fff", fontSize:"14px", outline:"none", boxSizing:"border-box" }} />
          </div>
          <div style={{ overflowY:"auto", flex:1, padding:"10px 12px" }}>
            {weightOrder.filter(w=>grouped[w]).map(w => (
              <div key={w} style={{ marginBottom:"14px" }}>
                <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"8px", color:"#f1c40f88", borderLeft:"3px solid #f1c40f44", paddingLeft:"8px", marginBottom:"8px" }}>{w.toUpperCase()}</div>
                {grouped[w].map(c => (
                  <button key={c.name} onClick={()=>selectChar(c)} style={{
                    width:"100%", display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px",
                    background: selChar?.name===c.name ? `${c.color}22` : "transparent",
                    border: selChar?.name===c.name ? `1px solid ${c.color}55` : "1px solid transparent",
                    borderRadius:"8px", cursor:"pointer", marginBottom:"4px", color:"#fff", transition:"all .1s"
                  }}>
                    <span style={{ fontSize:"20px" }}>{c.emoji}</span>
                    <div style={{ textAlign:"left", flex:1 }}>
                      <div style={{ fontSize:"14px", color: selChar?.name===c.name ? c.color : "#ccc" }}>{c.name}</div>
                      {c.unlock !== "Default" && <div style={{ fontSize:"10px", color:"#555", marginTop:"2px" }}>🔒 {c.unlock}</div>}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* COL 2 — Cups & Courses */}
        <div style={{ width:"320px", minWidth:"320px", borderRight:"1px solid #ffffff15", display:"flex", flexDirection:"column", overflow:"hidden" }}>
          <div style={{ padding:"14px 16px", borderBottom:"1px solid #ffffff10" }}>
            <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"9px", color:"#3498db" }}>2 · CUP & COURSE</div>
          </div>
          <div style={{ overflowY:"auto", flex:1, padding:"10px 12px" }}>
            {cups.map(cup => (
              <div key={cup.name} style={{ marginBottom:"6px" }}>
                <button onClick={()=>setSelCup(selCup?.name===cup.name ? null : cup)} style={{
                  width:"100%", display:"flex", alignItems:"center", gap:"12px", padding:"12px 14px",
                  background: selCup?.name===cup.name ? `${cup.color}1a` : "rgba(255,255,255,.03)",
                  border: selCup?.name===cup.name ? `1px solid ${cup.color}55` : "1px solid #ffffff0e",
                  borderRadius:"8px", cursor:"pointer", color:"#fff", marginBottom:"4px"
                }}>
                  <span style={{ fontSize:"22px" }}>{cup.emoji}</span>
                  <span style={{ fontSize:"14px", flex:1, textAlign:"left", color: selCup?.name===cup.name ? cup.color : "#ddd" }}>{cup.name}</span>
                  {cup.locked && <span style={{ fontSize:"12px", color:"#555" }}>🔒</span>}
                  <span style={{ fontSize:"12px", color:"#444" }}>{selCup?.name===cup.name?"▲":"▼"}</span>
                </button>
                {selCup?.name===cup.name && (
                  <div style={{ paddingLeft:"16px", paddingBottom:"6px" }}>
                    {cup.courses.map(course => {
                      const t = tMeta[course.terrain] || tMeta.mixed;
                      const active = selCourse?.name===course.name;
                      return (
                        <button key={course.name} onClick={()=>selectCourse(course)} style={{
                          width:"100%", display:"flex", alignItems:"center", gap:"12px", padding:"10px 14px",
                          background: active ? `${t.color}22` : "rgba(255,255,255,.03)",
                          border: active ? `1px solid ${t.color}66` : "1px solid #ffffff0a",
                          borderRadius:"6px", cursor:"pointer", marginBottom:"4px", color:"#fff"
                        }}>
                          <span style={{ fontSize:"16px" }}>{t.icon}</span>
                          <div style={{ textAlign:"left" }}>
                            <div style={{ fontSize:"14px", color: active?t.color:"#bbb" }}>{course.name}</div>
                            <div style={{ fontSize:"11px", color:"#555", marginTop:"2px" }}>
                              {course.isNew ? "✨ New" : "🔁 Retro"} · {t.label}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* COL 3 — Results */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 28px" }}>
          {!selChar && !selCourse ? (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:"16px", opacity:.35 }}>
              <div style={{ fontSize:"72px" }}>🏁</div>
              <p style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"10px", color:"#aaa", textAlign:"center", lineHeight:"2.5" }}>
                PICK A CHARACTER<br/>& A COURSE<br/>FOR YOUR COMBO
              </p>
            </div>
          ) : (
            <div style={{ maxWidth:"640px" }}>

              {/* Header cards */}
              <div style={{ display:"flex", gap:"14px", marginBottom:"18px", flexWrap:"wrap" }}>
                {selChar && (
                  <div style={{ flex:"1 1 220px", padding:"16px 20px", background:`${selChar.color}18`, border:`1px solid ${selChar.color}44`, borderRadius:"12px", display:"flex", alignItems:"center", gap:"14px" }}>
                    <span style={{ fontSize:"40px" }}>{selChar.emoji}</span>
                    <div>
                      <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"12px", color:selChar.color }}>{selChar.name}</div>
                      <div style={{ fontSize:"13px", color:"#666", marginTop:"4px" }}>{selChar.weight}</div>
                      {selChar.unlock !== "Default" && <div style={{ fontSize:"11px", color:"#555", marginTop:"3px" }}>🔒 {selChar.unlock}</div>}
                    </div>
                  </div>
                )}
                {selCourse && tm && (
                  <div style={{ flex:"1 1 220px", padding:"16px 20px", background:`${tm.color}14`, border:`1px solid ${tm.color}44`, borderRadius:"12px" }}>
                    <div style={{ fontSize:"13px", color:"#555", marginBottom:"4px" }}>{selCup?.emoji} {selCup?.name}</div>
                    <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"12px", color:tm.color }}>{tm.icon} {selCourse.name}</div>
                    <div style={{ display:"flex", gap:"8px", marginTop:"8px", flexWrap:"wrap" }}>
                      <span style={{ padding:"4px 10px", background:`${tm.color}22`, border:`1px solid ${tm.color}55`, borderRadius:"4px", fontSize:"11px", color:tm.color }}>{tm.label}</span>
                      <span style={{ padding:"4px 10px", background:"rgba(255,255,255,.06)", borderRadius:"4px", fontSize:"11px", color:"#888" }}>{selCourse.isNew?"✨ New":"🔁 Retro"}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Course description */}
              {selCourse && (
                <p style={{ fontSize:"14px", lineHeight:"1.7", color:"#888", background:"rgba(255,255,255,.03)", border:"1px solid #ffffff0e", borderRadius:"10px", padding:"14px 18px", margin:"0 0 16px" }}>
                  {selCourse.desc}
                </p>
              )}

              {/* Terrain breakdown */}
              {selCourse && (
                <div style={{ padding:"16px 20px", background:"rgba(255,255,255,.03)", border:"1px solid #ffffff10", borderRadius:"12px", marginBottom:"16px" }}>
                  <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"9px", color:"#666", marginBottom:"14px" }}>🗺️ TERRAIN BREAKDOWN</div>
                  <MiniBar label="Straights — speed reward"  value={selCourse.straights} color="#e74c3c" />
                  <MiniBar label="Turns — handling reward"   value={selCourse.turns}     color="#3498db" />
                  <MiniBar label="Off-Road sections"         value={selCourse.offroad}   color="#27ae60" />
                  <MiniBar label="Jumps / trick sections"    value={selCourse.jumps}     color="#f39c12" />
                </div>
              )}

              {/* Kart recommendation */}
              {selChar && combo && (
                <div style={{ padding:"16px 20px", background:"rgba(255,255,255,.03)", border:`1px solid ${fc}44`, borderRadius:"12px", marginBottom:"16px" }}>
                  <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"9px", color:fc, marginBottom:"14px" }}>
                    {selCourse ? "⭐ COURSE-OPTIMISED KART" : "⭐ BEST KART COMBO"}
                  </div>
                  <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
                    {[
                      { label:"PRIMARY", value:combo.kart,             icon:"🏎️", hi:true  },
                      { label:"ALT",     value:combo.alt,              icon:"🔄", hi:false },
                      { label:"FOCUS",   value:combo.focus.toUpperCase(),icon:"🎯",hi:false },
                    ].map(item => (
                      <div key={item.label} style={{
                        flex:"1 1 110px", padding:"14px 12px", textAlign:"center",
                        background: item.hi ? `${fc}18` : "rgba(255,255,255,.05)",
                        border: item.hi ? `2px solid ${fc}` : "1px solid #ffffff18",
                        borderRadius:"10px"
                      }}>
                        <div style={{ fontSize:"26px", marginBottom:"6px" }}>{item.icon}</div>
                        <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"9px", color:item.hi?fc:"#ccc" }}>{item.value}</div>
                        <div style={{ fontSize:"10px", color:"#444", marginTop:"4px" }}>{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              {stats && combo && (
                <div style={{ padding:"16px 20px", background:"rgba(255,255,255,.02)", border:"1px solid #ffffff0e", borderRadius:"12px", marginBottom:"16px" }}>
                  <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"9px", color:"#555", marginBottom:"14px" }}>📊 COMBO STATS</div>
                  <StatBar label="Speed"    value={stats.speed}    color="#e74c3c" highlight={combo.focus==="speed"} />
                  <StatBar label="Accel"    value={stats.accel}    color="#2ecc71" highlight={combo.focus==="acceleration"} />
                  <StatBar label="Weight"   value={stats.weight}   color="#f39c12" highlight={false} />
                  <StatBar label="Handling" value={stats.handling} color="#3498db" highlight={combo.focus==="handling"} />
                </div>
              )}

              {/* AI Tip */}
              <div style={{ padding:"16px 20px", background:"rgba(52,152,219,.06)", border:"1px solid #3498db33", borderRadius:"12px" }}>
                <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"9px", color:"#3498db", marginBottom:"14px" }}>🤖 AI COACH TIP</div>
                {!selChar || !selCourse ? (
                  <p style={{ fontSize:"14px", color:"#555", margin:0 }}>Select both a character and a course for a tailored coaching tip.</p>
                ) : aiLoading ? (
                  <p style={{ fontSize:"14px", color:"#666", margin:0 }}>Analysing {selChar.name} on {selCourse.name}… ⏳</p>
                ) : aiTip ? (
                  <p style={{ fontSize:"14px", lineHeight:"1.8", color:"#ccc", margin:0 }}>{aiTip}</p>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="mobile-layout" style={{ display:"none", flex:1, flexDirection:"column", minHeight:0 }}>
        
        {/* Characters Tab */}
        {mobileTab === "char" && (
          <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
            <div style={{ padding:"14px 16px", borderBottom:"1px solid #ffffff10" }}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search characters…"
                style={{ width:"100%", padding:"12px 16px", background:"#ffffff0d", border:"1px solid #ffffff20", borderRadius:"8px", color:"#fff", fontSize:"16px", outline:"none", boxSizing:"border-box" }} />
            </div>
            <div style={{ overflowY:"auto", flex:1, padding:"12px 16px" }}>
              {weightOrder.filter(w=>grouped[w]).map(w => (
                <div key={w} style={{ marginBottom:"16px" }}>
                  <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"9px", color:"#f1c40f88", borderLeft:"3px solid #f1c40f44", paddingLeft:"10px", marginBottom:"10px" }}>{w.toUpperCase()}</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(140px, 1fr))", gap:"8px" }}>
                    {grouped[w].map(c => (
                      <button key={c.name} onClick={()=>{selectChar(c); setMobileTab("results");}} style={{
                        display:"flex", alignItems:"center", gap:"10px", padding:"12px 14px",
                        background: selChar?.name===c.name ? `${c.color}22` : "rgba(255,255,255,.04)",
                        border: selChar?.name===c.name ? `2px solid ${c.color}55` : "1px solid #ffffff15",
                        borderRadius:"10px", cursor:"pointer", color:"#fff", transition:"all .1s"
                      }}>
                        <span style={{ fontSize:"24px" }}>{c.emoji}</span>
                        <div style={{ textAlign:"left", flex:1, minWidth:0 }}>
                          <div style={{ fontSize:"14px", color: selChar?.name===c.name ? c.color : "#ccc", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {mobileTab === "course" && (
          <div style={{ flex:1, overflowY:"auto", padding:"12px 16px" }}>
            {cups.map(cup => (
              <div key={cup.name} style={{ marginBottom:"8px" }}>
                <button onClick={()=>setSelCup(selCup?.name===cup.name ? null : cup)} style={{
                  width:"100%", display:"flex", alignItems:"center", gap:"14px", padding:"14px 16px",
                  background: selCup?.name===cup.name ? `${cup.color}1a` : "rgba(255,255,255,.04)",
                  border: selCup?.name===cup.name ? `2px solid ${cup.color}55` : "1px solid #ffffff15",
                  borderRadius:"10px", cursor:"pointer", color:"#fff"
                }}>
                  <span style={{ fontSize:"28px" }}>{cup.emoji}</span>
                  <span style={{ fontSize:"16px", flex:1, textAlign:"left", fontWeight:"600", color: selCup?.name===cup.name ? cup.color : "#ddd" }}>{cup.name}</span>
                  {cup.locked && <span style={{ fontSize:"14px", color:"#555" }}>🔒</span>}
                  <span style={{ fontSize:"14px", color:"#444" }}>{selCup?.name===cup.name?"▲":"▼"}</span>
                </button>
                {selCup?.name===cup.name && (
                  <div style={{ paddingLeft:"12px", paddingTop:"8px", paddingBottom:"4px" }}>
                    {cup.courses.map(course => {
                      const t = tMeta[course.terrain] || tMeta.mixed;
                      const active = selCourse?.name===course.name;
                      return (
                        <button key={course.name} onClick={()=>{selectCourse(course); setMobileTab("results");}} style={{
                          width:"100%", display:"flex", alignItems:"center", gap:"14px", padding:"14px 16px",
                          background: active ? `${t.color}22` : "rgba(255,255,255,.03)",
                          border: active ? `2px solid ${t.color}66` : "1px solid #ffffff0a",
                          borderRadius:"8px", cursor:"pointer", marginBottom:"6px", color:"#fff"
                        }}>
                          <span style={{ fontSize:"22px" }}>{t.icon}</span>
                          <div style={{ textAlign:"left", flex:1 }}>
                            <div style={{ fontSize:"15px", fontWeight:"500", color: active?t.color:"#bbb" }}>{course.name}</div>
                            <div style={{ fontSize:"12px", color:"#555", marginTop:"3px" }}>
                              {course.isNew ? "✨ New" : "🔁 Retro"} · {t.label}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Results Tab */}
        {mobileTab === "results" && (
          <div style={{ flex:1, overflowY:"auto", padding:"16px" }}>
            {!selChar && !selCourse ? (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:"16px", opacity:.5 }}>
                <div style={{ fontSize:"64px" }}>🏁</div>
                <p style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"10px", color:"#aaa", textAlign:"center", lineHeight:"2.2" }}>
                  PICK A CHARACTER<br/>& A COURSE<br/>FOR YOUR COMBO
                </p>
              </div>
            ) : (
              <div>
                {/* Header cards */}
                <div style={{ display:"flex", gap:"12px", marginBottom:"16px", flexWrap:"wrap" }}>
                  {selChar && (
                    <div style={{ flex:"1 1 150px", padding:"14px 16px", background:`${selChar.color}18`, border:`1px solid ${selChar.color}44`, borderRadius:"12px", display:"flex", alignItems:"center", gap:"12px" }}>
                      <span style={{ fontSize:"36px" }}>{selChar.emoji}</span>
                      <div>
                        <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"11px", color:selChar.color }}>{selChar.name}</div>
                        <div style={{ fontSize:"12px", color:"#666", marginTop:"3px" }}>{selChar.weight}</div>
                      </div>
                    </div>
                  )}
                  {selCourse && tm && (
                    <div style={{ flex:"1 1 150px", padding:"14px 16px", background:`${tm.color}14`, border:`1px solid ${tm.color}44`, borderRadius:"12px" }}>
                      <div style={{ fontSize:"11px", color:"#555", marginBottom:"3px" }}>{selCup?.emoji} {selCup?.name}</div>
                      <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"11px", color:tm.color }}>{tm.icon} {selCourse.name}</div>
                    </div>
                  )}
                </div>

                {/* Kart recommendation */}
                {selChar && combo && (
                  <div style={{ padding:"16px", background:"rgba(255,255,255,.03)", border:`1px solid ${fc}44`, borderRadius:"12px", marginBottom:"14px" }}>
                    <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"9px", color:fc, marginBottom:"12px" }}>
                      {selCourse ? "⭐ COURSE-OPTIMISED KART" : "⭐ BEST KART COMBO"}
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"10px" }}>
                      {[
                        { label:"PRIMARY", value:combo.kart, icon:"🏎️", hi:true },
                        { label:"ALT", value:combo.alt, icon:"🔄", hi:false },
                        { label:"FOCUS", value:combo.focus.toUpperCase(), icon:"🎯", hi:false },
                      ].map(item => (
                        <div key={item.label} style={{
                          padding:"12px 8px", textAlign:"center",
                          background: item.hi ? `${fc}18` : "rgba(255,255,255,.05)",
                          border: item.hi ? `2px solid ${fc}` : "1px solid #ffffff18",
                          borderRadius:"10px"
                        }}>
                          <div style={{ fontSize:"22px", marginBottom:"4px" }}>{item.icon}</div>
                          <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"7px", color:item.hi?fc:"#ccc" }}>{item.value}</div>
                          <div style={{ fontSize:"9px", color:"#444", marginTop:"3px" }}>{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats */}
                {stats && combo && (
                  <div style={{ padding:"16px", background:"rgba(255,255,255,.02)", border:"1px solid #ffffff0e", borderRadius:"12px", marginBottom:"14px" }}>
                    <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"9px", color:"#555", marginBottom:"12px" }}>📊 COMBO STATS</div>
                    <StatBar label="Speed" value={stats.speed} color="#e74c3c" highlight={combo.focus==="speed"} />
                    <StatBar label="Accel" value={stats.accel} color="#2ecc71" highlight={combo.focus==="acceleration"} />
                    <StatBar label="Weight" value={stats.weight} color="#f39c12" highlight={false} />
                    <StatBar label="Handling" value={stats.handling} color="#3498db" highlight={combo.focus==="handling"} />
                  </div>
                )}

                {/* AI Tip */}
                <div style={{ padding:"16px", background:"rgba(52,152,219,.06)", border:"1px solid #3498db33", borderRadius:"12px" }}>
                  <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"9px", color:"#3498db", marginBottom:"12px" }}>🤖 AI COACH TIP</div>
                  {!selChar || !selCourse ? (
                    <p style={{ fontSize:"14px", color:"#555", margin:0 }}>Select both a character and a course for a tailored coaching tip.</p>
                  ) : aiLoading ? (
                    <p style={{ fontSize:"14px", color:"#666", margin:0 }}>Analysing {selChar.name} on {selCourse.name}… ⏳</p>
                  ) : aiTip ? (
                    <p style={{ fontSize:"14px", lineHeight:"1.7", color:"#ccc", margin:0 }}>{aiTip}</p>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ height:"5px", background:"linear-gradient(90deg,#e74c3c,#e67e22,#f1c40f,#2ecc71,#3498db,#9b59b6)", flexShrink:0 }} />
    </div>
  );
}
