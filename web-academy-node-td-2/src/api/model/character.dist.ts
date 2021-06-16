export interface DistCharacter {
    id: number;
    name: string;
    real_name: string;
    birth: string;
    publisher: CharacterPublisher;
    gender: number;
    powers: CharacterPowers[];
    issues_died_in: Issues[];
}
interface CharacterPowers {
    id: number;
    name: string;
}
interface CharacterPublisher {
    id: number;
    name: string;
}
interface Issues {
    id: number;
    name: string;
}
