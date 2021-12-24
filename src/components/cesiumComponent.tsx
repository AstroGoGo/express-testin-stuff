import React, { useState, useEffect, RefObject, useRef } from "react";
import { Viewer, ProviderViewModel } from "cesium";
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

        // We want to make sure to get rid of all the different Cesium ProviderViewModels 
        // that we don't want to show in our baseLayerPicker dropdown window. 
        // By default, Cesium puts all their defaults in first, so we'll just go to the DB first to figure out
        // which ones we want to keep, and then _.intersectionBy the rest out of the
        // viewer's imageryProviderViewModels array. (JER) 12/21/21.
        const conditionalArray = [{'name' : 'Bing Maps Aerial'} , {'name' : 'ESRI World Street Map'}, {'name' : 'Open\u00adStreet\u00adMap'}];
        let defaultProviders : ProviderViewModel[] = viewer.baseLayerPicker.viewModel.imageryProviderViewModels;
        viewer.baseLayerPicker.viewModel.imageryProviderViewModels = _.intersectionBy(defaultProviders, conditionalArray, 'name');         


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