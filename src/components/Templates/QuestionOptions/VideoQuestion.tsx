import { Flex } from 'antd';
import { IQuestion } from '../../../services/template/template.interface';
import ParagraphQuestion from './ParagraphQuestion';

type Props = IQuestion & {
  onChange: (question: IQuestion) => void;
};
const VideoQuestion = ({ onChange, ...rest }: Props) => {
  return (
    <Flex style={{ width: '100%', flexDirection: 'column' }} gap={16}>
      <ParagraphQuestion
        onChange={(question) => onChange({ ...rest, question })}
        value={rest.question}
      />
    </Flex>
  );
};

export default VideoQuestion;
