import React, { useContext } from 'react';
import { PraxContext } from '../contexts/PraxContext';
import { OpenCloseProps } from '../types/Types';

const HandleClick: React.FC<OpenCloseProps> = ({
    children,
    ...props
}) => {
    const { appState } = useContext(PraxContext);
    const openCloseComponent = () => {        
        const currentOpen = appState.componentsOpen;
        const component = document.getElementById(props.idname);
        component!.style.opacity = props.isopening ? '1' : '0';
        const addOrRemove = props.isopening ? 1 : -1;
        const output = currentOpen + addOrRemove;
        appState.setComponentsOpen(output); 
    }
    return(
        <div
            {...props}
            onClick={openCloseComponent}
        >
            {children}
        </div>
    )
}

export default HandleClick;