import { IQuestion } from '../../../services/template/template.interface';
import CardWrapper from './CardWrapper';

import Questions from '../Questions';

interface Props {
  onChange: (questions: IQuestion[]) => void;
  questions: IQuestion[];
}
const AdditionalInformation = ({ onChange, questions }: Props) => {
  return (
    <CardWrapper cardTitle='Additional questions'>
      <Questions
        questions={questions}
        onChange={(questions) => onChange(questions)}
      />
    </CardWrapper>
  );
};

export default AdditionalInformation;
