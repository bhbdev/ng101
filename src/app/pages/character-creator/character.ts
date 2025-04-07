
interface BodyPartConfig {
    width: number;
    height: number;
    position?: number;
}

interface EyeStyleOption {
    classList: string;
  }
interface EyeStyle {
    color: string;
    style: EyeStyleOption
}

interface Limbs {
    left: BodyPartConfig;
    right: BodyPartConfig;
}

interface Character {
    name: string;
    skin: string;
    head: BodyPartConfig;
    body: BodyPartConfig;
    arms: Limbs;
    legs: Limbs;
    eyes: EyeStyle;
    zPos?: number;
}

const skinColors:string[] = [
    '#ffdfcf', 
    '#ffdbac', 
    '#f1c27d', 
    '#c68642', 
    '#8d5524', 
    '#4c3024', 
    '#221a15',
    '#268426',
    '#d8468f',
    'linear-gradient(#ffffff 50%, #9b9b9b)',
    'linear-gradient(rgb(255, 94, 94) 50%,rgb(180, 19, 19))'
];
const eyeColors: string[] = [
    '#000000', 
    '#6FA8DC', 
    '#808080', 
    '#D9A7A0', 
    '#FF6F61', 
    '#3399FF', 
    '#66FF66', 
    '#FFB347'
];
const eyeStyles: EyeStyleOption[] = [
    { classList: 'w-1 h-1' },
    { classList: 'w-2 h-2' },
    { classList: 'w-1 h-2' },
    { classList: 'w-2 h-1' },
];

export type { Character, BodyPartConfig, EyeStyle, EyeStyleOption };
export { skinColors, eyeColors, eyeStyles };