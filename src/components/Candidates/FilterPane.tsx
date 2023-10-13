import {
  Checkbox,
  Collapse,
  CollapseProps,
  Divider,
  Flex,
  Input,
  InputProps,
} from 'antd';
import Title from 'antd/es/typography/Title';
import colors from '../../constants/colors';
import { SearchOutlined } from '@ant-design/icons';
import { CSSProperties, useState } from 'react';
import { DownOutlined, FileTextOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const filterCategories = {
  'Personal Information': ['Name', 'Email', 'Country', 'Age', 'Gender'],
  Education: ['Degree', 'Major', 'University', 'GPA'],
  'Work Experience': [
    'Internships',
    'Full-time positions',
    'Part-time positions',
    'Freelance projects',
  ],
  'Activity Filter': [
    'Volunteer work',
    'Student clubs',
    'Conferences attended',
    'Publications',
  ],
  'Advance Filter': [
    'Skills',
    'Languages spoken',
    'Certifications',
    'Recommendations',
  ],
};

const FilterPane = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('search_value');
  const [search, setSearch] = useState<string>(searchValue || '');

  const onSearch: InputProps['onChange'] = (e) => {
    const query = e.target.value;
    setSearch(query);
    const paramsString = Object.fromEntries(searchParams.entries());
    const updatedParams = { ...paramsString, search_value: query };
    delete (updatedParams as any).page;
    const queryParams = new URLSearchParams(updatedParams);
    const queryString = queryParams.toString();

    navigate(`${ROUTES.LANDING}?${queryString}`);
  };

  const [selections, setSelections] = useState<string[]>([]);

  const onFilterChange = (e: CheckboxChangeEvent) => {
    const name = e.target.name as string;
    if (e.target.checked) {
      const filters = new Set([...selections, name]);
      setSelections(Array.from(filters));
    } else {
      setSelections((state) => state.filter((s) => s !== name));
    }
  };

  const panelStyle: React.CSSProperties = {
    marginBottom: 0,
    backgroundColor: 'transparent',
  };

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (
    panelStyle
  ) =>
    Object.keys(filterCategories).map((key, index) => ({
      key: index,
      label: (
        <Flex gap={10} align='center'>
          <FileTextOutlined />
          <p style={{ padding: 0, margin: 0, fontWeight: '500' }}>{key}</p>
        </Flex>
      ),
      children: (
        <Flex style={{ flexDirection: 'column' }}>
          {filterCategories[key as keyof typeof filterCategories].map(
            (filter, index) => (
              <label key={`${filter}_${index}`}>
                <Flex gap={10} align='center'>
                  <Checkbox onChange={onFilterChange} name={filter} />
                  <p style={{ padding: 0, margin: 0 }}>{filter}</p>
                </Flex>
              </label>
            )
          )}
        </Flex>
      ),
      style: panelStyle,
    }));

  return (
    <Flex style={{ flexDirection: 'column', padding: 16 }} gap={20}>
      <Flex style={{ flexDirection: 'column' }} gap={0}>
        <Title
          style={{
            fontSize: '1.25rem',
            color: colors.primary,
            lineHeight: 'initial',
            margin: 0,
            padding: 0,
          }}
        >
          London Internship Program
        </Title>
        <p style={{ lineHeight: 'initial', margin: 0, padding: 0 }}>London</p>
      </Flex>

      <Flex style={{ flexDirection: 'column' }} gap={10}>
        <Input
          defaultValue={search}
          allowClear
          bordered={false}
          size='large'
          placeholder='Search by name, edu, exp or #tag'
          onChange={onSearch}
          type='search'
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 10,
          }}
          addonBefore={<SearchOutlined />}
        />

        <Flex
          style={{
            width: '100%',
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <Flex
            justify='space-between'
            style={{
              width: '100%',
              padding: '0 16px',
            }}
            align='center'
          >
            <p style={{ fontWeight: 'bold', fontSize: '0.89rem' }}>Filters</p>
            <p style={{ fontWeight: 'lighter', fontSize: '.8rem' }}>
              {selections.length} selected
            </p>
          </Flex>
          <Divider style={{ padding: 0, margin: 0 }} />
          <Collapse
            defaultActiveKey={0}
            expandIconPosition='end'
            bordered={false}
            expandIcon={({ isActive }) => (
              <DownOutlined
                rotate={isActive ? 180 : 0}
                style={{
                  width: 10,
                  // fontSize: '1rem',
                  fontWeight: 'bold',
                  color: colors.primary,
                }}
              />
            )}
            style={{ backgroundColor: 'white' }}
            items={getItems(panelStyle)}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FilterPane;
