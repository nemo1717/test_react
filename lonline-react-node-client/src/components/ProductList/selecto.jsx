import React, { useEffect, useState} from 'react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { FaBed, FaBath, FaMapMarkerAlt } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import millify from 'millify';
import ImageScrollbar from './ImageScrollbar';
import axios from 'axios'
import rMainImg2 from '../Homepage/images/rhome1.jpg'
import { sliderItems } from '../Homepage/sliderData';
import Footer from '../Homepage/footer';
import Navbar from '../Homepage/navbar';
import Announcements from '../Homepage/announcement';
import {Room} from '@material-ui/icons';

const Selecto = (props) => {
   var isVerified = true;
   var rentFrequency = 'monthly';
   var photos = true
   var furnishingStatus = 'Furnished'
   const [ data, setData ] = useState([]);
   const propes = props;
   const token = propes.match.params.id

   useEffect(() => {
    axios.post("http://localhost:5000/selected-product", {
        prop_id : token,
      })
      .then((res) => {
        setData(res.data);
        console.log(data)
       })
       .catch((err) => console.log(err));
      },[]);

  return (
    <div>
      <Navbar/>
      <Announcements/>
      <br/>
      {data.map((item) => (
      <Box>
        {item.prop_cat == 1 ? 
        <Box maxWidth='1000px' margin='auto' p='4'>
          <React.Fragment>
            {photos && <ImageScrollbar data={sliderItems} />}
            <Box w='full' p='6'>
              <Flex paddingTop='2' alignItems='center'>
                <Box paddingRight='3' color='green.400'></Box>
                <Text fontWeight='bold' fontSize='lg'>
                  &#8358; {item.price.toLocaleString()}
                </Text>
                <Spacer />
              </Flex>
              <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
                {item.bedroom}<FaBed /> | {item.bathroom} <FaBath /> | {millify(item.size)} sqft <BsGridFill />
              </Flex>
              <br/>
              <Box>
                <Room style={{marginRight:"8px"}}/> {item.city}, {item.state}, {item.country}
              </Box>
            </Box>
            <Box marginTop='2' margin= '8px'>
              <Text fontSize='18px' marginBottom='2' fontWeight='bold'>Additional Information</Text>
              <Text lineHeight='2' color='gray.600'>{item.description}ffffffffff</Text>
            </Box>
            <Flex flexWrap='wrap' margin= '8px' textTransform='uppercase' justifyContent='space-between'>
              <Flex  w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
                <Text>Type</Text>
                <Text margin = '0 auto 15px' fontWeight='bold'>{item.prop_type}</Text>
              </Flex>
              <Flex w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
                <Text>Purpose</Text>
                <Text margin = '0 auto 15px' fontWeight='bold'>{item.purpose}</Text>
              </Flex>
              {furnishingStatus && (
                <Flex  w='400px' borderBottom='1px' borderColor='gray.100' p='3' >
                  <Text>Furnishing Status</Text>
                  <Text margin = '0 auto 15px' fontWeight='bold'>{item.furnish_status}</Text>
                </Flex>
              )}
            </Flex>
          </React.Fragment>
        </Box>
        : null}
        
        {item.prop_cat == 2 ?
          <Box maxWidth='1000px' margin='auto' p='4'>
            <React.Fragment>
              {photos && <ImageScrollbar data={sliderItems} />}
              <Box w='full' p='6'>
                <Flex paddingTop='2' alignItems='center'>
                  <Box paddingRight='3' color='green.400'></Box>
                  <Text fontWeight='bold' fontSize='lg'>
                    &#8358; {item.price.toLocaleString()}
                  </Text>
                  <Spacer />
                </Flex>
                <Flex alignItems='center' p='1'  w='250px' color='blue.400'>
                  {millify(item.size)} sqft &nbsp; <BsGridFill />
                </Flex>
                <br/>
                <Box>
                  <Room style={{marginRight:"8px"}}/> {item.city}, {item.state}, {item.country}
                </Box>
              </Box>
              <Box marginTop='2' margin= '8px'>
                <Text fontSize='18px' marginBottom='2' fontWeight='bold'>Additional Information</Text>
                <Text lineHeight='2' color='gray.600'>{item.description}ffffffffff</Text>
              </Box>
              <Flex flexWrap='wrap' margin= '8px' textTransform='uppercase' justifyContent='space-between'>
                <Flex w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
                  <Text>Purpose</Text>
                  <Text margin = '0 auto 15px' fontWeight='bold'>{item.purpose}</Text>
                </Flex>
              </Flex>
            </React.Fragment>
          </Box>
        : null}  
      </Box> 
      ))}
      <Footer/>
    </div>
  )
}

export default Selecto;