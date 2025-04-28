module.exports = class CreateAdminDto {
  constructor(name, email, password, role = 'admin') {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
};
