import { Checkbox, Flex } from 'antd';
import ParagraphQuestion from './ParagraphQuestion';
import { IQuestion } from '../../../services/template/template.interface';
import Choices from './Choices';

type Props = IQuestion & {
  onChange: (question: IQuestion) => void;
};
const ChoiceQuestion = ({ onChange, ...rest }: Props) => {
  return (
    <Flex style={{ width: '100%', flexDirection: 'column' }} gap={16}>
      <ParagraphQuestion
        onChange={(question) => onChange({ ...rest, question })}
        value={rest.question}
      />

      <Choices
        choices={rest.choices}
        onChange={(choices) => onChange({ ...rest, choices })}
      />

      <Checkbox
        defaultChecked={rest.other}
        onChange={(e) => onChange({ ...rest, other: e.target.checked })}
      >
        Enable "Other" option
      </Checkbox>
    </Flex>
  );
};

export default ChoiceQuestion;
