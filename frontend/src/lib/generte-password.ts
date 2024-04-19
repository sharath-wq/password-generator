function generateRandomPassword(
    length: number,
    uppercase: boolean,
    lowercase: boolean,
    numbers: boolean,
    symbols: boolean
): string {
    const uppercaseChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars: string = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars: string = '0123456789';
    const symbolChars: string = '!@#$%^&*()_+{}[]|:;<>,.?/~';

    let charset: string = '';
    let password: string = '';

    if (uppercase) charset += uppercaseChars;
    if (lowercase) charset += lowercaseChars;
    if (numbers) charset += numberChars;
    if (symbols) charset += symbolChars;

    for (let i = 0; i < length; i++) {
        const randomIndex: number = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
}

export { generateRandomPassword };
