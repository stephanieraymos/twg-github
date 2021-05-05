export const Navigation = (props, handleSubmit) => {
  const handleTwo = () => {
    handleSubmit().then(props.next());
  };
  console.log(handleSubmit());
  return (
    <div>
      <button
        className="form-button"
        block
        style={{ backgroundColor: "#f47c20", margin: "0 auto" }}
        onClick={props.prev}
      >
        Previous
      </button>
      <button
        onClick={() => { handleSubmit(); props.next();}}
        type="submit"
        className="form-button"
        block
        style={{ backgroundColor: "#f47c20", margin: "0 auto" }}
      >
        Next
      </button>
    </div>
  );
};
