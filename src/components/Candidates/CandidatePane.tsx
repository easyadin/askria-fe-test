import { Button, Divider, Dropdown, Flex, MenuProps, Tag } from 'antd';
import { Select } from 'antd';
import { useMemo, useState } from 'react';
import colors from '../../constants/colors';
import {
  TagOutlined,
  UserDeleteOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { candidateStatus, interviewStages } from '../../constants/candidates';
import CandidateList from './CandidateList';
import { useGetCandidates } from '../../services/candidate/candidate.queries';
import { useSearchParams } from 'react-router-dom';

const { Option } = Select;

const CandidatePane = () => {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('search_value');
  const { data } = useGetCandidates({});

  const [interviewStage, setInterviewStage] =
    useState<string>('Video Interview I');

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const onMenuClick: MenuProps['onClick'] = (e) => {
    setInterviewStage(
      interviewStages.find(({ key }) => key.toString() === e.key)
        ?.label as string
    );
  };

  const candidates = useMemo(() => {
    if (data) {
      const list = data?.pages.flatMap((p) => p.data);
      if (searchValue) {
        return list.filter((l) => {
          const concatenated_information = `${l.education[0].institution} ${
            l.personalInformation.firstName
          } ${
            l.personalInformation.lastName
          } ${l.tag.toString()} ${l.skills.toString()}`.toLowerCase();

          return concatenated_information.includes(searchValue.toLowerCase());
        });
      } else {
        return list;
      }
    }

    return [];
  }, [data, searchValue]);

  const statusOptions = useMemo(() => {
    return candidateStatus.map((status) => (
      <Option value={status.label} label={status.label} key={status.label}>
        <Flex justify='space-between' style={{ padding: 10 }}>
          <span aria-label={status.label}>{status.label}</span>
          <Tag bordered={false}>{status.count}</Tag>
        </Flex>
      </Option>
    ));
  }, []);

  return (
    <Flex style={{ flexDirection: 'column', padding: 16 }} gap={20}>
      <Flex justify='space-between'>
        <Select
          style={{
            width: '100%',
            maxWidth: 500,
            backgroundColor: 'white',
            borderRadius: 8,
            color: colors.primary,
            fontWeight: 'bold',
          }}
          defaultValue={['Opportunity Browsing']}
          onChange={handleChange}
          optionLabelProp='label'
          bordered={false}
          size='large'
        >
          {statusOptions}
        </Select>

        <Flex
          gap={8}
          justify='space-between'
          align='center'
          className='hide-on-mobile'
        >
          <Flex gap={8} justify='space-between' align='center'>
            <Button
              icon={<TagOutlined rotate={270} />}
              size='large'
              style={{ color: colors.primary }}
            />
            <Button
              icon={<UserDeleteOutlined style={{ color: 'red' }} />}
              size='large'
            />
            <Button
              icon={<UserAddOutlined />}
              size='large'
              style={{ color: colors.primary }}
            />
            <Button
              icon={<UserSwitchOutlined />}
              size='large'
              style={{ color: colors.primary }}
            />
            <Button
              icon={<MailOutlined />}
              size='large'
              style={{ color: colors.primary }}
            />
          </Flex>
          <Divider type='vertical' style={{ margin: 0, height: '100%' }} />
          <Dropdown.Button
            type='primary'
            size='large'
            menu={{ items: interviewStages, onClick: onMenuClick }}
          >
            {interviewStage}
          </Dropdown.Button>
        </Flex>
      </Flex>

      <Flex>
        <CandidateList candidates={candidates} />
      </Flex>
    </Flex>
  );
};

export default CandidatePane;
