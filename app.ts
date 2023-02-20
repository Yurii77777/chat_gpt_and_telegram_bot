/**
 * Made by Yurets in UA!
 * Copyright (c) GPL License <2023> <Yurii Andriiko>
 * Telegram @Yurets7777 E-mail: yuretshome@gmail.com
 * "Роби добре, та тільки добре! А можеш? - Роби краще!"
 */
const { Scenes, session } = require("telegraf");

import { bot } from "./config/telegram.config";

import { handleStartCommand } from "./commands/handleStartCommand";

import { setBotCommands } from "./utils/setBotCommands";
import { sendRegularMessageToAI } from "./utils/sendRegularMessageToAI";
import { requestValidation } from "./utils/requestValidation";

import { createCode } from "./scenes/createCode";
import { createImage } from "./scenes/createImage";

import MESSAGES_AU from "./translate/messagesUA.json";

const scenes = new Scenes.Stage([createCode, createImage]);

export const handleEvents = async (): Promise<any> => {
    await setBotCommands(bot);

    // Scenes
    bot.use(session());
    bot.use(scenes.middleware());

    // Menu commands handlers
    bot.start(async (ctx: any): Promise<any> => {
        await handleStartCommand({ ctx });
    });

    bot.command("code", async (ctx: any): Promise<any> => {
        await ctx.scene.enter("createCode");
    });

    bot.command("image", async (ctx: any): Promise<any> => {
        await ctx.scene.enter("createImage");
    });

    // Bot hears any text
    bot.use(async (ctx: any) => {
        const userRequest: null | string = ctx?.update?.message?.text;

        // To do minimum validation
        const isValidMessage: boolean = requestValidation(userRequest);

        if (!isValidMessage) {
            return await ctx.reply(MESSAGES_AU.ERROR_SHORT_MESSAGE);
        }

        await sendRegularMessageToAI({ ctx, userMessage: userRequest });
    });

    bot.launch();
};
