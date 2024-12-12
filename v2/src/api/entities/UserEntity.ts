export class UserEntity {
  constructor(
    public  firstName: string,
    public  lastName: string,
    public  email: string,
    public  password: string,
    public  avatar?: string,
    public  _id?: string, 


    public  location?: {
      city?: string;
      state?: string;
      country?: string;
    }, 
    public  language?: string[], 
    public  school?: string,
    public  work?: string,
    public  about?: string
  ) {}

  
 



}
