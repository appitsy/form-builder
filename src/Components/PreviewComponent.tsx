import React from 'react';
import styled from "@emotion/styled";

interface PreviewComponentProps {
    // TODO: some explicit type here
    type: string
}

export interface PreviewComponentSchema extends PreviewComponentProps {
    isAfter: boolean;
}

export const StyledPreviewComponent = styled.div`
    border-radius: 10px;
    background-color: darkgrey;
    opacity: 50%;
    font-weight: 500;
    padding: 5px 10px;
    line-height: 0.5rem;
    text-transform: capitalize;
`;

export const PreviewComponent: React.FC<PreviewComponentProps> = (props) => (
    <StyledPreviewComponent className='unselectable-text'>{props.type}</StyledPreviewComponent>
);
