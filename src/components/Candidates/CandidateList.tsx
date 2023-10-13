import { Avatar, Checkbox, Divider, Flex, List, Skeleton, Tag } from 'antd';
import { ICandidate } from '../../services/candidate/candidate.interface';
import colors from '../../constants/colors';
import VirtualList from 'rc-virtual-list';

const ContainerHeight = window.innerHeight - 160;

interface Props {
  candidates: ICandidate[];
}
const CandidateList = ({ candidates }: Props) => {
  return (
    <List
      size='large'
      style={{ width: '100%', backgroundColor: 'white', borderRadius: 8 }}
      className='demo-loadmore-list'
      itemLayout='horizontal'
      dataSource={candidates}
    >
      <Flex
        style={{ padding: 25, flexDirection: 'row' }}
        align='center'
        justify='space-between'
      >
        <Flex style={{ flexDirection: 'row' }} gap={20} align='center'>
          <Checkbox />
          <div
            style={{
              color: colors.primary,
              fontSize: '.9rem',
              fontWeight: 'bold',
            }}
          >
            {candidates.length} Candidates
          </div>
        </Flex>

        <Flex
          style={{ flexDirection: 'row' }}
          gap={9}
          align='center'
          justify='space-between'
        >
          <Flex>
            <div style={{ color: colors.primary }}>Qualified</div>
          </Flex>
          <Divider type='vertical' />
          <Flex>
            <div>Task</div>
            <Tag
              style={{ borderRadius: 20, fontSize: '.7rem', marginLeft: 4 }}
              color='default'
              bordered={false}
            >
              25
            </Tag>
          </Flex>
          <Divider type='vertical' />
          <Flex>
            <div>Disqualified</div>
            <Tag
              style={{ borderRadius: 20, fontSize: '.7rem', marginLeft: 4 }}
              color='default'
              bordered={false}
            >
              75
            </Tag>
          </Flex>
        </Flex>
      </Flex>
      <Divider style={{ margin: 0 }} />

      <VirtualList
        data={candidates}
        height={ContainerHeight}
        itemHeight={47}
        itemKey='id'
      >
        {(candidate: ICandidate) => (
          <List.Item>
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                style={{ alignItems: 'center' }}
                avatar={
                  <Flex gap={10}>
                    <Checkbox />
                    <Avatar
                      size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                      }}
                      src={candidate.profileImage}
                    />
                  </Flex>
                }
                title={
                  <a style={{ fontSize: '1.2rem', fontWeight: 'bolder' }}>
                    {candidate.personalInformation.firstName}{' '}
                    {candidate.personalInformation.lastName}
                  </a>
                }
                description={
                  <Flex style={{ flexDirection: 'column' }} gap={6}>
                    <div
                      style={{
                        fontSize: '.9rem',
                        fontWeight: '600',
                        color: 'black',
                      }}
                    >
                      {candidate.personalInformation.currentResidence}
                    </div>
                    <div
                      style={{
                        fontSize: '.9rem',
                        fontWeight: 'lighter',
                        color: 'black',
                      }}
                    >
                      {`
                    ${candidate.education[0].level} - ${candidate.education[0].institution} (${candidate.education[0].from} - ${candidate.education[0].to})
                    `}
                    </div>

                    <div
                      style={{
                        fontSize: '.8rem',
                        color: colors.primary,
                        display: 'flex',
                        gap: 8,
                      }}
                    >
                      {candidate.tag.map((t) => (
                        <span key={t}>#{t}</span>
                      ))}
                    </div>

                    <div
                      style={{
                        fontSize: '.8rem',
                        color: colors.primary,
                        display: 'flex',
                        gap: 8,
                      }}
                    >
                      {candidate.skills.map((t) => (
                        <Tag
                          key={t}
                          color='cyan'
                          style={{ borderRadius: 20, fontWeight: '500' }}
                        >
                          {t}
                        </Tag>
                      ))}
                    </div>
                  </Flex>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default CandidateList;
