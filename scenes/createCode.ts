/**
 * Made by Yurets in UA!
 * Copyright (c) GPL License <2023> <Yurii Andriiko>
 * Telegram @Yurets7777 E-mail: yuretshome@gmail.com
 * "Роби добре, та тільки добре! А можеш? - Роби краще!"
 */
const { Scenes } = require("telegraf");
import { OpenAIApi } from "openai";

import { CONFIGURATION } from "../config/openAIconfig";

import { requestValidation } from "../utils/requestValidation";

import MESSAGES_AU from "../translate/messagesUA.json";
import { OPEN_AI_MODELS } from "../constants/openAImodels";

export const createCode = new Scenes.WizardScene(
    "createCode",
    async (ctx: any): Promise<any> => {
        try {
            await ctx.reply(MESSAGES_AU.SEND_REQUEST, { parse_mode: "html" });
        } catch (error) {
            console.log("[error.message]", error.message);
        }

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

        try {
            const { status, data } = await openai.createCompletion({
                model: OPEN_AI_MODELS.CODE_MODEL_002,
                prompt: `"""\n${userRequest}\n"""\n`,
                temperature: 0,
                max_tokens: 64,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
                stop: ['"""'],
            });

            if (status !== 200) {
                return await ctx.reply(MESSAGES_AU.ERROR_AI_REQUEST);
            }

            const { choices } = data;

            const isAnswer: boolean = !!choices.length;

            if (!isAnswer) {
                return await ctx.reply(MESSAGES_AU.NO_ANSWER);
            }

            const { text } = choices[0];
            await ctx.reply(text);
        } catch (error) {
            console.log("[error.message]", error.message);
            return await ctx.reply(MESSAGES_AU.ERROR_AI_REQUEST);
        }

        return ctx.scene.leave();
    }
);
