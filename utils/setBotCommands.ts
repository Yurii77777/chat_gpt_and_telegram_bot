/**
 * Made by Yurets in UA!
 * Copyright (c) GPL License <2023> <Yurii Andriiko>
 * Telegram @Yurets7777 E-mail: yuretshome@gmail.com
 * "Роби добре, та тільки добре! А можеш? - Роби краще!"
 */
export const setBotCommands = async (bot: any): Promise<any> => {
    await bot.telegram.setMyCommands([
        {
            command: "/start",
            description: "активувати цю бісову машину 👿",
        },
        {
            command: "/code",
            description: "потрібен код 🧑‍💻",
        },
        {
            command: "/image",
            description: "намалюй картинку 👩‍🎨",
        },
    ]);
};
