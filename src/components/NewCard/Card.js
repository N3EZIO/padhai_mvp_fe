import './card.css'
import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import CardModal from './CardModal'
// import { Data } from '../../containers/Data/Data'



const Card = () => {

    const [isFlipped, setIsFlipped] = useState(false)
    const [selectedOptionId, setSelectedOptionId] = useState(0)
    const [next_qid,setNextqid] = useState(0);
    const [qid, setQid] = useState(next_qid === 0 ? Math.floor(Math. random() * (390 - 1 + 1)) + 1 : next_qid);
    const[Data, setData] = useState(null)
    const [loading, setLoading] = useState(false);
    
    const baseUrl = 'http://localhost:8000/question/';
    // console.log('hello');

    const fetchData = async (q_id) => {
        // console.log('hell1')

        try{const { data } = await axios.get(baseUrl + q_id);
        // console.log(res?.data);
        setData(data);
        console.log(Data);}
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        
        fetchData(qid);
    }, [qid])


  const handleChange = (e, subjectNum) => {

    setSelectedOptionId(Number(e.target.value))
    
  }

  // To flip the card
  const handleCardFlip = async (subjectNum) => {
    setLoading(false);
    setIsFlipped(!isFlipped)

  }

  // To reset the options after each question
  const resetOptions = (subjectNum) => {

    setSelectedOptionId(0)
  }

  // Or more precisely, handleSubmit
  const handleClick = async (subjectNum) => {
    
    // Flip the card to show the solution after submitting
    
    try {
      const resp = await axios.post(baseUrl + qid, {
        option: selectedOptionId
      })
      console.log(resp);
      setQid(resp.data.next_question + 1);
      console.log(qid);
      setLoading(!loading);
      await handleCardFlip(subjectNum)
      // setNextqid(qid);
      // window.location.reload(false);
    } catch (error) {
        console.log(error);
    }

   
    
    // ***Jugaad*** - The answer/explanation to next question available after the card has flipped
    window.setTimeout(() => {
      // Call, to reset the options after each question
      resetOptions(subjectNum)
    }, 200)
  }

  return (
    Data &&
    (<Container className='card-container'>
        <Row>
        
        <Col lg={4} md={4} sm={4} className='mt-4 '>
            <CardModal data={Data} isFlipped={isFlipped} handleClick={ () => handleClick(1) } handleCardFlip={ () => handleCardFlip(1) } selectedOptionId={selectedOptionId} handleChange={ (e) => handleChange(e) } loading = {loading}/>
        </Col>
        
        </Row>
    </Container>)
  )
}

export default Card