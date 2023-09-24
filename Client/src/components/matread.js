import React, { useEffect, useState } from 'react';

function matread() {
  const [matlabData, setMatlabData] = useState(null);

  useEffect(() => {
    fetch('/api1')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMatlabData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>{matlabData}</div>
)

}


export default matread;
