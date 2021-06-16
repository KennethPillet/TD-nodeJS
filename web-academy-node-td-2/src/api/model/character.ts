import { DistCharacter } from './character.dist';

enum Genders {male = 1, female}

export class Character {
  public id: number;
  public name: string;
  public realName: string;
  public birth: string;
  public publisher: string;
  public gender: keyof typeof Genders;
  public isDead: boolean;
  public numberOfDeath: number;
  public powers: string[];

  constructor(distChara: DistCharacter ) {
    this.id = distChara.id;
    this.name = distChara.name;
    this.realName = distChara.real_name;
    this.birth = distChara.birth;
    this.publisher = distChara.publisher.name;
    this.gender = Genders[distChara.gender] as keyof typeof Genders;
    this.isDead = distChara.issues_died_in.length > 0;
    this.numberOfDeath = distChara.issues_died_in.length;
    this.powers = distChara.powers.map(({ name }) => name);
    return this;
  }
  // tslint:disable-next-line: max-line-length
  // constructor( name: string, realName: string, birth: string, publisher: string, gender: Genders, isDead: boolean, numberOfDeath: number, powers: string[] ) {
  //   this.name = name;
  //   this.realName = realName;
  //   this.birth = birth;
  //   this.publisher = publisher;
  //   this.gender = gender;
  //   this.isDead = isDead;
  //   this.numberOfDeath = numberOfDeath;
  //   this.powers = powers;
  //   return this;
  // }

}
