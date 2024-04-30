export class UserAuth {
    public loggedStatus: boolean;
    public userData: any;

    constructor(obj: Partial<UserAuth>) {
        this.loggedStatus = obj.loggedStatus!;
        this.userData = obj.userData!;
    }
}