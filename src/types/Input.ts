type CommonInput = {
  email: string;
  password: string;
};

export type SignupInputs = CommonInput & {
  firstName: string;
  lastName: string;
};
export type SigninInputs = CommonInput & {
  firstName?: never;
  lastName?: never;
};

export type ResetInputs = {
  email: string;
};

export type AllInputs = CommonInput & {
  firstName: string;
  lastName: string;
};
