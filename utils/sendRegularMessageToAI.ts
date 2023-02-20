/**
 * Made by Yurets in UA!
 * Copyright (c) GPL License <2023> <Yurii Andriiko>
 * Telegram @Yurets7777 E-mail: yuretshome@gmail.com
 * "Роби добре, та тільки добре! А можеш? - Роби краще!"
 */
import { OpenAIApi } from "openai";

import { CONFIGURATION } from "../config/openAIconfig";

import MESSAGES_AU from "../translate/messagesUA.json";
import { OPEN_AI_MODELS } from "../constants/openAImodels";

export const sendRegularMessageToAI = async (options: {
    ctx: any;
    userMessage: string;
}) => {
    const { ctx, userMessage } = options;

    const openai = new OpenAIApi(CONFIGURATION);

    try {
        const { status, data } = await openai.createCompletion({
            model: OPEN_AI_MODELS.TEXT_MODEL_003,
            prompt: userMessage,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: [" Human:", " AI:"],
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
        return await ctx.reply(text);
    } catch (error) {
        console.log("[error.message]", error.message);
        return await ctx.reply(MESSAGES_AU.ERROR_AI_REQUEST);
    }
};
