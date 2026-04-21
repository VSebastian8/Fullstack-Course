interface TotalProps {
  total: number;
}

const Total = ({ total }: TotalProps) => {
  return <h2> Number of exercises: {total} </h2>;
};

export default Total;
