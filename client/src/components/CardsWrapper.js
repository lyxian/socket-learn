import Card from "./Card";
import { numbers, colors, symbols } from "../data";
import useRandomValueFromArray from "../hooks/useRandomValueFromArray";

const CardsWrapper = ({ cardsNumber }) => {
    const cardNumbers = cardsNumber;
    const { randomValueFromArray } = useRandomValueFromArray();

    return (
        <div className="card-wrapper">
            {[...Array(Number(cardsNumber))].map((_numb, index) => {
                index += 1;
                const randomSymbols = symbols[Math.floor(Math.random() * symbols.length)];
                const cardColor = ["spade", "club"].includes(randomSymbols.name) ? colors[1].color : colors[0].color;
                return <Card key={index} symbol={randomSymbols.symbol} color={cardColor}
                    number={randomValueFromArray(numbers).number} name={randomSymbols.name} />;
            })}
        </div>
    )
}

export default CardsWrapper;