import { Flex } from 'antd';
import { IQuestion } from '../../../services/template/template.interface';
import Title from 'antd/es/typography/Title';
import Choice from './Choice';
import { Fragment, useMemo, useState } from 'react';

type Props = Pick<IQuestion, 'choices'> & {
  onChange: (choices: string[]) => void;
};
const Choices = ({ choices, onChange }: Props) => {
  const [state, setState] = useState(choices || ['']);

  const choiceList = useMemo(() => {
    return state;
  }, [choices, state]);

  return (
    <Flex style={{ flexDirection: 'column' }}>
      <Title style={{ fontSize: '1rem', paddingLeft: 16 }}>Choices</Title>
      <Flex style={{ flexDirection: 'column' }} gap={4}>
        {choiceList?.map((c, index) => (
          <Fragment key={index}>
            <Choice
              onChange={(value) => {
                choiceList[index] = value;
                onChange(choiceList);
              }}
              value={c}
              isLastChoice={index === choiceList.length - 1}
              onCreateEmptyChoice={() => {
                const choices = [...choiceList];
                choices.push('');
                onChange(choices);
                setState(choices);
              }}
            />
          </Fragment>
        ))}
      </Flex>
    </Flex>
  );
};

export default Choices;
