class UserDto {
    constructor(firstName, lastName, role, age, email) {
        this.nombre = firstName;
        this.apellido = lastName;
        this.role = role;
        this.edad = age;
        this.email = email;
    }
}

module.exports = UserDto;