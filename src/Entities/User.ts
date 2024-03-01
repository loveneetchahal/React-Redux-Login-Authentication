export class User{
    userId: string;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    constructor(userId: string,userName: string,
        email: string,firstName: string,lastName: string) {
      this.userId = userId;
      this.userName = userName;
      this.email =email;
      this.firstName=firstName;
      this.lastName=lastName;
    }
  }