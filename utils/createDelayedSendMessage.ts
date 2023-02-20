/**
 * Made by Yurets in UA!
 * Copyright (c) GPL License <2023> <Yurii Andriiko>
 * Telegram @Yurets7777 E-mail: yuretshome@gmail.com
 * "Роби добре, та тільки добре! А можеш? - Роби краще!"
 */
export const createDelayedSendMessage = (timerValue: number): Promise<any> => {
  return new Promise((resolve) => setTimeout(resolve, timerValue));
};
