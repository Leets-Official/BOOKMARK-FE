import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { JsonOutputParser } from '@langchain/core/output_parsers';

const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const model = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo',
  temperature: 0.7,
  apiKey: openaiApiKey,
});

export async function getSuggestionTag(title: string) {
  const prompt = ChatPromptTemplate.fromTemplate(
    `
    You are a helpful assistant specialized in generating relevant and concise tags based on the content of titles.
    Given a title, analyze its meaning and context to suggest **3 to 5 relevant tags** that best describe its main topics, themes, or categories.

    Guidelines:
    - Tags must be in lowercase and use concise language (single words or short phrases).
    - Avoid generic or overly broad tags like "article", "information", or "miscellaneous".
    - Do not repeat words already in the title unless essential.
    - Output should be a valid JSON object.
    - Output should be in Korean.

    Input Title:
    "{title}"

    Output Format (JSON):
    {{
      "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
    }}
    `,
  );
  const outputParser = new JsonOutputParser();

  const chain = prompt.pipe(model).pipe(outputParser);

  const response = await chain.invoke({ title });

  return response;
}
