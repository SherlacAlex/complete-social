import { object, string } from "yup";
import { ILoginData, ISignUpData } from "../models/AuthData";

export class AuthFormHelperService {
  public getSignUpFormSchema() {
    let schema = object().shape({
      username: string().required('Required'),
      email: string().required('Requied').email('Invalid email format'),
      password: string().required('Required').min(8, 'Password must have minimum 8 characters.'),
    });
    return schema;
  }

  public getSignUpDefaultValues(): ISignUpData {
    let values: ISignUpData = {
      email: '',
      password: '',
      username: '',
    };
    return values;
  }

  public getLoginFormSchema() {
    let schema = object().shape({
      username: string().required('Required'),
      password: string().required('Required'),
    });
    return schema;
  }

  public getLoginDefaultValues(): ILoginData {
    let values: ILoginData = {
      password: '',
      username: '',
    };
    return values;
  }
}

export const authFormHelperService = new AuthFormHelperService();