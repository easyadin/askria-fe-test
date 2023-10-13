import { List } from 'antd';
import {
  IPersonalInformation,
  IPersonalInformationConstraints,
} from '../../../services/template/template.interface';
import CardWrapper from './CardWrapper';
import { useMemo } from 'react';
import LinearInformation from '../LinearInformation';
import Questions from '../Questions';

type Props = IPersonalInformation & {
  onChange: (info: IPersonalInformation) => void;
};
const PersonalInformation = ({ onChange, ...info }: Props) => {
  const constrainedProperties = useMemo(() => {
    return Object.keys(info)
      .filter((key) => key !== 'personalQuestions')
      .map((key) => {
        const typedKey = key as keyof IPersonalInformation;
        return {
          ...info[typedKey],
          onChange: (changes: IPersonalInformationConstraints) =>
            onChange({ ...info, [key]: changes }),
          key,
        };
      });
  }, [info]);

  return (
    <CardWrapper cardTitle='Personal Information'>
      <List
        style={{ marginTop: -20 }}
        itemLayout='horizontal'
        dataSource={constrainedProperties}
        renderItem={(item) => (
          <LinearInformation<IPersonalInformationConstraints>
            {...(item as IPersonalInformationConstraints)}
            fieldKey={item.key}
            onChange={(changes) =>
              item.onChange(changes as IPersonalInformationConstraints)
            }
          />
        )}
      ></List>

      <Questions
        questions={info.personalQuestions}
        onChange={(questions) =>
          onChange({ ...info, personalQuestions: questions })
        }
      />
    </CardWrapper>
  );
};

export default PersonalInformation;
