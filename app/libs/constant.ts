export const PASSWORD_MIN_LENGTH = 5;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?= .*[A-z])(?= .*\d)(?=. *?[#?!@$%^&*-]).+$/
);
