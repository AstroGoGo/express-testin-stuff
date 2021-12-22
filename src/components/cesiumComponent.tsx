import React, { useState, useEffect, RefObject, useRef } from "react";
import { Viewer } from "cesium";
import "../../build/Cesium/Widgets/widgets.css";
import _ from "lodash"

const CesiumComponent = () => {
    
    const myRef: RefObject<HTMLDivElement> = useRef(null);

    const [currentProvider, setCurrentProvider] = useState('');

    useEffect(() => {  
  
        let viewer = new Viewer(myRef.current as HTMLDivElement, {
            timeline: false,
            animation: false,
            fullscreenButton: false,
            infoBox: false,
            selectionIndicator: false,
            creditContainer: document.createElement('div'),
        });

        // viewer.resolutionScale = 2.0
        let scene = viewer.scene;
        let canvas = scene.canvas;
                  
        return () => viewer.destroy();
    }, []);

    return (
        <div ref={myRef}>
        </div>
    )
}

export default CesiumComponent;