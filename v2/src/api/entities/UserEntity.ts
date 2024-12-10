export class UserEntity {
  constructor(
    public  firstName: string,
    public  lastName: string,
    public  email: string,
    public  password: string,
    public  avatar?: string,
    public  _id?: string, // MongoDB ObjectId


    public  location?: {
      city?: string;
      state?: string;
      country?: string;
    }, // `location` nesne olarak düzenlendi
    public  language?: string[], 
    public  school?: string,
    public  work?: string,
    public  about?: string
  ) {}

  
 



}
