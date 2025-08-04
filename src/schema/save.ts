import { z } from 'zod';

const saveSchema = z.object({
  url: z
    .string()
    .min(1, { message: 'URL을 입력해주세요' })
    .url({ message: '유효하지 않은 URL입니다' }),
  tags: z
    .array(z.string())
    .min(1, { message: '태그를 선택해주세요' })
    .max(3, { message: '최대 3개까지 선택가능해요' }),
  category: z.string().min(1, { message: '카테고리를 선택해주세요' }),
  title: z.string().min(1, { message: '제목을 입력해주세요' }),
  platform: z.string(),
  image: z.string(),
  memo: z.string().max(50, { message: '최대 50자까지 입력가능해요' }).optional(),
  date: z.string().optional(),
  time: z.string().optional(),
});

// 추가 Modal Schema
const modalAddSchema = (type: 'category' | 'tag', existingValues?: string[]) =>
  z.object({
    [type]: z
      .string()
      .min(1, {
        message: type === 'tag' ? '추가할 태그를 입력해주세요' : '추가할 카테고리를 입력해주세요',
      })
      .max(10, { message: '최대 10자까지 입력가능해요' })
      .refine((value) => !existingValues?.includes(value.trim()), {
        message: `이미 존재하는 ${type === 'tag' ? '태그' : '카테고리'}입니다.`,
      }),
  });

export { saveSchema, modalAddSchema };
