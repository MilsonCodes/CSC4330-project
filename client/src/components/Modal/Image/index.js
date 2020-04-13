import React from "react";
import styled from "styled-components";

//TODO: Figure out how the hell I'm going to style this
const Image = styled.img`

`

const ImageComp = props => {
    return <Image src={props.src} alt={props.alt} style={props.style} />
}

export default ImageComp;