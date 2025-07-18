import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';

const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const tagSchema = z.object({
  tags: z.array(z.string()).describe('Array of suggested tags based on title analysis'),
});

const model = new ChatOpenAI({
  modelName: 'gpt-4o-mini',
  temperature: 0.7,
  apiKey: openaiApiKey,
});

export async function getSuggestionTag(title: string) {
  const prompt = ChatPromptTemplate.fromTemplate(
    `
    Your task is to infer and suggest 3 to 5 relevant tags based solely on the given article title.
    Do not just extract keywords. Instead, **analyze the title carefully**, and **infer the implied topic, context, and author’s intent**.
    Use your knowledge of common article patterns, technical domains, and writing purposes to make an educated guess.

    **Guidelines:**
    - Tags must be relevant, specific, and helpful for categorizing or searching the article.
    - Tags must be in lowercase and formatted as a list of strings in valid JSON.
    - Avoid vague or generic terms like "article" or "information".
    - Use your reasoning to go beyond what is explicitly written.
    - Output should be in Korean.

    Input Title:
    "{title}"
    `,
  );

  const structuredModel = model.withStructuredOutput(tagSchema, {
    name: 'tag_suggestion',
  });

  const response = await structuredModel.invoke(await prompt.format({ title }));
  return response;
}
