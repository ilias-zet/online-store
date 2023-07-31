import React from "react";
import styled from 'styled-components'

const BannerContainer = styled.div`
width: 100%;
`
const BannerImage = styled.img`
width: 100%;
`


const BannerForPage = ({ bannerURL }) => {
    return (
        <BannerContainer>
          <BannerImage src={bannerURL} alt=''></BannerImage>
        </BannerContainer>
    )
}

export default BannerForPage