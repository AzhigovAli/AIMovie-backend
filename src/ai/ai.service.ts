import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';

@Injectable()
export class AiService {
  /**
   *
   * @param messages {}
   * @returns
   */
  async createRequestAI(messages: ChatCompletionCreateParamsBase['messages']) {
    try {
      const client = new OpenAI({
        baseURL: 'https://router.huggingface.co/v1',
        apiKey: process.env.HF_TOKEN,
      });

      const response = await client.chat.completions.create({
        model: 'deepseek-ai/DeepSeek-V3.2-Exp:novita',
        messages,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.log(error);
    }
  }
}
