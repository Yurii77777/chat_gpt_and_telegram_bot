/**
 * Made by Yurets in UA!
 * Copyright (c) GPL License <2023> <Yurii Andriiko>
 * Telegram @Yurets7777 E-mail: yuretshome@gmail.com
 * "Роби добре, та тільки добре! А можеш? - Роби краще!"
 */
const { Markup } = require("telegraf");

import { handleDelayedSendMessage } from "../utils/handleDelayedSendMessage";

import MESSAGES_AU from "../translate/messagesUA.json";

export const handleStartCommand = async (options: {
    ctx: any;
}): Promise<any> => {
    const { ctx } = options;
    const { first_name } = ctx.from;

    await ctx.reply(`${first_name}, ${MESSAGES_AU.NEW_USER_START_MESSAGE_1}`);

    await handleDelayedSendMessage({
        delayValue: 2000,
        ctx,
        message: `${MESSAGES_AU.NEW_USER_START_MESSAGE_2}`,
    });

    await handleDelayedSendMessage({
        delayValue: 5000,
        ctx,
        message: `${MESSAGES_AU.NEW_USER_START_MESSAGE_3}`,
    });
};
