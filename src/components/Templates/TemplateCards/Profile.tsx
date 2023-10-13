import { List } from 'antd';
import {
  IProfile,
  IProfileConstraints,
} from '../../../services/template/template.interface';
import CardWrapper from './CardWrapper';
import { useMemo } from 'react';
import LinearInformation from '../LinearInformation';
import Questions from '../Questions';

type Props = IProfile & {
  onChange: (info: IProfile) => void;
};
const Profile = ({ onChange, ...info }: Props) => {
  const constrainedProperties = useMemo(() => {
    return Object.keys(info)
      .filter((key) => key !== 'profileQuestions')
      .map((key) => {
        const typedKey = key as keyof IProfile;
        return {
          ...info[typedKey],
          onChange: (changes: IProfileConstraints) =>
            onChange({ ...info, [key]: changes }),
          key,
        };
      });
  }, [info]);

  return (
    <CardWrapper cardTitle='Profile'>
      <List
        style={{ marginTop: -20 }}
        itemLayout='horizontal'
        dataSource={constrainedProperties}
        renderItem={(item) => (
          <LinearInformation<IProfileConstraints>
            {...(item as IProfileConstraints)}
            fieldKey={item.key}
            onChange={(changes) =>
              item.onChange(changes as IProfileConstraints)
            }
          />
        )}
      ></List>

      <Questions
        questions={info.profileQuestions}
        onChange={(questions) =>
          onChange({ ...info, profileQuestions: questions })
        }
      />
    </CardWrapper>
  );
};

export default Profile;
