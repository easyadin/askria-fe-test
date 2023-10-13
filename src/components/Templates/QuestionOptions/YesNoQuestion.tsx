import { Checkbox, Flex } from 'antd';
import ParagraphQuestion from './ParagraphQuestion';
import { IQuestion } from '../../../services/template/template.interface';

type Props = IQuestion & {
  onChange: (question: IQuestion) => void;
};
const YesNoQuestion = ({ onChange, ...rest }: Props) => {
  return (
    <Flex style={{ width: '100%', flexDirection: 'column' }} gap={16}>
      <ParagraphQuestion
        onChange={(question) => onChange({ ...rest, question })}
        value={rest.question}
      />

      <Checkbox
        defaultChecked={rest.disqualify}
        onChange={(e) => onChange({ ...rest, disqualify: e.target.checked })}
      >
        Disqualify candidate if the answer is no
      </Checkbox>
    </Flex>
  );
};

export default YesNoQuestion;
