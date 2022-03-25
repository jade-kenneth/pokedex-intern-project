export type SignupInputs = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};
export type SigninInputs = {
  password: string;
  email: string;
};

export type ResetInputs = {
  email: string;
};

export type ChangePasswordInput = {
  password: string;
  confirmPassword: string;
};
