import React from 'react';

interface ComponentPropertiesProps {
    className?: string;
}

export const ComponentProperties = (props: ComponentPropertiesProps) => (<div className={props.className}>Component Properties</div>)