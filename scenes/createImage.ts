/**
 * Made by Yurets in UA!
 * Copyright (c) GPL License <2023> <Yurii Andriiko>
 * Telegram @Yurets7777 E-mail: yuretshome@gmail.com
 * "Роби добре, та тільки добре! А можеш? - Роби краще!"
 */
const { Scenes } = require("telegraf");
import { OpenAIApi } from "openai";

import { bot } from "../config/telegram.config";
import { CONFIGURATION } from "../config/openAIconfig";

import { requestValidation } from "../utils/requestValidation";

import MESSAGES_AU from "../translate/messagesUA.json";

export const createImage = new Scenes.WizardScene(
    "createImage",
    async (ctx: any): Promise<any> => {
        const chatId = ctx?.update?.message?.from?.id;

        try {
            await ctx.reply(MESSAGES_AU.SEND_REQUEST, { parse_mode: "html" });
        } catch (error) {
            console.log("[error.message]", error.message);
        }

        ctx.wizard.state.userData = {};
        ctx.wizard.state.userData.chatId = chatId;

        // Go to next step
        return ctx.wizard.next();
    },
    async (ctx: any): Promise<any> => {
        // Here we have first message from user
        const userRequest: string = ctx.message.text;
        const isValidRequest = requestValidation(userRequest);

        if (!isValidRequest) {
            try {
                await ctx.reply(MESSAGES_AU.ERROR_SHORT_MESSAGE, {
                    parse_mode: "html",
                });
            } catch (error) {
                console.log("[error.message]", error.message);
            }

            return;
        }

        const openai = new OpenAIApi(CONFIGURATION);

        const { status, data } = await openai.createImage({
            prompt: userRequest,
            n: 4,
            size: "1024x1024", // Must be one of 256x256, 512x512, or 1024x1024
        });

        if (status !== 200) {
            return await ctx.reply(MESSAGES_AU.ERROR_AI_REQUEST);
        }

        const { data: createdImages } = data;

        const isAnswer: boolean = !!createdImages?.length;

        if (!isAnswer) {
            return await ctx.reply(MESSAGES_AU.NO_ANSWER);
        }

        const { chatId } = ctx.wizard.state.userData;

        for (let i = 0; i < createdImages.length; i++) {
            const img_url = createdImages[i];

            try {
                await bot.telegram.sendPhoto(chatId, img_url);
            } catch (error) {
                console.log("[error.message]", error.message);
            }
        }

        return ctx.scene.leave();
    }
);
