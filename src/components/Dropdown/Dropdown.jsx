/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "./Dropdown.css";

export default function Dropdown({
  id,
  options,
  selectionLabel,
  value,
  modifyDropdownState,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValueLabel, setSelectedValueLabel] = useState(null);
  const dropdownContainer = useRef(null);

  const handleOptionClick = ({ label, value }) => {
    modifyDropdownState(id, value);
    setSelectedValueLabel(label);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!selectionLabel) {
      modifyDropdownState(id, options[0].value);
      setSelectedValueLabel(options[0].label);
    }

    const handleBodyClick = (e) => {
      if (!dropdownContainer.current) return;

      if (!dropdownContainer.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", handleBodyClick, true);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  return (
    <>
      <div className="dropdown-parent-container" ref={dropdownContainer}>
        <div
          className="dropdown-label-container"
          onClick={() => setIsOpen(!isOpen)}
          style={{ position: "relative" }}
        >
          <p className="dropdown-label">
            {selectedValueLabel || selectionLabel}
          </p>
          {/* <IoIosArrowDropdownCircle /> */}
          &darr;
        </div>
        {isOpen && (
          <ul className="options-list">
            {options.map((o, index) => (
              <li key={index} onClick={() => handleOptionClick(o)}>
                {o.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* <p>Selected Value is {value}</p> */}
    </>
  );
}

/* 

Lessons Learnt
1. Showing the selected label in dropdown container.
2. Closing Dropdown after selecting the value.
3. If selectionLabel is given show it as default with its value as empty string, other wise show the first option and set its value as selected value.
4. Close the dropdown when user click anywhere but that dropdown.
5. Event Capturing and useRef.
*/
