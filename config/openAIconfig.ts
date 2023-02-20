/**
 * Made by Yurets in UA!
 * Copyright (c) GPL License <2023> <Yurii Andriiko>
 * Telegram @Yurets7777 E-mail: yuretshome@gmail.com
 * "Роби добре, та тільки добре! А можеш? - Роби краще!"
 */
import { Configuration } from "openai";

export const CONFIGURATION = new Configuration({
    organization: process.env["OPEN_AI_ORGANIZATION_AUTH_TOKEN"],
    apiKey: process.env["OPEN_AI_USER_AUTH_TOKEN"],
});
