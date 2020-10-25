import React, { useState, useEffect } from 'react';

const Draggable = (props) => {
    const [style, setStyle] = useState({});
    const [startingPosition, setStartingPosition] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState(props?.startingCoordiantes || { x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const onMouseMove = (event) => {
            setPosition({ x: event.clientX - startingPosition.x, y: event.clientY - startingPosition.y });
            //setPosition({x: position.x + event.clientX - startingPosition.x, y: position.y + event.clientY - startingPosition.y})
        }

        if (isDragging) {
            window.addEventListener("mousemove", onMouseMove);
        }

        return () => {
            setPosition({ x: 0, y: 0 });
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [isDragging, startingPosition]);

    const onMouseDown = (event) => {
        setStartingPosition({ x: event.clientX, y: event.clientY });
        setStyle({ zIndex: 11 });
        setIsDragging(true);
    }

    const onMouseUp = (event) => {
        setIsDragging(false);
        props.currentPosition(position);
        setStyle({});
    }
    
    return (
        React.cloneElement((props.children), {
            onMouseDown: onMouseDown,
            onMouseUp: onMouseUp,
            style: {...props.children.props.style, transform: `translateX(${position.x}px) translateY(${position.y}px)`, ...style}
        })
    );
}

export default Draggable;