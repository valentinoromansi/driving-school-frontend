import React from 'react'
import { InfiniteScroll } from '../common/infinite-scroll'
import { Question } from '../model/model'
import { AnswersGroup } from './answers-group'

const MobilePage = () => {
  return (
    <div style={{ width: '100%', height: '90vh', overflow: 'hidden'}}>
      <InfiniteScroll<Question>
        pageSize={10}
        url={'http://localhost:8080/api/questions'}
        itemComponent={item => 
          <div style={{ border: '1px solid gray', padding: '12px' }}>
            <b>{item.text}</b>
            <br/><br/>
            <AnswersGroup answers={item.answers}/>
          </div>
        }>
      </InfiniteScroll>
    </div>
  )
}

export default MobilePage