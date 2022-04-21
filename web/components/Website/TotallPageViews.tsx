import React, {useEffect, useRef, useState} from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const TotalPageViews = () => {
  const sdk = new ChartsEmbedSDK({baseUrl: 'https://charts.mongodb.com/charts-project-0-cwimb'});
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [chart] = useState(sdk.createChart({chartId: 'df6e19d7-8a2a-405e-ac1a-c14bbe81ed57',height: '200px', background: "transparent", theme: "dark"}));

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);


  return <div className="px-4 py-5 bg-grey-500 border-4 border-red shadow rounded-lg overflow-hidden sm:p-6 transition-all duration-400" ref={chartDiv}/>;
};

export default TotalPageViews;
