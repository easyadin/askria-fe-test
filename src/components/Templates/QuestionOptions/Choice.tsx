import { Button, Flex, Input } from 'antd';
import { UnorderedListOutlined, EditOutlined } from '@ant-design/icons';
interface Props {
  onChange: (value: string) => void;
  value: string;
  isLastChoice: boolean;
  onCreateEmptyChoice: VoidFunction;
}
const Choice = ({
  onChange,
  value,
  isLastChoice,
  onCreateEmptyChoice,
}: Props) => {
  return (
    <Flex
      gap={8}
      style={{ flexDirection: 'row' }}
      justify='space-between'
      align='center'
    >
      <UnorderedListOutlined />
      <Input
        size='large'
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {isLastChoice && (
        <Button
          type='text'
          icon={<EditOutlined />}
          onClick={onCreateEmptyChoice}
        />
      )}
    </Flex>
  );
};

export default Choice;
