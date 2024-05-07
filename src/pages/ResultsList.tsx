import React, { useState, useEffect } from 'react'
import ResultsList from '../services/resultsService'
import { ResultList } from '../types';
import CalculatorDetails from '../components/CalculatorDetails';


const ListedResults = () => {
    const [cityNames, setCityNames] = useState<ResultList[]>([]);
    const [selectedCity, setSelectedCity] = useState<ResultList | null>(null);
    // const [showCalculators, setShowCalculators] = useState<boolean>(false)

    useEffect(() => {
        ResultsList.getCityNames()
        .then(data => {
            setCityNames(data)
        })
    },[]
    )

    return (
        <div className='resultsPageContainer'>
        <div className='showCitysContainer'>
        <h1>hello</h1>
        {cityNames.map(c => (
            <div className='cityList' key={c.resultListId} onClick={() => setSelectedCity(c)}>
                <h3>{c.placeName}</h3> <p>({new Date(c.savingDate).toLocaleDateString("fi-FI")})</p>
            </div>
        ))}
        </div>
        <div className='showResultsContainer'>
        {selectedCity && <CalculatorDetails cityId={selectedCity.resultListId} />}
        </div>
        </div>
    );
}

export default ListedResults