type Props = {
  length: number;
  index: number;
};

const Selected = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="1"
      width="16"
      height="16"
      rx="8"
      stroke="#141718"
      stroke-linejoin="bevel"
    />
    <ellipse cx="8.99999" cy="9" rx="3.99999" ry="4" fill="#141718" />
  </svg>
);

const Point = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="7.99999" cy="8" rx="3.99999" ry="4" fill="#6C7275" />
  </svg>
);

const Points = (props: Props) => {
  return (
    <div
      css={{
        display: "flex",
        gap: "18px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {[...Array(props.length)].map((_, i) =>
        i === props.index ? Selected : Point
      )}
    </div>
  );
};

export default Points;
