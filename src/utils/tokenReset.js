function generateResetToken(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }
    return token;
}

module.exports = {
    generateResetToken
};
