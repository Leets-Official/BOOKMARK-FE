import Card from '@/components/ui/card/Card';
import TextField from '@/components/ui/TextField';

interface LinkProps {
  visible: boolean;
  link: string;
  // eslint-disable-next-line no-unused-vars
  handleLink: (v: string) => void;
}

const LinkField = ({ visible, link, handleLink }: LinkProps) => {
  return (
    <div className='bg-white w-full rounded-[12px] shadow p-2 flex flex-col gap-3'>
      {visible && <Card title={link} platform='youtube' isLoading={false} editable={true} />}
      <TextField
        label='링크입력'
        placeholder='제목을 입력해주세요'
        onChange={handleLink}
        isCreateType={false}
      />
    </div>
  );
};

export default LinkField;
