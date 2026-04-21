interface ContentProps {
  parts: { name: string; exerciseCount: number }[];
}

const Content = ({ parts }: ContentProps) => {
  return (
    <>
      <p>
        {parts[0].name} {parts[0].exerciseCount}
      </p>
      <p>
        {parts[1].name} {parts[1].exerciseCount}
      </p>
      <p>
        {parts[2].name} {parts[2].exerciseCount}
      </p>
    </>
  );
};

export default Content;
