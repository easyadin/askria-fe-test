import { Flex, List, Switch } from 'antd';
import {
  IPersonalInformationConstraints,
  IProfileConstraints,
} from '../../services/template/template.interface';
import { labelMap } from '../../constants/forms';
import Checkbox from 'antd/es/checkbox/Checkbox';
import Title from 'antd/es/typography/Title';

type TRecognizedTypes = Partial<
  IPersonalInformationConstraints & IProfileConstraints
>;

type Props<T = TRecognizedTypes> = T & {
  onChange: (changes: T) => void;
  fieldKey: string;
};

type keyType = keyof typeof labelMap;

const LinearInformation = <T extends TRecognizedTypes>({
  fieldKey,
  onChange,
  ...rest
}: Props<T>) => {
  return (
    <List.Item>
      <Flex
        wrap='wrap'
        style={{ flexDirection: 'row', width: '100%' }}
        align='center'
        justify='space-between'
      >
        <Title style={{ fontSize: '.925rem', fontWeight: 'bold' }}>
          {labelMap[fieldKey as keyType]}
        </Title>
        <Flex gap={10} wrap='wrap'>
          {'internalUse' in rest && (
            <Checkbox
              defaultChecked={rest.internalUse}
              onChange={(e) =>
                onChange({
                  ...rest,
                  internalUse: e.target.checked,
                } as unknown as T)
              }
            >
              Internal use
            </Checkbox>
          )}

          {'mandatory' in rest && (
            <Checkbox
              defaultChecked={rest.mandatory}
              onChange={(e) =>
                onChange({
                  ...rest,
                  mandatory: e.target.checked,
                } as unknown as T)
              }
            >
              Mandatory
            </Checkbox>
          )}

          {'show' in rest && (
            <>
              <Switch
                defaultChecked={rest.show}
                onChange={(e) =>
                  onChange({
                    ...rest,
                    show: e,
                  } as unknown as T)
                }
              />
              Hide
            </>
          )}
        </Flex>
      </Flex>
    </List.Item>
  );
};

export default LinearInformation;
