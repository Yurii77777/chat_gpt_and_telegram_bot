/**
 * Made by Yurets in UA!
 * Copyright (c) GPL License <2023> <Yurii Andriiko>
 * Telegram @Yurets7777 E-mail: yuretshome@gmail.com
 * "Роби добре, та тільки добре! А можеш? - Роби краще!"
 */
require("dotenv").config();

import { handleEvents } from "./app";

const start = async (): Promise<any> => {
    try {
        // Start Telegram Bot
        await handleEvents();
    } catch (error) {
        console.log("The Pelart Bot has not been launched :::", error.message);
    }
};

start();
