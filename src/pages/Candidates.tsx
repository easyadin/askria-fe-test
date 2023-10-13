import { Col, Row } from 'antd';
import FilterPane from '../components/Candidates/FilterPane';
import CandidatePane from '../components/Candidates/CandidatePane';
import { Fragment } from 'react';

/**
 * Temporary hide/show solution
 */
const Candidates = () => {
  return (
    <Fragment>
      <div
        className='hide-on-mobile'
        style={{ overflow: 'hidden', height: '100vh' }}
      >
        <Row>
          <Col span={7}>
            <FilterPane />
          </Col>
          <Col span={17}>
            <CandidatePane />
          </Col>
        </Row>
      </div>

      <div className='hide-on-desktop'>
        <CandidatePane />
      </div>
    </Fragment>
  );
};

export default Candidates;
