import { useEffect, useState } from 'react';
import yamlData from '../laskuri.yaml';
import { RootSchema, Calculator, Result } from '../types';
import Laskuri from '../components/Calculator';
import { parser } from 'mathjs';
// import TotalResults from './TotalComponent';
// import AdditionalInfo from '../components/CalculateTotal';

function CalculatorContainer() {
    const validatedData = RootSchema.parse(yamlData)
    const validatedContainer = validatedData.Container
    const validatedCalculators = validatedData.Laskurit;

    const [endResults, setEndResults] = useState<{ name: string; value: number }[]>([])
    const [calculators, setCalculators] = useState(validatedCalculators.map(calculator => ({
        ...calculator, variables:endResults
    })));


    const handleCalculatorChange = (calculatorId: string, result: number) => {
        const newValue = typeof result === 'number' ? result : parseFloat(result);
        setCalculators(prevCalculators =>
            prevCalculators.map(calculator =>
                calculator.id === calculatorId ? { ...calculator, result: { ...calculator.result, value: newValue } } : calculator
                
            )
        );
        console.log('uus arvo :' ,newValue)
    };

    useEffect(() => {
        const newResults: {
            name: string
            value: number
        }[] = []
        for (const calculator of calculators){
            newResults.push({
                name: `result_${calculator.id}`,
                value: calculator.result.value,
            })
        }
        setEndResults(newResults)
        console.log('uuudet arvot',newResults)
    }, [calculators])


    // const calculateTotalResults = (calculator: Calculator, calculators: Calculator[]) => {
    //     const p = parser();
    //     calculator.variables?.forEach(varDependency => {
    //         const dependentCalculator = calculators.find(c => c.id === varDependency.variable);
    //         if (dependentCalculator && dependentCalculator.result && typeof dependentCalculator.result.value === 'number') {
    //             p.set(varDependency.variable, dependentCalculator.result.value);
    //         }
    //     });
    //     try {
    //         const result = p.evaluate(calculator.formula);
    //         return typeof result === 'number' ? result : 0;
    //     } catch (error) {
    //         console.error('Kaavan arviointivirhe:', error);
    //         return 0;
    //     }
    // };

    // useEffect(() => {
    //     const updatedCalculators = calculators.map(calculator => {
    //         if (calculator.type === "total") {
    //             const newResult = calculateTotalResults(calculator, calculators);
    //             if (calculator.result.value !== newResult) {
    //                 return { ...calculator, result: { ...calculator.result, value: newResult } };
    //             }
    //         }
    //         return calculator;
    //     });


    //     setCalculators(updatedCalculators);

    // }, [calculators]);


    return (
        <div className='calculatorContainer'>
            <h2>{validatedContainer.title}</h2>
            <div className='calculatorContent'>
                {validatedCalculators.map((calculator) => (
                    <Laskuri
                        key={calculator.id}
                        calculator={{...calculator, variables: endResults}}
                        onCalculatorChange={handleCalculatorChange}
                    />
                ))}
                
            </div>

            <div>
                {calculators.map((calculator, index) => (
                    <div key={index}>
                        {`Laskuri ${calculator.id}: ${calculator.result.value}`}
                    </div>
                ))}
                <div>
                    {`Yhteensä: ${calculators.reduce((acc, { result }) => acc + result.value, 0)}`}
                </div>
            </div>
        </div>
    );
}

export default CalculatorContainer;