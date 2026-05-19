import {
  getHexagram as getHexagramRecord,
  type HexagramRecord,
} from "@/lib/hexagrams";

export type HexagramInfo = {
  number: number;
  nameZh: string;
  nameEn: string;
  summary: string;
};

/** Bottom-to-top binary per King Wen number (index 0 = hexagram 1). */
const HEXAGRAM_BINARIES: string[] = [
  "111111",
  "000000",
  "100010",
  "010001",
  "111010",
  "010111",
  "010000",
  "000010",
  "111011",
  "110111",
  "111000",
  "000111",
  "101111",
  "111101",
  "001000",
  "000100",
  "100110",
  "011001",
  "110000",
  "000011",
  "100101",
  "101001",
  "000001",
  "100000",
  "100111",
  "111001",
  "100001",
  "011110",
  "010010",
  "101101",
  "001110",
  "011100",
  "001111",
  "111100",
  "000101",
  "101000",
  "110101",
  "010100",
  "001010",
  "100011",
  "110001",
  "011000",
  "010110",
  "011101",
  "111110",
  "000110",
  "010000",
  "110110",
  "011011",
  "101110",
  "011101",
  "100100",
  "001001",
  "110100",
  "001011",
  "111010",
  "011110",
  "110001",
  "110011",
  "001011",
  "110100",
  "101011",
  "001010",
  "010101",
];

export function binaryToHexagramNumber(binary: string): number {
  const idx = HEXAGRAM_BINARIES.indexOf(binary);
  if (idx >= 0) return idx + 1;
  return (parseInt(binary, 2) % 64) + 1;
}

function toHexagramInfo(record: HexagramRecord): HexagramInfo {
  return {
    number: record.number,
    nameZh: record.chineseName,
    nameEn: record.englishName,
    summary: record.judgment,
  };
}

export function getHexagram(number: number): HexagramInfo {
  return toHexagramInfo(getHexagramRecord(number));
}
