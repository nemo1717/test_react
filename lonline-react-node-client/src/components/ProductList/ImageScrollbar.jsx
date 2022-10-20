import React from 'react'
import { useContext } from 'react';
import styled from "styled-components";
import { Box, Icon, Flex } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { sliderItems } from '../Homepage/sliderData';

const Image = styled.img`
    width: 100% ;
`;

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent='center' alignItems='center' marginRight='1'>
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize='2xl'
        cursor='pointer'
        d={['none','none','none','block']}
      />
    </Flex>
  );
}

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent='center' alignItems='center' marginLeft='1'>
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize='2xl'
        cursor='pointer'
        d={['none','none','none','block']}
    />
    </Flex>
  );
}

const ImageScrollbar = () => {
    
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{ overflow: 'hidden' }} >
    {sliderItems.map((item) => (
        
      <Box  float= 'left' width = '720px' height= '400px' object-fit = ' cover' itemId={item.id} overflow='hidden' p='1'>
        <Image placeholder="blur" blurDataURL='' src={item.img}   />
      </Box>
    ))}
    </ScrollMenu>

  )
}

export default ImageScrollbar