import axios from 'axios';

export const S3UploadImage = async (
  imageUrl: string,
  fileName: string,
  // eslint-disable-next-line no-unused-vars
  getPresignedUrlFn: (fileName: string) => any,
) => {
  try {
    // 1. 외부 이미지 가져오기
    const response = await axios.get(imageUrl, {
      responseType: 'blob',
    });

    const fileType = response.headers['content-type'];
    const blob: Blob = response.data;

    // 2. blob을 File로 변환
    const file = new File([blob], fileName, { type: fileType });

    // 3. presigned URL 요청
    const { data: presignedData } = await getPresignedUrlFn(fileName);
    const presignedUrl = presignedData?.presignedUrl;

    if (!presignedUrl) throw new Error('Presigned URL이 유효하지 않습니다');

    // 4. S3에 PUT 업로드
    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    // 5. 업로드된 이미지의 공개 URL 반환
    return presignedUrl.split('?')[0];
  } catch (err: any) {
    console.error('외부 이미지 업로드 실패:', err.message);
    return null;
  }
};
