import React, { useState, useEffect } from 'react';
import ResultsList from '../services/resultsService'
import resultsService from '../services/resultsService';
import DeleteButton from './DeleteButton';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';

interface CalculatorsList {
    section: string;
    title: string;
    result: {
        name: string;
        value: number | null;
        unit?: string | null;
    }
}

const CalculatorDetails = ({ cityId }: { cityId: number }) => {
    const [calculators, setCalculators] = useState<CalculatorsList[]>([]);

    const sectionTitles:{ [key: string]: string } = {
        Landing: 'Esitiedot',
        DailyWork: 'Ajansäästö päivittäisessä koordinoinnissa',
        PlanningWork: 'Ajansäästö kuljetussuunnittelussa',
        TransportCosts: 'Kuljetuskustannukset ja säästö'
    };

    useEffect(() => {
        if (cityId) {
            ResultsList.getCalculatorsByCityId(cityId).then(response => {
                if (response && response.calculators && Array.isArray(response.calculators)) {
                    setCalculators(response.calculators);
                } else {
                    setCalculators([]);  // Handle unexpected API response
                }
            }).catch(error => {
                console.error('Failed to fetch calculators:', error);
                setCalculators([]);  // Handle error
            });
        }
    }, [cityId]);

    // Group calculators by section
    const groupedCalculators = calculators.reduce((acc, calculator) => {
        const section = sectionTitles[calculator.section] || calculator.section;
        if (!acc[section]) {
            acc[section] = [];
        }
        acc[section].push(calculator);
        return acc;
    }, {} as Record<string, CalculatorsList[]>);

    // const handleDelete = () => {
    //     resultsService.deleteResultList(resultListId)
    //         .then(() => {
    //             alert('Results list deleted successfully');
    //             // Lisää logiikkaa tarvittaessa päivitysten tai reitityksen hallintaan
    //         })
    //         .catch(error => {
    //             console.error('Failed to delete the results list:', error);
    //             alert('Failed to delete the results list');
    //         });
    // };

    const handleDeleteSuccess = () => {
        console.log('Tietue poistettu onnistuneesti!');
        window.location.reload();
      };

    return (
        <>
            {Object.entries(groupedCalculators).map(([section, calculatorsList], index) => (
                <div key={index}>
                    <h2>{section}</h2>
                    <div className='calculatorsStats'>
                    {calculatorsList.map((calculator, index) => (
                        <div key={index}>
                            <h5>{calculator.title}</h5>
                            {calculator.result && calculator.result.value !== null ? (
                                <p>
                                    {calculator.result.name}: {calculator.result.value} {calculator.result.unit ?? ""}
                                </p>
                            ) : (
                                <p>Ei tulosta</p>
                            )}
                        </div>
                    ))}
                    </div>
                </div>
            ))}
            <DeleteButton id={cityId} onSuccessfulDelete={handleDeleteSuccess} />
        </>
    );
};

export default CalculatorDetails;