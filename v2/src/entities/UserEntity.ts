export class UserEntity {
    
    constructor(
      public readonly _id? : string,
      public readonly name? : string,
      public readonly email? : string,
      public readonly password ? : string
    ){}
}
