import { useState, useRef, forwardRef } from "react";

let MultiSelect = ({ items, isRightOne = false }, ref) => {
  return (
    <select multiple ref={ref}>
      {items
        .filter(({ positionRight }) => isRightOne === positionRight)
        .map(({ value }) => {
          return (
            <option key={value} value={value}>
              Select {value}
            </option>
          );
        })}
    </select>
  );
};

MultiSelect = forwardRef(MultiSelect);

const defaultTtems = [
  {
    value: "1",
    positionRight: false
  },
  {
    value: "2",
    positionRight: false
  },
  {
    value: "3",
    positionRight: true
  },
  {
    value: "4",
    positionRight: true
  }
];

function MultiSelectWidget() {
  const rightMSRef = useRef();
  const leftMSRef = useRef();
  const [items, updateItems] = useState(defaultTtems);

  const getSelectedOptions = (ref) => {
    const selectedOptions = ref.current.selectedOptions;
    return Object.values(selectedOptions).map((option) => option.value);
  };

  function updateOptions(options, makeRight, allItems = false) {
    return items.map((item) => {
      const { value } = item;
      if (allItems) {
        return {
          value,
          positionRight: makeRight
        };
      } else if (options.includes(value)) {
        return {
          value,
          positionRight: makeRight
        };
      } else {
        return item;
      }
    });
  }

  function setItems({ ref, makeRight, allItems }) {
    const selectedOptions = getSelectedOptions(ref);
    const finalValues = updateOptions(selectedOptions, makeRight, allItems);
    updateItems(finalValues);
  }

  const clickRight = () =>
    setItems({ ref: leftMSRef, makeRight: true, allItems: false });

  const clickLeft = () =>
    setItems({ ref: rightMSRef, makeRight: false, allItems: false });

  const clickRightAll = () =>
    setItems({ ref: leftMSRef, makeRight: true, allItems: true });

  const clickLeftAll = () =>
    setItems({ ref: rightMSRef, makeRight: false, allItems: true });

  return (
    <div className="container">
      <div>
        <MultiSelect ref={leftMSRef} items={items} />
      </div>
      <div className="button-container">
        <button onClick={clickRight}>right</button>
        <button onClick={clickLeft}>left</button>
        <button onClick={clickRightAll}>right all</button>
        <button onClick={clickLeftAll}>left all</button>
      </div>
      <div>
        <MultiSelect ref={rightMSRef} items={items} isRightOne />
      </div>
    </div>
  );
}

export default MultiSelectWidget;
