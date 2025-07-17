import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { z } from 'zod';
import { RunnableSequence } from '@langchain/core/runnables';

const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const schema = z.object({
  tags: z.array(z.string()),
});

const parser = StructuredOutputParser.fromZodSchema(schema);

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

    {format_instructions}
    `.trim(),
  );

  const chain = RunnableSequence.from([prompt, model, parser]);

  const response = await chain.invoke({
    title,
    format_instructions: parser.getFormatInstructions(),
  });

  return response;
}
