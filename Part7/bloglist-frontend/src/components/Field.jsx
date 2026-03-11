const Field = ({ field }) => (
  <div>
    <label>
      {field.name}
      <input {...field.input} />
    </label>
  </div>
);

export default Field;
