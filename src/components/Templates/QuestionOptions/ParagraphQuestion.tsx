import { Flex, Input } from 'antd';
import Title from 'antd/es/typography/Title';

interface Props {
  onChange: (question: string) => void;
  value: string;
}
const ParagraphQuestion = ({ onChange, value }: Props) => {
  return (
    <Flex style={{ flexDirection: 'column', width: '100%' }}>
      <Title style={{ fontSize: '1rem' }}>Question</Title>
      <Input
        placeholder='Type here'
        onChange={(e) => onChange(e.target.value)}
        defaultValue={value}
        size='large'
      />
    </Flex>
  );
};

export default ParagraphQuestion;
