export type HexagramRecord = {
  number: number;
  englishName: string;
  chineseName: string;
  title: string;
  judgment: string;
};

export const HEXAGRAMS: Record<number, HexagramRecord> = {
  1: {
    number: 1,
    englishName: "The Creative",
    chineseName: "乾",
    title: "The Creative (Qián)",
    judgment:
      "Supreme success through perseverance. The Creative works through the firm and unceasing.",
  },
  2: {
    number: 2,
    englishName: "The Receptive",
    chineseName: "坤",
    title: "The Receptive (Kūn)",
    judgment:
      "Supreme success through the devotion of the mare. Friends in the southwest, lose friends in the northeast.",
  },
  3: {
    number: 3,
    englishName: "Difficulty at the Beginning",
    chineseName: "屯",
    title: "Difficulty at the Beginning (Zhūn)",
    judgment:
      "Great success through perseverance. Do not seek a destination too hastily; establish helpers.",
  },
  4: {
    number: 4,
    englishName: "Youthful Folly",
    chineseName: "蒙",
    title: "Youthful Folly (Méng)",
    judgment:
      "Success through perseverance. It is not I who seek the young fool; the young fool seeks me.",
  },
  5: {
    number: 5,
    englishName: "Waiting",
    chineseName: "需",
    title: "Waiting (Xū)",
    judgment:
      "Waiting with sincerity brings success. Perseverance brings good fortune.",
  },
  6: {
    number: 6,
    englishName: "Conflict",
    chineseName: "訟",
    title: "Conflict (Sòng)",
    judgment:
      "Conflict brings sincerity, but halt halfway. Seek mediation; do not force conclusion.",
  },
  7: {
    number: 7,
    englishName: "The Army",
    chineseName: "師",
    title: "The Army (Shī)",
    judgment:
      "The army needs perseverance and a strong leader. Good fortune without blame.",
  },
  8: {
    number: 8,
    englishName: "Holding Together",
    chineseName: "比",
    title: "Holding Together (Bǐ)",
    judgment:
      "Holding together brings good fortune. Seek union with sincerity and early alliance.",
  },
  9: {
    number: 9,
    englishName: "The Taming Power of the Small",
    chineseName: "小畜",
    title: "The Taming Power of the Small (Xiǎo Chù)",
    judgment:
      "Modest accumulation succeeds. Clouds gather but rain has not yet fallen; press forward gently.",
  },
  10: {
    number: 10,
    englishName: "Treading",
    chineseName: "履",
    title: "Treading (Lǚ)",
    judgment:
      "Treading upon the tiger's tail without being bitten. Conduct with care brings success.",
  },
  11: {
    number: 11,
    englishName: "Peace",
    chineseName: "泰",
    title: "Peace (Tài)",
    judgment:
      "The small departs, the great approaches. Good fortune and success in all undertakings.",
  },
  12: {
    number: 12,
    englishName: "Standstill",
    chineseName: "否",
    title: "Standstill (Pǐ)",
    judgment:
      "The great departs, the small approaches. Withdraw from what does not nourish you.",
  },
  13: {
    number: 13,
    englishName: "Fellowship with Men",
    chineseName: "同人",
    title: "Fellowship with Men (Tóng Rén)",
    judgment:
      "Fellowship with men in the open. Success through crossing the great water.",
  },
  14: {
    number: 14,
    englishName: "Possession in Great Measure",
    chineseName: "大有",
    title: "Possession in Great Measure (Dà Yǒu)",
    judgment:
      "Supreme success. The light shines brightly; share abundance without arrogance.",
  },
  15: {
    number: 15,
    englishName: "Modesty",
    chineseName: "謙",
    title: "Modesty (Qiān)",
    judgment:
      "Modesty creates success. The noble person carries things through to the end.",
  },
  16: {
    number: 16,
    englishName: "Enthusiasm",
    chineseName: "豫",
    title: "Enthusiasm (Yù)",
    judgment:
      "Enthusiasm brings success. Establish helpers and set armies in motion at the right time.",
  },
  17: {
    number: 17,
    englishName: "Following",
    chineseName: "隨",
    title: "Following (Suí)",
    judgment:
      "Following brings supreme success. Adapt to the right leader and the right moment.",
  },
  18: {
    number: 18,
    englishName: "Work on What Has Been Spoiled",
    chineseName: "蠱",
    title: "Work on What Has Been Spoiled (Gǔ)",
    judgment:
      "Repair what has decayed. Success through crossing the great water before the new beginning.",
  },
  19: {
    number: 19,
    englishName: "Approach",
    chineseName: "臨",
    title: "Approach (Lín)",
    judgment:
      "Approach brings success. The wise oversee with compassion as influence grows.",
  },
  20: {
    number: 20,
    englishName: "Contemplation",
    chineseName: "觀",
    title: "Contemplation (Guān)",
    judgment:
      "Contemplate deeply before acting. The wise person teaches through example.",
  },
  21: {
    number: 21,
    englishName: "Biting Through",
    chineseName: "噬嗑",
    title: "Biting Through (Shì Kè)",
    judgment:
      "Biting through brings success. Justice clears obstruction; act decisively.",
  },
  22: {
    number: 22,
    englishName: "Grace",
    chineseName: "賁",
    title: "Grace (Bì)",
    judgment:
      "Grace brings success in small matters. Form serves truth; beauty must not replace substance.",
  },
  23: {
    number: 23,
    englishName: "Splitting Apart",
    chineseName: "剝",
    title: "Splitting Apart (Bō)",
    judgment:
      "Splitting apart is not favorable. Yield before collapse; preserve what is essential.",
  },
  24: {
    number: 24,
    englishName: "Return",
    chineseName: "復",
    title: "Return (Fù)",
    judgment:
      "Return brings success. The turning point arrives; light returns after darkness.",
  },
  25: {
    number: 25,
    englishName: "Innocence",
    chineseName: "無妄",
    title: "Innocence (Wú Wàng)",
    judgment:
      "Innocence brings success. Act without contrivance; sincerity, not force, prevails.",
  },
  26: {
    number: 26,
    englishName: "The Taming Power of the Great",
    chineseName: "大畜",
    title: "The Taming Power of the Great (Dà Chù)",
    judgment:
      "Restrain great power until the moment is ripe. Store strength in stillness.",
  },
  27: {
    number: 27,
    englishName: "The Corners of the Mouth",
    chineseName: "頤",
    title: "The Corners of the Mouth (Yí)",
    judgment:
      "Pay attention to nourishment of body and word. What you take in shapes your path.",
  },
  28: {
    number: 28,
    englishName: "Preponderance of the Great",
    chineseName: "大過",
    title: "Preponderance of the Great (Dà Guò)",
    judgment:
      "The ridgepole bends under excess. Extraordinary measures are required, but do not break.",
  },
  29: {
    number: 29,
    englishName: "The Abysmal",
    chineseName: "坎",
    title: "The Abysmal (Kǎn)",
    judgment:
      "Repeated danger. Maintain heart-truth within peril; sincerity carries you through.",
  },
  30: {
    number: 30,
    englishName: "The Clinging",
    chineseName: "離",
    title: "The Clinging (Lí)",
    judgment:
      "Clarity and dependence bring success. Attach to what illumines, not what consumes.",
  },
  31: {
    number: 31,
    englishName: "Influence",
    chineseName: "咸",
    title: "Influence (Xián)",
    judgment:
      "Mutual attraction and sensitivity lead to success. Feeling stirs before words.",
  },
  32: {
    number: 32,
    englishName: "Duration",
    chineseName: "恆",
    title: "Duration (Héng)",
    judgment:
      "Duration brings success without blame. Perseverance, not rigidity, endures.",
  },
  33: {
    number: 33,
    englishName: "Retreat",
    chineseName: "遯",
    title: "Retreat (Dùn)",
    judgment:
      "Retreat succeeds when timely. Strategic withdrawal preserves strength for later.",
  },
  34: {
    number: 34,
    englishName: "The Power of the Great",
    chineseName: "大壯",
    title: "The Power of the Great (Dà Zhuàng)",
    judgment:
      "Great power succeeds when used with restraint. Strength in motion must not become recklessness.",
  },
  35: {
    number: 35,
    englishName: "Progress",
    chineseName: "晉",
    title: "Progress (Jìn)",
    judgment:
      "Progress like the rising sun. Recognition comes through steady, sincere advance.",
  },
  36: {
    number: 36,
    englishName: "Darkening of the Light",
    chineseName: "明夷",
    title: "Darkening of the Light (Míng Yí)",
    judgment:
      "Light is hidden. Endure difficulty with discretion; do not display your radiance.",
  },
  37: {
    number: 37,
    englishName: "The Family",
    chineseName: "家人",
    title: "The Family (Jiā Rén)",
    judgment:
      "Inner order brings success. Each in their role; warmth and discipline at home.",
  },
  38: {
    number: 38,
    englishName: "Opposition",
    chineseName: "睽",
    title: "Opposition (Kuí)",
    judgment:
      "Opposition in small matters succeeds. Seek small points of agreement amid estrangement.",
  },
  39: {
    number: 39,
    englishName: "Obstruction",
    chineseName: "蹇",
    title: "Obstruction (Jiǎn)",
    judgment:
      "Obstruction on the path. Turn inward for counsel; advance only when aligned.",
  },
  40: {
    number: 40,
    englishName: "Deliverance",
    chineseName: "解",
    title: "Deliverance (Xiè)",
    judgment:
      "Deliverance brings success. Release tension; forgive and move forward.",
  },
  41: {
    number: 41,
    englishName: "Decrease",
    chineseName: "損",
    title: "Decrease (Sǔn)",
    judgment:
      "Decrease with sincerity brings good fortune. Less can be more when chosen wisely.",
  },
  42: {
    number: 42,
    englishName: "Increase",
    chineseName: "益",
    title: "Increase (Yì)",
    judgment:
      "Increase brings good fortune. Give generously; benefit spreads when shared.",
  },
  43: {
    number: 43,
    englishName: "Breakthrough",
    chineseName: "夬",
    title: "Breakthrough (Guài)",
    judgment:
      "Breakthrough is announced in the court. Speak truth with resolve and clarity.",
  },
  44: {
    number: 44,
    englishName: "Coming to Meet",
    chineseName: "姤",
    title: "Coming to Meet (Gòu)",
    judgment:
      "Coming to meet unexpectedly. Beware what arrives unbidden; discern before embracing.",
  },
  45: {
    number: 45,
    englishName: "Gathering Together",
    chineseName: "萃",
    title: "Gathering Together (Cuì)",
    judgment:
      "Gathering together succeeds. Unite around a shared center with sincerity.",
  },
  46: {
    number: 46,
    englishName: "Pushing Upward",
    chineseName: "升",
    title: "Pushing Upward (Shēng)",
    judgment:
      "Pushing upward brings good fortune. Gradual ascent through sincerity and effort.",
  },
  47: {
    number: 47,
    englishName: "Oppression",
    chineseName: "困",
    title: "Oppression (Kùn)",
    judgment:
      "Oppression exhausts the spirit. Words lose power; endure with grace and patience.",
  },
  48: {
    number: 48,
    englishName: "The Well",
    chineseName: "井",
    title: "The Well (Jǐng)",
    judgment:
      "The well does not run dry. Return to the source that nourishes all.",
  },
  49: {
    number: 49,
    englishName: "Revolution",
    chineseName: "革",
    title: "Revolution (Gé)",
    judgment:
      "Revolution on the right day brings belief. Radical change when the time is ripe.",
  },
  50: {
    number: 50,
    englishName: "The Cauldron",
    chineseName: "鼎",
    title: "The Cauldron (Dǐng)",
    judgment:
      "The cauldron brings good fortune. Transform and refine what is offered.",
  },
  51: {
    number: 51,
    englishName: "The Arousing",
    chineseName: "震",
    title: "The Arousing (Zhèn)",
    judgment:
      "Shock comes and goes. Thunder awakens; maintain composure through sudden change.",
  },
  52: {
    number: 52,
    englishName: "Keeping Still",
    chineseName: "艮",
    title: "Keeping Still (Gèn)",
    judgment:
      "Keeping still calms the heart. Mountain stillness; do not stir rashly.",
  },
  53: {
    number: 53,
    englishName: "Development",
    chineseName: "漸",
    title: "Development (Jiàn)",
    judgment:
      "Gradual development brings success. Like the tree on the slope, grow steadily.",
  },
  54: {
    number: 54,
    englishName: "The Marrying Maiden",
    chineseName: "歸妹",
    title: "The Marrying Maiden (Guī Mèi)",
    judgment:
      "The marrying maiden in a secondary position. Align expectations with reality.",
  },
  55: {
    number: 55,
    englishName: "Abundance",
    chineseName: "豐",
    title: "Abundance (Fēng)",
    judgment:
      "Abundance reaches its peak. Enjoy fullness without clinging to it.",
  },
  56: {
    number: 56,
    englishName: "The Wanderer",
    chineseName: "旅",
    title: "The Wanderer (Lǚ)",
    judgment:
      "The wanderer succeeds through courtesy and caution. Passing through, not settling.",
  },
  57: {
    number: 57,
    englishName: "The Gentle",
    chineseName: "巽",
    title: "The Gentle (Xùn)",
    judgment:
      "The gentle penetrates softly. Wind persists; influence through subtlety.",
  },
  58: {
    number: 58,
    englishName: "The Joyous",
    chineseName: "兌",
    title: "The Joyous (Duì)",
    judgment:
      "The joyous brings success. Shared delight through honest exchange.",
  },
  59: {
    number: 59,
    englishName: "Dispersion",
    chineseName: "渙",
    title: "Dispersion (Huàn)",
    judgment:
      "Dispersion dissolves rigidity. Reunite what was scattered with openness.",
  },
  60: {
    number: 60,
    englishName: "Limitation",
    chineseName: "節",
    title: "Limitation (Jié)",
    judgment:
      "Limitation brings success. Measure and boundary create true freedom.",
  },
  61: {
    number: 61,
    englishName: "Inner Truth",
    chineseName: "中孚",
    title: "Inner Truth (Zhōng Fú)",
    judgment:
      "Inner truth moves even pigs and fish. Sincerity of heart brings good fortune.",
  },
  62: {
    number: 62,
    englishName: "Preponderance of the Small",
    chineseName: "小過",
    title: "Preponderance of the Small (Xiǎo Guò)",
    judgment:
      "Small matters succeed now. Attend to details; do not attempt the great leap.",
  },
  63: {
    number: 63,
    englishName: "After Completion",
    chineseName: "既濟",
    title: "After Completion (Jì Jì)",
    judgment:
      "After completion, small matters succeed. Guard against complacency when all seems in place.",
  },
  64: {
    number: 64,
    englishName: "Before Completion",
    chineseName: "未濟",
    title: "Before Completion (Wèi Jì)",
    judgment:
      "Before completion, success is near. Hope and vigilance carry the work to its end.",
  },
};

export function getHexagram(number: number): HexagramRecord {
  const record = HEXAGRAMS[number];
  if (record) return record;

  return {
    number,
    englishName: "Unknown",
    chineseName: "未知",
    title: `Hexagram ${number}`,
    judgment: "The judgment for this hexagram is not yet recorded.",
  };
}

export function getRandomHexagramNumber(): number {
  return Math.floor(Math.random() * 64) + 1;
}

/** Inline label, e.g. `31 · 咸 · Influence (Xián)` */
export function formatHexagramInline(hexagram: HexagramRecord): string {
  return `${hexagram.number} · ${hexagram.chineseName} · ${hexagram.title}`;
}
