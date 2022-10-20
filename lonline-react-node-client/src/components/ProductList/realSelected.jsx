import React, { useEffect, useState} from 'react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath, FaMapMarkerAlt } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import ImageScrollbar from './ImageScrollbar';
import axios from 'axios'

import rMainImg2 from '../Homepage/images/rhome1.jpg'
import { sliderItems } from '../Homepage/sliderData';
import Footer from '../Homepage/footer';
import Navbar from '../Homepage/navbar';
import Announcements from '../Homepage/announcement';
import { RecentActorsSharp } from '@material-ui/icons';

const RealSelected = (props) => {
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

       })
       .catch((err) => console.log(err));
      },[]);


  return (
    <div>
      <Navbar/>
      <Announcements/>
      <br/>
    
      {data.map((item) => (
      <Box maxWidth='1000px' margin='auto' p='4'>
      {photos && <ImageScrollbar data={sliderItems} />}
      {item.prop_cat == 1 ?
      <React.Fragment>
      
      <Box w='full' p='6'>
        <Flex paddingTop='2' alignItems='center'>
          <Box paddingRight='3' color='green.400'></Box>
          <Text fontWeight='bold' fontSize='lg'>
          &#8358; {item.price.toLocaleString()} {item.rent_frequency && `/${item.rent_frequency}`}
          </Text>
          <Spacer />
      </Flex>
      <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
        {item.bedroom}<FaBed /> | {item.bathroom} <FaBath /> | {millify(item.size)} sqft <BsGridFill />
      </Flex>
      </Box>
      <Box marginTop='2' margin= '8px'>
        <Text fontSize='lg' marginBottom='2' fontWeight='bold'>{data[0].title}</Text>
        <Text lineHeight='2' color='gray.600'>{item.description}</Text>
      </Box>
      <Flex flexWrap='wrap' margin= '8px' textTransform='uppercase' justifyContent='space-between'>
        <Flex w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
          <Text>Type</Text>
          <Text margin = '0 auto 15px' fontWeight='bold'>{item.prop_type}</Text>
        </Flex>
        <Flex  w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
          <Text>Purpose</Text>
          <Text margin = '0 auto 15px' fontWeight='bold'>{item.purpose}</Text>
        </Flex>
        {furnishingStatus && (
          <Flex  w='400px' borderBottom='1px' borderColor='gray.100' p='3' >
            <Text>Furnishing Status</Text>
            <Text  margin = '0 auto 15px' fontWeight='bold'>{item.furnish_status}</Text>
          </Flex>
        )}
      </Flex>
      <Box>
      </Box>
      </React.Fragment>
      : null}

{item.prop_cat == 2 ?
      
      <React.Fragment>
      
      <Box w='full' p='6'>
        <Flex paddingTop='2' alignItems='center'>
          <Box paddingRight='3' color='green.400'></Box>
          <Text fontWeight='bold' fontSize='lg'>
          &#8358; {item.price.toLocaleString()} {item.rent_frequency && `/${item.rent_frequency}`}
          </Text>
          <Spacer />
   
      </Flex>
      <Flex alignItems='center' p='1'  w='250px' color='blue.400'>
      <FaMapMarkerAlt/> &nbsp; {item.city}, {item.state} | &nbsp; {millify(item.size)} sqft &nbsp; <BsGridFill />
      </Flex>
      </Box>
      <Box marginTop='2' margin= '8px'>
        <Text fontSize='lg' marginBottom='2' fontWeight='bold'>{item.title}</Text>
        <Text lineHeight='2' color='gray.600'>{item.description}</Text>
      </Box>
      <Flex flexWrap='wrap' margin= '8px' textTransform='uppercase' justifyContent='space-between'>
        <Flex  w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
          <Text>Size</Text>
          <Text margin = '0 auto 15px' fontWeight='bold'>{item.size}</Text>
        </Flex>
        <Flex  w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
          <Text>Purpose</Text>
          <Text margin = '0 auto 15px' fontWeight='bold'>{item.purpose}</Text>
        </Flex>
        <Flex  w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
          <Text >Location</Text>
          <Text margin = '0 auto 15px'  fontWeight='bold'>shshshs</Text>
        </Flex>
      </Flex>
      <Box>

      </Box>
      </React.Fragment>
      : null}

    </Box>
    
    ))}
    <Footer/>
  </div>
  )
}

export default RealSelected